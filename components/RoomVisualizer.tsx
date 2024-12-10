"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Room from "@/components/3d/Room";
import { Scene3DErrorBoundary } from "@/components/3d/ErrorBoundary";
import { Suspense, useState, useCallback, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TileSelector from "@/components/TileSelector";

export default function RoomVisualizer() {
  const [wallColor, setWallColor] = useState("#ffffff");
  const [floorTexture, setFloorTexture] = useState("#e0e0e0");

  const handleTileSelect = useCallback((texture: string) => {
    setFloorTexture(texture);
  }, []);

  // Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (floorTexture.startsWith('blob:')) {
        URL.revokeObjectURL(floorTexture);
      }
    };
  }, [floorTexture]);

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden bg-secondary relative">
          <Scene3DErrorBoundary>
            <Canvas
              shadows
              camera={{ position: [8, 5, 8], fov: 50 }}
              gl={{ preserveDrawingBuffer: true }}
            >
              <color attach="background" args={["#f5f5f5"]} />
              <Suspense fallback={null}>
                <Room 
                  wallColor={wallColor} 
                  floorTexture={floorTexture} 
                />
                <Environment preset="apartment" />
                <OrbitControls 
                  enableZoom={true}
                  enablePan={true}
                  maxPolarAngle={Math.PI / 2}
                  minDistance={3}
                  maxDistance={15}
                />
              </Suspense>
            </Canvas>
          </Scene3DErrorBoundary>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="tile" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="tile" className="flex-1">Floor</TabsTrigger>
              <TabsTrigger value="paint" className="flex-1">Walls</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tile">
              <TileSelector onSelectTile={handleTileSelect} />
            </TabsContent>
            
            <TabsContent value="paint">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Choose Wall Color</h3>
                <HexColorPicker color={wallColor} onChange={setWallColor} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}