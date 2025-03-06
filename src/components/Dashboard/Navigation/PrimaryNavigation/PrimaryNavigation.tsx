"use client";
import React, { useState, useEffect } from "react";
import {
  Settings,
  User,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ChevronLeft, // Added import for ChevronLeft
  Share2,
  Zap,
} from "lucide-react";
import { navigationItems } from "./NavigationItems/NavItems";
import PremiumToolsSection from "./PremiumToolsSection";
import { NavItem, SubItem } from "@/components/types/PrimaryNavigation";

interface PrimaryNavigationProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  // For mobile overlay mode: if true, the nav is shown as a modal/drawer.
  isMobileOverlay?: boolean;
  onCloseMobileNav?: () => void;
}

const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOverlay = false,
  onCloseMobileNav,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isProfileExpanded, setIsProfileExpanded] = useState<boolean>(false);

  const handleSectionClick = (label: string): void => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  // When the sidebar is collapsed, close any expanded sections or profile
  useEffect(() => {
    if (isCollapsed) {
      setExpandedSection(null);
      setIsProfileExpanded(false);
    }
  }, [isCollapsed]);

  const renderNavigationItem = (
    item: NavItem | "divider",
    index: number
  ): React.ReactNode => {
    if (item === "divider") {
      return <div key={index} className="h-px bg-neutral-100 my-2" />;
    }

    return (
      <div key={index} className={`px-2 ${isCollapsed ? "px-1" : "px-2"}`}>
        <button
          onClick={() => {
            if (item.subItems) {
              handleSectionClick(item.label);
            }
            // On mobile overlay mode, close the nav after selecting an item
            if (isMobileOverlay && onCloseMobileNav) {
              onCloseMobileNav();
            }
          }}
          className={`w-full flex items-center gap-3 p-2 text-neutral-600 hover:text-neutral-900 rounded-lg transition-all duration-300 group ${
            expandedSection === item.label
              ? "bg-neutral-50"
              : "hover:bg-neutral-50/80"
          }`}
        >
          {/* Icon container */}
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
              expandedSection === item.label
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-600 group-hover:bg-primary-50 group-hover:text-primary-600"
            }`}
          >
            {item.icon}
          </div>

          {/* Label and badges */}
          {!isCollapsed && (
            <div className="flex-1 text-left flex items-center gap-2">
              <span className="font-medium text-sm">{item.label}</span>
              {item.isNew && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                  New
                </span>
              )}
            </div>
          )}

          {/* Dropdown arrow */}
          {!isCollapsed && item.subItems && (
            <ChevronDown
              className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                expandedSection === item.label ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {/* Subitems dropdown */}
        {!isCollapsed && item.subItems && expandedSection === item.label && (
          <div className="mt-1 ml-10 space-y-1">
            {item.subItems.map((subItem: SubItem, subIndex: number) => (
              <a
                key={subIndex}
                href={subItem.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm group ${
                  subItem.highlight ? "bg-primary-50/50" : "hover:bg-neutral-50"
                }`}
                onClick={() => {
                  if (isMobileOverlay && onCloseMobileNav) {
                    onCloseMobileNav();
                  }
                }}
              >
                <div className="text-neutral-600 group-hover:text-primary-600 transition-all duration-300">
                  {subItem.icon}
                </div>
                <span className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {subItem.label}
                </span>
                {subItem.isPro && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
                    Pro
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`
        ${isMobileOverlay ? "fixed inset-y-0 left-0 z-50" : ""}
        ${isMobileOverlay ? "w-64" : isCollapsed ? "w-16" : "w-64"}
        h-screen bg-white border-r border-neutral-200 flex flex-col transition-all duration-300
      `}
    >
      {/* For mobile overlay, add a close button */}
      {isMobileOverlay && (
        <div className="flex justify-end p-2">
          <button
            onClick={onCloseMobileNav}
            className="p-1 rounded hover:bg-neutral-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Scrollable Navigation Content */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
        {navigationItems.map((item, index) =>
          renderNavigationItem(item, index)
        )}
        {/* Premium Tools Section */}
        <PremiumToolsSection isCollapsed={isCollapsed} />
        {/* User Profile */}
        <div className="p-2 border-t border-neutral-100 shrink-0">
          <button
            onClick={() => {
              if (!isCollapsed) setIsProfileExpanded(!isProfileExpanded);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-medium text-sm">
              AH
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-medium text-sm text-neutral-900 truncate">
                    Alex Hamilton
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary-600" />
                    <span className="text-xs text-primary-600">Pro</span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    isProfileExpanded ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {!isCollapsed && isProfileExpanded && (
            <div className="mt-1 p-1 bg-neutral-50 rounded-lg">
              <div className="space-y-1">
                <a
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-white transition-colors text-sm"
                  onClick={() => {
                    if (isMobileOverlay && onCloseMobileNav) onCloseMobileNav();
                  }}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </a>
                <a
                  href="/settings"
                  className="flex items-center gap-2 px-3 py-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-white transition-colors text-sm"
                  onClick={() => {
                    if (isMobileOverlay && onCloseMobileNav) onCloseMobileNav();
                  }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </a>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-white transition-colors text-sm"
                  onClick={() => {
                    if (isMobileOverlay && onCloseMobileNav) onCloseMobileNav();
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
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
    </nav>
  );
};

export default PrimaryNavigation;
