import * as THREE from 'three';

/**
 * Procedural Realistic Human Molar Tooth Model
 * Composed of:
 * 1. Anatomical Crown with 4 cusps (Mesiobuccal, Distobuccal, Mesiolingual, Distolingual) & occlusal fissures
 * 2. Cervical neck (Cementoenamel Junction)
 * 3. Bifurcated dual roots (Mesial & Distal roots with natural curves)
 * 4. Internal Dentin core & Pulp cavity (visible in anatomy mode)
 * 5. Digital 3D Intraoral Scan Laser Ring (visible in scan mode)
 */

export interface ToothModelComponents {
  rootGroup: THREE.Group;
  enamelMesh: THREE.Mesh;
  rootsMesh: THREE.Mesh;
  dentinMesh: THREE.Mesh;
  pulpMesh: THREE.Group;
  scanRingMesh: THREE.Mesh;
  enamelMaterial: THREE.MeshPhysicalMaterial;
  rootsMaterial: THREE.MeshStandardMaterial;
  dentinMaterial: THREE.MeshStandardMaterial;
  pulpMaterial: THREE.MeshStandardMaterial;
  scanMaterial: THREE.MeshBasicMaterial;
}

/**
 * Creates high-fidelity anatomical molar crown geometry
 */
function createMolarCrownGeometry(): THREE.BufferGeometry {
  const radialSegments = 48;
  const heightSegments = 32;
  const crownHeight = 1.35;
  const baseRadius = 0.85;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let yIndex = 0; yIndex <= heightSegments; yIndex++) {
    const v = yIndex / heightSegments;
    const y = (1 - v) * crownHeight; // y from crownHeight down to 0 (cervical line)

    for (let xIndex = 0; xIndex <= radialSegments; xIndex++) {
      const u = xIndex / radialSegments;
      const theta = u * Math.PI * 2;

      // Base radius variations to produce a rounded quad molar crown cross-section
      const cos2 = Math.cos(2 * theta);
      const cos4 = Math.cos(4 * theta);
      const sin2 = Math.sin(2 * theta);

      // Slightly wider mesiodistal diameter than buccolingual
      const aspectMod = 1.0 + 0.12 * Math.cos(theta * 2);
      let r = baseRadius * aspectMod;

      // Vertical profile: widest in the middle/upper third, tapering slightly at cervical line (y=0)
      const bulge = Math.sin(v * Math.PI * 0.85 + 0.15) * 0.25;
      r += bulge;

      let finalY = y;

      // Top occlusal surface cusp sculpting (v close to 0)
      if (v < 0.3) {
        const topWeight = Math.pow((0.3 - v) / 0.3, 1.8);
        // 4 distinct cusps: 2 buccal cusps and 2 lingual cusps
        const cuspHeight = (Math.cos(2 * theta) * 0.22 + Math.abs(sin2) * 0.15) * topWeight;
        // Central pit / groove depression
        const centralDepression = -0.28 * topWeight * (1 - Math.min(1, r / 0.9));
        finalY += cuspHeight + centralDepression;
      }

      // Cervical constriction at bottom (v close to 1)
      if (v > 0.85) {
        const cervicalTaper = (v - 0.85) / 0.15;
        r *= 1 - cervicalTaper * 0.18;
      }

      const posX = Math.cos(theta) * r;
      const posZ = Math.sin(theta) * r * 0.92;

      positions.push(posX, finalY, posZ);
      uvs.push(u, v);
    }
  }

  // Generate faces
  for (let y = 0; y < heightSegments; y++) {
    for (let x = 0; x < radialSegments; x++) {
      const a = y * (radialSegments + 1) + x;
      const b = (y + 1) * (radialSegments + 1) + x;
      const c = (y + 1) * (radialSegments + 1) + (x + 1);
      const d = y * (radialSegments + 1) + (x + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // Top occlusal cap
  const centerTopIndex = positions.length / 3;
  positions.push(0, crownHeight - 0.18, 0); // slightly depressed center fossa
  uvs.push(0.5, 0.5);

  const topRowStart = 0;
  for (let x = 0; x < radialSegments; x++) {
    const current = topRowStart + x;
    const next = topRowStart + x + 1;
    indices.push(centerTopIndex, current, next);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates anatomically curved dual root geometry (Mesial & Distal roots)
 */
function createMolarRootsGeometry(): THREE.BufferGeometry {
  const geometries: THREE.BufferGeometry[] = [];

  // Mesial root curve
  const mesialCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.35, 0.05, 0),
    new THREE.Vector3(-0.48, -0.6, 0.08),
    new THREE.Vector3(-0.52, -1.3, 0.12),
    new THREE.Vector3(-0.46, -1.85, 0.05), // tapering apex
  ]);

  // Distal root curve
  const distalCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, 0.05, 0),
    new THREE.Vector3(0.48, -0.6, -0.06),
    new THREE.Vector3(0.53, -1.3, -0.1),
    new THREE.Vector3(0.44, -1.82, -0.04), // tapering apex
  ]);

  const rootGeoMesial = new THREE.TubeGeometry(mesialCurve, 28, 0.32, 18, false);
  const rootGeoDistal = new THREE.TubeGeometry(distalCurve, 28, 0.3, 18, false);

  // Taper the root vertices towards the tip apex
  [rootGeoMesial, rootGeoDistal].forEach((geo) => {
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y < 0) {
        // As y goes from 0 to -1.85, taper radius
        const t = Math.min(1, Math.max(0, -y / 1.85));
        const taper = 1.0 - Math.pow(t, 1.2) * 0.72;
        pos.setX(i, pos.getX(i) * taper);
        pos.setZ(i, pos.getZ(i) * taper);
      }
    }
    geo.computeVertexNormals();
  });

  // Bifurcation bridge between the two roots
  const bridgeGeo = new THREE.CylinderGeometry(0.55, 0.45, 0.4, 24);
  bridgeGeo.translate(0, -0.1, 0);

  // Merge the geometries manually
  return mergeBufferGeometries([rootGeoMesial, rootGeoDistal, bridgeGeo]);
}

