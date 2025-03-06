import React from "react";
import {
  Sparkles,
  Zap,
  Globe,
  Users,
  Rocket,
  Brain,
  Target,
  Layers,
  PenSquare,
  ImageIcon,
  VideoIcon,
  Mic,
  Search,
  BarChart,
  Mail,
  Bot,
} from "lucide-react";

interface ComprehensiveSectionProps {
  id: string;
}
const ComprehensiveSection: React.FC<ComprehensiveSectionProps> = ({ id }) => {
  const features = [
    {
      icon: <PenSquare className="w-6 h-6" />,
      title: "250+ Templates",
      description: "Content templates for blogs, ads, and social media",
      gradient: "from-primary-400 to-secondary-400",
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "AI Image Creation",
      description: "Generate stunning visuals and marketing assets",
      gradient: "from-secondary-400 to-accent-400",
    },
    {
      icon: <VideoIcon className="w-6 h-6" />,
      title: "Video Generation",
      description: "Create engaging video content automatically",
      gradient: "from-accent-400 to-primary-400",
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Generation",
      description: "Convert text to natural-sounding speech",
      gradient: "from-primary-400 via-secondary-400 to-accent-400",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "25+ Languages",
      description: "Create content in multiple languages instantly",
      gradient: "from-accent-400 to-secondary-400",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Optimize content for search engines automatically",
      gradient: "from-secondary-400 to-primary-400",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Analytics Suite",
      description: "Track and analyze content performance",
      gradient: "from-primary-400 to-accent-400",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Marketing",
      description: "Create and optimize email campaigns",
      gradient: "from-accent-400 via-primary-400 to-secondary-400",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Chat Assistant",
      description: "24/7 support for content creation and editing",
      gradient: "from-secondary-400 to-accent-400",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "7+ AI Models",
      description: "Advanced AI models for various content types",
      gradient: "from-primary-400 to-secondary-400",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Targeting",
      description: "AI-powered audience targeting and personalization",
      gradient: "from-secondary-400 via-accent-400 to-primary-400",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Unlimited Assets",
      description: "Create unlimited content and designs",
      gradient: "from-accent-400 to-primary-400",
    },
  ];

  return (
    <section
      id={id}
      className="py-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative">
        {/* Header Content */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Next-Gen AI Platform</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
            All-In-One Platform
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
            The ultimate AI-powered solution for marketers, business owners,
            content creators, and professionals. Create, manage, and scale your
            content with a single powerful platform.
          </p>
        </div>

        {/* Floating Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              {/* Animated background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Main content */}
              <div className="relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300 h-full group-hover:transform group-hover:scale-105">
                {/* Icon container */}
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.gradient} p-3 mb-6 text-white`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-300">{feature.description}</p>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 group">
            <Rocket className="w-5 h-5" />
            <span>Get Started Free</span>
            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>

          <p className="text-neutral-400 mt-4">
            Join thousands of professionals already using our platform
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveSection;
