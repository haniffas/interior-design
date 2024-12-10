import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RoomVisualizer from '@/components/RoomVisualizer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">3D Room Visualizer</h2>
          <Suspense fallback={<div>Loading 3D scene...</div>}>
            <RoomVisualizer />
          </Suspense>
        </div>
      </section>
    </main>
  );
}