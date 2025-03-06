import React from "react";
import {
  Sparkles,
  ArrowRight,
  PenSquare,
  Share2,
  Book,
  Film,
  Twitter,
  Wand2,
} from "lucide-react";

interface ShowcaseSectionProps {
  id: string;
}
const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ id }) => {
  const contentTypes = [
    {
      icon: <PenSquare className="w-6 h-6" />,
      label: "Blog Posts",
      description: "SEO-optimized articles",
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      label: "Social Media",
      description: "Engaging social posts",
      gradient: "from-pink-500/20 to-orange-500/20",
    },
    {
      icon: <Book className="w-6 h-6" />,
      label: "eBooks",
      description: "Digital publications",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: <Film className="w-6 h-6" />,
      label: "Video Scripts",
      description: "Compelling content",
      gradient: "from-red-500/20 to-orange-500/20",
    },
    // {
    //   icon: <Twitter className="w-6 h-6" />,
    //   label: "Tweets",
    //   description: "Viral content",
    //   gradient: "from-blue-400/20 to-cyan-500/20",
    // },
  ];

  const contentExamples = [
    {
      title: "Blog Content Generation",
      description:
        "Create engaging blog posts with AI-powered insights and optimization",
      image: "/blog-generator.avif",
      aspect: "lg:col-span-2 aspect-[16/9]",
      gradient: "from-primary-500/20 to-secondary-500/20",
    },
    {
      title: "Social Media Content",
      description: "Generate engaging posts for all platforms",
      image: "/image-generator.avif",
      aspect: "aspect-square",
      gradient: "from-secondary-500/20 to-accent-500/20",
    },
    {
      title: "Video Scripts & Production",
      description: "Create compelling video content that converts",
      image: "/api/placeholder/600/450",
      aspect: "aspect-[4/3]",
      gradient: "from-accent-500/20 to-primary-500/20",
    },
    {
      title: "eBook Creation",
      description: "Professional digital publications and guides",
      image: "/api/placeholder/600/450",
      aspect: "aspect-[4/3]",
      gradient: "from-primary-500/20 to-secondary-500/20",
    },
  ];

  return (
    <section id={id} className="bg-rich-dark py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-secondary-600/5 to-accent-600/5" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-cosmic opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-aurora opacity-20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-400 mb-8 cosmic-blur">
            <Sparkles className="w-5 h-5 animate-sparkle" />
            <span className="text-sm font-medium tracking-wide">
              Next-Gen AI Content Hub
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
              Create Magic
            </span> */}
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400  via-secondary-600 to-accent-300"> */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400  via-secondary-400 to-accent-400">
              Create Magic
            </span>
            <span className="block text-white mt-2">with AI</span>
          </h2>
          <p className="text-xl text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            Transform your ideas into captivating content across all platforms
            with our advanced AI-powered creation suite
          </p>
        </div>

        {/* Content Type Pills */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {contentTypes.map((type, index) => (
            <div
              key={index}
              className="group relative p-1 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${type.gradient} rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative px-6 py-4 bg-deep-space rounded-xl flex items-center gap-4 border border-neutral-700/50 group-hover:border-primary-500/50 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
                  <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                    {type.icon}
                  </div>
                </div>
                <div className="text-left">
                  <span className="block text-white font-medium mb-1 group-hover:text-primary-400 transition-colors">
                    {type.label}
                  </span>
                  <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                    {type.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {contentExamples.map((content, index) => (
            <div key={index} className={`${content.aspect} relative group`}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-20 group-hover:opacity-30 transition-all duration-500 rounded-2xl`}
              />
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-rich-black/50 to-rich-black/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-2xl font-bold text-white mb-2">
                  {content.title}
                </div>
                <p className="text-neutral-200 text-center max-w-md px-6">
                  {content.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center relative">
          {/* Animated Magic Text */}
          <div className="absolute -top-12 right-0 transform rotate-12">
            <div className="magic-text text-2xl text-primary-400 flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              <span>Click to create magic!</span>
            </div>
          </div>

          <button className="group relative px-10 py-5 bg-gradient-cosmic rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-aurora opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center gap-3 text-white">
              <span className="text-lg font-semibold">
                Start Creating with AI Hub
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <p className="mt-6 text-neutral-400">
            Join over 50,000+ creators revolutionizing their content creation
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
