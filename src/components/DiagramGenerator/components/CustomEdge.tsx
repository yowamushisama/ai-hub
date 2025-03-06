// components/CustomEdge.tsx
import React, { FC } from "react";
import { EdgeProps, getBezierPath } from "reactflow";
import { useTheme } from "../ThemeContext";

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
  selected,
}) => {
  const { theme } = useTheme();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeStyle = {
    ...style,
    stroke: style?.stroke || "var(--primary-600)",
    strokeWidth: selected ? 3 : 2,
    transition: "stroke-width 0.2s",
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={edgeStyle}
        markerEnd={markerEnd}
      />
      {data?.label && (
        <foreignObject
          width={100}
          height={40}
          x={labelX - 50}
          y={labelY - 20}
          className="overflow-visible"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div
            className="nodrag nopan flex items-center justify-center px-2 py-1 rounded-md text-xs text-center"
            style={{
              background: "var(--surface-50)",
              color: "var(--primary-900)",
              border: "1px solid var(--primary-200)",
              minWidth: "50px",
              boxShadow: selected
                ? "0 0 0 2px var(--primary-500)"
                : "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            {data.label}
          </div>
        </foreignObject>
      )}
    </>
  );
};

export default CustomEdge;
