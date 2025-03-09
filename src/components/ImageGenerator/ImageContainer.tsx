"use client";
import React, { useState, useEffect } from "react";
import {
  ImageIcon,
  Sparkles,
  Palette,
  Camera,
  ShoppingBag,
  ArrowLeft,
  Save,
  Plus,
  Wand2,
} from "lucide-react";
import ImageForm from "./ImageForm";
import ImageGenerator from "./ImageGenerator";

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  width: number;
  height: number;
  style: string;
  seed?: number;
  negativePrompt?: string;
  createdAt: Date;
}

type ImageGeneratorType = "art" | "photography" | "product" | "general";

interface ImageContainerProps {
  type?: ImageGeneratorType;
  onBack?: () => void;
  onSave?: (image: GeneratedImage) => void;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  type = "art",
  onBack,
  onSave,
}) => {
  // State for form values and generated images
  const [formValues, setFormValues] = useState({
    prompt: "",
    negativePrompt: "",
    promptPrefix: "",
    style:
      type === "art"
        ? "fantasy"
        : type === "photography"
        ? "landscape"
        : type === "product"
        ? "product-white"
        : "photorealistic",
    ratio: "16:9",
    enhanceDetails: true,
    highQuality: false,
    seed: Math.floor(Math.random() * 1000000),
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Type-specific configurations
  const getTypeConfig = () => {
    switch (type) {
      case "art":
        return {
          title: "AI Artwork Generator",
          description: "Create stunning artistic images from text descriptions",
          icon: <Palette className="w-5 h-5" />,
          accentColor: "from-purple-600 to-blue-600",
        };
      case "photography":
        return {
          title: "AI Photography Generator",
          description: "Create realistic photographic images from descriptions",
          icon: <Camera className="w-5 h-5" />,
          accentColor: "from-blue-600 to-cyan-600",
        };
      case "product":
        return {
          title: "Product Visualization Generator",
          description: "Create professional product images for marketing",
          icon: <ShoppingBag className="w-5 h-5" />,
          accentColor: "from-emerald-600 to-teal-600",
        };
      default:
        return {
          title: "AI Image Generator",
          description: "Create images from text descriptions",
          icon: <ImageIcon className="w-5 h-5" />,
          accentColor: "from-primary-600 to-secondary-600",
        };
    }
  };

  const config = getTypeConfig();

  // Handle form value changes
  const handleFormChange = (values: any) => {
    setFormValues(values);
  };

  // Handle image generation
  const handleGenerate = async () => {
    if (!formValues.prompt) {
      setError("Please enter a prompt to generate an image");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      // Mock API call - in a real app, this would call your image generation API
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Get aspect ratio dimensions
      const ratioParts = formValues.ratio.split(":");
      const ratioWidth = parseInt(ratioParts[0]);
      const ratioHeight = parseInt(ratioParts[1]);

      // Calculate dimensions (maintain aspect ratio but keep max dimension under 1024px)
      const maxDimension = 1024;
      let width, height;

      if (ratioWidth > ratioHeight) {
        width = maxDimension;
        height = Math.floor(maxDimension * (ratioHeight / ratioWidth));
      } else {
        height = maxDimension;
        width = Math.floor(maxDimension * (ratioWidth / ratioHeight));
      }

      // Build the full prompt with prefix if provided
      const fullPrompt = formValues.promptPrefix
        ? `${formValues.promptPrefix}: ${formValues.prompt}`
        : formValues.prompt;

      // Create a mock generated image
      const newImage: GeneratedImage = {
        id: `img-${Date.now()}`,
        url: `/api/placeholder/${width}/${height}`,
        prompt: fullPrompt,
        width: width,
        height: height,
        style: formValues.style,
        seed: formValues.seed,
        negativePrompt: formValues.negativePrompt,
        createdAt: new Date(),
      };

      setGeneratedImages((prev) => [newImage, ...prev].slice(0, 20));
      setSelectedImage(newImage);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error("Error generating image:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle save image
  const handleSaveImage = () => {
    if (selectedImage && onSave) {
      onSave(selectedImage);
    }
  };

  // Handle new creation (reset form)
  const handleNewCreation = () => {
    setSelectedImage(null);
    setFormValues({
      ...formValues,
      prompt: "",
      promptPrefix: "",
      negativePrompt: "",
      seed: Math.floor(Math.random() * 1000000),
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="py-4 px-6 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div
              className={`p-2 rounded-lg bg-gradient-to-r ${config.accentColor} text-white shadow-md`}
            >
              {config.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                {config.title}
              </h1>
              <div className="flex items-center gap-2 text-primary-600 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>{config.description}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewCreation}
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>New Image</span>
            </button>
            {selectedImage && (
              <button
                onClick={handleSaveImage}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save Image</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form Section */}
        <div className="w-1/3 border-r border-neutral-200 overflow-hidden">
          <ImageForm
            values={formValues}
            onChange={handleFormChange}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            error={error}
            formType={type}
          />
        </div>

        {/* Generation Results Section */}
        <div className="flex-1 overflow-hidden">
          <ImageGenerator
            isGenerating={isGenerating}
            generatedImages={generatedImages}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
            accentColor={config.accentColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
