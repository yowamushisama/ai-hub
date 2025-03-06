import {
  Home,
  PenTool,
  Search,
  BrainCircuit,
  MessagesSquare,
  Star,
  FileText,
  Mail,
  Instagram,
  Layout,
  BarChart3,
  Globe,
  PieChart,
  Code2,
  Bot,
  Brush,
  Sparkles,
} from "lucide-react";
import { NavItem } from "@/components/types/PrimaryNavigation";

// Custom gradients for each main section
const gradients = {
  dashboard: "from-blue-500 to-indigo-500",
  content: "from-violet-500 to-purple-500",
  seo: "from-emerald-500 to-teal-500",
  ai: "from-fuchsia-500 to-pink-500",
  community: "from-amber-500 to-orange-500",
};

// Enhanced hover effects and animations
const iconStyles =
  "transform transition-all duration-300 group-hover:scale-110";

export const navigationItems: (NavItem | "divider")[] = [
  {
    icon: <Home className={`w-5 h-5 ${iconStyles}`} />,
    label: "Dashboard",
    href: "/dashboard",
    gradient: gradients.dashboard,
  },
  {
    icon: <PenTool className={`w-5 h-5 ${iconStyles}`} />,
    label: "Content Studio",
    gradient: gradients.content,
    subItems: [
      {
        icon: <FileText className="w-4 h-4" />,
        label: "Blog Writer Pro",
        href: "/content/blog",
        description: "Create professional blog content with AI",
        isPro: true,
        badge: "Popular",
      },
      {
        icon: <Mail className="w-4 h-4" />,
        label: "Email Master",
        href: "/content/email",
        description: "Craft converting email campaigns",
        highlight: true,
      },
      {
        icon: <Instagram className="w-4 h-4" />,
        label: "Social Suite",
        href: "/content/social",
        description: "Multi-platform content creator",
        isNew: true,
        badge: "Trending",
      },
      {
        icon: <Layout className="w-4 h-4" />,
        label: "Landing Pages",
        href: "/content/pages",
        description: "Build high-converting landing pages",
        isPro: true,
      },
    ],
  },
  {
    icon: <Search className={`w-5 h-5 ${iconStyles}`} />,
    label: "SEO Tools",
    gradient: gradients.seo,
    subItems: [
      {
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Keyword Explorer",
        href: "/seo/keywords",
        description: "AI-powered keyword research",
        isPro: true,
        badge: "Advanced",
      },
      {
        icon: <Globe className="w-4 h-4" />,
        label: "Content Optimizer",
        href: "/seo/optimizer",
        description: "Smart SEO optimization engine",
        highlight: true,
      },
      {
        icon: <PieChart className="w-4 h-4" />,
        label: "Analytics Hub",
        href: "/seo/analytics",
        description: "Real-time performance tracking",
        isNew: true,
      },
    ],
  },
  {
    icon: <BrainCircuit className={`w-5 h-5 ${iconStyles}`} />,
    label: "AI Tools",
    gradient: gradients.ai,
    subItems: [
      {
        icon: <Brush className="w-4 h-4" />,
        label: "Art Generator",
        href: "/tools/art",
        description: "Create stunning AI artwork",
        isPro: true,
        badge: "Popular",
      },
      {
        icon: <Code2 className="w-4 h-4" />,
        label: "Code Assistant",
        href: "/tools/code",
        description: "Smart coding companion",
        isNew: true,
        highlight: true,
      },
      {
        icon: <Bot className="w-4 h-4" />,
        label: "Chat Assistant",
        href: "/tools/chat",
        description: "24/7 AI support system",
        badge: "Beta",
      },
    ],
  },
  "divider",
  {
    icon: <Star className={`w-5 h-5 ${iconStyles}`} />,
    label: "Favorites",
    href: "/favorites",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    icon: <MessagesSquare className={`w-5 h-5 ${iconStyles}`} />,
    label: "Community",
    href: "/community",
    isNew: true,
    gradient: gradients.community,
    badge: "Active",
  },
];

// Enhanced styling config for navigation items
export const navConfig = {
  // Gradient backgrounds for item states
  gradients: {
    hover: "bg-gradient-to-r opacity-10",
    active: "bg-gradient-to-r opacity-15",
  },

  // Animation classes
  animations: {
    scaleOnHover: "transition-transform duration-300 hover:scale-105",
    fadeIn: "animate-fade-in",
    slideIn: "animate-slide-in",
  },

  // Enhanced badge styles
  badges: {
    pro: "bg-gradient-to-r from-violet-600 to-purple-600",
    new: "bg-gradient-to-r from-emerald-600 to-teal-600",
    beta: "bg-gradient-to-r from-blue-600 to-indigo-600",
    trending: "bg-gradient-to-r from-rose-600 to-pink-600",
  },

  // Glassmorphism effects
  glass: {
    background: "backdrop-blur-md bg-white/10",
    border: "border border-white/20",
  },
};
