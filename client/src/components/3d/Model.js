import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useMotionValue, useSpring } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HouseModel(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/low_poly_house/scene.gltf');
  const { actions } = useAnimations(animations, group);

  // Play any embedded animations if they exist
  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  // Fix materials - the GLTF uses KHR_materials_pbrSpecularGlossiness which
  // isn't supported in Three.js r152+. Apply diffuse textures manually.
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        // If the material has an emissive map but looks washed out,
        // use the emissive map as the main map (diffuse texture)
        if (mat.emissiveMap && !mat.map) {
          mat.map = mat.emissiveMap;
        }
        // Ensure proper rendering
        mat.emissiveIntensity = 0;
        mat.emissive = new THREE.Color(0x000000);
        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  // Spring drop-in animation (starts high, drops to final position)
  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });
  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={props.scale || 0.015}
      position={props.position || [1, -1, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/low_poly_house/scene.gltf');

export default HouseModel;
