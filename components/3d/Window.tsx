"use client";

import { useRef } from "react";
import * as THREE from "three";

interface WindowProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export default function Window({ position, rotation = [0, 0, 0] }: WindowProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group position={position} rotation={rotation} ref={groupRef}>
      {/* Window Frame */}
      <mesh castShadow>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial color="#2c2c2c" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Glass */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          metalness={1}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={1}
        />
      </mesh>

      {/* Window Dividers */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshStandardMaterial color="#2c2c2c" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[2, 0.05, 0.05]} />
        <meshStandardMaterial color="#2c2c2c" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}