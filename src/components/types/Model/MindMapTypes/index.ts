// Type definitions for the configuration
export interface MindMapConfig {
  id: string;
  title: string;
  description: string;
  headerIcon: string;
  sections: Section[];
  examplePrompts?: string[];
  submitButton: {
    label: string;
    loadingLabel: string;
    icon: string;
    loadingIcon: string;
  };
  tipText?: {
    title?: string;
    content?: string;
  };
  styling?: {
    colors?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      [key: string]: string | undefined;
    };
    borderRadius?: string;
    headerGradient?: string;
    fontFamily?: string;
    [key: string]: any;
  };
  customRenderers?: {
    sections?: Record<string, (section: Section) => React.ReactNode>;
    fields?: Record<
      string,
      (
        field: Field,
        value: any,
        onChange: (value: any) => void
      ) => React.ReactNode
    >;
  };
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  description?: string;
  defaultOpen?: boolean;
  fields: Field[];
}

export type FieldType =
  | "input"
  | "textarea"
  | "dropdown"
  | "buttonGroup"
  | "toggle"
  | "checkbox"
  | "radio"
  | "slider"
  | "colorPicker";

export interface BaseField {
  type: FieldType;
  name: string;
  label: string;
  icon?: string;
  required?: boolean;
  helpText?: string;
  defaultValue?: any;
  visibleWhen?: {
    field: string;
    operator: "equals" | "notEquals" | "contains" | "gt" | "lt";
    value: any;
  };
}

export interface InputField extends BaseField {
  type: "input" | "textarea";
  placeholder?: string;
  rows?: number;
  size?: string;
}

export interface OptionField extends BaseField {
  type: "dropdown" | "buttonGroup" | "radio";
  options: Array<{
    id: string;
    label: string;
    icon?: string;
    description?: string;
  }>;
  layout?: "vertical" | "horizontal" | "grid";
  columnsCount?: number;
}

export interface ToggleField extends BaseField {
  type: "toggle" | "checkbox";
}

export interface SliderField extends BaseField {
  type: "slider";
  min: number;
  max: number;
  step?: number;
}

export type Field = InputField | OptionField | ToggleField | SliderField;

export interface GenericMindMapGeneratorProps {
  toolId: string;
  config: MindMapConfig;
  formValues: Record<string, any>;
  onFormChange: (formData: Record<string, any>) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

// New interface to wrap the MindMapConfig from your API response
export interface ToolMindMapTemplateResponse {
  id: number;
  details: MindMapConfig;
  tool: {
    id: number;
    name: string;
    short_description: string;
    long_description: string;
    icon: string;
    gradient: string;
    is_pro: boolean;
    is_new: boolean;
    created_at: string;
    updated_at: string;
    subcategory: {
      id: number;
      name: string;
      description: string;
      created_at: string;
      updated_at: string;
      category: {
        id: number;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
      };
    };
  };
}
