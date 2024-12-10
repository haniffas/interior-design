"use client";

import { memo } from "react";
import Floor from "./Floor";
import Wall from "./Wall";

interface RoomProps {
  wallColor: string;
  floorTexture: string;
}

const Room = memo(function Room({ wallColor, floorTexture }: RoomProps) {
  return (
    <group>
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

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight intensity={0.3} />
    </group>
  );
});

export default Room;