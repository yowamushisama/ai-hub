import { Tone, LengthOption, TitleOption } from "../../types/ToolGenerator";

// Sample data
export const tones: Tone[] = [
  {
    id: "professional",
    label: "Professional",
    icon: "👔",
    description: "Formal and business-oriented tone",
  },
  {
    id: "casual",
    label: "Casual",
    icon: "😊",
    description: "Friendly and conversational style",
  },
  {
    id: "persuasive",
    label: "Persuasive",
    icon: "🎯",
    description: "Compelling and action-oriented",
  },
  {
    id: "informative",
    label: "Informative",
    icon: "📚",
    description: "Educational and detailed approach",
  },
];

export const industries = [
  "Technology",
  "Marketing",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Real Estate",
  "Travel",
  "Food & Beverage",
  "Fashion",
];
export const titleOptions: TitleOption[] = [
  { value: 3, label: "3 titles" },
  { value: 5, label: "5 titles" },
  { value: 10, label: "10 titles" },
];

export const lengthOptions: LengthOption[] = [
  { id: "short", label: "Short", words: "5-8" },
  { id: "medium", label: "Medium", words: "8-12" },
  { id: "long", label: "Long", words: "12-15" },
];
