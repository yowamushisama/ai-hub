import React from "react";
import {
  Search,
  Trash2,
  AlertCircle,
  PlusCircle,
  Type,
  Layers,
  Palette,
  Box,
  Edit3,
  Link,
} from "lucide-react";
import { Node, Edge } from "reactflow";
import GenericMindMapGenerator from "./MindMapCompGenerator";
import { MindMapConfig } from "@/components/types/Model/MindMapTypes";
type Tab = "nodes" | "create" | "edit" | "connect" | "ai-generate";

// Template interface for backward compatibility
interface Template {
  id: string;
  category: string;
  subcategory: string;
  formTitle: string;
  headerIcon: string;
  description: string;
  aiEnabled: boolean;
  defaultTab: string;
  rows: any[];
  nodeOptions: {
    shapes: Array<{ id: string; label: string }>;
    colors: { [key: string]: string };
    fontSizes: Array<{ id: string; label: string }>;
  };
  examplePrompts: string[];
  submitButton: {
    label: string;
    loadingLabel: string;
    icon: string;
    loadingIcon: string;
  };
}

interface SidebarContentProps {
  toolId: string;
  activeTab: Tab;
  nodes: Node[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  formData: {
    label: string;
    description: string;
    color: string;
    fontSize: "small" | "medium" | "large";
    shape: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      label: string;
      description: string;
      color: string;
      fontSize: "small" | "medium" | "large";
      shape: string;
    }>
  >;
  onNodeAdd: (node: Node) => void;
  onNodeUpdate: (nodeId: string, data: any) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeSelect: (nodeId: string) => void;
  connectionData: { source: string; target: string };
  setConnectionData: React.Dispatch<
    React.SetStateAction<{ source: string; target: string }>
  >;
  onCreateEdge: (source: string, target: string) => void;
  aiFormValues: Record<string, any>;
  setAiFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  isGenerating: boolean;
  generationError: string | null;
  onBulkAddNodes?: (nodes: Node[]) => void;
  onBulkAddEdges?: (edges: Edge[]) => void;
  onClearCanvas?: () => void;
  onCreateNode: () => void;
  onUpdateNode: () => void;
  onConnectNodes: () => void;
  onGenerateMindMap: () => void;
  selectedNode: Node | null;
  colorOptions: Array<{ label: string; value: string }>;
  shapeOptions: Array<{ label: string; value: string }>;
  fontSizeOptions: Array<{
    label: string;
    value: "small" | "medium" | "large";
  }>;
  template: Template | MindMapConfig;
}

const SidebarContent: React.FC<SidebarContentProps> = (props) => {
  const {
    activeTab,
    nodes,
    searchTerm,
    setSearchTerm,
    error,
    formData,
    setFormData,
    onNodeAdd,
    onNodeUpdate,
    onNodeDelete,
    onNodeSelect,
    connectionData,
    setConnectionData,
    onCreateEdge,
    aiFormValues,
    setAiFormValues,
    isGenerating,
    generationError,
    onBulkAddNodes,
    onBulkAddEdges,
    onClearCanvas,
    onCreateNode,
    onUpdateNode,
    onConnectNodes,
    onGenerateMindMap,
    selectedNode,
    colorOptions,
    shapeOptions,
    fontSizeOptions,
    template,
    toolId,
  } = props;

  const filteredNodes = nodes.filter((node) =>
    node.data.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeTab === "nodes") {
    return (
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-neutral-500 flex items-center justify-between">
            <span>
              {filteredNodes.length}{" "}
              {filteredNodes.length === 1 ? "Node" : "Nodes"}
            </span>
            {filteredNodes.length > 0 && (
              <span className="text-xs text-primary-600">Click to edit</span>
            )}
          </div>
          {filteredNodes.length === 0 ? (
            <div className="text-center py-6 bg-neutral-50 rounded-lg border border-neutral-100">
              <div className="text-neutral-400 mb-2">No nodes found</div>
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                Create a new node
              </button>
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-300px)]  pr-1">
              {filteredNodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                    selectedNode?.id === node.id
                      ? "border-primary-500 bg-primary-50 shadow-sm"
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
                      className="p-1 text-neutral-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNodeDelete(node.id);
                      }}
                      title="Delete node"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {node.data.description && (
                    <div className="text-xs text-neutral-500 mt-1 ml-5 line-clamp-2">
                      {node.data.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === "create") {
    return (
      <div className="p-4 space-y-4 overflow-y-auto">
        <h3 className="font-medium text-neutral-900 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-primary-600" />
          Create New Node
        </h3>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        {/* Node Label */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Type className="w-4 h-4 text-primary-600" />
            Label <span className="text-red-500">*</span>
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
                    : "hover:ring-1 hover:ring-primary-500/50 hover:ring-offset-1"
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
                  setFormData({ ...formData, fontSize: option.value })
                }
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        {/* Create Button */}
        <button
          onClick={onCreateNode}
          className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Create Node
        </button>
      </div>
    );
  }

  if (activeTab === "edit") {
    return (
      <div className="p-4 space-y-4 overflow-y-auto">
        <h3 className="font-medium text-neutral-900 flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-primary-600" />
          Edit Node
        </h3>
        {!selectedNode ? (
          <div className="text-center py-6 bg-neutral-50 rounded-lg border border-neutral-100">
            <div className="text-neutral-400 mb-2">No node selected</div>
            <p className="text-sm text-neutral-500">
              Select a node from the canvas or from the Nodes tab
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            {/* Node Label */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Type className="w-4 h-4 text-primary-600" />
                Label <span className="text-red-500">*</span>
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
                        : "hover:ring-1 hover:ring-primary-500/50 hover:ring-offset-1"
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
                      setFormData({ ...formData, fontSize: option.value })
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onUpdateNode}
                className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Update Node
              </button>
              <button
                onClick={() => selectedNode && onNodeDelete(selectedNode.id)}
                className="py-3 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors flex items-center justify-center"
                title="Delete node"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  if (activeTab === "connect") {
    return (
      <div className="p-4 space-y-4 overflow-y-auto">
        <h3 className="font-medium text-neutral-900 flex items-center gap-2">
          <Link className="w-4 h-4 text-primary-600" />
          Connect Nodes
        </h3>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        {nodes.length < 2 ? (
          <div className="text-center py-6 bg-neutral-50 rounded-lg border border-neutral-100">
            <div className="text-neutral-400 mb-2">
              Need at least two nodes to connect
            </div>
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              Create more nodes
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Box className="w-4 h-4 text-primary-600" />
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
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm bg-white"
              >
                <option value="">Select source node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Box className="w-4 h-4 text-secondary-600" />
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
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm bg-white"
              >
                <option value="">Select target node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.data.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={onConnectNodes}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2 mt-4"
            >
              <Link className="w-4 h-4" />
              Connect Nodes
            </button>
          </>
        )}
      </div>
    );
  }

  if (activeTab === "ai-generate") {
    return (
      <div className="overflow-y-auto flex-1">
        <GenericMindMapGenerator
          config={template as MindMapConfig}
          formValues={aiFormValues}
          onFormChange={setAiFormValues}
          onSubmit={onGenerateMindMap}
          isLoading={isGenerating}
          error={generationError}
          toolId={toolId}
        />
      </div>
    );
  }

  return null;
};

export default SidebarContent;
