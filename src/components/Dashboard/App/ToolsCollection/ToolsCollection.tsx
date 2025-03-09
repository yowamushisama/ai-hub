// AIToolsCollection.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Bot,
  ArrowRight,
  Heart,
  Eye,
  FileText,
  PenTool,
  Image,
  Video,
  Mic,
  Code,
  Search,
  AlertCircle,
  RefreshCw,
  BrainCircuit,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { Tool } from "@/components/types/Model/Tools/Tools";
export const iconMap = {
  FileText: <FileText className="w-5 h-5" />,
  PenTool: <PenTool className="w-5 h-5" />,
  Image: <Image className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
};
interface AIToolsCollectionProps {
  isCollapsed?: boolean;
}
const getIconComponent = (iconName: string) => {
  return (
    iconMap[iconName as keyof typeof iconMap] || <Bot className="w-5 h-5" />
  );
};

const AIToolsCollection: React.FC<AIToolsCollectionProps> = ({
  isCollapsed = false,
}) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3001/tools");
        if (response.data && Array.isArray(response.data)) {
          setTools(response.data);
        } else if (response.data && Array.isArray(response.data.tools)) {
          setTools(response.data.tools);
        } else {
          throw new Error("Unexpected API response structure");
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching tools:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch tools");
        setTools([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  return (
    <section className="bg-white rounded-xl border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-1">
                AI Tools Collection
              </h2>
              <p className="text-sm text-neutral-500">
                Powerful AI tools to enhance your workflow
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-all rounded-lg hover:bg-primary-50">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-6 my-3 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
          <p>Failed to load tools. Please try again later.</p>
          <button
            className="ml-auto px-2 py-1 bg-white text-red-600 rounded hover:bg-red-100 transition-colors"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tools Grid */}
      <div className="p-6">
        {isLoading ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-primary-100"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-primary-600 animate-spin"></div>
              <div className="absolute inset-0 rounded-full border-2 border-transparent flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-600 animate-pulse" />
              </div>
            </div>
            <p className="text-neutral-600 font-medium">Loading AI tools...</p>
            <p className="text-neutral-400 text-sm mt-1">
              Discovering tools to enhance your workflow
            </p>
          </div>
        ) : tools.length === 0 && !error ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 mb-3">
              <Search className="w-6 h-6 text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-800 mb-1">
              No tools available
            </h3>
            <p className="text-neutral-500 text-sm max-w-md mx-auto">
              We couldn't find any tools at the moment. Check back soon for
              updates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                href={`/tool/${tool.id}`}
                key={tool.id}
                className="group block relative bg-white rounded-xl border border-neutral-100 p-5 hover:border-primary-100 transition-all duration-300 cursor-pointer hover:shadow-md hover:-translate-y-1"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    tool.gradient || "from-primary-500 to-secondary-500"
                  } opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
                />
                <div className="relative">
                  {/* Icon and Badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${
                        tool.gradient || "from-primary-500 to-secondary-500"
                      } text-white shadow-sm group-hover:shadow transform group-hover:scale-105 transition-all duration-300`}
                    >
                      {getIconComponent(tool.icon)}
                    </div>
                    <div className="flex items-center gap-2">
                      {tool.is_pro && (
                        <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
                          Pro
                        </span>
                      )}
                      {tool.is_new && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {tool.short_description}
                  </p>

                  {/* Metrics */}
                  {tool.metrics && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg">
                        <Eye className="w-4 h-4 text-neutral-500" />
                        <span className="text-sm font-medium text-neutral-700">
                          {tool.metrics.views}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-lg">
                        <Heart className="w-4 h-4 text-neutral-500" />
                        <span className="text-sm font-medium text-neutral-700">
                          {tool.metrics.likes}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AIToolsCollection;
