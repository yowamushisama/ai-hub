import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Palette,
  ChevronDown,
  Check,
  LucideIcon,
} from "lucide-react";

// Types
export type Format =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "left"
  | "center"
  | "right"
  | "h1"
  | "h2"
  | "undo"
  | "redo";

export type EditorStyle = "professional" | "modern" | "creative" | "minimal";

interface Style {
  id: EditorStyle;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface EditorToolbarProps {
  onFormatClick: (format: Format) => void;
  activeFormats: Format[];
  onStyleChange: (style: EditorStyle) => void;
  currentStyle: EditorStyle;
  disabled?: boolean;
}

// Style definitions for the style dropdown
const STYLES: Style[] = [
  {
    id: "professional",
    label: "Professional",
    description: "Clean and formal style for business content",
    icon: <span className="text-blue-500">P</span>,
  },
  {
    id: "modern",
    label: "Modern",
    description: "Contemporary and bold design with gradients",
    icon: <span className="text-purple-500">M</span>,
  },
  {
    id: "creative",
    label: "Creative",
    description: "Playful and engaging with italics and accent colors",
    icon: <span className="text-pink-500">C</span>,
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Simple and elegant with light weighting",
    icon: <span className="text-gray-500">m</span>,
  },
];

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onFormatClick,
  activeFormats,
  onStyleChange,
  currentStyle,
  disabled = false,
}) => {
  const [isStylesOpen, setIsStylesOpen] = useState(false);
  const styleDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        styleDropdownRef.current &&
        !styleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStylesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toolbarButtonClass = (isActive: boolean): string => `
    p-2 rounded-lg transition-all duration-200
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${
      isActive
        ? "bg-primary-100 text-primary-700 shadow-sm transform scale-105"
        : "text-neutral-600 hover:bg-neutral-100 hover:text-primary-600"
    }
  `;

  const handleFormatClick = (format: Format) => {
    if (!disabled) {
      onFormatClick(format);
    }
  };

  const renderToolbarButton = (
    icon: LucideIcon,
    format: Format,
    title: string
  ) => {
    const Icon = icon;
    return (
      <button
        onClick={() => handleFormatClick(format)}
        className={toolbarButtonClass(activeFormats.includes(format))}
        title={title}
        disabled={disabled}
        aria-label={title}
      >
        <Icon className="w-4 h-4" />
      </button>
    );
  };

  const selectedStyle = STYLES.find((s) => s.id === currentStyle) || STYLES[0];

  return (
    <div className="border-b border-neutral-200 bg-white sticky top-0 z-10">
      <div className="p-3 flex items-center gap-3 flex-wrap">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 px-2 py-1 bg-neutral-50 rounded-lg shadow-sm">
          {renderToolbarButton(Bold, "bold", "Bold")}
          {renderToolbarButton(Italic, "italic", "Italic")}
          {renderToolbarButton(Underline, "underline", "Underline")}
          {renderToolbarButton(Strikethrough, "strike", "Strikethrough")}
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 px-2 py-1 bg-neutral-50 rounded-lg shadow-sm">
          {renderToolbarButton(AlignLeft, "left", "Align Left")}
          {renderToolbarButton(AlignCenter, "center", "Center")}
          {renderToolbarButton(AlignRight, "right", "Right")}
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 px-2 py-1 bg-neutral-50 rounded-lg shadow-sm">
          {renderToolbarButton(Heading1, "h1", "Heading 1")}
          {renderToolbarButton(Heading2, "h2", "Heading 2")}
        </div>

        {/* History */}
        <div className="flex items-center gap-1 px-2 py-1 bg-neutral-50 rounded-lg shadow-sm">
          {renderToolbarButton(Undo, "undo", "Undo")}
          {renderToolbarButton(Redo, "redo", "Redo")}
        </div>

        {/* Spacer */}
        <div className="flex-1" />
      </div>

      {/* Styles Bar */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-600">Style:</span>
          </div>
          <div ref={styleDropdownRef} className="relative">
            <button
              onClick={() => !disabled && setIsStylesOpen(!isStylesOpen)}
              disabled={disabled}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {selectedStyle.icon}
              </div>
              <span className="text-sm font-medium">{selectedStyle.label}</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                  isStylesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isStylesOpen && !disabled && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 p-2 z-50">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      onStyleChange(style.id);
                      setIsStylesOpen(false);
                    }}
                    className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-all"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        style.id === currentStyle
                          ? "bg-primary-100"
                          : "bg-neutral-100"
                      }`}
                    >
                      {style.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm text-neutral-900">
                        {style.label}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {style.description}
                      </div>
                    </div>
                    {currentStyle === style.id && (
                      <Check className="w-4 h-4 text-primary-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
