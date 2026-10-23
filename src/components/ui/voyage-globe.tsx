import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────────────
   WIREFRAME PLANET — ported from Website-mock-1 (PlanetScene)
   A dark core with a latitude/longitude wireframe, three hot meridians,
   a fresnel atmosphere shell, orbital rings and depth particles.
   `progress` (0 → 1, driven by the section's pinned scroll) scales the
   planet toward the camera so the voyage pulls you through it.
   ────────────────────────────────────────────────────────────────────────── */

const RADIUS = 2.7;

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-(modelViewMatrix * vec4(position, 1.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uPink;
  uniform vec3 uViolet;
  uniform float uBoost;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.6);
    float vertical = clamp(normalize(vPosition).y * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(uPink, uViolet, smoothstep(0.15, 0.95, vertical));
    gl_FragColor = vec4(color, fresnel * 0.72 * uBoost);
  }
`;

const coreFragmentShader = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPosition;
  void main() {
    float vertical = normalize(vPosition).y * 0.5 + 0.5;
    vec3 color = mix(uBottom, uTop, smoothstep(0.1, 0.95, vertical));
    float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.4);
    color += uRim * rim * 0.55;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function buildWireGeometry(radius: number) {
  const positions: number[] = [];
  const latBands = 14;
  const lonBands = 28;
  const segments = 96;

  for (let i = 1; i < latBands; i += 1) {
    const phi = (Math.PI * i) / latBands;
    const y = Math.cos(phi) * radius;
    const r = Math.sin(phi) * radius;
    for (let j = 0; j < segments; j += 1) {
      const a1 = (j / segments) * Math.PI * 2;
      const a2 = ((j + 1) / segments) * Math.PI * 2;
      positions.push(Math.cos(a1) * r, y, Math.sin(a1) * r, Math.cos(a2) * r, y, Math.sin(a2) * r);
    }
  }

  const lonSegments = 48;
  for (let i = 0; i < lonBands; i += 1) {
    const theta = (i / lonBands) * Math.PI * 2;
    for (let j = 0; j < lonSegments; j += 1) {
      const p1 = (Math.PI * j) / lonSegments;
      const p2 = (Math.PI * (j + 1)) / lonSegments;
      positions.push(
        Math.sin(p1) * Math.cos(theta) * radius,
        Math.cos(p1) * radius,
        Math.sin(p1) * Math.sin(theta) * radius,
        Math.sin(p2) * Math.cos(theta) * radius,
        Math.cos(p2) * radius,
        Math.sin(p2) * Math.sin(theta) * radius,
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

function buildRing(radius: number, color: number, opacity: number) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(220).map((p) => new THREE.Vector3(p.x, 0, p.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.LineLoop(geometry, material);
}

function buildStars(
  count: number,
  inner: number,
  outer: number,
  size: number,
  color: number,
  opacity: number,
) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = inner + Math.pow(Math.random(), 1.7) * (outer - inner);
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.cos(phi) * r;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    size,
    color,
    transparent: true,
    opacity,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geometry, material);
}

export function VoyageGlobe({ progress }: { progress: { current: number } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setFailed(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    camera.position.set(0, 0.1, 12);
    camera.lookAt(0, 0, 0);

    const planet = new THREE.Group();
    planet.position.set(0, -0.15, 0);
    scene.add(planet);

    const disposables: Array<{ dispose: () => void }> = [];

    // Dark core — hides back-facing wireframe, gives the limb a body.
    const coreGeometry = new THREE.SphereGeometry(RADIUS * 0.992, 64, 48);
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: coreFragmentShader,
      uniforms: {
        uTop: { value: new THREE.Color("#2a1240") },
        uBottom: { value: new THREE.Color("#0a0711") },
        uRim: { value: new THREE.Color("#ff1d8e") },
      },
    });
    planet.add(new THREE.Mesh(coreGeometry, coreMaterial));
    disposables.push(coreGeometry, coreMaterial);

    // Latitude + longitude wireframe
    const wireGeometry = buildWireGeometry(RADIUS * 1.001);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0xc9a8e8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    planet.add(new THREE.LineSegments(wireGeometry, wireMaterial));
    disposables.push(wireGeometry, wireMaterial);

    // Atmospheric fresnel shell
    const atmosphereGeometry = new THREE.SphereGeometry(RADIUS * 1.16, 64, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uPink: { value: new THREE.Color("#ff1d8e") },
        uViolet: { value: new THREE.Color("#4426e0") },
        uBoost: { value: 1 },
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    planet.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));
    disposables.push(atmosphereGeometry, atmosphereMaterial);

    /* Three concentric orbits in a single plane — one ring system, tilted as a
       whole. Sharing the tilt is what keeps it symmetric: separate tilts read
       as stray arcs crossing the sphere instead of a ring around it. */
    const ringGroup = new THREE.Group();
    const ringA = buildRing(RADIUS * 1.34, 0xff1d8e, 0.5);
    const ringB = buildRing(RADIUS * 1.58, 0xa632e0, 0.26);
    const ringC = buildRing(RADIUS * 1.82, 0x4426e0, 0.14);
    ringGroup.add(ringA, ringB, ringC);
    ringGroup.rotation.set(1.44, 0, 0.16);
    planet.add(ringGroup);
    [ringA, ringB, ringC].forEach((ring) =>
      disposables.push(ring.geometry, ring.material as THREE.Material),
    );

    // Depth particles
    const starCount = isMobile ? 160 : 560;
    const stars = buildStars(starCount, RADIUS * 1.35, 10, isMobile ? 0.055 : 0.045, 0xf8f7fc, 0.5);
    const sparks = buildStars(
      Math.round(starCount * 0.18),
      RADIUS * 1.3,
      6.5,
      0.06,
      0xff4d94,
      0.75,
    );
    planet.add(stars, sparks);
    disposables.push(stars.geometry, stars.material, sparks.geometry, sparks.material);

    /* Fit the globe to the narrower viewport axis so the whole sphere — limb,
       rings and atmosphere — stays in frame on phones as well as desktops. */
    /* The limb sits just under the section's top edge, so the planet reads as
       rising out of the section above rather than starting inside its own box. */
    let fitZ = 13;
    let baseY = -0.2;
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      const aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      const halfFov = Math.tan((camera.fov * Math.PI) / 360);
      fitZ = Math.max(9.5, (RADIUS * 2) / (0.88 * 2 * halfFov * Math.min(1, aspect)));
      baseY = fitZ * halfFov * 0.8 - RADIUS;
      renderer.setSize(width, height, false);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let visible = true;
    let raf = 0;
    let elapsed = 0;
    let last = performance.now();
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let smooth = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduced && finePointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

    const atmosphereBoost = atmosphereMaterial.uniforms.uBoost;

    const render = (delta: number) => {
      elapsed += delta;
      // Ease the scroll-driven progress so tall scroll jumps still glide.
      smooth += (progress.current - smooth) * 0.09;

      eased.x += (pointer.x - eased.x) * 0.045;
      eased.y += (pointer.y - eased.y) * 0.045;

      planet.rotation.y += delta * (0.05 + smooth * 0.55);
      planet.rotation.z = Math.sin(elapsed * 0.16) * 0.03;

      // The voyage: the planet swells toward the lens as the pin scrubs.
      planet.scale.setScalar(1 + smooth * 0.55);
      planet.position.y = baseY - smooth * 0.3;

      ringGroup.rotation.z = Math.sin(elapsed * 0.12) * 0.035 + smooth * 0.4;
      ringGroup.rotation.y = smooth * 0.5;

      stars.scale.setScalar(1 + smooth * 0.6);
      sparks.scale.setScalar(1 + smooth * 0.9);
      stars.rotation.y -= delta * 0.012;
      sparks.rotation.y += delta * 0.018;
      atmosphereBoost.value = 1 + smooth * 1.1;

      camera.position.z = fitZ - smooth * 1.6;
      camera.position.x = eased.x * 0.38;
      camera.position.y = 0.1 - eased.y * 0.22 + smooth * 0.25;
      camera.lookAt(0, smooth * 0.3, 0);

      renderer.render(scene, camera);
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      render(delta);
    };

    // Paint one frame up front: an occluded or backgrounded tab may never
    // deliver a rAF tick, and a blank globe is worse than a still one.
    render(0);
    if (!reduced) raf = requestAnimationFrame(animate);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 },
    );
    visibilityObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, [progress]);

  if (failed) return null;

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
