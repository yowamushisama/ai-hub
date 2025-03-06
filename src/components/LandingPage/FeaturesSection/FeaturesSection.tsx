import React, { useState, useEffect } from "react";
import { Brain, Sparkles, Zap, Rocket, ArrowRight } from "lucide-react";

interface FeaturesSectionProps {
  id: string;
}
interface AnimatedStats {
  [key: string]: number;
}
const DetailedFeatures: React.FC<FeaturesSectionProps> = ({ id }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [animatedStats, setAnimatedStats] = useState<AnimatedStats>({});

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-primary-500" />,
      title: "Dominate Search Rankings",
      tagline: "AI-powered SEO mastery",
      description:
        "AI Hub analyzes your keywords and crafts superior content that ranks.",
      keyPoints: [
        {
          title: "Smart keyword optimization",
          description: "Intelligent keyword research and seamless integration",
        },
        {
          title: "Competitor analysis",
          description: "Real-time competitor content analysis and insights",
        },
        {
          title: "AI content enhancement",
          description: "Advanced AI algorithms for content optimization",
        },
      ],
      stats: [
        { value: 83, label: "Higher Rankings", symbol: "%" },
        { value: 2.4, label: "More Traffic", symbol: "x" },
      ],
      ctaText: "Boost Your Rankings",
    },
    {
      icon: <Zap className="w-12 h-12 text-primary-500" />,
      title: "Enterprise-Grade Voice AI",
      tagline: "Sound authentically human",
      description:
        "Create natural, emotion-rich voiceovers that captivate your audience.",
      keyPoints: [
        {
          title: "Natural voice synthesis",
          description: "Human-like voice generation in real-time",
        },
        {
          title: "Emotion control",
          description: "Fine-tune tone and emotion for perfect delivery",
        },
        {
          title: "Multilingual support",
          description: "Generate content in 40+ languages naturally",
        },
      ],
      stats: [
        { value: 99, label: "Human-like", symbol: "%" },
        { value: 40, label: "Languages", symbol: "+" },
      ],
      ctaText: "Start Creating Voice",
    },
    {
      icon: <Rocket className="w-12 h-12 text-primary-500" />,
      title: "AI-Powered Marketing Suite",
      tagline: "Supercharge your campaigns",
      description:
        "Launch high-converting marketing campaigns with intelligent automation and insights.",
      keyPoints: [
        {
          title: "Smart audience targeting",
          description: "AI-driven audience segmentation and personalization",
        },
        {
          title: "Campaign optimization",
          description:
            "Real-time performance tracking and automatic adjustments",
        },
        {
          title: "Conversion analytics",
          description: "Deep insights into user behavior and conversion paths",
        },
      ],
      stats: [
        { value: 175, label: "ROI Increase", symbol: "%" },
        { value: 3.5, label: "Conversion Rate", symbol: "x" },
      ],
      ctaText: "Launch Campaigns",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  useEffect(() => {
    features[activeFeature].stats.forEach((stat) => {
      let startValue = 0;
      const endValue = stat.value;
      const duration = 1500;
      const stepTime = 50;
      const steps = duration / stepTime;
      const increment = (endValue - startValue) / steps;

      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
          startValue = endValue;
          clearInterval(timer);
        }
        setAnimatedStats((prev) => ({ ...prev, [stat.label]: startValue }));
      }, stepTime);

      return () => clearInterval(timer);
    });
  }, [activeFeature]);

  return (
    <section id={id} className="relative bg-surface-50 overflow-hidden">
      {/* Main Heading Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10" />
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Features</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Transform Your Content Creation
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              Unlock the power of AI to create, optimize, and scale your content
            </p>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="py-16 bg-surface-100">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex p-3 bg-primary-500/10 rounded-xl mb-4">
                    {features[activeFeature].icon}
                  </div>

                  <h3 className="text-3xl font-bold mb-2 leading-tight">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-xl text-primary-600 font-semibold mb-3">
                    {features[activeFeature].tagline}
                  </p>
                  <p className="text-lg text-neutral-600 dark:text-neutral-300">
                    {features[activeFeature].description}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-3 relative pl-6">
                  <div className="absolute left-[7px] top-[24px] bottom-8 w-[2px] bg-gradient-to-b from-primary-600/40 via-secondary-500/40 to-primary-600/40" />

                  {features[activeFeature].keyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="group relative flex items-start gap-6 py-2"
                    >
                      <div className="absolute left-[2px] mt-2 flex items-center justify-center  ">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:scale-125 transition-transform duration-300" />
                        <div className="absolute w-5 h-5 rounded-full bg-primary-500/20 animate-pulse group-hover:bg-primary-500/30" />
                      </div>

                      <div className="flex-grow ml-8">
                        <div className="relative p-3 rounded-lg bg-surface-50/80 backdrop-blur-sm border border-primary-500/10 group-hover:border-primary-500/20 transition-all duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative">
                            <span className="block text-lg font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-primary-600 transition-colors duration-300">
                              {point.title}
                            </span>
                            <span className="block mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                              {point.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats and CTA */}
                <div className="space-y-6">
                  <div className="flex gap-12 py-4">
                    {features[activeFeature].stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                          {Math.round(animatedStats[stat.label] || 0)}
                          {stat.symbol}
                        </div>
                        <div className="text-sm text-neutral-500 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    {features[activeFeature].ctaText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl" />
                <img
                  src="/api/placeholder/800/800"
                  alt={features[activeFeature].title}
                  className="rounded-2xl shadow-2xl object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-4 mt-12">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`transition-all duration-500 ${
                    index === activeFeature
                      ? "w-12 h-3 bg-gradient-to-r from-primary-600 to-secondary-600"
                      : "w-3 h-3 bg-primary-200 hover:bg-primary-300"
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;
