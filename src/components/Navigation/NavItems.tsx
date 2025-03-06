import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Wand2,
  Mic,
  ImageIcon,
  PenTool,
  Share2,
  VideoIcon,
  Search,
  Mail,
} from "lucide-react";
import { NavigationItem } from "../types/Navbar";
export const navigationItems: NavigationItem[] = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#showcase" },
  {
    label: "Tools",
    href: "#",
    dropdownItems: [
      {
        label: "AI Blog Generator",
        href: "#content-creation",
        icon: <PenTool className="w-5 h-5" />,
        description: "Create SEO-optimized blog posts instantly",
      },
      {
        label: "Smart Voice Studio",
        href: "#voice-generation",
        icon: <Mic className="w-5 h-5" />,
        description: "Natural AI voice generation & editing",
      },
      {
        label: "Image Creator Pro",
        href: "#image-generation",
        icon: <ImageIcon className="w-5 h-5" />,
        description: "Generate & edit professional visuals",
      },
      {
        label: "Content Writer AI",
        href: "#showcase",
        icon: <Wand2 className="w-5 h-5" />,
        description: "AI-powered copywriting assistant",
      },
      {
        label: "Social Media Creator",
        href: "#showcase",
        icon: <Share2 className="w-5 h-5" />,
        description: "Generate engaging social media content",
      },
      {
        label: "Script Generator",
        href: "#showcase",
        icon: <VideoIcon className="w-5 h-5" />,
        description: "Create video & podcast scripts",
      },
      {
        label: "SEO Optimizer",
        href: "#showcase",
        icon: <Search className="w-5 h-5" />,
        description: "Optimize content for search engines",
      },
      {
        label: "Email Writer Pro",
        href: "#showcase",
        icon: <Mail className="w-5 h-5" />,
        description: "Create converting email campaigns",
      },
    ],
  },
];
