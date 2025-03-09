import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import ToolForm from "./ToolGeneratorChild/ToolForm";
import { ToolConfig, FormRow } from "@/components/types/Model/Tools/Tools";
import { GeneratedResult } from "./ToolGeneratorChild/ToolResult";

export interface ToolGeneratorProps {
  toolId: string;
  config?: ToolConfig;
  onSubmit?: (formData: Record<string, any>) => Promise<GeneratedResult[]>;
  className: any;
}

const ToolGenerator: React.FC<ToolGeneratorProps> = ({
  toolId,
  config: providedConfig,
  onSubmit: providedSubmitHandler,
  className,
}) => {
  // State
  const [config, setConfig] = useState<ToolConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [generatedResults, setGeneratedResults] = useState<GeneratedResult[]>(
    []
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch tool configuration if not provided
  useEffect(() => {
    setIsLoading(true);

    if (providedConfig) {
      setConfig(providedConfig);
      setIsLoading(false);
    } else {
      fetchToolConfig();
    }
  }, [providedConfig, toolId]);

  // Fetch tool configuration from API
  const fetchToolConfig = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tools/detail/${toolId}`
      );
      const data = response.data;

      // Handle different possible API response structures
      let toolConfig: ToolConfig | null = null;

      if (data && data.details) {
        // Structure: { details: { ...ToolConfig } }
        toolConfig = data.details;
      } else if (data && data.config) {
        // Structure: { config: { ...ToolConfig } }
        toolConfig = data.config;
      } else if (data && data.id && data.rows) {
        // Structure: { ...ToolConfig }
        toolConfig = data;
      }

      if (!toolConfig) {
        throw new Error("Invalid tool configuration received");
      }

      // Remove duplicate fields with same name (based on the sample data)
      if (toolConfig.rows) {
        const processedRows = toolConfig.rows.reduce<FormRow[]>(
          (acc, row, index) => {
            // Skip rows with duplicate fields that have already been processed
            const isDuplicate =
              index > 0 &&
              row.fields.some((field) =>
                acc.some((prevRow) =>
                  prevRow.fields.some(
                    (prevField) =>
                      prevField.name === field.name &&
                      prevField.type === field.type
                  )
                )
              );

            if (!isDuplicate) {
              acc.push(row);
            }

            return acc;
          },
          []
        );

        toolConfig.rows = processedRows;
      }

      setConfig(toolConfig);
    } catch (error) {
      console.error("Error loading tool configuration:", error);
      setLoadError(
        error instanceof Error
          ? error.message
          : "Failed to load tool configuration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (formData: Record<string, any>) => {
    setIsGenerating(true);

    try {
      let results: GeneratedResult[];

      if (providedSubmitHandler) {
        // Use provided submission handler if available
        results = await providedSubmitHandler(formData);
      } else {
        // Default API call
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${toolId}/generate`,
          formData
        );
        results = response.data.results || [];
      }

      setGeneratedResults(results);
    } catch (error) {
      console.error("Error generating results:", error);
      // Optionally, you could set an error state here and display it to the user
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle copying text to clipboard
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Show success message
    } catch (error) {
      console.error("Failed to copy text:", error);
      // Optional: Show error message
    }
  };

  // Render loading skeleton
  if (isLoading) {
    return (
      <div
        className={`max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 ${className}`}
        style={{ minHeight: "600px", height: "auto", minWidth: "34rem" }}
      >
        {/* Header Skeleton */}
        <div className="p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-200 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-64 bg-neutral-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Form Field Skeletons */}
        <div className="p-6 space-y-6">
          {/* First Row - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-12 w-full bg-neutral-100 rounded-xl animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-12 w-full bg-neutral-100 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Second Row - Full Width Textarea */}
          <div className="space-y-2">
            <div className="h-4 w-36 bg-neutral-200 rounded animate-pulse"></div>
            <div className="h-32 w-full bg-neutral-100 rounded-xl animate-pulse"></div>
          </div>

          {/* Third Row - Option Buttons */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-12 flex-1 bg-neutral-100 rounded-xl animate-pulse"></div>
              <div className="h-12 flex-1 bg-neutral-100 rounded-xl animate-pulse"></div>
              <div className="h-12 flex-1 bg-neutral-100 rounded-xl animate-pulse"></div>
            </div>
          </div>

          {/* Submit Button Skeleton */}
          <div className="h-14 w-full bg-neutral-200 rounded-xl animate-pulse mt-8"></div>
        </div>
      </div>
    );
  }

  if (loadError || !config) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-red-200">
        {/* Error Header */}
        <div className="p-6 bg-red-50 border-b border-red-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                Tool Unavailable
              </h1>
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <span>Failed to load tool configuration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="p-8 flex flex-col items-center justify-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Unable to Load Tool
          </h3>
          <p className="text-neutral-600 text-center mb-6">
            {loadError ||
              "The tool configuration could not be loaded. Please try again later."}
          </p>
          <button
            onClick={fetchToolConfig}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-xl mx-auto ${className}`}>
      {/* Tool Form */}
      <ToolForm
        config={config}
        onSubmit={handleSubmit}
        isLoading={isGenerating}
      />
    </div>
  );
};

export default ToolGenerator;
