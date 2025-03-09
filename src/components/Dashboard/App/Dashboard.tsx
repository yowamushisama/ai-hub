"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  Image,
  Mic,
  Menu,
  ArrowRight,
  Wand2,
  Bot,
  Crown,
  Zap,
  Search,
  BrainCircuit,
} from "lucide-react";
import PrimaryNavigation from "../Navigation/PrimaryNavigation/PrimaryNavigation";
import SecondaryNavigation from "../Navigation/SecondaryNavigation";
import AIToolsCollection from "./ToolsCollection/ToolsCollection";

// Popular tools data
const popularTools = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Blog Writer Pro",
    description: "Create engaging blog content with AI",
    gradient: "from-blue-500 to-indigo-500",
    isNew: true,
  },
  {
    icon: <Image className="w-5 h-5" />,
    title: "Image Creator",
    description: "Generate stunning visuals instantly",
    gradient: "from-purple-500 to-pink-500",
    isNew: false,
  },
  {
    icon: <Mic className="w-5 h-5" />,
    title: "Voice Generator",
    description: "Convert text to natural speech",
    gradient: "from-green-500 to-emerald-500",
    isNew: true,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => {
    if (isMobile) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const tabs = [
    { id: "text", icon: FileText, label: "Text" },
    { id: "image", icon: Image, label: "Image" },
    { id: "voice", icon: Mic, label: "Voice" },
  ];

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Fixed Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 text-white">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo & Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleMenu}
              className="p-2 rounded-md hover:bg-white/20 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">AI Hub</span>
            </div>
          </div>

          {/* Upgrade Message */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Crown className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium">
                Upgrade to unlock unlimited AI generation
                <span className="text-primary-200 ml-2">→</span>
              </p>
            </div>
            <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 pt-14 relative">
        {/* Primary Navigation (Desktop Sidebar) */}
        <div className="hidden sm:block sticky top-14 h-[calc(100vh-10rem)] z-20 border-r border-neutral-200">
          <PrimaryNavigation
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobile && isMobileNavOpen && (
          <div className="sm:hidden">
            <PrimaryNavigation
              isCollapsed={false}
              setIsCollapsed={setIsCollapsed}
              isMobileOverlay
              onCloseMobileNav={() => setIsMobileNavOpen(false)}
            />
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsMobileNavOpen(false)}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 pb-8">
          {/* Welcome Section */}
          <div className="text-center mb-16 mt-10">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Create Anything You Imagine with AI
              </span>
            </h1>
            <p className="text-base text-neutral-600 mb-8 max-w-2xl mx-auto">
              There is an AI-powered tool for every need
            </p>

            {/* Content Type Tabs */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-center p-1 bg-white/50 backdrop-blur-sm rounded-xl border border-neutral-200 gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Describe what you want to create..."
                className="w-full h-12 pl-10 pr-12 rounded-xl border border-neutral-200 bg-white/50 backdrop-blur-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 text-base placeholder-neutral-400 transition-all"
              />
              <button className="absolute right-3 inset-y-0 flex items-center">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg transition-all">
                  <Wand2 className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="flex gap-4">
            {/* Secondary Navigation Sidebar */}
            <div className="hidden md:block sticky top-14 h-[calc(100vh-9rem)] self-start bg-white border-r border-neutral-200 p-4 z-10">
              <SecondaryNavigation />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 md:w-3/4 lg:w-4/5 space-y-8">
              {/* Popular Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularTools.map((tool, index) => (
                  <button
                    key={index}
                    className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-neutral-200 hover:border-primary-500/30 transition-all hover:shadow-lg group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}
                    >
                      {tool.icon}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-neutral-900 text-sm">
                          {tool.title}
                        </h3>
                        {tool.isNew && (
                          <span className="px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 text-xs">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600">
                        {tool.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* AI Tools Collection */}
              <AIToolsCollection isCollapsed={isCollapsed} />

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="group p-4 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 hover:from-primary-500/10 hover:to-secondary-500/10 transition-all border border-primary-500/10 hover:border-primary-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white group-hover:scale-110 transition-transform">
                      <Wand2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-medium text-primary-900 text-sm">
                      New Project
                    </h3>
                  </div>
                  <p className="text-xs text-primary-700">
                    Start creating with our AI tools
                  </p>
                </button>

                <button className="group p-4 rounded-xl bg-gradient-to-r from-secondary-500/5 to-accent-500/5 hover:from-secondary-500/10 hover:to-accent-500/10 transition-all border border-secondary-500/10 hover:border-secondary-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-r from-secondary-500 to-accent-500 text-white group-hover:scale-110 transition-transform">
                      <Bot className="w-4 h-4" />
                    </div>
                    <h3 className="font-medium text-secondary-900 text-sm">
                      AI Assistant
                    </h3>
                  </div>
                  <p className="text-xs text-secondary-700">
                    Get help with your projects
                  </p>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
