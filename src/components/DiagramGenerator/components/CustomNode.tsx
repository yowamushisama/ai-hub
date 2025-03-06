// components/CustomNode.tsx
import React, { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Edit, AlignLeft } from "lucide-react";
import { useTheme } from "../ThemeContext";
type NodeData = {
  label: string;
  description: string;
  color: string;
  fontSize: "small" | "medium" | "large";
  shape: "rounded" | "rectangle" | "pill" | "diamond" | "hexagon";
};

const getShapeStyles = (shape: string): React.CSSProperties => {
  switch (shape) {
    case "rectangle":
      return { borderRadius: "4px" };
    case "pill":
      return { borderRadius: "9999px" };
    case "diamond":
      return { transform: "rotate(45deg)", borderRadius: "4px" };
    case "hexagon":
      return {
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      };
    case "rounded":
    default:
      return { borderRadius: "8px" };
  }
};

const getFontSize = (size: string): string => {
  switch (size) {
    case "small":
      return "0.875rem";
    case "large":
      return "1.25rem";
    case "medium":
    default:
      return "1rem";
  }
};

const CustomNode: React.FC<NodeProps<NodeData>> = ({
  data,
  isConnectable,
  selected,
}) => {
  const { theme } = useTheme();
  const shapeStyles = getShapeStyles(data.shape);
  const fontSize = getFontSize(data.fontSize);

  return (
    <div
      className={`relative p-4 shadow-md transition-all duration-300 min-w-[150px] border-2 flex flex-col ${
        selected ? "shadow-lg scale-105 ring-2 ring-opacity-50" : ""
      }`}
      style={{
        ...shapeStyles,
        backgroundColor: data.color,
        color: "#ffffff",
        borderColor: selected ? "var(--primary-600)" : "transparent",
        boxShadow: selected ? "0 0 0 2px var(--primary-500)" : "",
        fontSize,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 border-2 border-white bg-primary-500"
      />

      <div className="flex justify-between items-start">
        <div className="font-medium text-center w-full">{data.label}</div>
        <div className="absolute top-1 right-1 opacity-60 text-xs">
          {selected && (
            <div className="flex items-center gap-1">
              <Edit size={10} />
              <span>Edit</span>
            </div>
          )}
        </div>
      </div>

      {data.description && (
        <div className="mt-2 text-xs opacity-90 flex items-start gap-1">
          <AlignLeft size={12} className="mt-0.5 flex-shrink-0" />
          <span>{data.description}</span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 border-2 border-white bg-primary-500"
      />
    </div>
  );
};

export default memo(CustomNode);
