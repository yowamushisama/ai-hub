// data/initialData.ts
import { MindMapNode, MindMapEdge } from "../types";

// Initial nodes for demonstration
export const initialNodes: MindMapNode[] = [
  {
    id: "root",
    type: "customNode",
    position: { x: 250, y: 50 },
    data: {
      label: "MindMap Creator",
      description: "Main idea",
      color: "var(--primary-600)",
      fontSize: "large",
      shape: "rounded",
    },
  },
  {
    id: "node-1",
    type: "customNode",
    position: { x: 100, y: 200 },
    data: {
      label: "Features",
      description: "Key capabilities",
      color: "var(--secondary-600)",
      fontSize: "medium",
      shape: "pill",
    },
  },
  {
    id: "node-2",
    type: "customNode",
    position: { x: 400, y: 200 },
    data: {
      label: "Customization",
      description: "Style options",
      color: "var(--accent-600)",
      fontSize: "medium",
      shape: "rectangle",
    },
  },
  {
    id: "node-1-1",
    type: "customNode",
    position: { x: 0, y: 350 },
    data: {
      label: "Drag & Drop",
      description: "Intuitive interface",
      color: "var(--secondary-500)",
      fontSize: "small",
      shape: "rounded",
    },
  },
  {
    id: "node-1-2",
    type: "customNode",
    position: { x: 200, y: 350 },
    data: {
      label: "Export Options",
      description: "PNG, SVG & JSON",
      color: "var(--secondary-500)",
      fontSize: "small",
      shape: "rounded",
    },
  },
  {
    id: "node-2-1",
    type: "customNode",
    position: { x: 350, y: 350 },
    data: {
      label: "Themes",
      description: "Color schemes",
      color: "var(--accent-500)",
      fontSize: "small",
      shape: "diamond",
    },
  },
  {
    id: "node-2-2",
    type: "customNode",
    position: { x: 500, y: 350 },
    data: {
      label: "Node Shapes",
      description: "Visual variety",
      color: "var(--accent-500)",
      fontSize: "small",
      shape: "hexagon",
    },
  },
];

// Initial edges connecting the nodes
export const initialEdges: MindMapEdge[] = [
  {
    id: "edge-root-1",
    source: "root",
    target: "node-1",
    type: "customEdge",
    animated: true,
    style: { stroke: "var(--primary-600)" },
  },
  {
    id: "edge-root-2",
    source: "root",
    target: "node-2",
    type: "customEdge",
    animated: true,
    style: { stroke: "var(--primary-600)" },
  },
  {
    id: "edge-1-1-1",
    source: "node-1",
    target: "node-1-1",
    type: "customEdge",
    style: { stroke: "var(--secondary-600)" },
  },
  {
    id: "edge-1-1-2",
    source: "node-1",
    target: "node-1-2",
    type: "customEdge",
    style: { stroke: "var(--secondary-600)" },
  },
  {
    id: "edge-2-2-1",
    source: "node-2",
    target: "node-2-1",
    type: "customEdge",
    style: { stroke: "var(--accent-600)" },
  },
  {
    id: "edge-2-2-2",
    source: "node-2",
    target: "node-2-2",
    type: "customEdge",
    style: { stroke: "var(--accent-600)" },
  },
];
