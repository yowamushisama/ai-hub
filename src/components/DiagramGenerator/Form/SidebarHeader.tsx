import React from "react";
import * as LucideIcons from "lucide-react";

interface SidebarHeaderProps {
  formTitle: string;
  tagline?: string;
  headerIcon: string;
  enhancedHeaderStyle?: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  formTitle,
  tagline,
  headerIcon,
  enhancedHeaderStyle = false,
}) => {
  // Helper to get Lucide icon by name
  const getIcon = (name: string, className: string = "w-5 h-5") => {
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <div className="border-b border-neutral-200">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`${
              enhancedHeaderStyle
                ? "p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg text-white"
                : "p-2 bg-primary-50 rounded-lg text-primary-600"
            }`}
          >
            {getIcon(headerIcon, enhancedHeaderStyle ? "w-6 h-6" : "w-5 h-5")}
          </div>
          <div>
            <h2
              className={`${
                enhancedHeaderStyle
                  ? "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
                  : "text-lg font-semibold text-neutral-900"
              }`}
            >
              {formTitle}
            </h2>
            {tagline && <p className="text-sm text-neutral-500">{tagline}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
