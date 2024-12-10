"use client";

import { memo } from 'react';

interface WallMaterialProps {
  color: string;
}

const WallMaterial = memo(function WallMaterial({ color }: WallMaterialProps) {
  return (
    <meshStandardMaterial 
      color={color} 
      roughness={0.5} 
      metalness={0.1}
    />
  );
});

export default WallMaterial;