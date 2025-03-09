"use client";
import React, { useState } from "react";
import {
  Download,
  Share2,
  Copy,
  Edit,
  Sliders,
  Sparkles,
  Loader,
  Star,
  RefreshCw,
  Check,
} from "lucide-react";
import { GeneratedImage } from "./ImageContainer";

interface ImageGeneratorProps {
  isGenerating: boolean;
  generatedImages: GeneratedImage[];
  selectedImage: GeneratedImage | null;
  onSelectImage: (image: GeneratedImage) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  isGenerating,
  generatedImages,
  selectedImage,
  onSelectImage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editOptions, setEditOptions] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Handle edit option changes
  const handleEditOptionChange = (option: string, value: number) => {
    setEditOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
  };

  // Show notification toast
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle image operations
  const handleDownload = () => {
    // In a real app, this would download the actual image
    showNotification("Image downloaded successfully", "success");
  };

  const handleCopy = () => {
    // In a real app, this would copy the image to clipboard
    showNotification("Image copied to clipboard", "success");
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    showNotification("Share dialog opened", "success");
  };

  // Apply filter string for CSS based on edit options
  const getFilterString = () => {
    return `brightness(${editOptions.brightness}%) contrast(${editOptions.contrast}%) saturate(${editOptions.saturation}%) blur(${editOptions.blur}px)`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main Display Area */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Loading State or No Images */}
        {isGenerating && (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50 p-8">
            <div className="mb-4 p-4 bg-primary-50 rounded-full">
              <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-neutral-700 mb-2">
              Creating Your Vision
            </h3>
            <p className="text-neutral-500 text-center max-w-md mb-4">
              Our AI is hard at work turning your description into a stunning
              visual. This may take a few moments...
            </p>
            <div className="w-64 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        )}

        {!isGenerating && generatedImages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50 p-8">
            <div className="mb-4 p-4 bg-primary-50 rounded-full">
              <Sparkles className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-neutral-700 mb-2">
              No Images Generated Yet
            </h3>
            <p className="text-neutral-500 text-center max-w-md mb-4">
              Enter a detailed prompt in the form on the left and click
              "Generate" to create your first AI image.
            </p>
            <button className="px-6 py-3 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg flex items-center gap-2 transition-colors">
              <Sparkles className="w-4 h-4" />
              <span>Try an Example Prompt</span>
            </button>
          </div>
        )}

        {/* Selected Image Display */}
        {!isGenerating && selectedImage && (
          <>
            <div className="flex-1 relative border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50 flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="max-w-full max-h-full object-contain"
                style={{ filter: isEditing ? getFilterString() : "none" }}
              />

              {/* Image Actions Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleFavorite(selectedImage.id)}
                  className={`p-2 rounded-full ${
                    favorites.has(selectedImage.id)
                      ? "bg-yellow-500 text-white"
                      : "bg-white/80 text-neutral-600 hover:bg-white"
                  } backdrop-blur-sm shadow-sm transition-colors`}
                >
                  <Star className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-white/80 text-neutral-600 hover:bg-white backdrop-blur-sm shadow-sm transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-full bg-white/80 text-neutral-600 hover:bg-white backdrop-blur-sm shadow-sm transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/80 text-neutral-600 hover:bg-white backdrop-blur-sm shadow-sm transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-2 rounded-full ${
                    isEditing
                      ? "bg-primary-500 text-white"
                      : "bg-white/80 text-neutral-600 hover:bg-white"
                  } backdrop-blur-sm shadow-sm transition-colors`}
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              {/* Prompt Display */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <p className="text-sm line-clamp-2">{selectedImage.prompt}</p>
              </div>
            </div>

            {/* Image Editor Controls (conditional) */}
            {isEditing && (
              <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-neutral-800 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary-600" />
                    Image Adjustments
                  </h3>
                  <button
                    onClick={() =>
                      setEditOptions({
                        brightness: 100,
                        contrast: 100,
                        saturation: 100,
                        blur: 0,
                      })
                    }
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Brightness Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-neutral-600">
                        Brightness
                      </label>
                      <span className="text-xs font-medium text-neutral-500">
                        {editOptions.brightness}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={editOptions.brightness}
                      onChange={(e) =>
                        handleEditOptionChange(
                          "brightness",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-neutral-200 rounded-full cursor-pointer accent-primary-600"
                    />
                  </div>

                  {/* Contrast Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-neutral-600">
                        Contrast
                      </label>
                      <span className="text-xs font-medium text-neutral-500">
                        {editOptions.contrast}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={editOptions.contrast}
                      onChange={(e) =>
                        handleEditOptionChange(
                          "contrast",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-neutral-200 rounded-full cursor-pointer accent-primary-600"
                    />
                  </div>

                  {/* Saturation Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-neutral-600">
                        Saturation
                      </label>
                      <span className="text-xs font-medium text-neutral-500">
                        {editOptions.saturation}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={editOptions.saturation}
                      onChange={(e) =>
                        handleEditOptionChange(
                          "saturation",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-neutral-200 rounded-full cursor-pointer accent-primary-600"
                    />
                  </div>

                  {/* Blur Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-neutral-600">Blur</label>
                      <span className="text-xs font-medium text-neutral-500">
                        {editOptions.blur}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={editOptions.blur}
                      onChange={(e) =>
                        handleEditOptionChange("blur", parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-neutral-200 rounded-full cursor-pointer accent-primary-600"
                    />
                  </div>
                </div>

                {/* Save Edits Button */}
                <button
                  className="mt-4 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    // In a real app, this would apply the edits permanently
                    setIsEditing(false);
                    showNotification("Edits applied successfully", "success");
                  }}
                >
                  <Check className="w-4 h-4" />
                  Apply Changes
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* History Section (thumbnails of generated images) */}
      {generatedImages.length > 0 && (
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-neutral-800">Recent Generations</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {generatedImages.map((image) => (
              <button
                key={image.id}
                className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                  selectedImage?.id === image.id
                    ? "ring-2 ring-primary-500 ring-offset-2"
                    : "hover:opacity-90"
                }`}
                onClick={() => onSelectImage(image)}
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {favorites.has(image.id) && (
                  <div className="absolute top-1 right-1 bg-yellow-500 text-white rounded-full p-0.5">
                    <Star className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 py-3 px-4 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-2 animate-in ${
            notification.type === "success"
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <Check className="w-5 h-5" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <style jsx>{`
        .animate-in {
          animation: slide-in 0.3s ease-out forwards;
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #aaa;
        }
      `}</style>
    </div>
  );
};

export default ImageGenerator;
