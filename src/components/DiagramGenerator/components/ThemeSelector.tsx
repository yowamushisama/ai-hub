// components/ThemeSelector.tsx
import React, { useState } from "react";
import { Check, Palette, ChevronDown } from "lucide-react";
import { MindMapTheme } from "../types";

interface ThemeSelectorProps {
  currentTheme: MindMapTheme;
  onChangeTheme: (theme: MindMapTheme) => void;
}

interface ThemeOption {
  id: MindMapTheme;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onChangeTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes: ThemeOption[] = [
    {
      id: "default",
      label: "Default",
      primaryColor: "var(--primary-600)",
      secondaryColor: "var(--secondary-600)",
      accentColor: "var(--accent-600)",
    },
    {
      id: "ocean",
      label: "Ocean Blue",
      primaryColor: "#0072ff",
      secondaryColor: "#00c6ff",
      accentColor: "#0891b2",
    },
    {
      id: "forest",
      label: "Forest Green",
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      accentColor: "#34d399",
    },
    {
      id: "sunset",
      label: "Sunset Orange",
      primaryColor: "#f97316",
      secondaryColor: "#fb923c",
      accentColor: "#fdba74",
    },
    {
      id: "purple",
      label: "Royal Purple",
      primaryColor: "#7c3aed",
      secondaryColor: "#8b5cf6",
      accentColor: "#a78bfa",
    },
  ];

  const selectedTheme =
    themes.find((theme) => theme.id === currentTheme) || themes[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-lg shadow-sm hover:bg-white transition-colors"
      >
        <Palette className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-neutral-700">Theme</span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-60 bg-white rounded-xl border border-neutral-200 shadow-lg p-2 z-10">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onChangeTheme(theme.id);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-all"
            >
              <div className="flex-1 flex items-center gap-2">
                <div className="flex">
                  <div
                    className="w-4 h-8 rounded-l-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div
                    className="w-3 h-8"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                  <div
                    className="w-2 h-8 rounded-r-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>
                <span className="font-medium text-sm">{theme.label}</span>
              </div>
              {currentTheme === theme.id && (
                <Check className="w-4 h-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
