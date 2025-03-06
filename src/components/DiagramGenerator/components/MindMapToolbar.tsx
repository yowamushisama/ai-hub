// components/MindMapToolbar.tsx
import React from "react";
import {
  Plus,
  Trash2,
  Download,
  Share2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Layout,
  PanelLeft,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
interface MindMapToolbarProps {
  onAddNode: () => void;
  onDeleteSelected: () => void;
  onExport: () => void;
  canDelete: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const MindMapToolbar: React.FC<MindMapToolbarProps> = ({
  onAddNode,
  onDeleteSelected,
  onExport,
  canDelete,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}) => {
  const { theme } = useTheme();

  // Define node templates for drag and drop
  const nodeTemplates = [
    {
      type: "customNode",
      label: "Task",
      color: "var(--primary-600)",
      shape: "rounded",
    },
    {
      type: "customNode",
      label: "Idea",
      color: "var(--secondary-600)",
      shape: "pill",
    },
    {
      type: "customNode",
      label: "Note",
      color: "var(--accent-600)",
      shape: "rectangle",
    },
    {
      type: "customNode",
      label: "Milestone",
      color: "var(--success-500)",
      shape: "diamond",
    },
    {
      type: "customNode",
      label: "Warning",
      color: "var(--warning-500)",
      shape: "hexagon",
    },
  ];

  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    color: string,
    shape: string
  ) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.setData("application/reactflow/color", color);
    event.dataTransfer.setData("application/reactflow/shape", shape);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col border-b border-neutral-200 bg-white">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary-50">
            <Sparkles className="w-5 h-5 text-primary-600" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            MindMap Creator
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-neutral-200 mx-2" />

          <button
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
            onClick={onExport}
            title="Export"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-2 flex items-center gap-2 overflow-x-auto border-t border-neutral-100">
        <button
          className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1 shadow-sm"
          onClick={onAddNode}
        >
          <Plus className="w-4 h-4" />
          Add Node
        </button>

        <button
          className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            canDelete
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
          }`}
          onClick={onDeleteSelected}
          disabled={!canDelete}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        <div className="w-px h-6 bg-neutral-200 mx-2" />

        <div className="text-sm font-medium text-neutral-500 mr-2">
          Drag to add:
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {nodeTemplates.map((template, index) => (
            <div
              key={index}
              draggable
              onDragStart={(event) =>
                onDragStart(
                  event,
                  template.type,
                  template.color,
                  template.shape
                )
              }
              className="px-3 py-2 rounded-lg cursor-grab active:cursor-grabbing text-white shadow-sm text-sm flex items-center gap-1 transition-transform hover:scale-105"
              style={{ backgroundColor: template.color }}
            >
              <Layout className="w-3 h-3" />
              <span>{template.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MindMapToolbar;
