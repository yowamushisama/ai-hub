import React, { useState } from "react";
import { Play, ArrowRight, Sparkles, Bot, Zap, Globe } from "lucide-react";

interface ContentCreationProps {
  id: string;
}
const ContentCreationSection: React.FC<ContentCreationProps> = ({ id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section
      id={id}
      className="py-24 bg-gradient-to-br from-rich-black to-midnight-blue relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-400 mb-6">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Platform</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight relative">
              <span className="block relative overflow-hidden">
                <span className="animate-gradient-slide bg-gradient-to-l from-accent-400 via-primary-400 to-secondary-400 bg-[length:200%_100%] bg-clip-text text-transparent">
                  Create Content & Ads That Convert
                </span>
              </span>
              <span className="text-white text-3xl md:text-4xl block mt-4">
                One Platform. Unlimited Possibilities.
              </span>
            </h2>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Generate, optimize, and automate your content workflow with our
              advanced AI. From blogs to social media, create engaging content
              that resonates.
            </p>
          </div>

          {/* Video/Image Showcase */}
          <div className="relative max-w-5xl mx-auto mb-24">
            <div className="aspect-video rounded-2xl overflow-hidden bg-deep-space relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 group-hover:opacity-70 transition-opacity duration-500" />

              <img
                src="/api/placeholder/1920/1080"
                alt="AI Content Creation Platform"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center group/btn hover:scale-110 transition-transform duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Play
                    className={`w-8 h-8 text-white transition-transform duration-300 ${
                      isHovered ? "scale-110" : ""
                    }`}
                  />
                  <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ping" />
                </button>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
              {[
                { icon: <Sparkles className="w-5 h-5" />, text: "AI-Powered" },
                { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast" },
                { icon: <Globe className="w-5 h-5" />, text: "Multi-Platform" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`group px-6 py-3 bg-deep-space/80 backdrop-blur-sm rounded-full flex items-center gap-3 border border-primary-500/20 hover:border-primary-500 transition-all duration-300 cursor-pointer hover:scale-105 ${
                    activeFeature === index
                      ? "border-primary-500 shadow-lg shadow-primary-500/20"
                      : ""
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <span className="text-primary-400 group-hover:text-primary-300 transition-colors">
                    {feature.icon}
                  </span>
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-6 mt-20">
            <button className="group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-primary-600 to-secondary-600 animate-gradient-xy" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-secondary-600 via-primary-600 to-blue-600 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2 text-white">
                Transform Your Content Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
              Learn More About AI Features
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-slide {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-gradient-slide {
          animation: gradient-slide 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ContentCreationSection;
