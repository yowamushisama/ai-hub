// types/index.ts
import { Node, Edge } from "reactflow";

// Theme options
export type MindMapTheme = "default" | "ocean" | "forest" | "sunset" | "purple";

// Node data structure
export interface NodeData {
  label: string;
  description: string;
  color: string;
  fontSize: "small" | "medium" | "large";
  shape: "rounded" | "rectangle" | "pill" | "diamond" | "hexagon";
}

// Edge data structure
export interface EdgeData {
  label?: string;
}

// Extend the React Flow Node type with our custom data
export interface MindMapNode extends Node<NodeData> {
  data: NodeData;
}

// Extend the React Flow Edge type with our custom data
export interface MindMapEdge extends Edge {
  data?: EdgeData;
}

// MindMap data structure for saving/loading
export interface MindMapData {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  theme: MindMapTheme;
}
