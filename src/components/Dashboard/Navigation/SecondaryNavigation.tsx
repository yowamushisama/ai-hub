import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { toolCategories } from "./SecondaryNavigation/secondaryNavigationItems";

const SecondaryNavigation = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = toolCategories.find(
    (cat) => cat.id === selectedCategory
  );
  const filteredTools = activeCategory?.tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-white flex flex-col h-full overflow-hidden">
      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full h-9 bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-4 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-2 space-y-1">
          {toolCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  category.id === selectedCategory
                    ? "bg-primary-50 text-primary-600"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                <CategoryIcon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tools List */}
        {activeCategory && filteredTools && (
          <div className="p-2 border-t border-neutral-100">
            <div className="flex items-center justify-between px-3 py-2">
              <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {activeCategory.label}
              </h3>
              <span className="text-xs text-neutral-400">
                {filteredTools.length} tools
              </span>
            </div>
            <div className="space-y-1">
              {filteredTools.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-neutral-50 transition-colors group text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <ToolIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-neutral-900">
                          {tool.name}
                        </span>
                        <div className="flex gap-1">
                          {tool.isNew && (
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                              New
                            </span>
                          )}
                          {tool.isPro && (
                            <span className="px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
                              Pro
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Rest of the component remains the same */}
      <div className="p-2 border-t border-neutral-100">
        <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 border border-primary-500/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-medium text-sm text-neutral-900">
              Upgrade to Pro
            </h3>
          </div>
          <p className="text-xs text-neutral-600 mb-3">
            Get access to all premium features and tools
          </p>
          <button className="w-full py-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-shadow">
            Upgrade Now
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default SecondaryNavigation;
