// components/ShareExportPanel.tsx
import React, { useState } from "react";
import {
  X,
  Download,
  Copy,
  Share2,
  Image as ImageIcon,
  FileJson,
  Clipboard,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import { toPng, toSvg } from "html-to-image";
import { ReactFlowInstance } from "reactflow";

interface ShareExportPanelProps {
  reactFlowInstance: ReactFlowInstance | null;
  onClose: () => void;
}

const ShareExportPanel: React.FC<ShareExportPanelProps> = ({
  reactFlowInstance,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportLoading, setExportLoading] = useState<string | null>(null);
  const [exportName, setExportName] = useState("mindmap");

  const handleExportImage = async (type: "png" | "svg") => {
    if (!reactFlowInstance) return;

    try {
      setExportLoading(type);

      // Get the ReactFlow container element
      const flowEl = document.querySelector(".react-flow") as HTMLElement;
      if (!flowEl) throw new Error("React Flow element not found");

      // Export the image
      let dataUrl;
      if (type === "png") {
        dataUrl = await toPng(flowEl, {
          quality: 1,
          backgroundColor: "#ffffff",
          pixelRatio: 2,
        });
      } else {
        dataUrl = await toSvg(flowEl, {
          backgroundColor: "#ffffff",
        });
      }

      // Create a download link
      const link = document.createElement("a");
      link.download = `${exportName}.${type}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
    } finally {
      setExportLoading(null);
    }
  };

  const handleExportJSON = () => {
    if (!reactFlowInstance) return;

    try {
      setExportLoading("json");

      // Get flow data
      const flowData = reactFlowInstance.toObject();
      const dataStr = JSON.stringify(flowData, null, 2);

      // Create a Blob and download it
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = `${exportName}.json`;
      link.href = url;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting JSON:", error);
    } finally {
      setExportLoading(null);
    }
  };

  const handleCopyLink = () => {
    if (!reactFlowInstance) return;

    // In a real implementation, this would save the mindmap to a database
    // and return a shareable link. For now, we'll just simulate it.
    const fakeShareableLink = `https://mindmap.app/share/${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    navigator.clipboard.writeText(fakeShareableLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900">Export & Share</h2>
          <button
            className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-neutral-700 block mb-2">
            Export Name
          </label>
          <input
            type="text"
            value={exportName}
            onChange={(e) => setExportName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
            placeholder="mindmap"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-neutral-700">Export As</h3>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleExportImage("png")}
              disabled={exportLoading === "png"}
              className="p-4 rounded-xl border border-neutral-200 hover:border-primary-500/30 transition-all hover:shadow-lg hover:bg-neutral-50 flex flex-col items-center gap-2"
            >
              <div className="p-3 rounded-lg bg-primary-50 text-primary-600">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="font-medium text-neutral-900">PNG Image</span>
              <span className="text-xs text-neutral-500">
                High quality image
              </span>
              {exportLoading === "png" && (
                <div className="animate-spin w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleExportImage("svg")}
              disabled={exportLoading === "svg"}
              className="p-4 rounded-xl border border-neutral-200 hover:border-primary-500/30 transition-all hover:shadow-lg hover:bg-neutral-50 flex flex-col items-center gap-2"
            >
              <div className="p-3 rounded-lg bg-secondary-50 text-secondary-600">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="font-medium text-neutral-900">SVG Vector</span>
              <span className="text-xs text-neutral-500">
                Scalable vector format
              </span>
              {exportLoading === "svg" && (
                <div className="animate-spin w-5 h-5 border-2 border-secondary-600 border-t-transparent rounded-full" />
              )}
            </button>

            <button
              onClick={handleExportJSON}
              disabled={exportLoading === "json"}
              className="p-4 rounded-xl border border-neutral-200 hover:border-primary-500/30 transition-all hover:shadow-lg hover:bg-neutral-50 flex flex-col items-center gap-2"
            >
              <div className="p-3 rounded-lg bg-accent-50 text-accent-600">
                <FileJson className="w-6 h-6" />
              </div>
              <span className="font-medium text-neutral-900">JSON Data</span>
              <span className="text-xs text-neutral-500">
                For importing later
              </span>
              {exportLoading === "json" && (
                <div className="animate-spin w-5 h-5 border-2 border-accent-600 border-t-transparent rounded-full" />
              )}
            </button>
          </div>

          <div className="border-t border-neutral-200 pt-4 mt-4">
            <h3 className="text-sm font-medium text-neutral-700 mb-4">Share</h3>

            <button
              onClick={handleCopyLink}
              className="w-full p-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5" />
                  <span>Copy Shareable Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareExportPanel;
