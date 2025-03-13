import dagre from "dagre";
import { Node, Edge } from "reactflow";

/**
 * Apply Dagre layout algorithm to organize mind map nodes and edges
 * in a top-to-bottom hierarchy.
 * @param nodes ReactFlow nodes
 * @param edges ReactFlow edges
 * @param options Optional configuration for the layout
 * @returns Object containing positioned nodes and edges
 */
export const applyDagreLayout = (
  nodes: Node[],
  edges: Edge[],
  options: {
    direction?: "TB" | "BT" | "LR" | "RL";
    nodeWidth?: number;
    nodeHeight?: number;
    ranksep?: number;
    nodesep?: number;
    edgeSep?: number;
    marginx?: number;
    marginy?: number;
    centerGraph?: boolean;
  } = {}
) => {
  if (!nodes.length) return { nodes, edges };

  // Create a new directed graph
  const g = new dagre.graphlib.Graph();

  // Set graph direction (TB = top-bottom)
  g.setGraph({
    rankdir: options.direction || "TB", // Default to top-bottom
    nodesep: options.nodesep || 180,
    ranksep: options.ranksep || 150,
    edgesep: options.edgeSep || 10,
    marginx: options.marginx || 20,
    marginy: options.marginy || 20,
  });

  g.setDefaultEdgeLabel(() => ({}));

  // Identify the root node so we can keep it at the top
  const rootId = findRootNode(nodes, edges);

  // Add nodes to the graph with dimensions
  nodes.forEach((node) => {
    // If this node is the identified root, give it rank = "min"
    g.setNode(node.id, {
      width: options.nodeWidth || 200,
      height: options.nodeHeight || 80,
      // This ensures Dagre tries to keep the root at the top
      rank: node.id === rootId ? "min" : undefined,
    });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  // Apply the layout algorithm
  dagre.layout(g);

  // Get positioned nodes
  const positionedNodes = nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);

    // Apply node styling based on position in graph
    const enhancedNode = enhanceNodeStyle(node, nodeWithPosition);

    return {
      ...enhancedNode,
      position: {
        x: nodeWithPosition.x - (options.nodeWidth || 200) / 2,
        y: nodeWithPosition.y - (options.nodeHeight || 80) / 2,
      },
    };
  });

  // Optionally center the graph if requested
  if (options.centerGraph) {
    return centerGraph(positionedNodes, edges);
  }

  return { nodes: positionedNodes, edges };
};

/**
 * Find the root node of the graph (the node with no incoming edges).
 * If multiple candidates exist, fall back to the node with the most outgoing edges.
 * @param nodes List of nodes
 * @param edges List of edges
 * @returns ID of the root node
 */
export const findRootNode = (nodes: Node[], edges: Edge[]): string => {
  // Count incoming edges for each node
  const incomingEdges: { [key: string]: number } = {};

  // Initialize with all nodes having 0 incoming edges
  nodes.forEach((node) => {
    incomingEdges[node.id] = 0;
  });

  // Count incoming edges
  edges.forEach((edge) => {
    incomingEdges[edge.target] = (incomingEdges[edge.target] || 0) + 1;
  });

  // Find node(s) with no incoming edges
  const rootCandidates = nodes.filter((node) => incomingEdges[node.id] === 0);

  // If there's exactly one root, return it
  if (rootCandidates.length === 1) {
    return rootCandidates[0].id;
  }

  // Otherwise, pick the node with the highest outgoing edges
  const outgoingEdges: { [key: string]: number } = {};
  nodes.forEach((node) => {
    outgoingEdges[node.id] = 0;
  });
  edges.forEach((edge) => {
    outgoingEdges[edge.source] = (outgoingEdges[edge.source] || 0) + 1;
  });

  const sortedByOutgoing = [...nodes].sort(
    (a, b) => (outgoingEdges[b.id] || 0) - (outgoingEdges[a.id] || 0)
  );

  return sortedByOutgoing[0]?.id || nodes[0]?.id || "";
};

