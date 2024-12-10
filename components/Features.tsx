import { Camera, Palette, Upload, Wand2 } from "lucide-react";

const features = [
  {
    icon: <Upload className="w-10 h-10" />,
    title: "Upload Your Space",
    description: "Simply upload a photo of your room or choose from our preset environments"
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "Choose Materials",
    description: "Select from thousands of tiles or paint colors to visualize your space"
  },
  {
    icon: <Wand2 className="w-10 h-10" />,
    title: "AI Enhancement",
    description: "Our AI technology ensures realistic lighting and texture mapping"
  },
  {
    icon: <Camera className="w-10 h-10" />,
    title: "3D Visualization",
    description: "Experience your design in immersive 3D with our virtual showroom"
  }
];

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}