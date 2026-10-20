import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Sparkles, Layers, Info } from 'lucide-react';

interface ToothCanvasProps {
  className?: string;
  onExploreServices?: () => void;
}

// Reusable math helpers to avoid garbage collection inside render loop
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);

export const ToothCanvas: React.FC<ToothCanvasProps> = ({ className = '', onExploreServices }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<'enamel' | 'anatomy' | 'xray'>('enamel');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('crown');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const pointerStart = useRef({ x: 0, y: 0 });

  // Store mutable references for Three.js scene objects
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    toothGroup?: THREE.Group;
    enamelMesh?: THREE.Mesh;
    dentinMesh?: THREE.Mesh;
    pulpGroup?: THREE.Group;
    rootsGroup?: THREE.Group;
    gumsMesh?: THREE.Mesh;
    animationId?: number;
    clock?: THREE.Clock;
  }>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 520;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.4, 4.4);

    // 3. WebGL Renderer with modern PBR settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // 4. Lighting Rig (Studio 3-Point + Hemisphere)
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0002;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa5f3fc, 2.0);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // 5. Procedural Composite Tooth Group (3-12 parts)
    const toothGroup = new THREE.Group();
    toothGroup.position.set(0, -0.2, 0);
    scene.add(toothGroup);

    // --- Part A: Occlusal Crown with Anatomical Cusps ---
    // Create an organic crown using sculpted Lathe + displacement
    const crownShape = new THREE.Shape();
    crownShape.moveTo(0, 0);
    crownShape.bezierCurveTo(0.65, 0.05, 0.88, 0.4, 0.92, 0.85);
    crownShape.bezierCurveTo(0.94, 1.25, 0.75, 1.55, 0.45, 1.62);
    crownShape.bezierCurveTo(0.15, 1.65, 0, 1.5, 0, 1.48);

    const crownGeometry = new THREE.LatheGeometry(crownShape.getPoints(28), 48);
    // Sculpt 4 distinct anatomical cusps (Mesiobuccal, Distobuccal, Mesiolingual, Distolingual)
    const posAttr = crownGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);

      if (y > 0.8) {
        // Natural molar indentation and cusps on top
        const angle = Math.atan2(z, x);
        const cuspWave = Math.sin(angle * 4) * 0.09;
        const centralGroove = Math.exp(-Math.hypot(x, z) * 3.5) * -0.12;
        const subtleBulge = Math.cos(angle * 2) * 0.04;
        posAttr.setY(i, y + cuspWave + centralGroove);
        posAttr.setX(i, x * (1 + subtleBulge * 0.15));
        posAttr.setZ(i, z * (1 - subtleBulge * 0.15));
      }
    }
    crownGeometry.computeVertexNormals();

    // PBR Enamel Material (Pearl white, high clearcoat, translucent look)
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfafcff,
      roughness: 0.15,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
      transmission: 0.12,
      thickness: 0.4,
      ior: 1.54, // natural enamel refractive index ~1.62
    });

    const enamelMesh = new THREE.Mesh(crownGeometry, enamelMaterial);
    enamelMesh.castShadow = true;
    enamelMesh.receiveShadow = true;
    toothGroup.add(enamelMesh);

    // --- Part B: Inner Dentin Core (Visible in Anatomy / X-ray Mode) ---
    const dentinGeometry = crownGeometry.clone();
    dentinGeometry.scale(0.88, 0.88, 0.88);
    dentinGeometry.computeVertexNormals();

    const dentinMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a, // warm golden ivory dentin
      roughness: 0.45,
      metalness: 0.05,
      transparent: true,
      opacity: 0.0,
    });
    const dentinMesh = new THREE.Mesh(dentinGeometry, dentinMaterial);
    dentinMesh.position.y = 0.04;
    toothGroup.add(dentinMesh);

    // --- Part C: Vascular Pulp Chamber & Nerve Canal ---
    const pulpGroup = new THREE.Group();
    const pulpCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.9, 0),
      new THREE.Vector3(-0.2, 0.5, 0.05),
      new THREE.Vector3(-0.35, 0.0, 0.02),
      new THREE.Vector3(-0.4, -0.7, 0),
      new THREE.Vector3(-0.38, -1.2, 0),
    ]);
    const pulpCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.9, 0),
      new THREE.Vector3(0.2, 0.5, -0.05),
      new THREE.Vector3(0.35, 0.0, -0.02),
      new THREE.Vector3(0.4, -0.7, 0),
      new THREE.Vector3(0.38, -1.2, 0),
    ]);

    const pulpTubeGeo1 = new THREE.TubeGeometry(pulpCurve1, 32, 0.045, 12, false);
    const pulpTubeGeo2 = new THREE.TubeGeometry(pulpCurve2, 32, 0.045, 12, false);
    const pulpMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444, // vibrant vascular pulp red
      emissive: 0xef4444,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.0,
    });

    const pulpMesh1 = new THREE.Mesh(pulpTubeGeo1, pulpMaterial);
    const pulpMesh2 = new THREE.Mesh(pulpTubeGeo2, pulpMaterial);
    pulpGroup.add(pulpMesh1, pulpMesh2);
    toothGroup.add(pulpGroup);

    // --- Part D: Dual Anatomical Roots (Mesial & Distal) ---
    const rootsGroup = new THREE.Group();

    // Mesial Root curve
    const rootPathL = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, 0.1, 0.05),
      new THREE.Vector3(-0.45, -0.4, 0.03),
      new THREE.Vector3(-0.42, -0.9, 0.0),
      new THREE.Vector3(-0.35, -1.35, -0.05),
    ]);
    // Distal Root curve
    const rootPathR = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.35, 0.1, -0.05),
      new THREE.Vector3(0.45, -0.4, -0.03),
      new THREE.Vector3(0.42, -0.9, 0.0),
      new THREE.Vector3(0.35, -1.35, 0.05),
    ]);

    // Create tapered root geometries using varying radius along tube
    const createTaperedRootGeometry = (path: THREE.CatmullRomCurve3) => {
      const segments = 40;
      const radiusSegments = 16;
      const points = path.getPoints(segments);
      const frames = path.computeFrenetFrames(segments, false);

      const rootGeo = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const normals: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        // Taper from radius 0.28 down to 0.07 at root apex
        const radius = (1 - t * 0.75) * 0.28;
        const point = points[i];
        const normal = frames.normals[i];
        const binormal = frames.binormals[i];

        for (let j = 0; j <= radiusSegments; j++) {
          const v = (j / radiusSegments) * Math.PI * 2;
          const sin = Math.sin(v);
          const cos = -Math.cos(v);

          const normalVec = new THREE.Vector3()
            .copy(normal)
            .multiplyScalar(cos)
            .addScaledVector(binormal, sin)
            .normalize();

          const vertex = new THREE.Vector3()
            .copy(point)
            .addScaledVector(normalVec, radius);

          vertices.push(vertex.x, vertex.y, vertex.z);
          normals.push(normalVec.x, normalVec.y, normalVec.z);
          uvs.push(j / radiusSegments, t);
        }
      }

      for (let i = 0; i < segments; i++) {
        for (let j = 0; j < radiusSegments; j++) {
          const a = i * (radiusSegments + 1) + j;
          const b = (i + 1) * (radiusSegments + 1) + j;
          const c = (i + 1) * (radiusSegments + 1) + (j + 1);
          const d = i * (radiusSegments + 1) + (j + 1);

          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      rootGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      rootGeo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      rootGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      rootGeo.setIndex(indices);
      rootGeo.computeVertexNormals();
      return rootGeo;
    };

    const rootGeoL = createTaperedRootGeometry(rootPathL);
    const rootGeoR = createTaperedRootGeometry(rootPathR);

    const rootMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5efe6, // smooth dentinal root bone tone
      roughness: 0.4,
      metalness: 0.02,
    });

    const rootMeshL = new THREE.Mesh(rootGeoL, rootMaterial);
    const rootMeshR = new THREE.Mesh(rootGeoR, rootMaterial);
    rootMeshL.castShadow = true;
    rootMeshR.castShadow = true;
    rootsGroup.add(rootMeshL, rootMeshR);

    // Root bifurcation bridge
    const bifurcationGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.28, 24);
    const bifurcationMesh = new THREE.Mesh(bifurcationGeo, rootMaterial);
    bifurcationMesh.position.set(0, 0.02, 0);
    rootsGroup.add(bifurcationMesh);

    toothGroup.add(rootsGroup);

    // --- Part E: Healthy Gingiva / Gum Contour Cushion ---
    const gumsShape = new THREE.Shape();
    gumsShape.absarc(0, 0, 1.15, 0, Math.PI * 2, false);
    const gumsExtrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.18,
      bevelThickness: 0.15,
    };
    const gumsGeo = new THREE.ExtrudeGeometry(gumsShape, gumsExtrudeSettings);
    gumsGeo.rotateX(Math.PI / 2);
    gumsGeo.computeVertexNormals();

    const gumsMaterial = new THREE.MeshStandardMaterial({
      color: 0xf472b6, // healthy gentle rose-pink gingiva
      roughness: 0.55,
      metalness: 0.0,
      transparent: true,
      opacity: 0.88,
    });
    const gumsMesh = new THREE.Mesh(gumsGeo, gumsMaterial);
    gumsMesh.position.set(0, -0.05, 0);
    gumsMesh.receiveShadow = true;
    toothGroup.add(gumsMesh);

    // --- Part F: Soft Contact Shadow Grounding Disc ---
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.12)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.65;
    scene.add(shadowMesh);

    // Store references
    const clock = new THREE.Clock();
    sceneRef.current = {
      renderer,
      scene,
      camera,
      toothGroup,
      enamelMesh,
      dentinMesh,
      pulpGroup,
      rootsGroup,
      gumsMesh,
      clock,
    };

    // Pre-warm renderer pipeline
    renderer.compile(scene, camera);

    // Render loop
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Silky smooth rotation interpolation with damping
      if (isRotating && !isDragging) {
        _targetRotation.x += 0.35 * delta;
        _targetRotation.y = Math.sin(elapsed * 0.8) * 0.12;
      }

      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 8, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 8, delta);

      if (toothGroup) {
        toothGroup.rotation.y = _currentRotation.x;
        toothGroup.rotation.x = _currentRotation.y;
        // Subtle floating breathing effect
        toothGroup.position.y = -0.15 + Math.sin(elapsed * 1.5) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();
    sceneRef.current.animationId = animationId;

    // Resize observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      crownGeometry.dispose();
      enamelMaterial.dispose();
      dentinGeometry.dispose();
      dentinMaterial.dispose();
      pulpTubeGeo1.dispose();
      pulpTubeGeo2.dispose();
      pulpMaterial.dispose();
      rootGeoL.dispose();
      rootGeoR.dispose();
      rootMaterial.dispose();
      bifurcationGeo.dispose();
      gumsGeo.dispose();
      gumsMaterial.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      container.replaceChildren();
    };
  }, []);

  // Update visual mode
  useEffect(() => {
    const { enamelMesh, dentinMesh, pulpGroup, gumsMesh } = sceneRef.current;
    if (!enamelMesh || !dentinMesh || !pulpGroup || !gumsMesh) return;

    const enamelMat = enamelMesh.material as THREE.MeshPhysicalMaterial;
    const dentinMat = dentinMesh.material as THREE.MeshStandardMaterial;
    const gumsMat = gumsMesh.material as THREE.MeshStandardMaterial;
    const pulpMeshes = pulpGroup.children as THREE.Mesh[];

    if (activeLayer === 'enamel') {
      enamelMat.transmission = 0.12;
      enamelMat.opacity = 1.0;
      enamelMat.roughness = 0.14;
      dentinMat.opacity = 0.0;
      dentinMat.transparent = true;
      gumsMat.opacity = 0.88;
      pulpMeshes.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.0;
      });
    } else if (activeLayer === 'anatomy') {
      // Anatomical inspection with translucent enamel to view dentin and pulp chamber
      enamelMat.transmission = 0.85;
      enamelMat.opacity = 0.45;
      enamelMat.roughness = 0.05;
      dentinMat.opacity = 0.85;
      dentinMat.transparent = true;
      gumsMat.opacity = 0.75;
      pulpMeshes.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.opacity = 1.0;
      });
    } else if (activeLayer === 'xray') {
      // High-contrast internal root & endodontic path visualization
      enamelMat.transmission = 0.95;
      enamelMat.opacity = 0.25;
      dentinMat.opacity = 0.35;
      gumsMat.opacity = 0.35;
      pulpMeshes.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.opacity = 1.0;
        mat.emissiveIntensity = 0.8;
      });
    }
  }, [activeLayer]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;
    pointerStart.current = { x: e.clientX, y: e.clientY };

    _targetRotation.x += dx * 0.01;
    _targetRotation.y = Math.max(-0.5, Math.min(0.5, _targetRotation.y + dy * 0.008));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    _targetRotation.x = 0;
    _targetRotation.y = 0;
    setIsRotating(true);
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full h-full min-h-[420px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
        aria-label="Interactive 3D Tooth model showing crown, roots, and anatomy"
      />

      {/* Floating Anatomical Hotspot Tooltips */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between pointer-events-none gap-2">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/80 text-xs font-medium text-slate-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
          <span>Interactive 3D Crown & Root System</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              isRotating
                ? 'bg-teal-50 text-teal-700 border border-teal-200'
                : 'bg-white/90 text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
            title="Toggle continuous rotation"
          >
            {isRotating ? 'Pause Spin' : 'Auto Spin'}
          </button>
          <button
            onClick={resetView}
            className="p-1 text-slate-600 hover:text-slate-900 bg-white/90 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
            title="Reset tooth orientation"
            aria-label="Reset orientation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ergonomic Bottom Viewport Dock for Tooth Exploration */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[440px] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-2.5 shadow-lg shadow-slate-900/5">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase pl-1">
            Visual Layer
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveLayer('enamel')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                activeLayer === 'enamel'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-400" />
                Enamel
              </span>
            </button>
            <button
              onClick={() => setActiveLayer('anatomy')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                activeLayer === 'anatomy'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" />
                Anatomy
              </span>
            </button>
            <button
              onClick={() => setActiveLayer('xray')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                activeLayer === 'xray'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-sky-400" />
                Root Canal
              </span>
            </button>
          </div>
        </div>

        {/* Anatomical Details Summary */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="truncate pr-2">
            {activeLayer === 'enamel' && 'Polished Hydroxyapatite Crown & Gingiva'}
            {activeLayer === 'anatomy' && 'Visible Dentin Core & Neural Pulp Chamber'}
            {activeLayer === 'xray' && 'Endodontic Root Canals & Dual Apex Paths'}
          </span>
          {onExploreServices && (
            <button
              onClick={onExploreServices}
              className="text-teal-700 hover:text-teal-900 font-semibold text-xs whitespace-nowrap shrink-0 hover:underline"
            >
              Related Care →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
