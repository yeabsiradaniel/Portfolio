import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useTheme } from '../../hooks/useTheme';
import { getSceneTokens } from '../../lib/sceneThemes';

/**
 * FluidSphereBackground
 * Ported from a standalone three.js demo (procedural fluid sphere) and adapted
 * as the fixed site-wide background. A MeshPhysicalMaterial sphere is displaced
 * by simplex noise in the vertex shader; clicking the page spawns expanding
 * ripple rings, dragging rotates the sphere. Material presets cross-fade via
 * per-frame lerping. All demo text was removed; controls are a minimal cluster.
 */

const MAX_RIPPLES = 5;

const materialPresets = {
  obsidian: {
    color: new THREE.Color(0x0a0a0a),
    roughness: 0.15,
    metalness: 0.8,
    transmission: 0.0,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    iridescence: 0.0,
    iridescenceIOR: 1.3,
    thickness: 0.0,
  },
  pearl: {
    color: new THREE.Color(0xfffcf0),
    roughness: 0.2,
    metalness: 0.1,
    transmission: 0.0,
    ior: 1.45,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    iridescence: 1.0,
    iridescenceIOR: 1.4,
    thickness: 0.0,
  },
  gold: {
    color: new THREE.Color(0xffd700),
    roughness: 0.2,
    metalness: 1.0,
    transmission: 0.0,
    ior: 1.5,
    clearcoat: 0.2,
    clearcoatRoughness: 0.2,
    iridescence: 0.0,
    iridescenceIOR: 1.3,
    thickness: 0.0,
  },
  glass: {
    color: new THREE.Color(0xffffff),
    roughness: 0.05,
    metalness: 0.1,
    transmission: 1.0,
    // softer lens than the demo (2.5 / 1.5): the hero name stays readable
    // through the sphere instead of being smeared to the rim
    ior: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    iridescence: 0.1,
    iridescenceIOR: 1.1,
    thickness: 0.6,
  },
};

const PRESET_ORDER = ['obsidian', 'pearl', 'gold', 'glass'];

const swatchStyles = {
  obsidian: { background: 'linear-gradient(135deg, #2a2a2a, #000)' },
  pearl: { background: 'linear-gradient(135deg, #ffffff, #d8d2c4)' },
  gold: { background: 'linear-gradient(135deg, #ffe680, #b8860b)' },
  glass: { background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(160,200,255,0.35))' },
};

