import React from "react";
import {
  ListTree,
  PlusCircle,
  Edit3,
  Link2,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Minimize2,
} from "lucide-react";
import { Node } from "reactflow";

type Tab = "ai-generate" | "nodes" | "create" | "edit" | "connect";

interface SidebarTabsProps {
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
  selectedNode: Node | null;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedNode,
  isCollapsed,
  toggleCollapse,
}) => (
  <div
    className="border-r border-neutral-200 bg-white h-full flex flex-col shadow-sm transition-all duration-300 ease-in-out"
    style={{ width: isCollapsed ? "64px" : "8rem" }}
  >
    {/* Collapse Button */}
    <div className="p-2 border-b border-neutral-100 flex justify-center">
      <button
        onClick={toggleCollapse}
        className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors hover:text-primary-600 hover:shadow-sm"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight size={20} strokeWidth={2.5} />
        ) : (
          <Minimize2 size={18} strokeWidth={2} />
        )}
      </button>
    </div>

    {/* Tabs */}
    <div className="flex flex-col h-full py-3 space-y-1">
      <TabButton
        icon={<BrainCircuit />}
        label="AI"
        isActive={activeTab === "ai-generate"}
        onClick={() => setActiveTab("ai-generate")}
        highlight
        isCollapsed={isCollapsed}
      />
      <TabButton
        icon={<ListTree />}
        label="Nodes"
        isActive={activeTab === "nodes"}
        onClick={() => setActiveTab("nodes")}
        isCollapsed={isCollapsed}
      />
      <TabButton
        icon={<PlusCircle />}
        label="Create"
        isActive={activeTab === "create"}
        onClick={() => setActiveTab("create")}
        isCollapsed={isCollapsed}
      />
      <TabButton
        icon={<Edit3 />}
        label="Edit"
        isActive={activeTab === "edit"}
        onClick={() => setActiveTab("edit")}
        disabled={!selectedNode}
        isCollapsed={isCollapsed}
      />
      <TabButton
        icon={<Link2 />}
        label="Connect"
        isActive={activeTab === "connect"}
        onClick={() => setActiveTab("connect")}
        isCollapsed={isCollapsed}
      />
    </div>
  </div>
);

interface TabButtonProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  highlight?: boolean;
  isCollapsed: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({
  icon,
  label,
  isActive,
  onClick,
  disabled = false,
  highlight = false,
  isCollapsed,
}) => {
  // Base classes for the button
  const baseClasses =
    "relative flex items-center w-full transition-all duration-200 py-2.5 " +
    (isCollapsed ? "justify-center px-2" : "px-3");

  // Active state classes
  const activeClasses = isActive
    ? "text-primary-600 font-medium bg-primary-50 after:absolute after:left-0 after:top-1/4 after:bottom-1/4 after:w-1 after:rounded-r-md after:bg-primary-600"
    : "text-neutral-600 hover:text-primary-600 hover:bg-neutral-50";

  // Disabled state classes
  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed hover:text-neutral-500 hover:bg-transparent"
    : "cursor-pointer hover:shadow-sm";

  // Highlight classes for special items like AI
  const highlightClasses = highlight && !isActive ? "text-primary-600" : "";

  return (
    <button
      className={`${baseClasses} ${activeClasses} ${disabledClasses} ${highlightClasses}`}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      {/* Icon Container */}
      <div
        className={`flex items-center justify-center transition-all duration-200 ${
          isActive
            ? `${
                isCollapsed ? "w-10 h-10" : "w-8 h-8"
              } rounded-lg bg-primary-100`
            : `${isCollapsed ? "w-10 h-10" : "w-8 h-8"} rounded-lg ${
                highlight ? "bg-primary-50" : ""
              }`
        }`}
      >
        {React.cloneElement(icon as React.ReactElement, {
          className: `${isCollapsed ? "w-5 h-5" : "w-5 h-5"} ${
            isActive
              ? "text-primary-600"
              : highlight && !isActive
              ? "text-primary-500"
              : "text-neutral-500"
          } transition-all`,
          strokeWidth: isActive ? 2.5 : 2,
          "aria-hidden": "true",
        })}
      </div>

      {/* Label (hidden when collapsed) */}
      {!isCollapsed && (
        <span className="ml-3 text-sm font-medium truncate transition-all duration-300 ease-in-out">
          {highlight && !isActive ? `*${label}` : label}
        </span>
      )}
    </button>
  );
};

export default SidebarTabs;