/**
 * Creates internal dental pulp chamber geometry
 */
function createPulpGeometry(): THREE.BufferGeometry {
  const mesialCanal = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.2, 0.25, 0),
    new THREE.Vector3(-0.35, -0.5, 0.05),
    new THREE.Vector3(-0.38, -1.2, 0.08),
    new THREE.Vector3(-0.34, -1.65, 0.03),
  ]);

  const distalCanal = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, 0.25, 0),
    new THREE.Vector3(0.35, -0.5, -0.04),
    new THREE.Vector3(0.39, -1.2, -0.07),
    new THREE.Vector3(0.32, -1.62, -0.03),
  ]);

  const mCanalGeo = new THREE.TubeGeometry(mesialCanal, 20, 0.08, 12, false);
  const dCanalGeo = new THREE.TubeGeometry(distalCanal, 20, 0.08, 12, false);
  const chamberGeo = new THREE.SphereGeometry(0.35, 16, 16);
  chamberGeo.scale(1.2, 0.8, 0.9);
  chamberGeo.translate(0, 0.35, 0);

  return mergeBufferGeometries([mCanalGeo, dCanalGeo, chamberGeo]);
}

function mergeBufferGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  let totalVertices = 0;
  let totalIndices = 0;

  for (const g of geos) {
    totalVertices += g.attributes.position.count;
    if (g.index) totalIndices += g.index.count;
  }

  const mergedPos = new Float32Array(totalVertices * 3);
  const mergedNorm = new Float32Array(totalVertices * 3);
  const mergedIndices = new Uint32Array(totalIndices);

  let vertexOffset = 0;
  let indexOffset = 0;

  for (const g of geos) {
    const pos = g.attributes.position;
    const norm = g.attributes.normal;
    const count = pos.count;

    for (let i = 0; i < count * 3; i++) {
      mergedPos[vertexOffset * 3 + i] = pos.array[i];
      if (norm) mergedNorm[vertexOffset * 3 + i] = norm.array[i];
    }

    if (g.index) {
      for (let i = 0; i < g.index.count; i++) {
        mergedIndices[indexOffset + i] = g.index.array[i] + vertexOffset;
      }
      indexOffset += g.index.count;
    }

    vertexOffset += count;
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(mergedPos, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(mergedNorm, 3));
  merged.setIndex(new THREE.BufferAttribute(mergedIndices, 1));
  merged.computeVertexNormals();

  return merged;
}

