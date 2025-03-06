// components/NodeConfigPanel.tsx
import React, { useState, useEffect } from "react";
import { Node, Edge } from "reactflow";
import {
  X,
  Palette,
  AlignLeft,
  Type,
  Circle,
  Square,
  PenTool,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface NodeConfigPanelProps {
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  onUpdateNodeData: (id: string, data: any) => void;
  onUpdateEdgeData: (id: string, data: any) => void;
  onClose: () => void;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  selectedNode,
  selectedEdge,
  onUpdateNodeData,
  onUpdateEdgeData,
  onClose,
}) => {
  const { theme } = useTheme();
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [shape, setShape] = useState<string>("rounded");
  const [edgeLabel, setEdgeLabel] = useState("");
  const [edgeAnimated, setEdgeAnimated] = useState(false);
  const [edgeStyle, setEdgeStyle] = useState("");

  // Colors based on the theme
  const colorOptions = [
    { label: "Primary", value: "var(--primary-600)" },
    { label: "Secondary", value: "var(--secondary-600)" },
    { label: "Accent", value: "var(--accent-600)" },
    { label: "Success", value: "var(--success-500)" },
    { label: "Warning", value: "var(--warning-500)" },
    { label: "Error", value: "var(--error-500)" },
  ];

  // Shape options
  const shapeOptions = [
    {
      label: "Rounded",
      value: "rounded",
      icon: <Square className="w-4 h-4 rounded-md" />,
    },
    {
      label: "Rectangle",
      value: "rectangle",
      icon: <Square className="w-4 h-4" />,
    },
    {
      label: "Pill",
      value: "pill",
      icon: <Square className="w-4 h-4 rounded-full" />,
    },
    {
      label: "Diamond",
      value: "diamond",
      icon: <Square className="w-4 h-4 rotate-45" />,
    },
    {
      label: "Hexagon",
      value: "hexagon",
      icon: (
        <div
          className="w-4 h-4 bg-current"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      ),
    },
  ];

  // Font size options
  const fontSizeOptions = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  // Edge style options
  const edgeStyleOptions = [
    { label: "Primary", value: "var(--primary-600)" },
    { label: "Secondary", value: "var(--secondary-600)" },
    { label: "Accent", value: "var(--accent-600)" },
    { label: "Success", value: "var(--success-500)" },
    { label: "Warning", value: "var(--warning-500)" },
    { label: "Error", value: "var(--error-500)" },
  ];

  // Initialize form values when selected node/edge changes
  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || "");
      setDescription(selectedNode.data.description || "");
      setColor(selectedNode.data.color || colorOptions[0].value);
      setFontSize(selectedNode.data.fontSize || "medium");
      setShape(selectedNode.data.shape || "rounded");
    } else if (selectedEdge) {
      setEdgeLabel(selectedEdge.data?.label || "");
      setEdgeAnimated(selectedEdge.animated || false);
      setEdgeStyle(selectedEdge.style?.stroke || edgeStyleOptions[0].value);
    }
  }, [selectedNode, selectedEdge]);

  // Save node data changes
  const handleSaveNodeChanges = () => {
    if (selectedNode) {
      onUpdateNodeData(selectedNode.id, {
        label,
        description,
        color,
        fontSize,
        shape,
      });
    }
  };

  // Save edge data changes
  const handleSaveEdgeChanges = () => {
    if (selectedEdge) {
      onUpdateEdgeData(selectedEdge.id, {
        data: { label: edgeLabel },
        animated: edgeAnimated,
        style: { stroke: edgeStyle },
      });
    }
  };

  // Auto-save on form changes
  useEffect(() => {
    if (selectedNode) {
      handleSaveNodeChanges();
    } else if (selectedEdge) {
      handleSaveEdgeChanges();
    }
  }, [
    label,
    description,
    color,
    fontSize,
    shape,
    edgeLabel,
    edgeAnimated,
    edgeStyle,
  ]);

  return (
    <div className="w-80 h-full bg-white border-l border-neutral-200 overflow-y-auto">
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-neutral-50 to-white">
        <h2 className="font-semibold text-neutral-900">
          {selectedNode ? "Node Properties" : "Edge Properties"}
        </h2>
        <button
          className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {selectedNode && (
          <>
            {/* Node Label */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Type className="w-4 h-4 text-primary-600" />
                Label
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            {/* Node Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <AlignLeft className="w-4 h-4 text-primary-600" />
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm h-20 resize-none"
              />
            </div>

            {/* Node Color */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Palette className="w-4 h-4 text-primary-600" />
                Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`h-8 rounded-md transition-all ${
                      color === option.value
                        ? "ring-2 ring-primary-500 ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: option.value }}
                    onClick={() => setColor(option.value)}
                    title={option.label}
                  />
                ))}
              </div>
            </div>

            {/* Node Shape */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <PenTool className="w-4 h-4 text-primary-600" />
                Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {shapeOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`p-2 flex flex-col items-center gap-1 rounded-lg border transition-all ${
                      shape === option.value
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-600 hover:border-primary-500/50"
                    }`}
                    onClick={() => setShape(option.value)}
                  >
                    <div className="text-current">{option.icon}</div>
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Type className="w-4 h-4 text-primary-600" />
                Font Size
              </label>
              <div className="flex gap-2">
                {fontSizeOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-all ${
                      fontSize === option.value
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-600 hover:border-primary-500/50"
                    }`}
                    onClick={() =>
                      setFontSize(option.value as "small" | "medium" | "large")
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedEdge && (
          <>
            {/* Edge Label */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Type className="w-4 h-4 text-primary-600" />
                Label
              </label>
              <input
                type="text"
                value={edgeLabel}
                onChange={(e) => setEdgeLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                placeholder="Edge label"
              />
            </div>

            {/* Edge Style */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Palette className="w-4 h-4 text-primary-600" />
                Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {edgeStyleOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`h-8 rounded-md transition-all ${
                      edgeStyle === option.value
                        ? "ring-2 ring-primary-500 ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: option.value }}
                    onClick={() => setEdgeStyle(option.value)}
                    title={option.label}
                  />
                ))}
              </div>
            </div>

            {/* Edge Animation */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="edge-animated"
                checked={edgeAnimated}
                onChange={(e) => setEdgeAnimated(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="edge-animated"
                className="text-sm font-medium text-neutral-700"
              >
                Animated
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NodeConfigPanel;
