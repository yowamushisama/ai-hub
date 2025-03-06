// src/components/DiagramGenerator/MindMapForm.tsx
import React, { useState, useEffect } from "react";
import { Node, Edge } from "reactflow";
import {
  PlusCircle,
  ListTree,
  Trash2,
  Search,
  Edit3,
  Link,
  Palette,
  Type,
  Box,
  Layers,
  AlertCircle,
  Cpu,
  Send,
  Loader,
  BrainCircuit,
  RefreshCw,
} from "lucide-react";
//import { generateMindMap } from "../services/llmService";
import { generateUniqueId } from "./MindMap/utlis/helpers";
interface MindMapFormProps {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  onNodeAdd: (node: Node) => void;
  onNodeUpdate: (nodeId: string, data: any) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeSelect: (nodeId: string) => void;
  onCreateEdge: (source: string, target: string) => void;
  onBulkAddNodes?: (nodes: Node[]) => void;
  onBulkAddEdges?: (edges: Edge[]) => void;
  onClearCanvas?: () => void;
}

const MindMapForm: React.FC<MindMapFormProps> = ({
  nodes,
  edges,
  selectedNode,
  onNodeAdd,
  onNodeUpdate,
  onNodeDelete,
  onNodeSelect,
  onCreateEdge,
  onBulkAddNodes,
  onBulkAddEdges,
  onClearCanvas,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "nodes" | "create" | "edit" | "connect" | "ai-generate"
  >("nodes");

  // Form state for creating/editing nodes
  const [formData, setFormData] = useState<{
    label: string;
    description: string;
    color: string;
    fontSize: "small" | "medium" | "large";
    shape: string;
  }>({
    label: "",
    description: "",
    color: "var(--primary-600)",
    fontSize: "medium",
    shape: "rounded",
  });

  // Connection state
  const [connectionData, setConnectionData] = useState<{
    source: string;
    target: string;
  }>({
    source: "",
    target: "",
  });

  // AI generation state
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationTemplate, setGenerationTemplate] =
    useState<string>("brainstorm");

  // Error state
  const [error, setError] = useState<string | null>(null);

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
    { label: "Rounded", value: "rounded" },
    { label: "Rectangle", value: "rectangle" },
    { label: "Pill", value: "pill" },
    { label: "Diamond", value: "diamond" },
    { label: "Hexagon", value: "hexagon" },
  ];

  // Font size options
  const fontSizeOptions = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];

  // Template options for AI generation
  const templateOptions = [
    {
      label: "Brainstorming",
      value: "brainstorm",
      description: "Generate ideas around a central topic",
    },
    {
      label: "SWOT Analysis",
      value: "swot",
      description: "Strengths, Weaknesses, Opportunities, Threats",
    },
    {
      label: "Project Plan",
      value: "project",
      description: "Break down a project into tasks and phases",
    },
    {
      label: "Concept Map",
      value: "concept",
      description: "Connect related concepts and ideas",
    },
    {
      label: "Decision Tree",
      value: "decision",
      description: "Map out decision paths and consequences",
    },
  ];

  // Update form when selected node changes
  useEffect(() => {
    if (selectedNode && activeTab !== "edit") {
      setActiveTab("edit");
      setFormData({
        label: selectedNode.data.label || "",
        description: selectedNode.data.description || "",
        color: selectedNode.data.color || "var(--primary-600)",
        fontSize: selectedNode.data.fontSize || "medium",
        shape: selectedNode.data.shape || "rounded",
      });
    }
  }, [selectedNode]);

  // Handle form submit for new node
  const handleCreateNode = () => {
    if (!formData.label.trim()) {
      setError("Node label is required");
      return;
    }

    setError(null);

    const newNode: Node = {
      id: generateUniqueId(),
      type: "customNode",
      position: {
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: formData.label,
        description: formData.description,
        color: formData.color,
        fontSize: formData.fontSize,
        shape: formData.shape,
      },
    };

    onNodeAdd(newNode);

    // Reset form for next node
    setFormData({
      label: "",
      description: "",
      color: formData.color,
      fontSize: formData.fontSize,
      shape: formData.shape,
    });
  };

  // Handle update for existing node
  const handleUpdateNode = () => {
    if (!selectedNode) return;

    if (!formData.label.trim()) {
      setError("Node label is required");
      return;
    }

    setError(null);

    onNodeUpdate(selectedNode.id, {
      label: formData.label,
      description: formData.description,
      color: formData.color,
      fontSize: formData.fontSize,
      shape: formData.shape,
    });
  };

  // Handle connect nodes
  const handleConnectNodes = () => {
    if (!connectionData.source || !connectionData.target) {
      setError("Both source and target nodes are required");
      return;
    }

    if (connectionData.source === connectionData.target) {
      setError("Source and target cannot be the same node");
      return;
    }

    setError(null);
    onCreateEdge(connectionData.source, connectionData.target);

    // Reset connection form
    setConnectionData({
      source: "",
      target: "",
    });
  };

  // Handle AI generation of mindmap
  const handleGenerateMindMap = async () => {
    if (!aiPrompt.trim()) {
      setGenerationError("Please provide a description for your mindmap");
      return;
    }

    if (!onBulkAddNodes || !onBulkAddEdges || !onClearCanvas) {
      setGenerationError("Bulk operations are not supported");
      return;
    }

    setGenerationError(null);
    setIsGenerating(true);

    try {
      // Call the LLM service to generate the mindmap
      const { nodes: generatedNodes, edges: generatedEdges } =
        await generateMindMap(aiPrompt, generationTemplate);

      // Clear the existing canvas
      onClearCanvas();

      // Add the generated nodes and edges
      onBulkAddNodes(generatedNodes);
      onBulkAddEdges(generatedEdges);

      // Reset form
      setAiPrompt("");
    } catch (error) {
      console.error("Error generating mindmap:", error);
      setGenerationError("Failed to generate mindmap. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter nodes based on search term
  const filteredNodes = nodes.filter((node) =>
    node.data.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate example prompts based on the selected template
  const getExamplePrompt = () => {
    switch (generationTemplate) {
      case "brainstorm":
        return "Generate a mindmap for brainstorming content marketing ideas for a new fitness app";
      case "swot":
        return "Create a SWOT analysis for opening a sustainable coffee shop in a college town";
      case "project":
        return "Break down a website redesign project into phases and tasks";
      case "concept":
        return "Develop a concept map about artificial intelligence and its applications";
      case "decision":
        return "Map out the decision process for choosing between hiring in-house vs outsourcing development";
      default:
        return "Describe what you want to brainstorm or visualize in your mindmap";
    }
  };

  return (
    <div className="w-96 h-full bg-white border-r border-neutral-200 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-white">
        <h2 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
          MindMap Builder
        </h2>
        <p className="text-sm text-neutral-500">
          Create and manage your mindmap nodes
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 overflow-x-auto">
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "nodes"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
          onClick={() => setActiveTab("nodes")}
        >
          <div className="flex items-center justify-center gap-1">
            <ListTree className="w-4 h-4" />
            <span>Nodes</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "create"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
          onClick={() => setActiveTab("create")}
        >
          <div className="flex items-center justify-center gap-1">
            <PlusCircle className="w-4 h-4" />
            <span>Create</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "edit"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
          onClick={() => setActiveTab("edit")}
          disabled={!selectedNode}
        >
          <div className="flex items-center justify-center gap-1">
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "connect"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
          onClick={() => setActiveTab("connect")}
        >
          <div className="flex items-center justify-center gap-1">
            <Link className="w-4 h-4" />
            <span>Connect</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "ai-generate"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-900"
          }`}
          onClick={() => setActiveTab("ai-generate")}
        >
          <div className="flex items-center justify-center gap-1">
            <BrainCircuit className="w-4 h-4" />
            <span>AI</span>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "nodes" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm"
              />
            </div>

            {/* Node List */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-neutral-500">
                {filteredNodes.length}{" "}
                {filteredNodes.length === 1 ? "Node" : "Nodes"}
              </div>

              {filteredNodes.length === 0 ? (
                <div className="text-center py-6 text-neutral-400">
                  No nodes found
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredNodes.map((node) => (
                    <div
                      key={node.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedNode?.id === node.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-neutral-200 hover:border-primary-500/30 hover:bg-neutral-50"
                      }`}
                      onClick={() => onNodeSelect(node.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: node.data.color }}
                          />
                          <div className="font-medium">{node.data.label}</div>
                        </div>
                        <button
                          className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNodeDelete(node.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {node.data.description && (
                        <div className="text-xs text-neutral-500 mt-1 ml-5">
                          {node.data.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="space-y-4">
            <h3 className="font-medium text-neutral-900">Create New Node</h3>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Node Label */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Type className="w-4 h-4 text-primary-600" />
                Label
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                placeholder="Node label"
              />
            </div>

            {/* Node Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Layers className="w-4 h-4 text-primary-600" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm h-20 resize-none"
                placeholder="Optional description"
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
                      formData.color === option.value
                        ? "ring-2 ring-primary-500 ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: option.value }}
                    onClick={() =>
                      setFormData({ ...formData, color: option.value })
                    }
                    title={option.label}
                  />
                ))}
              </div>
            </div>

            {/* Node Shape */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Box className="w-4 h-4 text-primary-600" />
                Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {shapeOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`p-2 flex flex-col items-center gap-1 rounded-lg border transition-all ${
                      formData.shape === option.value
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-600 hover:border-primary-500/50"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, shape: option.value })
                    }
                  >
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
                      formData.fontSize === option.value
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-600 hover:border-primary-500/50"
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        fontSize: option.value as "small" | "medium" | "large",
                      })
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateNode}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Node
            </button>
          </div>
        )}

        {activeTab === "edit" && (
          <div className="space-y-4">
            <h3 className="font-medium text-neutral-900">
              Edit Node: {selectedNode?.data.label || ""}
            </h3>

            {!selectedNode ? (
              <div className="text-center py-6 text-neutral-400">
                No node selected. Select a node to edit.
              </div>
            ) : (
              <>
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Node Label */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <Type className="w-4 h-4 text-primary-600" />
                    Label
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({ ...formData, label: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                    placeholder="Node label"
                  />
                </div>

                {/* Node Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <Layers className="w-4 h-4 text-primary-600" />
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm h-20 resize-none"
                    placeholder="Optional description"
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
                          formData.color === option.value
                            ? "ring-2 ring-primary-500 ring-offset-2"
                            : ""
                        }`}
                        style={{ backgroundColor: option.value }}
                        onClick={() =>
                          setFormData({ ...formData, color: option.value })
                        }
                        title={option.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Node Shape */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <Box className="w-4 h-4 text-primary-600" />
                    Shape
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {shapeOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`p-2 flex flex-col items-center gap-1 rounded-lg border transition-all ${
                          formData.shape === option.value
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-neutral-200 text-neutral-600 hover:border-primary-500/50"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, shape: option.value })
                        }
                      >
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
                          formData.fontSize === option.value
                            ? "border-primary-500 bg-primary-50 text-primary-700"
                            : "border-neutral-200 text-neutral-600 hover:border-primary-500/50"
                        }`}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            fontSize: option.value as
                              | "small"
                              | "medium"
                              | "large",
                          })
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* Update Button */}
                  <button
                    onClick={handleUpdateNode}
                    className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Update Node
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => onNodeDelete(selectedNode.id)}
                    className="py-3 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "connect" && (
          <div className="space-y-4">
            <h3 className="font-medium text-neutral-900">Connect Nodes</h3>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Source Node */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">
                Source Node
              </label>
              <select
                value={connectionData.source}
                onChange={(e) =>
                  setConnectionData({
                    ...connectionData,
                    source: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              >
                <option value="">Select source node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Node */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">
                Target Node
              </label>
              <select
                value={connectionData.target}
                onChange={(e) =>
                  setConnectionData({
                    ...connectionData,
                    target: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              >
                <option value="">Select target node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Connect Button */}
            <button
              onClick={handleConnectNodes}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
            >
              <Link className="w-4 h-4" />
              Connect Nodes
            </button>
          </div>
        )}

        {activeTab === "ai-generate" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary-600" />
              <h3 className="font-medium text-neutral-900">
                AI-Powered MindMap Generation
              </h3>
            </div>

            <p className="text-sm text-neutral-600">
              Describe what you want to brainstorm or visualize, and our AI will
              generate a complete mindmap for you.
            </p>

            {generationError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{generationError}</span>
              </div>
            )}

            {/* Template Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">
                Template Type
              </label>
              <div className="grid grid-cols-1 gap-2">
                {templateOptions.map((template) => (
                  <button
                    key={template.value}
                    onClick={() => setGenerationTemplate(template.value)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      generationTemplate === template.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-neutral-200 hover:border-primary-500/30 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="font-medium text-sm">{template.label}</div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Layers className="w-4 h-4 text-primary-600" />
                Describe Your MindMap
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm h-32 resize-none"
                placeholder={getExamplePrompt()}
              />
            </div>

            {/* Example Prompt Button */}
            <button
              onClick={() => setAiPrompt(getExamplePrompt())}
              className="w-full p-2 text-primary-600 text-sm hover:text-primary-800 transition-colors text-center"
            >
              Fill with example prompt
            </button>

            {/* Generate Button */}
            <button
              onClick={handleGenerateMindMap}
              disabled={isGenerating || !aiPrompt.trim()}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating MindMap...
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  Generate AI MindMap
                </>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-neutral-500 text-center mt-4">
              The AI will create nodes and connections based on your
              description. You can edit, add, or remove nodes after generation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMapForm;
