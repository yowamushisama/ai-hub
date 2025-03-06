import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Type,
  Save,
  Copy,
  Download,
  Check,
  RefreshCw,
  AlertCircle,
  Eye,
  Edit3,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import EditorToolbar, {
  Format,
  EditorStyle,
} from "./EditorToolbar/EditorToolbar";

// Types
export interface GeneratedTitle {
  id: string;
  text: string;
  metrics?: {
    views: number;
    likes: number;
  };
}

export interface VisualEditorProps {
  generatedTitles?: GeneratedTitle[];
  onSave: (content: string) => Promise<void>;
  onCopy: (content: string) => Promise<void>;
  onDownload: (content: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  className?: string;
  initialContent?: string;
}

interface EditorState {
  content: string;
  formats: Format[];
  style: EditorStyle;
  selectionStart: number;
  selectionEnd: number;
}

interface EditorMetrics {
  characters: number;
  words: number;
  sentiment: "positive" | "neutral" | "negative";
}

const VisualEditor: React.FC<VisualEditorProps> = ({
  onSave,
  onCopy,
  onDownload,
  className = "",
  initialContent = "",
}) => {
  // Editor states
  const [editableContent, setEditableContent] =
    useState<string>(initialContent);
  const [activeFormats, setActiveFormats] = useState<Format[]>([]);
  const [currentStyle, setCurrentStyle] = useState<EditorStyle>("professional");
  const [history, setHistory] = useState<EditorState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<EditorMetrics>({
    characters: 0,
    words: 0,
    sentiment: "neutral",
  });
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastSelectionRef = useRef<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

  // Constants
  const MAX_HISTORY = 50;

  // Style maps for text area
  const styleClasses: Record<EditorStyle, string> = {
    professional: "text-lg font-normal text-neutral-900",
    modern:
      "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600",
    creative: "text-lg font-bold text-primary-600 italic",
    minimal: "text-lg font-light tracking-wide text-neutral-800",
  };

  // Update editableContent when initialContent changes
  useEffect(() => {
    if (initialContent !== editableContent) {
      setEditableContent(initialContent);
      if (initialContent) {
        const initialState: EditorState = {
          content: initialContent,
          formats: [],
          style: currentStyle,
          selectionStart: 0,
          selectionEnd: 0,
        };
        setHistory([initialState]);
        setHistoryIndex(0);
      }
    }
  }, [initialContent]);

  // Initialize history on mount
  useEffect(() => {
    if (initialContent && history.length === 0) {
      const initialState: EditorState = {
        content: initialContent,
        formats: [],
        style: currentStyle,
        selectionStart: 0,
        selectionEnd: 0,
      };
      setHistory([initialState]);
      setHistoryIndex(0);
    }
  }, []);

  // Listen to selection changes in the textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleSelectionChange = () => {
      lastSelectionRef.current = {
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
      };
    };

    textarea.addEventListener("select", handleSelectionChange);
    textarea.addEventListener("click", handleSelectionChange);
    textarea.addEventListener("keyup", handleSelectionChange);

