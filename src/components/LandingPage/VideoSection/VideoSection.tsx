import React, { useState } from "react";
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Wand2,
  Eye,
  Download,
  Zap,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface VideoSectionProps {
  id: string;
}
const VideoSection: React.FC<VideoSectionProps> = ({ id }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const features = [
    {
      icon: <Wand2 className="w-6 h-6 text-primary-500" />,
      title: "AI-Powered Editing",
      description:
        "Our advanced AI automatically enhances your content for professional results every time",
      gradient: "from-primary-500/20 to-secondary-500/20",
    },
    {
      icon: <Eye className="w-6 h-6 text-secondary-500" />,
      title: "Real-Time Preview",
      description:
        "Watch changes happen instantly as you create, ensuring perfect results every time",
      gradient: "from-secondary-500/20 to-accent-500/20",
    },
    {
      icon: <Download className="w-6 h-6 text-accent-500" />,
      title: "One-Click Export",
      description:
        "Export your content in multiple formats with a single click for immediate use",
      gradient: "from-accent-500/20 to-primary-500/20",
    },
  ];

  return (
    <section id={id} className="py-32 bg-surface-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-accent-500/5" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">See it in action</span>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4">
            <h2 className="text-4xl md:text-6xl font-bold leading-normal bg-clip-text py-5 text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Watch the Magic Happen
            </h2>
          </div>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            See how our AI-powered platform transforms your ideas into stunning
            content in minutes
          </p>
        </div>

        {/* Enhanced Video Player Container */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 group">
            {/* Video Placeholder with Enhanced Styling */}
            <img
              src="/api/placeholder/1280/720"
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Enhanced Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-neutral-900/40">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 transition-all duration-300 flex items-center justify-center group/btn hover:scale-110 shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white translate-x-1" />
                )}
                <div className="absolute inset-0 rounded-full bg-primary-400/20 animate-ping" />
              </button>
            </div>

            {/* Enhanced Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-neutral-900/95 via-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Progress Bar */}
              <div className="mb-6 relative">
                <div className="h-1.5 bg-neutral-600/50 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-primary-500/50" />
                  </div>
                </div>
              </div>

              {/* Enhanced Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-primary-400 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-primary-400 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-7 h-7" />
                    ) : (
                      <Volume2 className="w-7 h-7" />
                    )}
                  </button>
                  <span className="text-white text-sm font-medium">
                    01:23 / 03:45
                  </span>
                </div>
                <button className="text-white hover:text-primary-400 transition-colors">
                  <Maximize2 className="w-7 h-7" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Video Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-surface-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surface-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats Section */}
        <div className="mt-20 text-center">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 mb-8">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Always improving</span>
          </div> */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "99%", label: "Satisfaction Rate" },
              { value: "2x", label: "Faster Creation" },
              { value: "24/7", label: "AI Support" },
              { value: "500k+", label: "Videos Created" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
