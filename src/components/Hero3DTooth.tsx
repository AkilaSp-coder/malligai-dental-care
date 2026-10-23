import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Eye } from 'lucide-react';

export const Hero3DTooth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [viewMode, setViewMode] = useState<'ceramic' | 'digital'>('ceramic');
  const [showLabels, setShowLabels] = useState(true);
  const isRotatingRef = useRef(true);
  const viewModeRef = useRef<'ceramic' | 'digital'>('ceramic');

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Group for tooth
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // Create high-detail molar tooth model using procedural compound geometry
    // Materials
    const ceramicMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.04,
      transmission: 0.08,
      thickness: 0.5,
      ior: 1.52,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9,
    });

    const digitalMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
    });

    // 1. Crown Geometry
    // We compose the crown with a rounded smoothed anatomical form with 4 cusps
    const crownGroup = new THREE.Group();

    // Main Crown Body
    const crownBodyGeo = new THREE.CylinderGeometry(1.05, 0.9, 1.1, 32, 16);
    // Deform cylinder slightly to make it naturally rounded molar-shaped
    const pos = crownBodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Soft square rounding
      const factor = 1 - 0.12 * Math.cos(4 * Math.atan2(z, x));
      pos.setX(i, x * factor);
      pos.setZ(i, z * factor);
      // Occlusal curve
      if (y > 0.3) {
        const distFromCenter = Math.sqrt(x * x + z * z);
        pos.setY(i, y - 0.18 * Math.cos(distFromCenter * 2.8));
      }
    }
    crownBodyGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownBodyGeo, ceramicMaterial);
    crownMesh.position.y = 0.55;
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    crownGroup.add(crownMesh);

    // 4 Cusps on occlusal surface
    const cuspPositions = [
      { x: 0.42, y: 1.12, z: 0.42, scale: 0.44 },
      { x: -0.42, y: 1.12, z: 0.42, scale: 0.44 },
      { x: 0.42, y: 1.1, z: -0.42, scale: 0.42 },
      { x: -0.42, y: 1.1, z: -0.42, scale: 0.42 },
    ];

    cuspPositions.forEach((cp) => {
      const cuspGeo = new THREE.SphereGeometry(cp.scale, 24, 24);
      const cuspMesh = new THREE.Mesh(cuspGeo, ceramicMaterial);
      cuspMesh.position.set(cp.x, cp.y, cp.z);
      cuspMesh.scale.set(1, 0.7, 1);
      cuspMesh.castShadow = true;
      crownGroup.add(cuspMesh);
    });

    // Cervical Collar / Neck
    const neckGeo = new THREE.CylinderGeometry(0.88, 0.75, 0.35, 32);
    const neckMesh = new THREE.Mesh(neckGeo, ceramicMaterial);
    neckMesh.position.y = -0.05;
    crownGroup.add(neckMesh);

    toothGroup.add(crownGroup);

    // 2. Twin Roots (Mesial & Distal molar roots)
    const rootCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, -0.15, 0),
      new THREE.Vector3(-0.48, -0.85, 0.05),
      new THREE.Vector3(-0.42, -1.6, 0.02),
      new THREE.Vector3(-0.25, -2.1, -0.05),
    ]);

    const rootGeo1 = new THREE.TubeGeometry(rootCurve1, 32, 0.32, 16, false);
    // Taper the root toward apex
    const rootPos1 = rootGeo1.attributes.position;
    for (let i = 0; i < rootPos1.count; i++) {
      const y = rootPos1.getY(i);
      const t = THREE.MathUtils.clamp((y - (-2.1)) / 1.95, 0.15, 1);
      const x = rootPos1.getX(i);
      const z = rootPos1.getZ(i);
      const center = rootCurve1.getPointAt(1 - t);
      rootPos1.setX(i, center.x + (x - center.x) * t);
      rootPos1.setZ(i, center.z + (z - center.z) * t);
    }
    rootGeo1.computeVertexNormals();

    const rootMesh1 = new THREE.Mesh(rootGeo1, ceramicMaterial);
    rootMesh1.castShadow = true;
    toothGroup.add(rootMesh1);

    const rootCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.35, -0.15, 0),
      new THREE.Vector3(0.48, -0.85, -0.05),
      new THREE.Vector3(0.42, -1.6, -0.02),
      new THREE.Vector3(0.25, -2.1, 0.05),
    ]);

    const rootGeo2 = new THREE.TubeGeometry(rootCurve2, 32, 0.32, 16, false);
    const rootPos2 = rootGeo2.attributes.position;
    for (let i = 0; i < rootPos2.count; i++) {
      const y = rootPos2.getY(i);
      const t = THREE.MathUtils.clamp((y - (-2.1)) / 1.95, 0.15, 1);
      const x = rootPos2.getX(i);
      const z = rootPos2.getZ(i);
      const center = rootCurve2.getPointAt(1 - t);
      rootPos2.setX(i, center.x + (x - center.x) * t);
      rootPos2.setZ(i, center.z + (z - center.z) * t);
    }
    rootGeo2.computeVertexNormals();

    const rootMesh2 = new THREE.Mesh(rootGeo2, ceramicMaterial);
    rootMesh2.castShadow = true;
    toothGroup.add(rootMesh2);

    // Floating particles (aesthetic dental hygiene glow)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.2);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Initial position & tilt
    toothGroup.position.y = 0.25;
    toothGroup.rotation.x = 0.12;
    toothGroup.rotation.y = -0.3;

    // Interaction states
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      toothGroup.rotation.y += deltaX * 0.008;
      toothGroup.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      toothGroup.rotation.y += deltaX * 0.01;
      toothGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Switch material if needed
      const currentMat = viewModeRef.current === 'ceramic' ? ceramicMaterial : digitalMaterial;
      toothGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = currentMat;
        }
      });

      if (isRotatingRef.current && !isDragging) {
        toothGroup.rotation.y += 0.006;
      }

      // Gentle floating oscillation
      toothGroup.position.y = 0.25 + Math.sin(elapsedTime * 1.5) * 0.06;

      // Particle subtle rotation
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ceramicMaterial.dispose();
      digitalMaterial.dispose();
      crownBodyGeo.dispose();
      rootGeo1.dispose();
      rootGeo2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] md:h-[500px] flex items-center justify-center select-none">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D Tooth model"
      />

      {/* Floating Anatomical Labels */}
      {showLabels && (
        <>
          {/* Crown Tag */}
          <div className="absolute top-12 left-6 md:left-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-200/80 flex items-center space-x-2 text-xs font-semibold text-slate-800 animate-pulse pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>Aesthetic Enamel & Crown</span>
          </div>

          {/* Precision Cusps Tag */}
          <div className="absolute top-14 right-6 md:right-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-200/80 flex items-center space-x-2 text-xs font-semibold text-slate-800 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-white border border-slate-400"></span>
            <span>Natural Occlusal Anatomy</span>
          </div>

          {/* Root Structure Tag */}
          <div className="absolute bottom-16 left-8 md:left-14 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-200/80 flex items-center space-x-2 text-xs font-semibold text-slate-800 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Stable Bifurcated Root Apex</span>
          </div>
        </>
      )}

      {/* Floating Interactive Controls */}
      <div className="absolute bottom-3 right-3 md:right-6 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-700/60 flex items-center space-x-1.5 text-xs text-white">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-2 rounded-xl transition-all ${
            isRotating ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
          title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={() => setViewMode(viewMode === 'ceramic' ? 'digital' : 'ceramic')}
          className={`px-2.5 py-1.5 rounded-xl font-medium transition-all flex items-center space-x-1.5 ${
            viewMode === 'digital' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
          title="Toggle Ceramic / 3D CAD Scanner wireframe view"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{viewMode === 'ceramic' ? 'Ceramic' : '3D Scan'}</span>
        </button>

        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`p-2 rounded-xl transition-all ${
            showLabels ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
          title={showLabels ? 'Hide anatomical tags' : 'Show anatomical tags'}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] text-slate-500 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/60 pointer-events-none hidden sm:block">
        Drag to rotate 3D tooth view
      </div>
    </div>
  );
};
