import React from "react";
import { Copy } from "lucide-react";

export interface GeneratedResult {
  id: number;
  text: string;
  metadata?: Record<string, any>;
}

export interface ToolResultsProps {
  results: GeneratedResult[];
  onCopy: (text: string) => Promise<void>;
  title?: string;
  description?: string;
  className?: string;
}

const ToolResults: React.FC<ToolResultsProps> = ({
  results,
  onCopy,
  title = "Generated Results",
  description,
  className = "",
}) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 pt-4 border-t border-neutral-200 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
        )}
        {!description && (
          <span className="text-sm text-neutral-500">Click to copy</span>
        )}
      </div>
      <div className="space-y-2">
        {results.map((result) => (
          <button
            key={result.id}
            type="button"
            onClick={() => onCopy(result.text)}
            className="w-full p-4 rounded-xl border border-neutral-200 hover:border-primary-500/30 transition-all group bg-neutral-50 hover:bg-white text-left flex items-center gap-3"
          >
            <div className="text-sm font-medium text-neutral-400">
              {result.id}
            </div>
            <div className="flex-1">
              <p className="text-sm text-neutral-900">{result.text}</p>

              {/* Optional metadata display */}
              {result.metadata && Object.keys(result.metadata).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(result.metadata).map(([key, value]) => (
                    <div
                      key={key}
                      className="px-2 py-1 rounded-md bg-neutral-100 text-xs text-neutral-600"
                    >
                      {key}:{" "}
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-600 hover:text-primary-700">
              <Copy className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolResults;