    return () => {
      textarea.removeEventListener("select", handleSelectionChange);
      textarea.removeEventListener("click", handleSelectionChange);
      textarea.removeEventListener("keyup", handleSelectionChange);
    };
  }, []);

  // Update metrics when content changes
  useEffect(() => {
    const words = editableContent.trim().split(/\s+/).filter(Boolean).length;
    const characters = editableContent.length;

    let sentiment: "positive" | "neutral" | "negative" = "neutral";
    const positiveWords = [
      "amazing",
      "excellent",
      "great",
      "good",
      "best",
      "love",
      "perfect",
    ];
    const negativeWords = [
      "bad",
      "worst",
      "hate",
      "terrible",
      "poor",
      "awful",
      "horrible",
    ];

    const contentLower = editableContent.toLowerCase();
    const positiveCount = positiveWords.filter((word) =>
      contentLower.includes(word)
    ).length;
    const negativeCount = negativeWords.filter((word) =>
      contentLower.includes(word)
    ).length;

    if (positiveCount > negativeCount) sentiment = "positive";
    else if (negativeCount > positiveCount) sentiment = "negative";

    setMetrics({ words, characters, sentiment });
  }, [editableContent]);

  // Show notification
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle content changes with history update
  const handleContentChange = useCallback(
    (content: string, shouldAddToHistory: boolean = true) => {
      setEditableContent(content);

      if (shouldAddToHistory) {
        const textarea = textareaRef.current;
        const newState: EditorState = {
          content,
          formats: activeFormats,
          style: currentStyle,
          selectionStart: textarea ? textarea.selectionStart : 0,
          selectionEnd: textarea ? textarea.selectionEnd : 0,
        };

        const newHistory = [
          ...history.slice(0, historyIndex + 1),
          newState,
        ].slice(-MAX_HISTORY);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    },
    [activeFormats, currentStyle, history, historyIndex]
  );

  // Apply formatting to the selected text
  const applyFormatting = (format: Format) => {
    if (isLoading) return;
    if (format === "undo" || format === "redo") return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const selectionStart =
      textarea.selectionStart !== undefined
        ? textarea.selectionStart
        : lastSelectionRef.current.start;
    const selectionEnd =
      textarea.selectionEnd !== undefined
        ? textarea.selectionEnd
        : lastSelectionRef.current.end;

    const selectedText = editableContent.substring(
      selectionStart,
      selectionEnd
    );

    if (selectionStart === selectionEnd) {
      setActiveFormats((prev) =>
        prev.includes(format)
          ? prev.filter((f) => f !== format)
          : [...prev, format]
      );
      return;
    }

    let formattedText = selectedText;
    let prefixLength = 0;
    let suffixLength = 0;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        prefixLength = 2;
        suffixLength = 2;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        prefixLength = 1;
        suffixLength = 1;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        prefixLength = 2;
        suffixLength = 2;
        break;
      case "strike":
        formattedText = `~~${selectedText}~~`;
        prefixLength = 2;
        suffixLength = 2;
        break;
      case "h1": {
        const before = editableContent.substring(0, selectionStart);
        const isStartOfLine = before.length === 0 || before.endsWith("\n");
        formattedText = isStartOfLine
          ? `# ${selectedText}`
          : `\n# ${selectedText}`;
        prefixLength = isStartOfLine ? 2 : 3;
        break;
      }
      case "h2": {
        const before = editableContent.substring(0, selectionStart);
        const isStartOfLine = before.length === 0 || before.endsWith("\n");
        formattedText = isStartOfLine
          ? `## ${selectedText}`
          : `\n## ${selectedText}`;
        prefixLength = isStartOfLine ? 3 : 4;
        break;
      }
      case "left": {
        const before = editableContent.substring(0, selectionStart);
        const isStartOfLine = before.length === 0 || before.endsWith("\n");
        formattedText = isStartOfLine
          ? `:left: ${selectedText}`
          : `\n:left: ${selectedText}`;
        prefixLength = isStartOfLine ? 7 : 8;
        break;
      }
      case "center": {
        const before = editableContent.substring(0, selectionStart);
        const isStartOfLine = before.length === 0 || before.endsWith("\n");
        formattedText = isStartOfLine
          ? `:center: ${selectedText}`
          : `\n:center: ${selectedText}`;
        prefixLength = isStartOfLine ? 9 : 10;
        break;
      }
      case "right": {
        const before = editableContent.substring(0, selectionStart);
        const isStartOfLine = before.length === 0 || before.endsWith("\n");
        formattedText = isStartOfLine
          ? `:right: ${selectedText}`
          : `\n:right: ${selectedText}`;
        prefixLength = isStartOfLine ? 8 : 9;
        break;
      }
    }

    const newContent =
      editableContent.substring(0, selectionStart) +
      formattedText +
      editableContent.substring(selectionEnd);

    handleContentChange(newContent);

    if (textarea) {
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          selectionStart + prefixLength,
          selectionEnd + prefixLength
        );
      }, 0);
    }
  };

  // Handle toolbar button clicks (including undo/redo)
  const handleFormatClick = useCallback(
    (format: Format) => {
      if (format === "undo" && historyIndex > 0) {
        const prevState = history[historyIndex - 1];
        setEditableContent(prevState.content);
        setActiveFormats(prevState.formats);
        setCurrentStyle(prevState.style);
        setHistoryIndex(historyIndex - 1);

        const textarea = textareaRef.current;
        if (textarea) {
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
              prevState.selectionStart,
              prevState.selectionEnd
            );
          }, 0);
        }
        return;
      }
      if (format === "redo" && historyIndex < history.length - 1) {
        const nextState = history[historyIndex + 1];
        setEditableContent(nextState.content);
        setActiveFormats(nextState.formats);
        setCurrentStyle(nextState.style);
        setHistoryIndex(historyIndex + 1);

        const textarea = textareaRef.current;
        if (textarea) {
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
              nextState.selectionStart,
              nextState.selectionEnd
            );
          }, 0);
        }
        return;
      }
      applyFormatting(format);
    },
    [history, historyIndex, applyFormatting]
  );

  // Action handlers
  const handleSave = async () => {
    try {
      setIsLoading(true);
      await onSave(editableContent);
      showNotification("Content saved successfully", "success");
    } catch (error) {
      console.error("Error saving content:", error);
      showNotification("Failed to save content", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await onCopy(editableContent);
      showNotification("Content copied to clipboard", "success");
    } catch (error) {
      console.error("Error copying content:", error);
      showNotification("Failed to copy content", "error");
    }
  };

  const handleDownload = async () => {
    try {
      await onDownload(editableContent);
      showNotification("Content downloaded successfully", "success");
    } catch (error) {
      console.error("Error downloading content:", error);
      showNotification("Failed to download content", "error");
    }
  };

  // Get dynamic style for the text area (only used in edit mode)
  const dynamicStyle = styleClasses[currentStyle] || styleClasses.professional;

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary-50">
              <Type className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-900">Visual Editor</h2>
              <p className="text-sm text-neutral-500">
                Edit and format your content
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </button>
            {/* Toggle between Edit and Preview */}
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              title={
                isPreview ? "Switch to Edit Mode" : "Switch to Preview Mode"
              }
            >
              {isPreview ? (
                <Edit3 className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <EditorToolbar
        onFormatClick={handleFormatClick}
        activeFormats={activeFormats}
        onStyleChange={setCurrentStyle}
        currentStyle={currentStyle}
        disabled={isLoading || isPreview}
      />

      {/* Editor / Preview Content */}
      <div className="p-6">
        {isPreview ? (
          <div className="prose max-w-none p-4 border border-neutral-200 rounded-xl shadow-sm bg-white">
            <ReactMarkdown>{editableContent}</ReactMarkdown>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
              <textarea
                ref={textareaRef}
                value={editableContent}
                onChange={(e) => handleContentChange(e.target.value)}
                onSelect={() => {
                  if (textareaRef.current) {
                    lastSelectionRef.current = {
                      start: textareaRef.current.selectionStart,
                      end: textareaRef.current.selectionEnd,
                    };
                  }
                }}
                className={`w-full min-h-[500px] p-6 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none focus:outline-none ${dynamicStyle}`}
                placeholder="Start editing your content..."
                disabled={isLoading}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <span className="font-medium text-primary-600">
                    {metrics.words}
                  </span>{" "}
                  words
                </div>
                <div className="w-px h-3 bg-neutral-200"></div>
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <span className="font-medium text-primary-600">
                    {metrics.characters}
                  </span>{" "}
                  characters
                </div>
              </div>
            </div>

            {/* Formatting Tips */}
            {/* <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <h4 className="text-sm font-medium text-neutral-700 mb-3">
                Formatting Tips
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neutral-700">
                    <strong>Bold:</strong> Use{" "}
                    <code className="bg-neutral-100 px-1 rounded">
                      **text**
                    </code>
                  </p>
                  <p className="text-neutral-700">
                    <strong>Italic:</strong> Use{" "}
                    <code className="bg-neutral-100 px-1 rounded">*text*</code>
                  </p>
                  <p className="text-neutral-700">
                    <strong>Underline:</strong> Use{" "}
                    <code className="bg-neutral-100 px-1 rounded">
                      __text__
                    </code>
                  </p>
                </div>
                <div>
                  <p className="text-neutral-700">
                    <strong>Heading 1:</strong> Use{" "}
                    <code className="bg-neutral-100 px-1 rounded">
                      # Heading
                    </code>
                  </p>
                  <p className="text-neutral-700">
                    <strong>Heading 2:</strong> Use{" "}
                    <code className="bg-neutral-100 px-1 rounded">
                      ## Heading
                    </code>
                  </p>
                  <p className="text-neutral-700">
                    <strong>Strikethrough:</strong> Use{" "}
                    <code className="bg-neutral-100 px-1 rounded">
                      ~~text~~
                    </code>
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg animate-fade-in ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VisualEditor;
