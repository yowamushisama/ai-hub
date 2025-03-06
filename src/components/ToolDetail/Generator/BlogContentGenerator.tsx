"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  PenTool,
  Sparkles,
  ChevronDown,
  Wand2,
  Layout,
  RefreshCw,
  Target,
  Copy,
  Check,
  FileText,
  ListOrdered,
  Palette,
  Globe,
} from "lucide-react";

const contentTypes = [
  {
    id: "article",
    label: "Article",
    description: "Long-form blog article",
    icon: "📝",
  },
  {
    id: "listicle",
    label: "Listicle",
    description: "Numbered list format",
    icon: "📋",
  },
  {
    id: "howTo",
    label: "How-To Guide",
    description: "Step-by-step tutorial",
    icon: "📚",
  },
  {
    id: "review",
    label: "Review",
    description: "Product or service review",
    icon: "⭐",
  },
];

const writingStyles = [
  {
    id: "professional",
    label: "Professional",
    description: "Formal and authoritative",
    icon: "👔",
  },
  {
    id: "casual",
    label: "Casual",
    description: "Friendly and conversational",
    icon: "😊",
  },
  {
    id: "technical",
    label: "Technical",
    description: "Detailed and precise",
    icon: "🔧",
  },
  {
    id: "storytelling",
    label: "Storytelling",
    description: "Narrative and engaging",
    icon: "📖",
  },
];

const BlogContentGenerator = () => {
  // State management
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [selectedType, setSelectedType] = useState(contentTypes[0].id);
  const [selectedStyle, setSelectedStyle] = useState(writingStyles[0].id);
  const [wordCount, setWordCount] = useState(1000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  // Refs for dropdowns
  const styleDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!styleDropdownRef.current?.contains(event.target)) {
        setIsStyleDropdownOpen(false);
      }
      if (!typeDropdownRef.current?.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setGeneratedContent("This is a sample generated blog content...");
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">
              AI Blog Content Generator
            </h1>
            <div className="flex items-center gap-2 mt-1 text-primary-600 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Create engaging blog content with AI assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="p-6 space-y-6">
        {/* Topic Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Target className="w-4 h-4 text-primary-600" />
            <span>Blog Topic</span>
          </div>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your blog topic or main idea..."
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm h-20 resize-none bg-neutral-50"
          />
        </div>

        {/* Keywords Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <ListOrdered className="w-4 h-4 text-primary-600" />
            <span>Target Keywords (optional)</span>
          </div>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords separated by commas"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm bg-neutral-50"
          />
        </div>

        {/* Configuration Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Content Type Selection */}
            <div ref={typeDropdownRef} className="relative">
              <label className="text-sm font-medium text-neutral-700 block mb-2">
                Content Type
              </label>
              <button
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 flex items-center justify-between hover:border-primary-500/50 transition-all text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {
                      contentTypes.find((type) => type.id === selectedType)
                        ?.icon
                    }
                  </span>
                  <span>
                    {
                      contentTypes.find((type) => type.id === selectedType)
                        ?.label
                    }
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    isTypeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isTypeDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-xl border border-neutral-200 shadow-lg p-2 z-20">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        setIsTypeDropdownOpen(false);
                      }}
                      className="w-full p-3 rounded-lg hover:bg-neutral-50 transition-all flex items-center gap-3"
                    >
                      <span className="text-xl">{type.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{type.label}</div>
                        <div className="text-xs text-neutral-500">
                          {type.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Writing Style Selection */}
            <div ref={styleDropdownRef} className="relative">
              <label className="text-sm font-medium text-neutral-700 block mb-2">
                Writing Style
              </label>
              <button
                onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 flex items-center justify-between hover:border-primary-500/50 transition-all text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {
                      writingStyles.find((style) => style.id === selectedStyle)
                        ?.icon
                    }
                  </span>
                  <span>
                    {
                      writingStyles.find((style) => style.id === selectedStyle)
                        ?.label
                    }
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    isStyleDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isStyleDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-xl border border-neutral-200 shadow-lg p-2 z-20">
                  {writingStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setSelectedStyle(style.id);
                        setIsStyleDropdownOpen(false);
                      }}
                      className="w-full p-3 rounded-lg hover:bg-neutral-50 transition-all flex items-center gap-3"
                    >
                      <span className="text-xl">{style.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{style.label}</div>
                        <div className="text-xs text-neutral-500">
                          {style.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Word Count Selection */}
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">
                Word Count
              </label>
              <div className="flex gap-2">
                {[500, 1000, 1500, 2000].map((count) => (
                  <button
                    key={count}
                    onClick={() => setWordCount(count)}
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm transition-all ${
                      wordCount === count
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 hover:border-primary-500/50 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {count}
                    <span className="block text-xs opacity-75">words</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SEO Optimization */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-neutral-700">
                  SEO Optimization
                </span>
              </div>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Keyword optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Meta description generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Header structure optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Content...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Blog Content</span>
            </>
          )}
        </button>

        {/* Generated Content */}
        {generatedContent && (
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-neutral-900">
                Generated Content
              </h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors text-sm"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50">
              <div className="prose prose-sm max-w-none">
                {generatedContent}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContentGenerator;
