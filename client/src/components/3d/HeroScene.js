import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const mouse = { x: 0, y: 0 };

const HOLD = 4.5; // seconds a shape stays fully formed
const CYCLE = HOLD + 1.8; // hold + morph window before the next target kicks in

/* ---------------------------------- shapes --------------------------------- */

// Evenly distributed points on a sphere via the golden-angle spiral
function makeSphere(count, radius) {
  const pts = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts[i * 3] = Math.cos(theta) * r * radius;
    pts[i * 3 + 1] = y * radius;
    pts[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return pts;
}

// Point at parameter t (0..1) along a rounded-rect perimeter, centered at origin
function roundedRectPoint(t, w, h, r) {
  const sw = w - 2 * r; // straight width
  const sh = h - 2 * r; // straight height
  const arc = (Math.PI / 2) * r;
  const total = 2 * sw + 2 * sh + 4 * arc;
  let d = t * total;

  const hw = w / 2;
  const hh = h / 2;

  // top edge, left to right
  if (d < sw) return [-sw / 2 + d, hh];
  d -= sw;
  // top-right arc
  if (d < arc) {
    const a = Math.PI / 2 - d / r;
    return [sw / 2 + Math.cos(a) * r, sh / 2 + Math.sin(a) * r];
  }
  d -= arc;
  // right edge, top to bottom
  if (d < sh) return [hw, sh / 2 - d];
  d -= sh;
  // bottom-right arc
  if (d < arc) {
    const a = -d / r;
    return [sw / 2 + Math.cos(a) * r, -sh / 2 + Math.sin(a) * r];
  }
  d -= arc;
  // bottom edge, right to left
  if (d < sw) return [sw / 2 - d, -hh];
  d -= sw;
  // bottom-left arc
  if (d < arc) {
    const a = -Math.PI / 2 - d / r;
    return [-sw / 2 + Math.cos(a) * r, -sh / 2 + Math.sin(a) * r];
  }
  d -= arc;
  // left edge, bottom to top
  if (d < sh) return [-hw, -sh / 2 + d];
  d -= sh;
  // top-left arc
  const a = Math.PI - d / r;
  return [-sw / 2 + Math.cos(a) * r, sh / 2 + Math.sin(a) * r];
}

// A phone silhouette: body outline, screen border, camera notch, home bar,
// and a sparse scatter of "UI" dots on the screen
function makePhone(count) {
  const pts = new Float32Array(count * 3);
  const W = 1.8;
  const H = 3.5;
  let i = 0;

  const set = (idx, x, y, z) => {
    pts[idx * 3] = x;
    pts[idx * 3 + 1] = y;
    pts[idx * 3 + 2] = z;
  };

  const nOutline = Math.floor(count * 0.48);
  const nScreen = Math.floor(count * 0.28);
  const nNotch = Math.floor(count * 0.07);
  const nBar = Math.floor(count * 0.06);

  // body outline, doubled into a front and back slab for a hint of depth
  for (let k = 0; k < nOutline; k++, i++) {
    const [x, y] = roundedRectPoint(Math.random(), W, H, 0.35);
    const z = (k % 2 === 0 ? 0.07 : -0.07) + (Math.random() - 0.5) * 0.03;
    set(i, x, y, z);
  }
  // screen border
  for (let k = 0; k < nScreen; k++, i++) {
    const [x, y] = roundedRectPoint(Math.random(), W - 0.26, H - 0.42, 0.22);
    set(i, x, y, 0.08 + (Math.random() - 0.5) * 0.02);
  }
  // camera dot + speaker line near the top
  for (let k = 0; k < nNotch; k++, i++) {
    if (k % 3 === 0) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.06;
      set(i, -0.32 + Math.cos(a) * r, H / 2 - 0.38 + Math.sin(a) * r, 0.09);
    } else {
      set(i, (Math.random() - 0.5) * 0.45 + 0.08, H / 2 - 0.38 + (Math.random() - 0.5) * 0.02, 0.09);
    }
  }
  // home bar
  for (let k = 0; k < nBar; k++, i++) {
    set(i, (Math.random() - 0.5) * 0.6, -H / 2 + 0.32 + (Math.random() - 0.5) * 0.02, 0.09);
  }
  // sparse glowing dots inside the screen
  for (; i < count; i++) {
    set(
      i,
      (Math.random() - 0.5) * (W - 0.5),
      (Math.random() - 0.5) * (H - 0.9),
      0.05 + Math.random() * 0.04
    );
  }
  return pts;
}

