"use client";

import { memo, useEffect } from 'react';
import { useTextureLoader } from '@/hooks/useTextureLoader';
import * as THREE from 'three';

interface FloorMaterialProps {
  textureUrl: string;
}

const FloorMaterial = memo(function FloorMaterial({ textureUrl }: FloorMaterialProps) {
  const { texture, isLoading, error } = useTextureLoader(textureUrl);

  useEffect(() => {
    if (error) {
      console.error('Error loading floor texture:', error);
    }
  }, [error]);

  return (
    <meshStandardMaterial
      map={texture}
      color={isLoading || error ? "#f0f0f0" : "#ffffff"}
      roughness={0.8}
      metalness={0.1}
      side={THREE.DoubleSide}
    />
  );
});

export default FloorMaterial;