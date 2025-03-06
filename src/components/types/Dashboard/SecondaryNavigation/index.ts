import { LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
  metrics?: {
    views: string;
    likes: string;
  };
  isPro?: boolean;
  isNew?: boolean;
  category: string;
}

export interface ToolCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  tools: Tool[];
}
