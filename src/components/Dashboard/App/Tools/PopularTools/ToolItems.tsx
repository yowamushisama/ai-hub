import {
  Search,
  Sparkles,
  ArrowRight,
  PenTool,
  ImageIcon,
  Mic,
  Video,
  Wand2,
  Bot,
  Crown,
  FileText,
} from "lucide-react";
import { Tool } from "@/components/types/Dashboard/Tools";
export const popularTools: Tool[] = [
  {
    title: "Blog Writer Pro",
    description: "Create engaging blog posts with AI",
    icon: <PenTool className="w-6 h-6" />,
    gradient: "from-primary-500 to-secondary-500",
  },
  {
    title: "Image Generator",
    description: "Generate stunning visuals instantly",
    icon: <ImageIcon className="w-6 h-6" />,
    gradient: "from-secondary-500 to-accent-500",
    isNew: true,
  },
  {
    title: "Voice Studio",
    description: "Convert text to natural speech",
    icon: <Mic className="w-6 h-6" />,
    gradient: "from-accent-500 to-primary-500",
  },
  {
    title: "Video Creator",
    description: "Create engaging video content",
    icon: <Video className="w-6 h-6" />,
    gradient: "from-primary-500 to-accent-500",
  },
];
