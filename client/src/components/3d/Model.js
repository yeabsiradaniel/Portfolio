import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme'; // your custom hook

const Model = () => {
  const groupRef = useRef();
  const particlesRef = useRef();
  const clock = useRef(new THREE.Clock());
  const pointer = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const { camera, gl: renderer, scene } = useThree();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Particle material updates with theme
  const particleMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: isDarkMode ? 0x00ffff : 0x2a3a59,
      size: 0.1,
      transparent: true,
      opacity: isDarkMode ? 0.7 : 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }, [isDarkMode]);

  // Pointer listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle geometry setup once
  const particles = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 4 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Animation
  useFrame(() => {
    const elapsedTime = clock.current.getElapsedTime();
    const baseY = elapsedTime * 0.1;

    targetRotation.current.y = baseY + pointer.current.x * 0.5;
    targetRotation.current.x = pointer.current.y * 0.5;

    if (groupRef.current) {
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsedTime * -0.02;
      particlesRef.current.rotation.x = elapsedTime * -0.01;

      // Flicker (only in dark mode)
      if (isDarkMode && Math.random() < 0.01) {
        const hue = Math.random();
        particleMaterial.color.setHSL(hue, 1.0, 0.6);
      } else {
        const targetColor = new THREE.Color(isDarkMode ? 0x00ffff : 0x2a3a59);
        particleMaterial.color.lerp(targetColor, 0.05);
      }
    }
  });

  return (
    <>
      {/* Lighting adjusts with theme */}
      <ambientLight intensity={isDarkMode ? 0.3 : 0.5} />
      <directionalLight
        position={[-2, 4, 5]}
        color={isDarkMode ? 0x00ffff : 0xffffff}
        intensity={isDarkMode ? 1 : 0.5}
      />
      <pointLight
        position={[5, -2, 4]}
        color={isDarkMode ? 0xff8888 : 0xdddddd}
        intensity={isDarkMode ? 0.5 : 0.3}
        distance={30}
      />

      <group ref={groupRef} rotation={[0.1, 0, 0]}>
        {/* Core */}
        <mesh>
          <icosahedronGeometry args={[2.5, 3]} />
          <meshStandardMaterial
            color={isDarkMode ? 0x00ffff : 0x2a3a59}
            wireframe
            emissive={isDarkMode ? 0x00ffff : 0x111111}
            emissiveIntensity={isDarkMode ? 0.4 : 0.1}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>

        {/* Particles */}
        <points ref={particlesRef} geometry={particles} material={particleMaterial} />
      </group>

      <OrbitControls
        args={[camera, renderer.domElement]}
        enableDamping
        dampingFactor={0.05}
        enableZoom
        minDistance={6}
        maxDistance={30}
      />
    </>
  );
};

export default Model;
