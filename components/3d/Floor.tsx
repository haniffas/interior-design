"use client";

import { memo, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface FloorProps {
  texture: string;
}

const Floor = memo(function Floor({ texture }: FloorProps) {
  const isColor = texture.startsWith('#');

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: isColor ? texture : '#ffffff',
      roughness: 0.8,
      metalness: 0.1,
    });

    if (!isColor) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        texture,
        (loadedTexture) => {
          loadedTexture.wrapS = THREE.RepeatWrapping;
          loadedTexture.wrapT = THREE.RepeatWrapping;
          loadedTexture.repeat.set(2, 2);
          mat.map = loadedTexture;
          mat.needsUpdate = true;
        },
        undefined,
        (error) => console.error('Error loading texture:', error)
      );
    }

    return mat;
  }, [texture, isColor]);

  useEffect(() => {
    return () => {
      if (material.map) {
        material.map.dispose();
      }
      material.dispose();
    };
  }, [material]);

  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, 0, 0]} 
      receiveShadow
    >
      <planeGeometry args={[10, 10]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
});

export default Floor;