"use client";

import { Button } from "@/components/ui/button";
import { PaintBucket, Grid2X2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          Transform Your Space
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Visualize your dream home with our cutting-edge 3D tile and paint visualization technology. Perfect for homeowners and designers alike.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <PaintBucket className="w-5 h-5" />
            Try Paint Visualizer
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Grid2X2 className="w-5 h-5" />
            Explore Tiles
          </Button>
        </div>
      </div>
    </section>
  );
}