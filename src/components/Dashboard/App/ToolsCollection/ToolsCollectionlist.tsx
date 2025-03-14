import {
  Bot,
  FileText,
  Image,
  Video,
  Mic,
  Brain,
  Wand2,
  PenTool,
  Code,
  Search,
} from "lucide-react";
import { ToolCategory } from "@/components/types/Dashboard/SecondaryNavigation";
export const toolsCollectionlist: ToolCategory[] = [
  {
    id: "content",
    label: "Content Creation",
    icon: PenTool,
    description: "Create engaging content with AI",
    tools: [
      {
        id: "blog-writer",
        name: "Blog Writer Pro",
        description: "Create SEO-optimized blog content instantly",
        icon: FileText,
        gradient: "from-primary-500 to-secondary-500",
        metrics: { views: "220K", likes: "1K" },
        isPro: true,
        category: "Writing",
      },
      {
        id: "smart-editor",
        name: "Smart Editor",
        description: "AI-powered content editing and refinement",
        icon: PenTool,
        gradient: "from-indigo-500 to-blue-500",
        metrics: { views: "180K", likes: "950" },
        category: "Writing",
      },
    ],
  },
  {
    id: "media",
    label: "Media Generation",
    icon: Image,
    description: "Generate visual and audio content",
    tools: [
      {
        id: "image-creator",
        name: "Image Generator",
        description: "Create stunning visuals with AI",
        icon: Image,
        gradient: "from-purple-500 to-pink-500",
        metrics: { views: "190K", likes: "980" },
        isNew: true,
        category: "Visual",
      },
      {
        id: "video-studio",
        name: "Video Studio Pro",
        description: "Professional video content creation",
        icon: Video,
        gradient: "from-orange-500 to-red-500",
        metrics: { views: "150K", likes: "850" },
        isPro: true,
        category: "Video",
      },
      {
        id: "voice-master",
        name: "Voice Master",
        description: "Advanced voice synthesis and editing",
        icon: Mic,
        gradient: "from-emerald-500 to-teal-500",
        metrics: { views: "130K", likes: "780" },
        category: "Audio",
      },
    ],
  },
  {
    id: "ai-tools",
    label: "AI Tools",
    icon: Brain,
    description: "Advanced AI-powered utilities",
    tools: [
      {
        id: "code-assistant",
        name: "Code Assistant",
        description: "AI-powered code generation and review",
        icon: Code,
        gradient: "from-cyan-500 to-blue-500",
        metrics: { views: "160K", likes: "890" },
        isNew: true,
        category: "Development",
      },
      {
        id: "seo-optimizer",
        name: "SEO Optimizer",
        description: "Optimize content for search engines",
        icon: Search,
        gradient: "from-green-500 to-emerald-500",
        metrics: { views: "140K", likes: "820" },
        isPro: true,
        category: "Marketing",
      },
      {
        id: "ai-assistant",
        name: "AI Assistant",
        description: "Your personal AI productivity companion",
        icon: Bot,
        gradient: "from-violet-500 to-purple-500",
        metrics: { views: "170K", likes: "910" },
        category: "Productivity",
      },
    ],
  },
];
