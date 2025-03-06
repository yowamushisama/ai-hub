import {
  Brain,
  Target,
  Star,
  BookOpen,
  MessagesSquare,
  Rocket,
  Lightbulb,
  LucideIcon,
} from "lucide-react";

export interface Tone {
  value: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Industry {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const tones: Tone[] = [
  {
    value: "professional",
    label: "Professional",
    icon: Target,
    description: "Formal and authoritative tone",
  },
  {
    value: "conversational",
    label: "Conversational",
    icon: MessagesSquare,
    description: "Friendly and approachable style",
  },
  {
    value: "educational",
    label: "Educational",
    icon: BookOpen,
    description: "Informative and instructional",
  },
  {
    value: "persuasive",
    label: "Persuasive",
    icon: Rocket,
    description: "Compelling and action-oriented",
  },
  {
    value: "creative",
    label: "Creative",
    icon: Lightbulb,
    description: "Unique and engaging approach",
  },
];

export const languages: Language[] = [
  { code: "english", name: "English", flag: "🇺🇸" },
  { code: "spanish", name: "Spanish", flag: "🇪🇸" },
  { code: "french", name: "French", flag: "🇫🇷" },
  { code: "german", name: "German", flag: "🇩🇪" },
  { code: "italian", name: "Italian", flag: "🇮🇹" },
  { code: "portuguese", name: "Portuguese", flag: "🇵🇹" },
  { code: "dutch", name: "Dutch", flag: "🇳🇱" },
  { code: "chinese", name: "Chinese", flag: "🇨🇳" },
  { code: "japanese", name: "Japanese", flag: "🇯🇵" },
  { code: "korean", name: "Korean", flag: "🇰🇷" },
];

export const industries: Industry[] = [
  { value: "technology", label: "Technology", icon: Brain },
  { value: "marketing", label: "Marketing", icon: Target },
  { value: "finance", label: "Finance", icon: Star },
  { value: "health", label: "Healthcare", icon: Star },
  { value: "education", label: "Education", icon: BookOpen },
  { value: "ecommerce", label: "E-Commerce", icon: Star },
];

export interface FormData {
  topic: string;
  keywords: string;
  tone: string;
  length: string;
  industry: string;
  language: string;
  titleCount: number;
  targetAudience: string;
  includeNumbers: boolean;
  includePowerWords: boolean;
}

export interface GeneratedTitle {
  title: string;
  metrics: {
    score: number;
    seo: number;
    readability: number;
  };
}

export const defaultFormData: FormData = {
  topic: "",
  keywords: "",
  tone: "professional",
  length: "medium",
  industry: "",
  language: "english",
  titleCount: 5,
  targetAudience: "",
  includeNumbers: true,
  includePowerWords: true,
};
