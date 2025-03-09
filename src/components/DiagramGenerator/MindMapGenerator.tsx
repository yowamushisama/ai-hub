"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
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
  ConnectionLineType,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { Sparkles } from "lucide-react";

// Import components
import MindMapToolbar from "./components/MindMapToolbar";
import MindMapForm from "./Form/MindMapContainer";
import CustomNode from "./components/CustomNode";
import CustomEdge from "./components/CustomEdge";
import ThemeSelector from "./components/ThemeSelector";
import ShareExportPanel from "./components/ShareExportPanel";
import { generateUniqueId } from "./MindMap/utlis/helpers";
import { ThemeProvider, MindMapTheme } from "./ThemeContext";
import { initialNodes, initialEdges } from "./data/initialData";
import templateData from "./Form/mind-map-templates.json";

import axios from "axios";
import { MindMapConfig } from "../types/Model/MindMapTypes";

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

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};
interface MindMapGeneratorProps {
  toolId: string;
}
const MindMapGenerator: React.FC<MindMapGeneratorProps> = ({ toolId }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [currentTheme, setCurrentTheme] = useState<MindMapTheme>("default");
  const [isExportPanelOpen, setIsExportPanelOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set loading state to false once the ReactFlow instance is ready
  useEffect(() => {
    if (reactFlowInstance) {
      // setIsLoading(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }, [reactFlowInstance]);

  //const template = await axios.get(`${process.env.API_ENDPOINT}`);
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

  // Delete node and its connected edges
  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
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
          shape:
            (nodeShape as
              | "rounded"
              | "rectangle"
              | "pill"
              | "diamond"
              | "hexagon") || "rounded",
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Bulk adding nodes
  const onBulkAddNodes = useCallback(
    (newNodes: Node[]) => {
      setNodes((nds) => [...nds, ...newNodes]);
    },
    [setNodes]
  );

  // Bulk adding edges
  const onBulkAddEdges = useCallback(
    (newEdges: Edge[]) => {
      setEdges((eds) => [...eds, ...newEdges]);
    },
    [setEdges]
  );

  // Clear the canvas
  const onClearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setSelectedEdge(null);
  }, [setNodes, setEdges]);

  // Loading screen component
  const LoadingScreen = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-90">
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full mb-4 animate-pulse">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border-4 border-primary-600 border-r-transparent animate-spin" />
          <h2 className="text-xl font-bold text-primary-600">
            Loading Mind Map Creator...
          </h2>
        </div>
        <div className="mt-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 h-1.5 w-56 rounded-full overflow-hidden">
          <div className="h-full bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // Sidebar skeleton loading component
  const SidebarSkeleton = () => (
    <div className="w-64 border-r border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-neutral-200 animate-pulse"></div>
        <div>
          <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse mt-2"></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-10 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="h-24 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="h-10 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="h-10 bg-neutral-200 rounded-lg animate-pulse"></div>
        <div className="h-36 bg-neutral-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <ThemeProvider currentTheme={currentTheme} onChangeTheme={setCurrentTheme}>
      <div className="flex flex-col w-full h-screen bg-white">
        {isLoading && <LoadingScreen />}

        {/* Toolbar with Back to Dashboard button integrated */}
        <MindMapToolbar
          onAddNode={() => {}}
          onDeleteSelected={onDeleteSelected}
          onExport={() => setIsExportPanelOpen(true)}
          canDelete={Boolean(selectedNode || selectedEdge)}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Left side form */}
          {isLoading ? (
            <SidebarSkeleton />
          ) : (
            <MindMapForm
              nodes={nodes}
              edges={edges}
              selectedNode={selectedNode}
              onNodeAdd={onAddNode}
              onNodeUpdate={onUpdateNodeData}
              onNodeDelete={onDeleteNode}
              onNodeSelect={onNodeSelect}
              onCreateEdge={onCreateEdge}
              onBulkAddNodes={onBulkAddNodes}
              onBulkAddEdges={onBulkAddEdges}
              onClearCanvas={onClearCanvas}
              toolId={toolId}
            />
          )}

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
