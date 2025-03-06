import React, { useState } from "react";
import {
  PenSquare,
  ImageIcon,
  Mic,
  Video,
  Sparkles,
  ArrowRight,
  Zap,
  BarChart,
  Activity,
} from "lucide-react";

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "text", label: "Text", icon: <PenSquare className="w-4 h-4" /> },
    { id: "image", label: "Image", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "voice", label: "Voice", icon: <Mic className="w-4 h-4" /> },
    { id: "video", label: "Video", icon: <Video className="w-4 h-4" /> },
  ];

  const stats = [
    { label: "Credits Used", value: "2,847", change: "+12%", icon: <Zap /> },
    { label: "Projects", value: "156", change: "+8%", icon: <BarChart /> },
    { label: "Active Tasks", value: "24", change: "+15%", icon: <Activity /> },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Welcome Section */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-purple-600/20" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

        <div className="relative p-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 w-fit mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-400">AI Hub</span>
          </div>

          <h1 className="text-xl font-semibold text-white mb-2">
            Welcome back, Creator
          </h1>
          <p className="text-sm text-neutral-400">
            Ready to create something amazing?
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#12111F] rounded-xl border border-purple-500/10 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <div className="text-purple-400">{stat.icon}</div>
              </div>
              <span className="text-xs font-medium text-green-400">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-semibold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Creation Tools */}
      <div className="bg-[#12111F] rounded-xl border border-purple-500/10 p-4 mb-8">
        <div className="flex items-center gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
                       ${
                         activeTab === tab.id
                           ? "bg-purple-500/20 text-purple-400"
                           : "text-neutral-400 hover:text-purple-400 hover:bg-purple-500/10"
                       }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Blog Post", "Social Media", "Product Copy", "Email"].map(
            (tool, index) => (
              <button
                key={index}
                className="p-4 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 
                       hover:border-purple-500/20 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <PenSquare className="w-4 h-4 text-purple-400" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="text-sm font-medium text-white">{tool}</div>
              </button>
            )
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#12111F] rounded-xl border border-purple-500/10 p-4">
        <h2 className="text-sm font-medium text-white mb-4">Recent Activity</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="p-3 rounded-lg hover:bg-purple-500/5 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-purple-500/10">
                  <PenSquare className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    Blog Post Generated
                  </div>
                  <div className="text-xs text-neutral-500">2 hours ago</div>
                </div>
              </div>
              <button className="p-1.5 rounded-lg text-neutral-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