const FluidSphereBackground = ({ renderName = true }) => {
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const { theme, material: activePreset, setMaterial } = useTheme();

  const [autoOn, setAutoOn] = useState(true);
  const [turbOn, setTurbOn] = useState(false);
  // controls belong to the hero scene; hide them once it scrolls away
  const [controlsHidden, setControlsHidden] = useState(false);

  /* ------------------------------ three.js scene ----------------------------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.innerWidth < 1024;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    // Stock scene from the original demo: the blurred studio env IS the
    // background (glass transmission samples it — an off-scene backdrop
    // renders foggy). Light/dark only shifts brightness, never the look.
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    scene.environment = envTexture;
    scene.background = envTexture;
    scene.backgroundBlurriness = 0.8;
    scene.backgroundIntensity = theme === 'dark' ? 0.5 : 1.2;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2.0);
    hemiLight.position.set(0, 5, 0);
    scene.add(hemiLight);

    // The sphere belongs to the hero: it scrolls up with the page while the
    // blurred studio backdrop stays fixed as the site-wide background.
    let targetSphereY = 0;
    const onScroll = () => {
      targetSphereY = window.scrollY * 0.0035;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // lower tessellation on phones; the displacement hides the difference
    const segments = isSmall ? 140 : 300;
    const geometry = new THREE.SphereGeometry(1, segments, segments);

    const ripplePositions = [];
    const rippleTimes = [];
    const rippleIntensities = [];
    // World-space anchors keep each ripple pinned where the user actually
    // clicked while the sphere rotates/scrolls; converted to local space
    // per frame for the shader (5 worldToLocal calls — negligible).
    const rippleAnchors = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      // non-zero init to prevent NaN in GLSL normalize()
      ripplePositions.push(new THREE.Vector3(0, 1, 0));
      rippleTimes.push(-1.0);
      rippleIntensities.push(0.0);
      rippleAnchors.push(new THREE.Vector3(0, 1, 0));
    }

    const uniforms = {
      uTime: { value: 0 },
      uTurbulence: { value: 0 },
      uAutoMode: { value: 0 },
      uRipplePositions: { value: ripplePositions },
      uRippleTimes: { value: rippleTimes },
      uRippleIntensities: { value: rippleIntensities },
    };

    let currentTurbulence = 0.05;
    let targetTurbulence = 0.05;
    let currentAutoMode = 0.05;
    // default: auto fluid ON (glass preset + motion is the site's first
    // impression); reduced-motion users stay still
    let targetAutoMode = reducedMotion ? 0.05 : 1.0;
    let currentRippleIndex = 0;

    const material = new THREE.MeshPhysicalMaterial({
      color: materialPresets.obsidian.color.clone(),
      metalness: materialPresets.obsidian.metalness,
      roughness: materialPresets.obsidian.roughness,
      ior: materialPresets.obsidian.ior,
      transmission: materialPresets.obsidian.transmission,
      thickness: materialPresets.obsidian.thickness,
      clearcoat: materialPresets.obsidian.clearcoat,
      clearcoatRoughness: materialPresets.obsidian.clearcoatRoughness,
      iridescence: materialPresets.obsidian.iridescence,
      iridescenceIOR: materialPresets.obsidian.iridescenceIOR,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uTurbulence = uniforms.uTurbulence;
      shader.uniforms.uAutoMode = uniforms.uAutoMode;
      shader.uniforms.uRipplePositions = uniforms.uRipplePositions;
      shader.uniforms.uRippleTimes = uniforms.uRippleTimes;
      shader.uniforms.uRippleIntensities = uniforms.uRippleIntensities;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>

        uniform float uTime;
        uniform float uTurbulence;
        uniform float uAutoMode;
        uniform vec3 uRipplePositions[5];
        uniform float uRippleTimes[5];
        uniform float uRippleIntensities[5];

        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 = v - i + dot(i, C.xxx) ;
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
            i = mod(i, 289.0 );
            vec4 p = permute( permute( permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 1.0/7.0;
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        float calculateRipples(vec3 pos) {
            float displacement = 0.0;
            for (int i = 0; i < 5; i++) {
                if (uRippleTimes[i] >= 0.0) {
                    float dist = acos(clamp(dot(normalize(pos), normalize(uRipplePositions[i])), -1.0, 1.0));

                    float frequency = 17.0;
                    float speed = 7.0;
                    float expansionSpeed = 1.7;

                    float wave = sin(dist * frequency - uRippleTimes[i] * speed);

                    float currentRadius = uRippleTimes[i] * expansionSpeed;
                    float ringThickness = 0.75;

                    float envelope = exp(-pow(dist - currentRadius, 2.0) / (2.0 * pow(ringThickness / 2.0, 2.0)));

                    float decay = max(0.0, 1.0 - uRippleTimes[i] / 3.0);

                    displacement += wave * envelope * decay * 0.1 * uRippleIntensities[i];
                }
            }
            return displacement;
        }

        float displacement(vec3 pos, float time, float turbulence, float autoMode) {
            float n1 = snoise(pos * 1.2 + time * 0.2) * 0.15;
            float n2 = snoise(pos * 2.5 - time * 0.3) * 0.08;
            float n3 = snoise(pos * 5.0 + time * 0.5) * 0.05 * turbulence;
            float n4 = snoise(pos * 10.0 - time * 0.8) * 0.03 * turbulence;
            float base = sin(time * 0.5) * 0.02;

            float continuousDisp = n1 + n2 + n3 + n4 + base;
            float rippleDisp = calculateRipples(pos);

            return (continuousDisp * autoMode) + rippleDisp;
        }

        vec3 getDisplacedPosition(vec3 pos, float time, float turbulence, float autoMode) {
            float d = displacement(pos, time, turbulence, autoMode);
            return pos + normalize(pos) * d;
        }
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
        vec3 localPosition = position;
        float dispOffset = 0.02;
        vec3 dispTangent = vec3(1.0, 0.0, 0.0);
        vec3 dispBitangent = vec3(0.0, 1.0, 0.0);

        vec3 c1 = cross(normal, vec3(0.0, 0.0, 1.0));
        vec3 c2 = cross(normal, vec3(0.0, 1.0, 0.0));
        if (length(c1) > length(c2)) {
            dispTangent = normalize(c1);
        } else {
            dispTangent = normalize(c2);
        }
        dispBitangent = normalize(cross(normal, dispTangent));

        vec3 p0 = localPosition;
        vec3 p1 = localPosition + dispTangent * dispOffset;
        vec3 p2 = localPosition + dispBitangent * dispOffset;

        vec3 dp0 = getDisplacedPosition(p0, uTime, uTurbulence, uAutoMode);
        vec3 dp1 = getDisplacedPosition(p1, uTime, uTurbulence, uAutoMode);
        vec3 dp2 = getDisplacedPosition(p2, uTime, uTurbulence, uAutoMode);

        vec3 newTangent = dp1 - dp0;
        vec3 newBitangent = dp2 - dp0;

        vec3 objectNormal = normalize(cross(newTangent, newBitangent));
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        vec3 transformed = dp0;
        `
      );
    };

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // phones: shrink the sphere and lift it into the gap between the name
    // and the pitch so it doesn't sit behind the text
    // layout mode is re-evaluated on resize so maximizing / snapping the
    // window switches between the compact and full scene live (no reload)
    let sphereBaseScale = 1;
    let sphereBaseY = 0;
    let nameBaseY = 1.2;
    const applyLayoutMode = () => {
      const small = window.innerWidth < 1024;
      sphereBaseScale = small ? 0.45 : 1;
      sphereBaseY = small ? 0.7 : 0;
      nameBaseY = small ? 1.45 : 1.2;
    };
    applyLayoutMode();

    /* Name plane: the hero title lives inside the scene, sandwiched between
       the studio backdrop and the sphere — the blob occludes it, and glass
       transmission stays intact because the backdrop never left the scene. */
    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 2048;
    nameCanvas.height = 512;
    const nameTexture = new THREE.CanvasTexture(nameCanvas);
    nameTexture.colorSpace = THREE.SRGBColorSpace;
    nameTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    // alphaTest cutout (not transparent:true) is deliberate: three.js only
    // renders OPAQUE objects into the transmission buffer, so a transparent
    // plane would be invisible through the glass material
    const nameMaterial = new THREE.MeshBasicMaterial({
      map: nameTexture,
      alphaTest: 0.5,
      toneMapped: false,
    });
    const namePlane = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), nameMaterial);
    namePlane.position.set(0, nameBaseY, -0.55);
    // The hero name is real DOM now; the in-scene plane only renders when a
    // caller explicitly asks for it (renderName). When off, the mesh is still
    // constructed so layout/disposal paths stay uniform, but it never joins
    // the scene and drawName becomes a no-op.
    if (renderName) scene.add(namePlane);

    let currentTheme = theme;
    let currentMaterial = activePreset;

    const drawName = () => {
      if (!renderName) return;
      const ctx = nameCanvas.getContext('2d');
      ctx.clearRect(0, 0, nameCanvas.width, nameCanvas.height);
      const tokens = getSceneTokens(currentTheme, currentMaterial);
      const grad = ctx.createLinearGradient(0, 0, nameCanvas.width, nameCanvas.height);
      grad.addColorStop(0, `rgb(${tokens.accent.split(' ').join(',')})`);
      grad.addColorStop(1, `rgb(${tokens.accentHover.split(' ').join(',')})`);
      ctx.fillStyle = grad;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const text = 'Yeabsira Daniel';
      let size = 280;
      ctx.font = `700 ${size}px "Space Grotesk", sans-serif`;
      while (ctx.measureText(text).width > 1900 && size > 80) {
        size -= 8;
        ctx.font = `700 ${size}px "Space Grotesk", sans-serif`;
      }
      ctx.fillText(text, nameCanvas.width / 2, nameCanvas.height / 2);
      nameTexture.needsUpdate = true;
    };
    drawName();
    // redraw once the display font actually arrives
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(drawName);
    }

    // narrower viewports shrink the plane so the title never clips
    let namePlaneScale = 1;
    const fitNamePlane = () => {
      namePlaneScale = Math.min(1, camera.aspect / 1.1);
    };
    fitNamePlane();

    /* ------------------------------- interaction ------------------------------ */

    let isDragging = false;
    let hasDragged = false;
    let previousMousePosition = { x: 0, y: 0 };
    const targetRotation = new THREE.Vector3(0, 0, 0);

    const isUiTarget = (e) =>
      e.target.closest('[data-fluid-ui], a, button, input, textarea, select, [role="button"]');

    const onPointerDown = (e) => {
      if (isUiTarget(e)) return;
      isDragging = true;
      hasDragged = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        hasDragged = true;
      }

      targetRotation.y += deltaX * 0.005;
      targetRotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    // Analytic ray-vs-sphere hit: exact enough for a ripple origin and ~10,000x
    // cheaper than raycasting the 180k-triangle mesh, which stalled the main
    // thread for milliseconds on every click. Radius covers the displaced
    // silhouette so bulge clicks still register.
    const clickBounds = new THREE.Sphere(new THREE.Vector3(), 1.15);
    const clickPoint = new THREE.Vector3();
    const anchorTmp = new THREE.Vector3();

    const onClick = (e) => {
      if (hasDragged) return;
      if (isUiTarget(e)) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      sphere.getWorldPosition(clickBounds.center);
      clickBounds.radius = 1.15 * sphere.getWorldScale(anchorTmp).x;

      if (raycaster.ray.intersectSphere(clickBounds, clickPoint)) {
        rippleAnchors[currentRippleIndex].copy(clickPoint);
        uniforms.uRipplePositions.value[currentRippleIndex].copy(
          sphere.worldToLocal(clickPoint.clone())
        );
        uniforms.uRippleTimes.value[currentRippleIndex] = 0.0;
        uniforms.uRippleIntensities.value[currentRippleIndex] = 1.0;

        currentRippleIndex = (currentRippleIndex + 1) % MAX_RIPPLES;
      }
    };

    const onResize = () => {
      applyLayoutMode();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      fitNamePlane();
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);

    /* --------------------------------- animate -------------------------------- */

    let targetMaterialProps = materialPresets[activePreset] || materialPresets.obsidian;
    let targetBackgroundIntensity = theme === 'dark' ? 0.5 : 1.2;
    let lastTime = 0;
    let rafId = null;
    const entranceStart = performance.now();

    const animate = (timeRaw) => {
      rafId = requestAnimationFrame(animate);

      const time = (timeRaw || performance.now()) * 0.001;
      const deltaTime = time - (lastTime || time);
      lastTime = time;

      uniforms.uTime.value = time;

      currentTurbulence = THREE.MathUtils.lerp(currentTurbulence, targetTurbulence, 0.05);
      uniforms.uTurbulence.value = currentTurbulence;

      currentAutoMode = THREE.MathUtils.lerp(currentAutoMode, targetAutoMode, 0.05);
      uniforms.uAutoMode.value = currentAutoMode;

      for (let i = 0; i < MAX_RIPPLES; i++) {
        if (uniforms.uRippleTimes.value[i] >= 0.0) {
          // re-pin the shader anchor to the click's world point as the sphere moves
          uniforms.uRipplePositions.value[i].copy(
            sphere.worldToLocal(anchorTmp.copy(rippleAnchors[i]))
          );
          uniforms.uRippleTimes.value[i] += deltaTime;
          if (uniforms.uRippleTimes.value[i] > 3.0) {
            uniforms.uRippleTimes.value[i] = -1.0;
          }
        }
      }

      const lerpFactor = 0.03;
      material.color.lerp(targetMaterialProps.color, lerpFactor);
      material.roughness = THREE.MathUtils.lerp(material.roughness, targetMaterialProps.roughness, lerpFactor);
      material.metalness = THREE.MathUtils.lerp(material.metalness, targetMaterialProps.metalness, lerpFactor);
      material.transmission = THREE.MathUtils.lerp(material.transmission, targetMaterialProps.transmission, lerpFactor);
      material.ior = THREE.MathUtils.lerp(material.ior, targetMaterialProps.ior, lerpFactor);
      material.clearcoat = THREE.MathUtils.lerp(material.clearcoat, targetMaterialProps.clearcoat, lerpFactor);
      material.clearcoatRoughness = THREE.MathUtils.lerp(material.clearcoatRoughness, targetMaterialProps.clearcoatRoughness, lerpFactor);
      material.iridescence = THREE.MathUtils.lerp(material.iridescence, targetMaterialProps.iridescence, lerpFactor);
      material.iridescenceIOR = THREE.MathUtils.lerp(material.iridescenceIOR, targetMaterialProps.iridescenceIOR, lerpFactor);
      material.thickness = THREE.MathUtils.lerp(material.thickness, targetMaterialProps.thickness, lerpFactor);

      scene.backgroundIntensity = THREE.MathUtils.lerp(
        scene.backgroundIntensity,
        targetBackgroundIntensity,
        0.05
      );

      // entrance: the sphere grows out of the center of the scene
      const entranceT = reducedMotion
        ? 1
        : Math.min(1, ((timeRaw || performance.now()) - entranceStart) / 1200);
      const entranceScale = 1 - Math.pow(1 - entranceT, 3);
      sphere.scale.setScalar(Math.max(entranceScale, 0.0001) * sphereBaseScale);

      // name entrance: settle-in scale, slightly after the sphere starts
      const nameT = reducedMotion
        ? 1
        : Math.max(0, Math.min(1, ((timeRaw || performance.now()) - entranceStart - 700) / 1100));
      namePlane.scale.setScalar(namePlaneScale * (0.85 + 0.15 * nameT));

      // the object travels with the scroll; the backdrop does not
      sphere.position.y = THREE.MathUtils.lerp(sphere.position.y, targetSphereY + sphereBaseY, 0.1);
      // the title rides with the scroll offset (minus the mobile lift)
      namePlane.position.y = nameBaseY + sphere.position.y - sphereBaseY;

      if (!isDragging && currentAutoMode > 0.5) {
        targetRotation.y += 0.002;
        targetRotation.z += 0.001;
      }

      sphere.rotation.y = THREE.MathUtils.lerp(sphere.rotation.y, targetRotation.y, 0.05);
      sphere.rotation.x = THREE.MathUtils.lerp(sphere.rotation.x, targetRotation.x, 0.05);
      sphere.rotation.z = THREE.MathUtils.lerp(sphere.rotation.z, targetRotation.z, 0.05);

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    /* ---------------------------- external controls --------------------------- */

    apiRef.current = {
      setMaterial: (name) => {
        if (materialPresets[name]) {
          targetMaterialProps = materialPresets[name];
          currentMaterial = name;
          drawName();
        }
      },
      setAuto: (on) => {
        targetAutoMode = on ? 1.0 : 0.05;
        if (!on) targetTurbulence = 0.05;
      },
      setTurbulence: (on) => {
        targetTurbulence = on ? 1.0 : 0.05;
      },
      // color mode: same studio, only dimmer in dark mode
      setMode: (mode) => {
        targetBackgroundIntensity = mode === 'dark' ? 0.5 : 1.2;
        currentTheme = mode;
        drawName();
      },
    };

    return () => {
      apiRef.current = null;
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      geometry.dispose();
      material.dispose();
      namePlane.geometry.dispose();
      nameMaterial.dispose();
      nameTexture.dispose();
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------- theme + control wiring --------------------------- */

  // color mode drives backdrop brightness and scene lighting
  useEffect(() => {
    apiRef.current?.setMode(theme);
  }, [theme]);

  // material selection (shared through ThemeProvider) drives the sphere preset
  useEffect(() => {
    apiRef.current?.setMaterial(activePreset);
  }, [activePreset]);

  // fade the controls out once the hero (and the sphere) has scrolled away
  useEffect(() => {
    const onScrollUi = () => setControlsHidden(window.scrollY > window.innerHeight * 0.7);
    onScrollUi();
    window.addEventListener('scroll', onScrollUi, { passive: true });
    return () => window.removeEventListener('scroll', onScrollUi);
  }, []);

  useEffect(() => {
    apiRef.current?.setAuto(autoOn);
    if (!autoOn) setTurbOn(false);
  }, [autoOn]);

  useEffect(() => {
    apiRef.current?.setTurbulence(turbOn);
  }, [turbOn]);

  const pickPreset = (name) => {
    setMaterial(name);
  };

  /* ------------------------------- subtle UI --------------------------------- */

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />

      {/* controls: anchored to the scene, bottom-center beneath the sphere.
          Must stay above content (z-40) or page elements would swallow clicks. */}
      <div
        data-fluid-ui
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-2.5 py-1.5 rounded-full glass-card transition-all duration-300 ${
          controlsHidden
            ? 'opacity-0 pointer-events-none translate-y-2'
            : 'opacity-40 hover:opacity-100 focus-within:opacity-100'
        }`}
      >
        {PRESET_ORDER.map((name) => (
          <button
            key={name}
            type="button"
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            aria-label={`Material: ${name}`}
            onClick={() => pickPreset(name)}
            className={`w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/25 transition-transform duration-200 hover:scale-125 focus:outline-none ${
              activePreset === name ? 'ring-2 ring-offset-1 ring-gray-500 dark:ring-gray-300 dark:ring-offset-black scale-110' : ''
            }`}
            style={swatchStyles[name]}
          />
        ))}

        <span className="w-px h-3.5 bg-black/15 dark:bg-white/15 mx-0.5" />

        {/* auto fluid toggle */}
        <button
          type="button"
          title="Auto fluid"
          aria-label="Toggle auto fluid motion"
          aria-pressed={autoOn}
          onClick={() => setAutoOn((v) => !v)}
          className={`relative w-6 h-3.5 rounded-full transition-colors duration-300 focus:outline-none ${
            autoOn ? 'bg-gray-700 dark:bg-gray-300' : 'bg-black/15 dark:bg-white/15'
          }`}
        >
          <span
            className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white dark:bg-black shadow transition-transform duration-300 ${
              autoOn ? 'translate-x-3' : 'translate-x-0.5'
            }`}
          />
        </button>

        {/* turbulence toggle, only meaningful while auto fluid is on */}
        <button
          type="button"
          title="Turbulence"
          aria-label="Toggle turbulence"
          aria-pressed={turbOn}
          disabled={!autoOn}
          onClick={() => setTurbOn((v) => !v)}
          className={`relative w-6 h-3.5 rounded-full transition-colors duration-300 focus:outline-none ${
            !autoOn ? 'opacity-30 cursor-not-allowed' : ''
          } ${turbOn ? 'bg-gray-700 dark:bg-gray-300' : 'bg-black/15 dark:bg-white/15'}`}
        >
          <span
            className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white dark:bg-black shadow transition-transform duration-300 ${
              turbOn ? 'translate-x-3' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default FluidSphereBackground;
