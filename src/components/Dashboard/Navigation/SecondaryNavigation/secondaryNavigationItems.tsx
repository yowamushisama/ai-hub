import {
  ToolCategory,
  Tool,
} from "@/components/types/Dashboard/SecondaryNavigation";
import {
  Search,
  PenTool,
  Image,
  Mic,
  Video,
  Bot,
  Star,
  Globe,
  Share2,
  ChevronRight,
  Layout,
  Mail,
  Wand2,
  Sparkles,
} from "lucide-react";

export const toolCategories: ToolCategory[] = [
  {
    id: "all",
    label: "All Tools",
    icon: Layout,
    tools: [
      {
        id: "blog-writer",
        name: "Blog Writer Pro",
        description: "Create SEO-optimized blog posts instantly",
        icon: PenTool,
        isPro: true,
        category: "content",
      },
      {
        id: "image-gen",
        name: "Image Generator",
        description: "Create stunning visuals with AI",
        icon: Image,
        isPro: true,
        isNew: true,
        category: "visual",
      },
      {
        id: "voice-gen",
        name: "Voice Generator",
        description: "Convert text to natural speech",
        icon: Mic,
        isPro: true,
        category: "audio",
      },
      {
        id: "video-creator",
        name: "Video Creator",
        description: "Create and edit videos with AI",
        icon: Video,
        isNew: true,
        category: "visual",
      },
      {
        id: "email-writer",
        name: "Email Writer",
        description: "Generate professional emails",
        icon: Mail,
        category: "content",
      },
      {
        id: "ai-assistant",
        name: "AI Assistant",
        description: "24/7 AI-powered help",
        icon: Bot,
        category: "assistant",
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: PenTool,
    tools: [
      {
        id: "blog-writer",
        name: "Blog Writer Pro",
        description: "Create SEO-optimized blog posts instantly",
        icon: PenTool,
        isPro: true,
        category: "content",
      },
      {
        id: "email-writer",
        name: "Email Writer",
        description: "Generate professional emails",
        icon: Mail,
        category: "content",
      },
    ],
  },
  {
    id: "visual",
    label: "Visual & Audio",
    icon: Image,
    tools: [
      {
        id: "image-gen",
        name: "Image Generator",
        description: "Create stunning visuals with AI",
        icon: Image,
        isPro: true,
        isNew: true,
        category: "visual",
      },
      {
        id: "video-creator",
        name: "Video Creator",
        description: "Create and edit videos with AI",
        icon: Video,
        isNew: true,
        category: "visual",
      },
      {
        id: "voice-gen",
        name: "Voice Generator",
        description: "Convert text to natural speech",
        icon: Mic,
        isPro: true,
        category: "audio",
      },
    ],
  },
];
