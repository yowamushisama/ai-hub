"use client";
// app/tool/[id]/ToolClientWrapper.tsx - Client Component
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Sparkles, BrainCircuit, Loader } from "lucide-react";

// Enhanced AI Hub loading component
function AIHubLoading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[600px] w-full bg-gradient-to-b from-white to-primary-50">
      {/* Animated logo container */}
      <div className="relative mb-8">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-primary-400/20 blur-xl rounded-full animate-pulse"></div>

        {/* Logo circle with gradient */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg">
          <BrainCircuit className="w-12 h-12 text-white" />

          {/* Orbiting sparkle */}
          <div className="absolute w-full h-full animate-spin-slow pointer-events-none">
            <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary-300" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <h3 className="text-2xl font-bold text-neutral-800 mb-3 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        AI Hub
      </h3>
      <p className="text-neutral-600 mb-6 text-center max-w-xs">
        Preparing your intelligent workspace...
      </p>

      {/* Loading indicator */}
      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-primary-100">
        <Loader className="w-5 h-5 text-primary-600 animate-spin" />
        <span className="text-sm font-medium text-primary-700">
          Loading components
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1.5 bg-neutral-200 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-loading-progress"></div>
      </div>
    </div>
  );
}

// Dynamic imports for the client components
const MainTool = dynamic(
  () => import("@/components/ToolDetail/MainToolDetail"),
  {
    loading: () => <AIHubLoading />,
  }
);

const MindMapGenerator = dynamic(
  () => import("@/components/DiagramGenerator/MindMapGenerator"),
  {
    loading: () => <AIHubLoading />,
  }
);

interface ToolClientWrapperProps {
  toolId: string;
  category: string;
}

// Create mapping of category to component
const categoryComponentMapping: Record<string, React.ComponentType<any>> = {
  text: MainTool,
  diagram: MindMapGenerator,
};

const ToolClientWrapper: React.FC<ToolClientWrapperProps> = ({
  toolId,
  category,
}) => {
  // Determine which component to render based on category
  const ComponentToRender = categoryComponentMapping[category] || MainTool;

  return (
    <Suspense fallback={<AIHubLoading />}>
      <ComponentToRender toolId={toolId} />
    </Suspense>
  );
};

export default ToolClientWrapper;

// Add custom animations to global CSS or include here with style jsx
const LoadingAnimations = () => (
  <style jsx global>{`
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes loading-progress {
      0% {
        width: 0%;
        opacity: 1;
      }
      50% {
        width: 70%;
        opacity: 0.8;
      }
      80% {
        width: 85%;
        opacity: 0.7;
      }
      100% {
        width: 100%;
        opacity: 1;
      }
    }

    .animate-spin-slow {
      animation: spin-slow 8s linear infinite;
    }

    .animate-loading-progress {
      animation: loading-progress 2.5s ease-out forwards;
      animation-iteration-count: infinite;
    }
  `}</style>
);
