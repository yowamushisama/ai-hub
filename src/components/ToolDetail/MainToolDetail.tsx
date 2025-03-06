"use client";
import React, { useState } from "react";
import axios from "axios";
import ToolGenerator from "../ToolDetail/Generator/ToolGenerator";
import VisualEditor from "./VisualEditor/VisualEditor";
import { RefreshCw, ArrowLeft } from "lucide-react";

// Define interfaces for the data structures
interface GeneratedResult {
  id: number;
  text: string;
  metadata?: Record<string, any>;
}

interface GeneratedTitle {
  id: string;
  text: string;
  metrics?: {
    views: number;
    likes: number;
  };
}

interface MainToolProps {
  toolId: string;
}

const MainToolDetail: React.FC<MainToolProps> = ({ toolId }) => {
  // State to store generated results from the tool generator
  const [generatedContent, setGeneratedContent] = useState<GeneratedTitle[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Handle form submission from the ToolGenerator
  const handleToolSubmit = async (
    formData: Record<string, any>
  ): Promise<GeneratedResult[]> => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/tool/${toolId}/generate`,
        formData
      );

      // Check if response.data.results is an array; otherwise, check for response.data.result
      let results: any[] = [];
      if (Array.isArray(response.data.results)) {
        results = response.data.results;
      } else if (response.data.result) {
        results = [response.data.result];
      }
      console.log("results", results);
      // Transform API results to the format expected by VisualEditor
      const transformedResults: GeneratedTitle[] = results.map(
        (result: any, index: number) => ({
          id: String(index), // assign a unique id (or use result.id if available)
          text: result,
          metrics: {
            views: 0,
            likes: 0,
          },
        })
      );
      console.log("transformedResults", transformedResults);
      // Update state with the new results
      setGeneratedContent(transformedResults);
      setHasGenerated(true); // Mark that we have generated content

      return results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Error generating content:", error);
      }
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Handle save, copy, and download operations from the Visual Editor
  const handleSave = async (content: string) => {
    // Implement save functionality here
    console.log("Saving content:", content);
    // Could save to localStorage, database, or API
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log("Content copied to clipboard");
    } catch (error) {
      console.error("Failed to copy content:", error);
    }
  };

  const handleDownload = async (content: string) => {
    // Create a blob and download it
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to reload the page and start a new session
  const handleStartNew = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        {/* Back Button */}
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="flex items-center gap-2 px-4 py-2 border border-neutral-200 bg-white text-neutral-700 rounded-lg hover:bg-neutral-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Start New Button */}
        <button
          onClick={handleStartNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          Start New
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <ToolGenerator
            toolId={toolId}
            onSubmit={handleToolSubmit}
            apiEndpoint="http://localhost:3001/tool"
            className={hasGenerated ? "opacity-70 pointer-events-none" : ""}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-1/2">
          <VisualEditor
            generatedTitles={generatedContent}
            onSave={handleSave}
            onCopy={handleCopy}
            onDownload={handleDownload}
            className="h-full"
            initialContent={
              generatedContent.length > 0 ? generatedContent[0].text : ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainToolDetail;