/**
 * Enhance node styling based on graph position (optional).
 * You can adapt the color or shape logic to your needs.
 */
const enhanceNodeStyle = (node: Node, nodeWithPosition: any) => {
  const enhancedNode = { ...node };

  // Example color palette by "level" or rank.
  const colorPalette = [
    "var(--primary-600)", // Root
    "var(--secondary-600)", // Level 1
    "var(--accent-600)", // Level 2
    "var(--success-500)", // Level 3
    "var(--warning-500)", // Level 4
    "var(--error-500)", // Level 5+
  ];

  // This is a simplistic approach that uses the y-position
  // to guess the "level" in the graph. Dagre’s rank can also be used.
  const level = Math.round(nodeWithPosition.y / 200);
  const colorIndex = Math.min(level, colorPalette.length - 1);

  enhancedNode.data = {
    ...node.data,
    color: colorPalette[colorIndex],
    fontSize: level === 0 ? "large" : level <= 2 ? "medium" : "small",
    shape: level === 0 ? "pill" : "rounded",
  };

  return enhancedNode;
};

/**
 * Optionally center the graph in the viewport.
 */
const centerGraph = (nodes: Node[], edges: Edge[]) => {
  if (nodes.length === 0) return { nodes, edges };

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    minX = Math.min(minX, node.position.x);
    maxX = Math.max(maxX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxY = Math.max(maxY, node.position.y);
  });

  const graphWidth = maxX - minX;
  const graphHeight = maxY - minY;
  const graphCenterX = minX + graphWidth / 2;
  const graphCenterY = minY + graphHeight / 2;

  // Adjust these for your own canvas size or pass them as options
  const targetCenterX = 500;
  const targetCenterY = 400;

  const translateX = targetCenterX - graphCenterX;
  const translateY = targetCenterY - graphCenterY;

  const centeredNodes = nodes.map((node) => ({
    ...node,
    position: {
      x: node.position.x + translateX,
      y: node.position.y + translateY,
    },
  }));

  return { nodes: centeredNodes, edges };
};

/**
 * Process API nodes/edges, convert to ReactFlow format, and run Dagre layout.
 * @param apiNodes Nodes from API
 * @param apiEdges Edges from API
 * @returns Object containing positioned ReactFlow nodes and edges
 */
export const processAndLayoutMindMap = (apiNodes: any[], apiEdges: any[]) => {
  // Convert API nodes to ReactFlow format
  const reactFlowNodes: Node[] = apiNodes.map((node) => ({
    id: node.id.toString(),
    type: "customNode",
    position: node.position || { x: 0, y: 0 },
    data: {
      label: node.label,
      description: node.description,
      color: "var(--primary-600)", // Default color
      fontSize: "medium",
      shape: "rounded",
    },
  }));

  // Convert API edges to ReactFlow format
  const reactFlowEdges: Edge[] = apiEdges.map((edge) => ({
    id: `edge-${edge.id}`,
    source: edge.source.toString(),
    target: edge.target.toString(),
    type: "customEdge",
    animated: true,
    style: { stroke: "var(--primary-600)" },
  }));

  // Apply Dagre layout, top-down
  const { nodes: layoutedNodes, edges: layoutedEdges } = applyDagreLayout(
    reactFlowNodes,
    reactFlowEdges,
    {
      direction: "TB", // Top -> Bottom
      nodeWidth: 200,
      nodeHeight: 80,
      ranksep: 150,
      nodesep: 100,
      centerGraph: true, // Center if you like
    }
  );

  return { nodes: layoutedNodes, edges: layoutedEdges };
};

/**
 * If you still have a function called `adjustNodePositions`,
 * remove or refactor it so it doesn't override the Dagre layout.
 * This is an example stub that just returns nodes unchanged.
 */
export const adjustNodePositions = (
  reactFlowNodes: Node[],
  reactFlowEdges: Edge[] = []
) => {
  // If you want to do any post-processing, do it here.
  // Otherwise, just return them as they are after Dagre layout.
  return reactFlowNodes;
};
