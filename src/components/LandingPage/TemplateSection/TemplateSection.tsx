import React, { useState } from "react";
import {
  YoutubeIcon,
  InstagramIcon,
  FileText,
  Sparkles,
  ArrowRight,
  Wand2,
  Target,
  Globe,
  Users,
  Lightbulb,
  Pencil,
  Hash,
} from "lucide-react";

interface TemplatesSectionProps {
  id: string;
}
const TemplatesSection: React.FC<TemplatesSectionProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState("social");

  const features = [
    {
      id: "social",
      icon: <InstagramIcon className="w-6 h-6" />,
      title: "Social Media",
      description: "Create engaging posts for any platform",
      formSections: [
        {
          icon: <Target className="w-5 h-5" />,
          label: "Platform & Objective",
          placeholder:
            "Generate an Instagram post to showcase our new AI-powered content creation platform",
        },
        {
          icon: <Users className="w-5 h-5" />,
          label: "Target Audience",
          placeholder:
            "Digital marketers and content creators seeking efficient content generation solutions",
        },
        {
          icon: <Hash className="w-5 h-5" />,
          label: "Key Points",
          placeholder:
            "AI-powered content creation, time-saving automation, professional quality output",
        },
      ],
    },
    {
      id: "youtube",
      icon: <YoutubeIcon className="w-6 h-6" />,
      title: "YouTube Content",
      description: "Generate video scripts and descriptions",
      formSections: [
        {
          icon: <Lightbulb className="w-5 h-5" />,
          label: "Video Concept",
          placeholder:
            "Create a comprehensive tutorial on using AI tools for content creation",
        },
        {
          icon: <Globe className="w-5 h-5" />,
          label: "Duration & Style",
          placeholder:
            "10-minute tutorial with professional yet approachable tone",
        },
        {
          icon: <Pencil className="w-5 h-5" />,
          label: "Key Topics",
          placeholder:
            "AI basics, content templates, automation features, practical examples",
        },
      ],
    },
    {
      id: "blog",
      icon: <FileText className="w-6 h-6" />,
      title: "Blog Writing",
      description: "Write SEO-optimized blog content",
      formSections: [
        {
          icon: <Target className="w-5 h-5" />,
          label: "Blog Topic",
          placeholder:
            "The Ultimate Guide to AI-Powered Content Creation in 2025",
        },
        {
          icon: <Users className="w-5 h-5" />,
          label: "Target Reader",
          placeholder:
            "Content marketers and businesses looking to scale their content production",
        },
        {
          icon: <Hash className="w-5 h-5" />,
          label: "Key Points",
          placeholder:
            "AI content tools, automation benefits, content optimization, ROI analysis",
        },
      ],
    },
  ];

  return (
    <section
      id={id}
      className="py-24 bg-gradient-to-b from-white via-neutral-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Enhanced Headers */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                OmniCreate
              </span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
              300+ AI Templates & Tools
            </span>
            <span className="block text-3xl md:text-4xl mt-4 text-neutral-800">
              Unleash Your Creative Potential
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Transform your ideas into compelling content across all platforms
            with our advanced AI-powered creation suite. From social media to
            long-form content, create engaging materials in minutes.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Enhanced Feature Tabs */}
          <div className="flex gap-4 mb-8 p-1 bg-neutral-50 rounded-xl">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 flex-1 ${
                  activeTab === feature.id
                    ? "bg-white text-primary-600 shadow-md"
                    : "text-neutral-600 hover:bg-white/50"
                }`}
              >
                {feature.icon}
                <span className="font-medium">{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Enhanced Form Area */}
          <div className="space-y-6">
            {features
              .find((f) => f.id === activeTab)
              ?.formSections.map((section, index) => (
                <div key={index} className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                    {section.icon}
                    {section.label}
                  </label>
                  <div className="relative">
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 h-16 resize-none bg-neutral-50 group-hover:bg-white"
                      value={section.placeholder}
                      readOnly
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              ))}
          </div>

          {/* Enhanced CTA Button */}
          <div className="mt-8">
            <button className="w-full group relative px-8 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500 via-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-3">
                <Wand2 className="w-5 h-5" />
                Create Magic with AI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Feature Highlights */}
        {/* <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "AI Templates",
              count: "300+",
              icon: <Sparkles className="w-6 h-6" />,
            },
            {
              title: "Content Types",
              count: "50+",
              icon: <FileText className="w-6 h-6" />,
            },
            {
              title: "Active Users",
              count: "10K+",
              icon: <Users className="w-6 h-6" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="text-primary-600">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {stat.count}
                  </div>
                  <div className="text-neutral-600">{stat.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default TemplatesSection;
