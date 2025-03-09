import React, { useState, useRef, useEffect } from "react";
import {
  Wand2,
  Sparkles,
  Layout,
  Palette,
  RefreshCw,
  Image as ImageIcon,
  AlertCircle,
  Sliders,
  Camera,
  Info,
  MessageSquare,
} from "lucide-react";

interface ImageFormProps {
  values: {
    prompt: string;
    negativePrompt: string;
    style: string;
    ratio: string;
    enhanceDetails: boolean;
    highQuality: boolean;
    seed?: number;
  };
  onChange: (values: any) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string | null;
  formType?: "art" | "photography" | "product" | "general";
}

const ImageForm: React.FC<ImageFormProps> = ({
  values,
  onChange,
  onGenerate,
  isGenerating,
  error,
  formType = "art",
}) => {
  // State for dropdowns and UI interaction
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [isRatioOpen, setIsRatioOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState<"prompt" | "style" | "advanced">(
    "prompt"
  );
  const [showTips, setShowTips] = useState(false);

  // Refs for click outside handling
  const styleDropdownRef = useRef<HTMLDivElement>(null);
  const ratioDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        styleDropdownRef.current &&
        !styleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStyleOpen(false);
      }
      if (
        ratioDropdownRef.current &&
        !ratioDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRatioOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get config based on form type
  const getConfig = () => {
    switch (formType) {
      case "art":
        return {
          title: "AI Artwork Generator",
          description: "Create stunning artistic images from text descriptions",
          icon: <Palette className="w-5 h-5" />,
          placeholderText:
            "An ethereal digital painting of ancient forest spirits, mystical flora with bioluminescent elements, dreamlike atmosphere, intricate details, fantasy art style...",
          styleOptions: [
            {
              id: "fantasy",
              name: "Fantasy Art",
              description: "Magical and mythical worlds",
              primaryColor: "from-purple-600 to-blue-600",
            },
            {
              id: "abstract",
              name: "Abstract",
              description: "Non-representational artistic style",
              primaryColor: "from-red-600 to-orange-600",
            },
            {
              id: "oil-painting",
              name: "Oil Painting",
              description: "Classic painting techniques",
              primaryColor: "from-amber-700 to-yellow-600",
            },
            {
              id: "digital-art",
              name: "Digital Art",
              description: "Modern digital illustration",
              primaryColor: "from-blue-600 to-cyan-600",
            },
            {
              id: "watercolor",
              name: "Watercolor",
              description: "Soft watercolor painting style",
              primaryColor: "from-emerald-500 to-teal-600",
            },
            {
              id: "concept-art",
              name: "Concept Art",
              description: "Professional concept art style",
              primaryColor: "from-violet-600 to-purple-600",
            },
          ],
          tips: [
            "Reference artistic styles or specific artists for inspiration",
            "Describe the mood, lighting, and color palette",
            "Mention the level of detail and complexity you want",
            "Specify any fantasy elements or magical effects",
          ],
        };
      case "photography":
        return {
          title: "AI Photography Generator",
          description: "Create realistic photographic images from descriptions",
          icon: <Camera className="w-5 h-5" />,
          placeholderText:
            "A breathtaking landscape photograph of misty mountains at sunrise, golden light filtering through clouds, ultra detailed, shot on a Canon EOS R5 with 16-35mm f/2.8 lens, high resolution...",
          styleOptions: [
            {
              id: "portrait",
              name: "Portrait",
              description: "Professional portrait photography",
              primaryColor: "from-pink-600 to-rose-600",
            },
            {
              id: "landscape",
              name: "Landscape",
              description: "Stunning nature scenes",
              primaryColor: "from-green-600 to-emerald-600",
            },
            {
              id: "wildlife",
              name: "Wildlife",
              description: "Animal photography in natural habitats",
              primaryColor: "from-amber-600 to-yellow-600",
            },
            {
              id: "street",
              name: "Street",
              description: "Urban life and architecture",
              primaryColor: "from-neutral-600 to-slate-600",
            },
            {
              id: "macro",
              name: "Macro",
              description: "Extreme close-up photography",
              primaryColor: "from-blue-600 to-cyan-600",
            },
            {
              id: "aerial",
              name: "Aerial",
              description: "Drone and bird's eye views",
              primaryColor: "from-sky-600 to-indigo-600",
            },
          ],
          tips: [
            "Mention camera type, lens, and settings for realistic results",
            "Describe lighting conditions (golden hour, blue hour, etc.)",
            "Specify distance and perspective (close-up, wide angle)",
            "Include details about composition and framing",
          ],
        };
      case "product":
        return {
          title: "Product Visualization Generator",
          description: "Create professional product images for marketing",
          icon: <ImageIcon className="w-5 h-5" />,
          placeholderText:
            "A sleek modern coffee maker on a marble countertop, professional product photography, soft studio lighting, clean background, photorealistic, advertisement quality...",
          styleOptions: [
            {
              id: "product-white",
              name: "Studio White",
              description: "Clean white background studio shot",
              primaryColor: "from-neutral-500 to-slate-600",
            },
            {
              id: "product-lifestyle",
              name: "Lifestyle",
              description: "Product in use in natural setting",
              primaryColor: "from-amber-600 to-orange-600",
            },
            {
              id: "product-closeup",
              name: "Close-up Detail",
              description: "Detailed product features",
              primaryColor: "from-emerald-600 to-green-600",
            },
            {
              id: "product-flatlay",
              name: "Flat Lay",
              description: "Top-down arrangement view",
              primaryColor: "from-blue-600 to-indigo-600",
            },
            {
              id: "product-packaging",
              name: "Packaging",
              description: "Product with packaging focus",
              primaryColor: "from-purple-600 to-violet-600",
            },
            {
              id: "product-3d",
              name: "3D Render",
              description: "Photorealistic 3D rendered product",
              primaryColor: "from-rose-600 to-pink-600",
            },
          ],
          tips: [
            "Describe the product material, color, and finish in detail",
            "Specify lighting setup (soft box, ring light, etc.)",
            "Mention if you want props or context around the product",
            "Include details about perspective and angle",
          ],
        };
      default:
        return {
          title: "AI Image Generator",
          description: "Create images from text descriptions",
          icon: <Wand2 className="w-5 h-5" />,
          placeholderText:
            "A detailed description of the image you want to create...",
          styleOptions: [
            {
              id: "photorealistic",
              name: "Photorealistic",
              description: "Highly detailed, lifelike images",
              primaryColor: "from-blue-600 to-cyan-600",
            },
            {
              id: "digital-art",
              name: "Digital Art",
              description: "Modern digital illustration style",
              primaryColor: "from-purple-600 to-violet-600",
            },
            {
              id: "anime",
              name: "Anime",
              description: "Japanese animation style",
              primaryColor: "from-pink-600 to-rose-600",
            },
            {
              id: "cinematic",
              name: "Cinematic",
              description: "Film-like quality and composition",
              primaryColor: "from-amber-600 to-yellow-600",
            },
            {
              id: "abstract",
              name: "Abstract",
              description: "Non-representational artistic style",
              primaryColor: "from-red-600 to-orange-600",
            },
            {
              id: "oil-painting",
              name: "Oil Painting",
              description: "Traditional oil painting texture",
              primaryColor: "from-emerald-600 to-green-600",
            },
          ],
          tips: [
            "Be detailed and specific in your descriptions",
            "Include information about style, lighting, and composition",
            "Mention colors, mood, and atmosphere",
            "Specify perspective and point of view",
          ],
        };
    }
  };

  const config = getConfig();

  // Aspect Ratio Options
  const ratioOptions = [
    {
      id: "16:9",
      name: "Landscape (16:9)",
      description: "Ideal for desktop wallpapers",
      width: 16,
      height: 9,
    },
    {
      id: "4:3",
      name: "Standard (4:3)",
      description: "Classic photography ratio",
      width: 4,
      height: 3,
    },
    {
      id: "1:1",
      name: "Square (1:1)",
      description: "Perfect for social media posts",
      width: 1,
      height: 1,
    },
    {
      id: "9:16",
      name: "Portrait (9:16)",
      description: "Ideal for mobile and stories",
      width: 9,
      height: 16,
    },
  ];

  // Handle input changes
  const handleChange = (name: string, value: any) => {
    onChange({ ...values, [name]: value });
  };

  // Generate random seed
  const generateRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 1000000);
    handleChange("seed", newSeed);
  };

  // Get the selected option details
  const selectedStyle =
    config.styleOptions.find((style) => style.id === values.style) ||
    config.styleOptions[0];
  const selectedRatio =
    ratioOptions.find((ratio) => ratio.id === values.ratio) || ratioOptions[0];

  // Helper to get gradient classes based on style
  const getStyleGradient = (style: string) => {
    const option = config.styleOptions.find((s) => s.id === style);
    return option?.primaryColor || "from-primary-600 to-secondary-600";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-neutral-200">
        <button
          onClick={() => setActiveTab("prompt")}
          className={`flex-1 py-4 px-2 text-center text-sm font-medium transition-colors ${
            activeTab === "prompt"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Prompt
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`flex-1 py-4 px-2 text-center text-sm font-medium transition-colors ${
            activeTab === "style"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Style
        </button>
        <button
          onClick={() => setActiveTab("advanced")}
          className={`flex-1 py-4 px-2 text-center text-sm font-medium transition-colors ${
            activeTab === "advanced"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Advanced
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="flex-1 overflow-y-auto">
        {/* Prompt Tab */}
        {activeTab === "prompt" && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-neutral-800">
                {config.title}
              </h3>
              <button
                onClick={() => setShowTips(!showTips)}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                title="Show Tips"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            {showTips && (
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mb-4 animate-in">
                <h4 className="font-medium text-primary-700 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Tips for Great Results
                </h4>
                <ul className="text-sm text-primary-700 space-y-1.5">
                  {config.tips.map((tip, index) => (
                    <li key={index} className="flex items-baseline gap-2">
                      <span className="text-primary-500">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <Wand2 className="w-4 h-4 text-primary-600" />
                <span>Describe your image</span>
              </label>
              <textarea
                value={values.prompt}
                onChange={(e) => handleChange("prompt", e.target.value)}
                placeholder={config.placeholderText}
                className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none bg-neutral-50 h-60 text-sm"
              />
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Be specific about details, style, and composition</span>
                <span>{values.prompt.length} characters</span>
              </div>
            </div>

            <button
              onClick={onGenerate}
              disabled={isGenerating || !values.prompt.trim()}
              className={`w-full py-4 rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white ${
                isGenerating
                  ? "bg-neutral-500"
                  : `bg-gradient-to-r ${getStyleGradient(
                      values.style
                    )} hover:shadow-primary-500/25`
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Your Image...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Image</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Style Tab */}
        {activeTab === "style" && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-neutral-800">
              Image Style & Format
            </h3>

            {/* Style Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-700">
                Image Style
              </label>
              <div className="grid grid-cols-2 gap-3" ref={styleDropdownRef}>
                {config.styleOptions.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleChange("style", style.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      values.style === style.id
                        ? `border-2 border-primary-500 bg-primary-50`
                        : "border-neutral-200 hover:border-primary-500/30 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${style.primaryColor} text-white shadow-sm`}
                      >
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{style.name}</div>
                        <div className="text-xs text-neutral-500">
                          {style.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-700">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-3" ref={ratioDropdownRef}>
                {ratioOptions.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => handleChange("ratio", ratio.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      values.ratio === ratio.id
                        ? "border-2 border-primary-500 bg-primary-50"
                        : "border-neutral-200 hover:border-primary-500/30 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`mb-2 border-2 ${
                          values.ratio === ratio.id
                            ? "border-primary-500"
                            : "border-neutral-300"
                        } rounded flex items-center justify-center bg-white`}
                        style={{
                          width: `${Math.min(60, ratio.width * 5)}px`,
                          height: `${Math.min(60, ratio.height * 5)}px`,
                          aspectRatio: `${ratio.width}/${ratio.height}`,
                        }}
                      >
                        <span className="text-xs text-neutral-400">
                          {ratio.id}
                        </span>
                      </div>
                      <div className="font-medium text-sm">{ratio.name}</div>
                      <div className="text-xs text-neutral-500">
                        {ratio.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() =>
                  handleChange("enhanceDetails", !values.enhanceDetails)
                }
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-all border border-neutral-200"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  <span className="text-sm">Enhance Details</span>
                </div>
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    values.enhanceDetails ? "bg-primary-500" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      values.enhanceDetails ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleChange("highQuality", !values.highQuality)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-all border border-neutral-200"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary-500" />
                  <span className="text-sm">High Quality (slower)</span>
                </div>
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    values.highQuality ? "bg-primary-500" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      values.highQuality ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === "advanced" && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-neutral-800">
              Advanced Settings
            </h3>

            {/* Negative Prompt */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <AlertCircle className="w-4 h-4 text-neutral-500" />
                <span>Negative Prompt (what to avoid)</span>
              </label>
              <textarea
                value={values.negativePrompt}
                onChange={(e) => handleChange("negativePrompt", e.target.value)}
                placeholder="Low quality, blurry, distorted faces, unrealistic proportions..."
                className="w-full p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none bg-neutral-50 h-32 text-sm"
              />
              <p className="text-xs text-neutral-500">
                Specify elements you want to exclude from the generated image
              </p>
            </div>

            {/* Seed Control */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-medium text-neutral-700">
                <span>Generation Seed</span>
                <button
                  onClick={generateRandomSeed}
                  className="text-xs text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Randomize
                </button>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={values.seed || 0}
                  onChange={(e) =>
                    handleChange("seed", parseInt(e.target.value) || 0)
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm bg-neutral-50"
                  min="0"
                  max="999999"
                />
                <button
                  onClick={generateRandomSeed}
                  className="px-4 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
              <p className="text-xs text-neutral-500">
                Using the same seed with identical settings will produce similar
                results
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">
                    Advanced Tips
                  </h4>
                  <p className="text-xs text-blue-700 mt-1">
                    For consistent results across multiple generations, use the
                    same seed value. Negative prompts help refine your image by
                    removing unwanted elements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar with Generate Button (only on style and advanced tabs) */}
      {(activeTab === "style" || activeTab === "advanced") && (
        <div className="p-4 border-t border-neutral-200">
          <button
            onClick={onGenerate}
            disabled={isGenerating || !values.prompt.trim()}
            className={`w-full py-4 rounded-xl font-medium transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white ${
              isGenerating
                ? "bg-neutral-500"
                : `bg-gradient-to-r ${getStyleGradient(
                    values.style
                  )} hover:shadow-primary-500/25`
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating Your Image...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Image</span>
              </>
            )}
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageForm;
