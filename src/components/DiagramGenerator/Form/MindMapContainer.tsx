"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Node, Edge } from "reactflow";
import axios from "axios";
import { generateUniqueId } from "../MindMap/utlis/helpers";
import SidebarHeader from "./SidebarHeader";
import SidebarTabs from "./SidebarTabs";
import SidebarContent from "./SidebarContent";
import { processAndLayoutMindMap } from "../dagres/MindMapLayout";

import {
  MindMapConfig,
  ToolMindMapTemplateResponse,
} from "@/components/types/Model/MindMapTypes";

export interface MindMapFormProps {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  onNodeAdd: (node: Node) => void;
  onNodeUpdate: (nodeId: string, data: any) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeSelect: (nodeId: string) => void;
  onCreateEdge: (source: string, target: string) => void;
  onBulkAddNodes: (nodes: Node[]) => void;
  onBulkAddEdges: (edges: Edge[]) => void;
  onClearCanvas: () => void;
  className?: string;
  toolId: string;
}

type Tab = "nodes" | "create" | "edit" | "connect" | "ai-generate";

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
  className,
  toolId,
}) => {
  // Template state fetched from the API
  const [template, setTemplate] = useState<MindMapConfig | null>(null);
  const [templateLoading, setTemplateLoading] = useState(true);
  const [templateError, setTemplateError] = useState<string | null>(null);

  // Fetch the template configuration from the API using toolId
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setTemplateLoading(true);
        const response = await axios.get<ToolMindMapTemplateResponse>(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/detail/${toolId}`
        );
        setTemplate(response.data.details);
        setTemplateError(null);
      } catch (error) {
        console.error("Failed to fetch template:", error);
        setTemplateError("Failed to load template configuration.");
      } finally {
        setTemplateLoading(false);
      }
    };

    fetchTemplate();
  }, [toolId]);

  // Default to ai-generate tab
  const [activeTab, setActiveTab] = useState<Tab>("ai-generate");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    color: "var(--primary-600)",
    fontSize: "medium" as "small" | "medium" | "large",
    shape: "rounded",
  });
  const [connectionData, setConnectionData] = useState({
    source: "",
    target: "",
  });
  const [aiFormValues, setAiFormValues] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contentVisible, setContentVisible] = useState(true);

  // Initialize AI form values from the fetched template
  const initializeAiFormValues = useCallback(() => {
    const values: Record<string, any> = {};
    if (template) {
      template.sections.forEach((section) => {
        section.fields.forEach((field) => {
          if (field.defaultValue !== undefined) {
            values[field.name] = field.defaultValue;
          }
        });
      });
    }
    // Set defaults if not provided by the template
    if (values.mainTopic === undefined) values.mainTopic = "";
    if (values.contextDescription === undefined) values.contextDescription = "";
    if (values.brainstormApproach === undefined)
      values.brainstormApproach = "expansive";
    if (values.complexity === undefined) values.complexity = "moderate";
    if (values.perspective === undefined) values.perspective = "neutral";
    if (values.nodeStyle === undefined) values.nodeStyle = "professional";
    if (values.includeDescriptions === undefined)
      values.includeDescriptions = true;
    return values;
  }, [template]);

  // Update aiFormValues when the template loads
  useEffect(() => {
    if (template) {
      setAiFormValues(initializeAiFormValues());
    }
  }, [template, initializeAiFormValues]);

  // Collapse toggle
  const toggleCollapse = () => {
    if (!isCollapsed) {
      setContentVisible(false);
      setTimeout(() => {
        setIsCollapsed(true);
      }, 150);
    } else {
      setIsCollapsed(false);
      setTimeout(() => {
        setContentVisible(true);
      }, 150);
    }
  };

  // Options for colors, shapes, and font sizes
  const colorOptions = [
    { label: "Primary", value: "var(--primary-600)" },
    { label: "Secondary", value: "var(--secondary-600)" },
    { label: "Accent", value: "var(--accent-600)" },
    { label: "Success", value: "var(--success-500)" },
    { label: "Warning", value: "var(--warning-500)" },
    { label: "Error", value: "var(--error-500)" },
  ];
  const shapeOptions = [
    { label: "Rounded", value: "rounded" },
    { label: "Rectangle", value: "rectangle" },
    { label: "Pill", value: "pill" },
    { label: "Diamond", value: "diamond" },
    { label: "Hexagon", value: "hexagon" },
  ];
  const fontSizeOptions = [
    { label: "Small", value: "small" as "small" },
    { label: "Medium", value: "medium" as "medium" },
    { label: "Large", value: "large" as "large" },
  ];

  // Update form values when a node is selected
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
  }, [selectedNode, activeTab]);

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
    setFormData({ ...formData, label: "", description: "" });
  };

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
    setConnectionData({ source: "", target: "" });
  };

  // Main function to process API response and add nodes/edges to the mindmap
  const handleGenerateMindMap = async () => {
    const mainTopicValue = aiFormValues.mainTopic;

    if (!mainTopicValue?.trim()) {
      setGenerationError("Please provide a main topic for your mindmap");
      return;
    }

    if (!onBulkAddNodes || !onBulkAddEdges || !onClearCanvas) {
      setGenerationError("Bulk operations are not supported");
      return;
    }

    setGenerationError(null);
    setIsGenerating(true);

    try {
      // Make API request to generate mindmap
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tool/${toolId}/generate`,
        {
          ...aiFormValues,
        }
      );

      // Validate response structure
      if (!response.data?.nodes || !response.data?.edges) {
        throw new Error("Invalid API response structure");
      }

      console.log("API response:", response.data);

      // Process the nodes and edges using Dagre layout
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        processAndLayoutMindMap(response.data.nodes, response.data.edges);

      console.log("Layouted Nodes:", layoutedNodes);
      console.log("Layouted Edges:", layoutedEdges);

      // Clear the canvas and add the new nodes and edges
      onClearCanvas();
      onBulkAddNodes(layoutedNodes);
      onBulkAddEdges(layoutedEdges);

      // Set the active tab to view the result
      setActiveTab("nodes");
    } catch (error) {
      console.error("Error generating mindmap:", error);
      let errorMessage = "Failed to generate mindmap. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setGenerationError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  // Render loading state if template is not yet available
  if (templateLoading) {
    return (
      <div className={`flex justify-center items-center h-full ${className}`}>
        <p>Loading template configuration...</p>
      </div>
    );
  }

  // Render error state if fetching template failed
  if (templateError || !template) {
    return (
      <div
        className={`flex flex-col justify-center items-center h-full ${className}`}
      >
        <p className="text-red-600">
          {templateError || "Error loading template."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-md ${className}`}
      style={{
        width: isCollapsed ? "64px" : "520px",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Vertical Navigation Sidebar */}
      <SidebarTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedNode={selectedNode}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Main Content Area */}
      <div
        className="flex flex-col overflow-hidden flex-1 transition-opacity duration-150 ease-in-out"
        style={{
          opacity: contentVisible && !isCollapsed ? 1 : 0,
          visibility: contentVisible && !isCollapsed ? "visible" : "hidden",
          transition: "opacity 150ms ease-in-out, visibility 150ms ease-in-out",
        }}
      >
        {/* Header */}
        <SidebarHeader
          formTitle={template.title}
          tagline={template.description}
          headerIcon={template.headerIcon}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <SidebarContent
            activeTab={activeTab}
            nodes={nodes}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            error={error}
            formData={formData}
            setFormData={setFormData}
            onNodeAdd={onNodeAdd}
            onNodeUpdate={onNodeUpdate}
            onNodeDelete={onNodeDelete}
            onNodeSelect={onNodeSelect}
            connectionData={connectionData}
            setConnectionData={setConnectionData}
            onCreateEdge={onCreateEdge}
            aiFormValues={aiFormValues}
            setAiFormValues={setAiFormValues}
            isGenerating={isGenerating}
            generationError={generationError}
            onBulkAddNodes={onBulkAddNodes}
            onBulkAddEdges={onBulkAddEdges}
            onClearCanvas={onClearCanvas}
            onCreateNode={handleCreateNode}
            onUpdateNode={handleUpdateNode}
            onConnectNodes={handleConnectNodes}
            onGenerateMindMap={handleGenerateMindMap}
            selectedNode={selectedNode}
            colorOptions={colorOptions}
            shapeOptions={shapeOptions}
            fontSizeOptions={fontSizeOptions}
            template={template}
            toolId={toolId}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MindMapForm;
