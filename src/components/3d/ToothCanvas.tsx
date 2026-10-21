import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createToothModel, ToothModelComponents } from './ToothModel';

export type ToothInspectionMode = 'clinical' | 'anatomy' | 'scanner';

interface ToothCanvasProps {
  mode?: ToothInspectionMode;
  onModeChange?: (mode: ToothInspectionMode) => void;
  interactive?: boolean;
  autoRotate?: boolean;
  className?: string;
  showControls?: boolean;
  accentColor?: string;
}

export const ToothCanvas: React.FC<ToothCanvasProps> = ({
  mode = 'clinical',
  onModeChange,
  interactive = true,
  autoRotate = true,
  className = '',
  showControls = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<ToothInspectionMode>(mode);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [webGlAvailable, setWebGlAvailable] = useState(true);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const modelRefs = useRef<ToothModelComponents | null>(null);
  const rotationTargetRef = useRef<{ x: number; y: number }>({ x: 0.1, y: 0.2 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Sync prop changes
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const handleModeSwitch = useCallback((newMode: ToothInspectionMode) => {
    setCurrentMode(newMode);
    if (onModeChange) onModeChange(newMode);
  }, [onModeChange]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software or missing WebGL
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
      setWebGlAvailable(false);
      return;
    }

    let isSoftwareGl = false;
    try {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      // ignore
    }

    // Three.js Scene Setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10182d, 0.08);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Procedural Studio Environment for realistic enamel specular reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Dental Studio Lighting Rig
    // Key Light - warm white
    const keyLight = new THREE.DirectionalLight(0xfff9f0, 2.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Teal Fill Light - matching #008F87
    const fillLight = new THREE.DirectionalLight(0x008f87, 1.8);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    // Turquoise Rim Light - matching #00BFA5
    const rimLight = new THREE.DirectionalLight(0x00bfa5, 2.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Ambient Hemisphere
    const hemiLight = new THREE.HemisphereLight(0xeaf7fa, 0x10182d, 0.9);
    scene.add(hemiLight);

    // Contact Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const radGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      radGrad.addColorStop(0, 'rgba(0, 143, 135, 0.45)');
      radGrad.addColorStop(0.5, 'rgba(16, 24, 45, 0.3)');
      radGrad.addColorStop(1, 'rgba(16, 24, 45, 0)');
      sCtx.fillStyle = radGrad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.95;
    scene.add(shadowMesh);

    // Create the 3D Tooth Model
    const toothComponents = createToothModel();
    modelRefs.current = toothComponents;
    scene.add(toothComponents.rootGroup);

    // Wireframe helper for 3D scanner mode
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00bfa5,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const crownWireframe = new THREE.Mesh(toothComponents.enamelMesh.geometry.clone(), wireframeMat);
    crownWireframe.scale.set(1.015, 1.015, 1.015);
    toothComponents.rootGroup.add(crownWireframe);

    // Mouse / Touch Interaction Handlers
    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      rotationTargetRef.current.y += deltaX * 0.008;
      rotationTargetRef.current.x = Math.max(-0.6, Math.min(0.6, rotationTargetRef.current.x + deltaY * 0.008));
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId = 0;
    let clock = new THREE.Clock();
    let scanDirection = 1;
    let scanY = -1.5;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(0.1, clock.getDelta());
      const elapsedTime = clock.getElapsedTime();

      const group = toothComponents.rootGroup;

      // Auto rotation when enabled and not actively dragging
      if (isRotating && !isDraggingRef.current) {
        rotationTargetRef.current.y += delta * 0.55;
      }

      // Gentle floating levitation
      const floatOffset = Math.sin(elapsedTime * 1.5) * 0.08;
      group.position.y = 0.2 + floatOffset;

      // Smooth kinematic damping
      group.rotation.y = THREE.MathUtils.damp(group.rotation.y, rotationTargetRef.current.y, 8, delta);
      group.rotation.x = THREE.MathUtils.damp(group.rotation.x, rotationTargetRef.current.x, 8, delta);

      // Mode-specific shader/material animations
      if (currentMode === 'anatomy') {
        // Enamel becomes glassy transparent
        toothComponents.enamelMaterial.opacity = THREE.MathUtils.damp(toothComponents.enamelMaterial.opacity, 0.35, 6, delta);
        toothComponents.dentinMaterial.opacity = THREE.MathUtils.damp(toothComponents.dentinMaterial.opacity, 0.88, 6, delta);
        toothComponents.pulpMaterial.opacity = THREE.MathUtils.damp(toothComponents.pulpMaterial.opacity, 0.95, 6, delta);
        toothComponents.scanMaterial.opacity = THREE.MathUtils.damp(toothComponents.scanMaterial.opacity, 0, 6, delta);
        wireframeMat.opacity = THREE.MathUtils.damp(wireframeMat.opacity, 0, 6, delta);
      } else if (currentMode === 'scanner') {
        // Enamel remains clinical, laser ring sweeps up and down
        toothComponents.enamelMaterial.opacity = THREE.MathUtils.damp(toothComponents.enamelMaterial.opacity, 0.95, 6, delta);
        toothComponents.dentinMaterial.opacity = THREE.MathUtils.damp(toothComponents.dentinMaterial.opacity, 0, 6, delta);
        toothComponents.pulpMaterial.opacity = THREE.MathUtils.damp(toothComponents.pulpMaterial.opacity, 0, 6, delta);
        toothComponents.scanMaterial.opacity = THREE.MathUtils.damp(toothComponents.scanMaterial.opacity, 0.85, 6, delta);
        wireframeMat.opacity = THREE.MathUtils.damp(wireframeMat.opacity, 0.35, 6, delta);

        scanY += delta * 1.8 * scanDirection;
        if (scanY > 1.3) {
          scanY = 1.3;
          scanDirection = -1;
        } else if (scanY < -1.7) {
          scanY = -1.7;
          scanDirection = 1;
        }
        toothComponents.scanRingMesh.position.y = scanY;
        // Subtle laser glow pulse
        toothComponents.scanMaterial.color.setHSL(0.48, 0.95, 0.45 + Math.sin(elapsedTime * 6) * 0.1);
      } else {
        // Clinical mode
        toothComponents.enamelMaterial.opacity = THREE.MathUtils.damp(toothComponents.enamelMaterial.opacity, 1.0, 6, delta);
        toothComponents.dentinMaterial.opacity = THREE.MathUtils.damp(toothComponents.dentinMaterial.opacity, 0, 6, delta);
        toothComponents.pulpMaterial.opacity = THREE.MathUtils.damp(toothComponents.pulpMaterial.opacity, 0, 6, delta);
        toothComponents.scanMaterial.opacity = THREE.MathUtils.damp(toothComponents.scanMaterial.opacity, 0, 6, delta);
        wireframeMat.opacity = THREE.MathUtils.damp(wireframeMat.opacity, 0, 6, delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);

      // Clean up Three.js allocations
      scene.clear();
      renderer.dispose();
      envTexture.dispose();
      shadowTex.dispose();
      if (domElement.parentElement === container) {
        container.removeChild(domElement);
      }
    };
  }, [interactive, isRotating, currentMode]);

  const resetOrientation = () => {
    rotationTargetRef.current = { x: 0.1, y: 0.2 };
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center relative"
        title="Interactive 3D Tooth: Click & drag to rotate"
      >
        {!webGlAvailable && (
          <div className="flex flex-col items-center justify-center p-6 text-center text-slate-300">
            <svg className="w-24 h-24 text-[#00BFA5] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8 2 5 5 5 9c0 3.5 1.5 6 3 9.5.7 1.5 1.8 3.5 2.5 3.5s1.8-2 2.5-3.5C14.5 15 16 12.5 16 9c0-4-3-7-4-7z" />
              <path d="M9 13c1.5 1 4.5 1 6 0" />
            </svg>
            <p className="font-semibold text-white">Malligai Dental Care 3D Model</p>
            <p className="text-xs text-slate-400 mt-1">Interactive WebGL preview</p>
          </div>
        )}
      </div>

      {/* Floating Mode Dock (Zero Viewport Occlusion, pinned neatly at bottom) */}
      {showControls && (
        <div className="w-full max-w-sm px-4 pb-2 z-10">
          <div className="glass-card rounded-xl p-1.5 flex items-center justify-between gap-1 shadow-lg text-xs font-medium">
            <button
              onClick={() => handleModeSwitch('clinical')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
                currentMode === 'clinical'
                  ? 'bg-[#008F87] text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Clinical
            </button>
            <button
              onClick={() => handleModeSwitch('anatomy')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
                currentMode === 'anatomy'
                  ? 'bg-[#008F87] text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Anatomy
            </button>
            <button
              onClick={() => handleModeSwitch('scanner')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
                currentMode === 'scanner'
                  ? 'bg-[#008F87] text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              3D Scan
            </button>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1 pl-1 border-l border-white/10">
              <button
                onClick={() => setIsRotating(!isRotating)}
                title={isRotating ? 'Pause rotation' : 'Play rotation'}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                {isRotating ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
              <button
                onClick={resetOrientation}
                title="Reset view"
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Interactive Hint Text */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 px-1">
            <span>Drag to rotate 360°</span>
            {currentMode === 'clinical' && <span className="text-[#00BFA5]">Natural Enamel</span>}
            {currentMode === 'anatomy' && <span className="text-amber-300">Enamel · Dentin · Pulp</span>}
            {currentMode === 'scanner' && <span className="text-[#00BFA5]">Digital 3D Optical Beam</span>}
          </div>
        </div>
      )}
    </div>
  );
};