/**
 * Builds the complete 3D Tooth Model Group with physical dental materials
 */
export function createToothModel(): ToothModelComponents {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'HumanMolarTooth';

  // 1. Enamel Material - realistic clinical pearl white dental enamel
  const enamelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xfbfeff,
    roughness: 0.12,
    metalness: 0.03,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    transmission: 0.22, // Subsurface translucency characteristic of enamel
    ior: 1.63, // Refractive index of human enamel (1.62 - 1.65)
    thickness: 0.8,
    specularIntensity: 0.95,
    specularColor: new THREE.Color(0xffffff),
    sheen: 0.25,
    sheenColor: new THREE.Color(0xeaf7fa),
    transparent: true,
    opacity: 1.0,
  });

  const crownGeo = createMolarCrownGeometry();
  const enamelMesh = new THREE.Mesh(crownGeo, enamelMaterial);
  enamelMesh.castShadow = true;
  enamelMesh.receiveShadow = true;
  enamelMesh.name = 'CrownEnamel';
  rootGroup.add(enamelMesh);

  // 2. Roots Material - slightly warmer ivory cementum with natural texture
  const rootsMaterial = new THREE.MeshStandardMaterial({
    color: 0xf1ebe1,
    roughness: 0.42,
    metalness: 0.04,
  });

  const rootsGeo = createMolarRootsGeometry();
  const rootsMesh = new THREE.Mesh(rootsGeo, rootsMaterial);
  rootsMesh.castShadow = true;
  rootsMesh.receiveShadow = true;
  rootsMesh.name = 'RootsCementum';
  rootGroup.add(rootsMesh);

  // 3. Dentin Mesh (scaled inside crown)
  const dentinGeo = crownGeo.clone();
  dentinGeo.scale(0.82, 0.85, 0.82);
  dentinGeo.translate(0, -0.05, 0);

  const dentinMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5ddaa, // warm golden yellow dentin
    roughness: 0.6,
    metalness: 0.05,
    transparent: true,
    opacity: 0, // hidden initially, revealed in anatomy mode
  });
  const dentinMesh = new THREE.Mesh(dentinGeo, dentinMaterial);
  dentinMesh.name = 'InternalDentin';
  rootGroup.add(dentinMesh);

  // 4. Pulp Cavity Group (vital nerve & blood supply)
  const pulpGroup = new THREE.Group();
  pulpGroup.name = 'PulpVascularGroup';

  const pulpGeo = createPulpGeometry();
  const pulpMaterial = new THREE.MeshStandardMaterial({
    color: 0xd9383a, // rich vascular pulp red
    emissive: 0x550d10,
    roughness: 0.3,
    metalness: 0.1,
    transparent: true,
    opacity: 0, // revealed in anatomy mode
  });
  const pulpMesh = new THREE.Mesh(pulpGeo, pulpMaterial);
  pulpGroup.add(pulpMesh);
  rootGroup.add(pulpGroup);

  // 5. Digital Intraoral Scan Laser Indicator (Torus ring that pulses/travels in scan mode)
  const scanRingGeo = new THREE.TorusGeometry(1.25, 0.025, 16, 64);
  scanRingGeo.rotateX(Math.PI / 2);
  const scanMaterial = new THREE.MeshBasicMaterial({
    color: 0x00bfa5, // Turquoise scan beam
    transparent: true,
    opacity: 0,
    wireframe: false,
  });
  const scanRingMesh = new THREE.Mesh(scanRingGeo, scanMaterial);
  scanRingMesh.position.y = 0.5;
  scanRingMesh.name = 'DigitalScanBeam';
  rootGroup.add(scanRingMesh);

  // Center model pivot at the cervical center
  rootGroup.position.set(0, 0.2, 0);

  return {
    rootGroup,
    enamelMesh,
    rootsMesh,
    dentinMesh,
    pulpMesh: pulpGroup,
    scanRingMesh,
    enamelMaterial,
    rootsMaterial,
    dentinMaterial,
    pulpMaterial,
    scanMaterial,
  };
}
