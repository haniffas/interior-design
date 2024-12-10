"use client";

import { useRef, memo } from "react";
import * as THREE from "three";
import Window from "./Window";
import Floor from "./Floor";
import Wall from "./Wall";

interface ModernRoomProps {
  wallColor: string;
  floorTexture: string;
}

const ModernRoom = memo(function ModernRoom({ wallColor, floorTexture }: ModernRoomProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Main Room */}
      <group position={[0, 0, 0]}>
        <Floor texture={floorTexture} />
        
        {/* Back Wall */}
        <Wall 
          position={[0, 2.5, -5]} 
          size={[10, 5, 0.1]} 
          color={wallColor} 
        />

        {/* Left Wall */}
        <Wall 
          position={[-5, 2.5, 0]} 
          rotation={[0, Math.PI / 2, 0]} 
          size={[10, 5, 0.1]} 
          color={wallColor} 
        />

        {/* Windows */}
        <Window position={[-4.95, 2, -2]} rotation={[0, Math.PI / 2, 0]} />
        <Window position={[0, 2, -4.95]} />
      </group>

      {/* Connected Room */}
      <group position={[7, 0, -2]}>
        <Floor texture={floorTexture} />
        
        {/* Additional Walls */}
        <Wall 
          position={[0, 2.5, -3]} 
          size={[6, 5, 0.1]} 
          color={wallColor} 
        />

        <Wall 
          position={[3, 2.5, 0]} 
          rotation={[0, Math.PI / 2, 0]} 
          size={[6, 5, 0.1]} 
          color={wallColor} 
        />

        {/* Window in Connected Room */}
        <Window position={[2.95, 2, -1]} rotation={[0, Math.PI / 2, 0]} />
      </group>

      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 4, 0]} intensity={0.3} />
      <pointLight position={[7, 4, -2]} intensity={0.3} />
      <hemisphereLight intensity={0.2} />
    </group>
  );
});

export default ModernRoom;