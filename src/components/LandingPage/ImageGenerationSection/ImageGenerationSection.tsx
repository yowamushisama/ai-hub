import React, { useState } from "react";
import {
  Sparkles,
  ImageIcon,
  ArrowRight,
  Wand2,
  Layout,
  Palette,
  Camera,
} from "lucide-react";

interface ImageGenerationProps {
  id: string;
}
const ImageGenerationSection: React.FC<ImageGenerationProps> = ({ id }) => {
  const [selectedStyle, setSelectedStyle] = useState("natural");
  const [selectedRatio, setSelectedRatio] = useState("16:9");

  const imageStyles = [
    {
      id: "natural",
      name: "Natural",
      description: "Professional photography style",
    },
    {
      id: "artistic",
      name: "Artistic",
      description: "Digital art and paintings",
    },
    { id: "cinematic", name: "Cinematic", description: "Movie-like scenes" },
  ];

  const aspectRatios = [
    { id: "1:1", name: "Square", size: "w-16 h-16", label: "Social" },
    { id: "16:9", name: "Wide", size: "w-24 h-14", label: "Video" },
    { id: "9:16", name: "Tall", size: "w-12 h-20", label: "Story" },
  ];

  const examplePrompt =
    "A serene Japanese garden at dusk, with cherry blossoms floating in the air, traditional stone lanterns casting a warm glow, and a small wooden bridge crossing a peaceful koi pond. The scene is softly lit by the setting sun, creating long shadows and golden highlights.";

  return (
    <section
      id={id}
      className="py-20 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 mb-6">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm font-medium">AI Image Generation</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Turn Words into Art
            </span>
            <span className="block text-3xl md:text-4xl mt-4 text-white">
              With AI-Powered Generation
            </span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Create stunning visuals from detailed descriptions using our
            advanced AI image generator. Perfect for marketing, social media,
            and creative projects.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-4xl mx-auto bg-neutral-900/50 rounded-xl backdrop-blur-xl border border-neutral-800 overflow-hidden">
          <div className="p-6">
            {/* Preview Area */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-800">
                <img
                  src="/api/placeholder/800/450"
                  alt="AI Generated Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary-400" />
                  <span className="text-white font-medium">Current Scene</span>
                </div>
                <div className="text-sm text-neutral-300 line-clamp-4">
                  {examplePrompt}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Style Selection */}
              <div className="bg-neutral-800/50 rounded-lg border border-neutral-700 overflow-hidden">
                <div className="flex items-center gap-2 p-3 border-b border-neutral-700">
                  <Palette className="w-5 h-5 text-primary-400" />
                  <span className="text-white font-medium">Style</span>
                </div>
                <div className="p-3 space-y-2">
                  {imageStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`w-full p-2 rounded-lg border text-left transition-all ${
                        selectedStyle === style.id
                          ? "border-primary-500 bg-primary-500/10 text-white"
                          : "border-neutral-700 text-neutral-400 hover:border-primary-500/50 hover:text-white"
                      }`}
                    >
                      <div className="font-medium text-sm">{style.name}</div>
                      <div className="text-xs opacity-80">
                        {style.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div className="bg-neutral-800/50 rounded-lg border border-neutral-700 overflow-hidden">
                <div className="flex items-center gap-2 p-3 border-b border-neutral-700">
                  <Layout className="w-5 h-5 text-primary-400" />
                  <span className="text-white font-medium">Format</span>
                </div>
                <div className="p-3 flex items-center justify-center gap-4">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setSelectedRatio(ratio.id)}
                      className={`relative ${
                        ratio.size
                      } rounded-lg border-2 transition-all ${
                        selectedRatio === ratio.id
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-neutral-700 hover:border-primary-500/50"
                      }`}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {ratio.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-6 text-center">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-medium text-white transition-all duration-300 hover:scale-[1.02] group">
                <Sparkles className="w-6 h-6" />
                <span className="text-lg">Generate Image</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGenerationSection;
