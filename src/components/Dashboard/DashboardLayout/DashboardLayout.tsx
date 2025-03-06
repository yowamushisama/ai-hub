import React from "react";
import {
  Home,
  PenTool,
  Image as ImageIcon,
  Mic,
  Video,
  Bot,
  Star,
  Settings,
  HelpCircle,
  User,
  CreditCard,
  ChevronRight,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

// Primary Navigation Items
const primaryNavItems = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <PenTool className="w-5 h-5" />,
    label: "Content Studio",
    href: "/content",
  },
  {
    icon: <ImageIcon className="w-5 h-5" />,
    label: "Visual Lab",
    href: "/visual",
  },
  { icon: <Mic className="w-5 h-5" />, label: "Voice Forge", href: "/voice" },
  {
    icon: <Video className="w-5 h-5" />,
    label: "Video Creator",
    href: "/video",
  },
  {
    icon: <Bot className="w-5 h-5" />,
    label: "AI Assistant",
    href: "/assistant",
  },
  { divider: true },
  {
    icon: <Star className="w-5 h-5" />,
    label: "Favorites",
    href: "/favorites",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: "Help Center",
    href: "/help",
  },
];

// User Profile Section
const UserProfile = () => (
  <div className="p-4 border-t border-neutral-800">
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-800/50 transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium">
        AH
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-medium truncate">Alex Hamilton</div>
        <div className="text-neutral-400 text-sm">Pro Plan</div>
      </div>
      <ChevronRight className="w-5 h-5 text-neutral-400" />
    </div>
  </div>
);

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Primary Navigation */}
      <nav className="w-72 border-r border-neutral-800 flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              AI Hub
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-2 space-y-1">
          {primaryNavItems.map((item, index) =>
            item.divider ? (
              <div key={index} className="h-px bg-neutral-800 my-4" />
            ) : (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-neutral-300 hover:text-white rounded-xl hover:bg-neutral-800/50 transition-all group"
              >
                <div className="text-neutral-400 group-hover:text-primary-400 transition-colors">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </a>
            )
          )}
        </div>

        {/* User Profile */}
        <UserProfile />
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-neutral-800 px-8 flex items-center justify-between">
          <div className="flex-1 max-w-3xl">
            <div className="relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for tools, templates, or projects..."
                className="w-full h-12 bg-neutral-900 border border-neutral-800 rounded-xl pl-12 pr-4 text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-neutral-300 hover:text-white transition-colors">
              Help
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg flex items-center gap-2 hover:from-primary-500 hover:to-secondary-500 transition-all">
              <Zap className="w-4 h-4" />
              Upgrade to Pro
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">
              Welcome back, Alex
            </h1>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "New Project",
                  icon: <PenTool className="w-6 h-6" />,
                  gradient: "from-primary-500 to-secondary-500",
                },
                {
                  label: "Recent Projects",
                  icon: <ImageIcon className="w-6 h-6" />,
                  gradient: "from-secondary-500 to-accent-500",
                },
                {
                  label: "Templates",
                  icon: <Bot className="w-6 h-6" />,
                  gradient: "from-accent-500 to-primary-500",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-primary-500/50 transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white mb-4`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {action.label}
                  </h3>
                  <p className="text-neutral-400">
                    Quick access to your workspace
                  </p>
                </button>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-800/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-primary-400">
                      <PenTool className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">
                        Blog Post Generated
                      </h4>
                      <p className="text-neutral-400 text-sm">2 hours ago</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
