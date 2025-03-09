import {
  Bot,
  ArrowRight,
  Heart,
  Eye,
  FileText,
  PenTool,
  Image,
  Video,
  Mic,
  Code,
  Search,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
// Define proper types for our data
export interface ToolDetail {
  id: number;
  details: JSON;
  tool: Tool;
}
export interface ToolInfo {
  id: number;
  name: string;
  subcategory: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
}
export interface Tool {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  icon: string;
  gradient: string;
  is_pro: boolean;
  is_new: boolean;
  details?: JSON;
  created_at: string;
  updated_at: string;
  metrics?: {
    views: string;
    likes: string;
  };
  category: Category; // Reference to the category
  subcategory: Subcategory; // Reference to the subcategory
}

// Type definitions
export interface FieldOption {
  id: string;
  label: string;
  value?: string;
  description?: string;
  icon?: string;
  words?: number;
}

export interface FormField {
  type:
    | "input"
    | "textarea"
    | "dropdown"
    | "buttonGroup"
    | "slider"
    | "counter"
    | "toggle";
  name: string;
  label: string;
  placeholder?: string;
  icon?: string;
  size?: string;
  rows?: number;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<FieldOption | string>;
  validate?: (value: any) => string | null;
  defaultValue?: any;
}

export interface FormRow {
  fields: FormField[];
}

export interface ToolConfig {
  id: string;
  formTitle: string;
  description: string;
  headerIcon: string;
  rows: FormRow[];
  submitButton: {
    label: string;
    icon: string;
    loadingLabel: string;
    loadingIcon: string;
  };
  resultTitle?: string;
  resultDescription?: string;
}
export interface Subcategory {
  id: number;
  category_id: number; // Foreign key referencing Category
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  category: Category; // Reference back to Category (optional)
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  subcategories?: Subcategory[]; // Array of subcategories
}
