import React from "react";
import { ChevronRight } from "lucide-react";
import { mainTools } from "./NavigationItems/PremiumToolsItems";

interface PremiumToolsSectionProps {
  isCollapsed?: boolean;
}

const PremiumToolsSection: React.FC<PremiumToolsSectionProps> = ({
  isCollapsed,
}) => {
  return (
    <div className="border-t border-neutral-100">
      <div className="p-2">
        {!isCollapsed && (
          <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider px-2 mb-2">
            Premium Tools
          </div>
        )}

        <div className="space-y-1">
          {mainTools.map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-50 transition-all group relative"
            >
              <div
                className={`${
                  isCollapsed ? "w-10 h-10" : "w-10 h-10"
                } rounded-xl bg-gradient-to-br ${
                  tool.bgGradient
                } flex items-center justify-center text-white shadow-sm transform group-hover:scale-105 transition-all`}
              >
                {tool.icon}
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-neutral-900">
                      {tool.label}
                    </span>
                    {tool.isNew && (
                      <span className="px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
                        New
                      </span>
                    )}
                    {tool.isPro && (
                      <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-medium">
                        Pro
                      </span>
                    )}
                  </div>
                </div>
              )}

              {!isCollapsed && (
                <div className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumToolsSection;
