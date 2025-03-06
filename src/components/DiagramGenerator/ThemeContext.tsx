// src/components/DiagramGenerator/context/ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useEffect } from "react";

// MindMap theme type
export type MindMapTheme = "default" | "ocean" | "forest" | "sunset" | "purple";

// Theme definitions for various theme options
const themeDefinitions: Record<MindMapTheme, Record<string, string>> = {
  default: {
    // Default theme already defined in CSS custom properties
  },
  ocean: {
    "--primary-600": "#0072ff",
    "--primary-500": "#0284c7",
    "--primary-400": "#38bdf8",
    "--secondary-600": "#00c6ff",
    "--secondary-500": "#0ea5e9",
    "--secondary-400": "#7dd3fc",
    "--accent-600": "#0891b2",
    "--accent-500": "#06b6d4",
    "--accent-400": "#22d3ee",
  },
  forest: {
    "--primary-600": "#059669",
    "--primary-500": "#10b981",
    "--primary-400": "#34d399",
    "--secondary-600": "#2dd4bf",
    "--secondary-500": "#14b8a6",
    "--secondary-400": "#5eead4",
    "--accent-600": "#16a34a",
    "--accent-500": "#22c55e",
    "--accent-400": "#4ade80",
  },
  sunset: {
    "--primary-600": "#f97316",
    "--primary-500": "#fb923c",
    "--primary-400": "#fdba74",
    "--secondary-600": "#f43f5e",
    "--secondary-500": "#fb7185",
    "--secondary-400": "#fda4af",
    "--accent-600": "#e11d48",
    "--accent-500": "#f43f5e",
    "--accent-400": "#fb7185",
  },
  purple: {
    "--primary-600": "#7c3aed",
    "--primary-500": "#8b5cf6",
    "--primary-400": "#a78bfa",
    "--secondary-600": "#c026d3",
    "--secondary-500": "#d946ef",
    "--secondary-400": "#e879f9",
    "--accent-600": "#9333ea",
    "--accent-500": "#a855f7",
    "--accent-400": "#c084fc",
  },
};

// Theme context type definition
interface ThemeContextType {
  theme: MindMapTheme;
  setTheme: (theme: MindMapTheme) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "default",
  setTheme: () => {},
});

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
  currentTheme: MindMapTheme;
  onChangeTheme?: (theme: MindMapTheme) => void;
}

// Custom ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  currentTheme,
  onChangeTheme,
}) => {
  // Apply theme CSS variables when theme changes
  useEffect(() => {
    // Get the theme definition
    const themeVars = themeDefinitions[currentTheme];
    if (!themeVars) return;

    // Apply theme variables to :root
    const root = document.documentElement;
    Object.entries(themeVars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Cleanup on unmount or theme change
    return () => {
      if (currentTheme !== "default") {
        // Reset to default theme
        Object.keys(themeVars).forEach((prop) => {
          root.style.removeProperty(prop);
        });
      }
    };
  }, [currentTheme]);

  // Function to change the theme
  const setTheme = (theme: MindMapTheme) => {
    if (onChangeTheme) {
      onChangeTheme(theme);
    }
  };

  const value = {
    theme: currentTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
