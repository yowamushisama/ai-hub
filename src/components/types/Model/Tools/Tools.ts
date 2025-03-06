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
