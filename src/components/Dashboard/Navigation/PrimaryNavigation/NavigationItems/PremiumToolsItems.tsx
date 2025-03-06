import { Camera, Film, Mic, ChevronRight } from "lucide-react";

import { MainTool } from "@/components/types/PrimaryNavigation";
export const mainTools: MainTool[] = [
  {
    icon: <Camera className="w-4 h-4" />,
    label: "DreamCanvas AI",
    href: "/tools/image",
    bgGradient: "from-secondary-400 to-accent-400",
    isPro: true,
  },
  {
    icon: <Film className="w-4 h-4" />,
    label: "MotionForge Pro",
    href: "/tools/video",
    bgGradient: "from-accent-400 to-primary-400",
  },
  {
    icon: <Mic className="w-4 h-4" />,
    label: "VoiceStudio AI",
    href: "/tools/voice",
    bgGradient: "from-primary-400 via-secondary-400 to-accent-400",
    isNew: true,
  },
];