// Soft gaussian nebula, slightly flattened and stretched wide
function makeNebula(count) {
  const pts = new Float32Array(count * 3);
  const gauss = () => {
    const u = Math.max(Math.random(), 1e-9);
    const v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  for (let i = 0; i < count; i++) {
    let x = gauss() * 1.15;
    let y = gauss() * 0.75;
    let z = gauss() * 0.6;
    // gentle swirl so it reads as a galaxy rather than static noise
    const d = Math.sqrt(x * x + y * y);
    const a = Math.atan2(y, x) + d * 0.45;
    x = Math.cos(a) * d;
    y = Math.sin(a) * d * 0.8;
    const len = Math.sqrt(x * x + y * y + z * z);
    if (len > 3) {
      x *= 3 / len;
      y *= 3 / len;
      z *= 3 / len;
    }
    pts[i * 3] = x;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = z;
  }
  return pts;
}

/* ------------------------------ helper assets ------------------------------ */

function makeSpriteTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Nearest-neighbor pairs computed once from the sphere layout. The same index
// pairs are reused during morphs so the lines stretch and deform with the cloud.
function makeLinePairs(spherePts, count, maxLines) {
  const degree = new Uint8Array(count);
  const pairs = [];
  const seen = new Set();
  for (let i = 0; i < count; i++) {
    let n1 = -1;
    let n2 = -1;
    let d1 = Infinity;
    let d2 = Infinity;
    const ax = spherePts[i * 3];
    const ay = spherePts[i * 3 + 1];
    const az = spherePts[i * 3 + 2];
    for (let j = 0; j < count; j++) {
      if (j === i) continue;
      const dx = spherePts[j * 3] - ax;
      const dy = spherePts[j * 3 + 1] - ay;
      const dz = spherePts[j * 3 + 2] - az;
      const d = dx * dx + dy * dy + dz * dz;
      if (d < d1) {
        d2 = d1;
        n2 = n1;
        d1 = d;
        n1 = j;
      } else if (d < d2) {
        d2 = d;
        n2 = j;
      }
    }
    for (const j of [n1, n2]) {
      if (j < 0 || degree[i] >= 3 || degree[j] >= 3) continue;
      const key = i < j ? i * count + j : j * count + i;
      if (seen.has(key)) continue;
      seen.add(key);
      degree[i]++;
      degree[j]++;
      pairs.push([i, j]);
      if (pairs.length >= maxLines) return pairs;
    }
  }
  return pairs;
}

/* ------------------------------- constellation ----------------------------- */

const Constellation = ({ accentColor, wireColor, reducedMotion, count, maxLines }) => {
  const groupRef = useRef();
  const pointsGeoRef = useRef();
  const linesGeoRef = useRef();
  const { viewport } = useThree();

  const shapes = useMemo(
    () => [makeSphere(count, 1.85), makePhone(count), makeNebula(count)],
    [count]
  );

  const pairs = useMemo(() => makeLinePairs(shapes[0], count, maxLines), [shapes, count, maxLines]);

  const sprite = useMemo(() => makeSpriteTexture(), []);

  // working buffers
  const sim = useMemo(() => {
    return {
      positions: shapes[0].slice(), // logical positions chasing the target
      display: new Float32Array(count * 3), // positions + repulsion + breathing
      offsets: new Float32Array(count * 3), // decaying mouse repulsion
      lambdas: Float32Array.from({ length: count }, () => 1.2 + Math.random() * 2),
      sizes: Float32Array.from({ length: count }, () => 0.5 + Math.random()),
      linePositions: new Float32Array(pairs.length * 6),
      tmp: new THREE.Vector3(),
      yAxis: new THREE.Vector3(0, 1, 0),
    };
  }, [shapes, pairs, count]);

  // per-particle colors blending the two theme colors
  const colors = useMemo(() => {
    const a = new THREE.Color(accentColor);
    const b = new THREE.Color(wireColor);
    const arr = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // deterministic mix so colors do not flicker between theme switches
      const t = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      c.copy(a).lerp(b, Math.abs(t) * 0.85);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [accentColor, wireColor, count]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.getElapsedTime();

    // which shape are we holding / heading toward
    let target;
    if (reducedMotion) {
      target = shapes[0];
    } else {
      const idx = Math.floor(t / CYCLE) % shapes.length;
      const tt = t % CYCLE;
      target = tt < HOLD ? shapes[idx] : shapes[(idx + 1) % shapes.length];
    }

    const { positions, display, offsets, lambdas, linePositions, tmp, yAxis } = sim;

    // group rotation + mouse tilt
    const ry = t * 0.08 + mouse.x * 0.35;
    if (groupRef.current) {
      groupRef.current.rotation.y = ry;
      groupRef.current.rotation.x = mouse.y * 0.18 + Math.sin(t * 0.1) * 0.04;
    }

    // mouse position in group-local space (approximate, Y-rotation only)
    tmp.set((mouse.x * viewport.width) / 2, (-mouse.y * viewport.height) / 2, 0.5);
    tmp.applyAxisAngle(yAxis, -ry);
    const mx = tmp.x;
    const my = tmp.y;
    const mz = tmp.z;

    const breathe = 1 + Math.sin(t * 0.8) * 0.025;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // organic swarm: each particle chases the target at its own speed
      const k = 1 - Math.exp(-lambdas[i] * dt);
      positions[ix] += (target[ix] - positions[ix]) * k;
      positions[ix + 1] += (target[ix + 1] - positions[ix + 1]) * k;
      positions[ix + 2] += (target[ix + 2] - positions[ix + 2]) * k;

      // mouse repulsion with decay
      offsets[ix] *= 0.9;
      offsets[ix + 1] *= 0.9;
      offsets[ix + 2] *= 0.9;
      const dx = positions[ix] - mx;
      const dy = positions[ix + 1] - my;
      const dz = positions[ix + 2] - mz;
      const distSq = dx * dx + dy * dy + dz * dz;
      if (distSq < 1.1 && distSq > 1e-6) {
        const dist = Math.sqrt(distSq);
        const force = ((1.05 - dist) / 1.05) * 0.05;
        offsets[ix] += (dx / dist) * force;
        offsets[ix + 1] += (dy / dist) * force;
        offsets[ix + 2] += (dz / dist) * force;
      }

      display[ix] = (positions[ix] + offsets[ix]) * breathe;
      display[ix + 1] = (positions[ix + 1] + offsets[ix + 1]) * breathe;
      display[ix + 2] = (positions[ix + 2] + offsets[ix + 2]) * breathe;
    }

    // stretch the constellation lines between the same particles
    for (let p = 0; p < pairs.length; p++) {
      const [a, b] = pairs[p];
      const o = p * 6;
      linePositions[o] = display[a * 3];
      linePositions[o + 1] = display[a * 3 + 1];
      linePositions[o + 2] = display[a * 3 + 2];
      linePositions[o + 3] = display[b * 3];
      linePositions[o + 4] = display[b * 3 + 1];
      linePositions[o + 5] = display[b * 3 + 2];
    }

    if (pointsGeoRef.current) {
      pointsGeoRef.current.attributes.position.needsUpdate = true;
    }
    if (linesGeoRef.current) {
      linesGeoRef.current.attributes.position.needsUpdate = true;
    }
  });

  // shrink to fit narrow viewports, with a floor so phones still get presence
  const scale = Math.max(0.55, Math.min(1, viewport.width / 6));

  return (
    <group ref={groupRef} scale={scale}>
      <points frustumCulled={false}>
        <bufferGeometry ref={pointsGeoRef}>
          <bufferAttribute attach="attributes-position" args={[sim.display, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          map={sprite}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={linesGeoRef}>
          <bufferAttribute attach="attributes-position" args={[sim.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={wireColor}
          transparent
          opacity={0.13}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

/* ---------------------------------- canvas --------------------------------- */

const HeroScene = ({ isDarkMode, mobile = false }) => {
  const containerRef = useRef(null);
  const accentColor = isDarkMode ? '#2dd4bf' : '#3b82f6';
  const wireColor = isDarkMode ? '#34d399' : '#a855f7';

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    const el = containerRef.current;
    const handleMouse = (e) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouse.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      mouse.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
    };
    const handleTouch = (e) => {
      const t = e.touches[0];
      if (!t || !el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouse.x = Math.max(-1, Math.min(1, (t.clientX - cx) / (rect.width / 2)));
      mouse.y = Math.max(-1, Math.min(1, (t.clientY - cy) / (rect.height / 2)));
    };
    const handleOrientation = (e) => {
      if (e.gamma == null || e.beta == null) return;
      mouse.x = Math.max(-1, Math.min(1, e.gamma / 25));
      mouse.y = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    if (mobile) {
      window.addEventListener('touchmove', handleTouch, { passive: true });
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [mobile]);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ minHeight: '300px' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={mobile ? [1, 1.25] : [1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Constellation
          accentColor={accentColor}
          wireColor={wireColor}
          reducedMotion={reducedMotion}
          count={mobile ? 380 : 900}
          maxLines={mobile ? 240 : 650}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
