"use client";

import { memo } from 'react';
import { Vector3, Euler } from 'three';

interface WallProps {
  position: Vector3 | [number, number, number];
  rotation?: Euler | [number, number, number];
  size: [number, number, number];
  color: string;
}

const Wall = memo(function Wall({ position, rotation, size, color }: WallProps) {
  return (
    <mesh 
      position={position} 
      rotation={rotation} 
      castShadow 
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.5} 
        metalness={0.1}
      />
    </mesh>
  );
});

export default Wall;