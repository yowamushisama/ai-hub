"use client";
// src/components/DiagramGenerator/MindMapGenerator.tsx
import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  ConnectionLineType,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import MindMapToolbar from "./components/MindMapToolbar";
import MindMapForm from "./MindMapForm";
import CustomNode from "./components/CustomNode";
import CustomEdge from "./components/CustomEdge";
import ThemeSelector from "./components/ThemeSelector";
import ShareExportPanel from "./components/ShareExportPanel";
import { generateUniqueId } from "./MindMap/utlis/helpers";
import { ThemeProvider, MindMapTheme } from "./ThemeContext";
import { initialNodes, initialEdges } from "./data/initialData";

// Node data structure
interface NodeData {
  label: string;
  description: string;
  color: string;
  fontSize: "small" | "medium" | "large";
  shape: "rounded" | "rectangle" | "pill" | "diamond" | "hexagon";
}

// Extend the React Flow Node type with our custom data
interface MindMapNode extends Node {
  data: NodeData;
}

// Extend the React Flow Edge type with our custom data
interface MindMapEdge extends Edge {
  data?: {
    label?: string;
  };
}

// Node types
const nodeTypes = {
  customNode: CustomNode,
};

// Edge types
const edgeTypes = {
  customEdge: CustomEdge,
};

const MindMapGenerator: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [currentTheme, setCurrentTheme] = useState<MindMapTheme>("default");
  const [isExportPanelOpen, setIsExportPanelOpen] = useState<boolean>(false);

  // Handle new connections
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "customEdge",
            animated: true,
            style: { stroke: "var(--primary-600)" },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Add a new node
  const onAddNode = useCallback(
    (newNode: Node) => {
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // Create a new edge between nodes
  const onCreateEdge = useCallback(
    (source: string, target: string) => {
      const newEdge = {
        id: `edge-${source}-${target}-${generateUniqueId()}`,
        source,
        target,
        type: "customEdge",
        animated: true,
        style: { stroke: "var(--primary-600)" },
      };

      setEdges((eds) => [...eds, newEdge]);
    },
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  // Handle edge selection
  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Handle direct node selection from the form
  const onNodeSelect = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        setSelectedNode(node);
        setSelectedEdge(null);
      }
    },
    [nodes]
  );

  // Update node data when modified in the form
  const onUpdateNodeData = useCallback(
    (id: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Update edge data when modified
  const onUpdateEdgeData = useCallback(
    (id: string, data: any) => {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === id) {
            return {
              ...edge,
              ...data,
            };
          }
          return edge;
        })
      );
    },
    [setEdges]
  );

  // Delete node
  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      // Also delete any edges connected to this node
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );

      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
    },
    [selectedNode, setNodes, setEdges]
  );

  // Delete selected node or edge
  const onDeleteSelected = useCallback(() => {
    if (selectedNode) {
      onDeleteNode(selectedNode.id);
    }
    if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  }, [selectedNode, selectedEdge, onDeleteNode, setEdges]);

  // Handle drag-and-drop new nodes
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeType = event.dataTransfer.getData("application/reactflow/type");
      const nodeColor = event.dataTransfer.getData(
        "application/reactflow/color"
      );
      const nodeShape = event.dataTransfer.getData(
        "application/reactflow/shape"
      );

      // Check if the dropped element is valid
      if (!nodeType || typeof nodeType !== "string") return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: MindMapNode = {
        id: generateUniqueId(),
        type: "customNode",
        position,
        data: {
          label: "Dropped node",
          description: "",
          color: nodeColor || "var(--primary-600)",
          fontSize: "medium",
          shape: nodeShape || "rounded",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <ThemeProvider currentTheme={currentTheme} onChangeTheme={setCurrentTheme}>
      <div className="flex flex-col w-full h-screen bg-white">
        <MindMapToolbar
          onAddNode={() => {}} // Now handled by the form
          onDeleteSelected={onDeleteSelected}
          onExport={() => setIsExportPanelOpen(true)}
          canDelete={Boolean(selectedNode || selectedEdge)}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Left side form */}
          <MindMapForm
            nodes={nodes}
            edges={edges}
            selectedNode={selectedNode}
            onNodeAdd={onAddNode}
            onNodeUpdate={onUpdateNodeData}
            onNodeDelete={onDeleteNode}
            onNodeSelect={onNodeSelect}
            onCreateEdge={onCreateEdge}
          />

          {/* Right side editor */}
          <div className="flex-1 h-full" ref={reactFlowWrapper}>
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                onPaneClick={() => {
                  setSelectedNode(null);
                  setSelectedEdge(null);
                }}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                defaultEdgeOptions={{
                  type: "customEdge",
                  animated: true,
                }}
                onDragOver={onDragOver}
                onDrop={onDrop}
                fitView
              >
                <Controls />
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background gap={16} color="var(--neutral-200)" />
                <Panel position="top-right">
                  <ThemeSelector
                    currentTheme={currentTheme}
                    onChangeTheme={setCurrentTheme}
                  />
                </Panel>
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </div>

        {isExportPanelOpen && (
          <ShareExportPanel
            reactFlowInstance={reactFlowInstance}
            onClose={() => setIsExportPanelOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default MindMapGenerator;
