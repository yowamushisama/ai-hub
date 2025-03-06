import React, { useState, useEffect, useCallback } from "react";
import { Sparkles, Play, ArrowRight, Zap, Star, Wand2 } from "lucide-react";
import Link from "next/link";

// Define the props interface for HeroSection
interface HeroSectionProps {
  id: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(150);
  const [isHoveredStart, setIsHoveredStart] = useState<boolean>(false);
  const [isHoveredDemo, setIsHoveredDemo] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [floatingIconPositions, setFloatingIconPositions] = useState<
    React.CSSProperties[]
  >([]);

  const words: string[] = [
    "Content Creation",
    "Video Generation",
    "Image Creation",
    "Marketing Copy",
    "SEO Optimization",
    "Social Media",
    "Brand Building",
  ];

  const typeText = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      setCurrentText(currentWord.substring(0, currentText.length - 1));
      setTypingSpeed(50);
    } else {
      setCurrentText(currentWord.substring(0, currentText.length + 1));
      setTypingSpeed(150);
    }

    if (!isDeleting && currentText === currentWord) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [currentText, currentWordIndex, isDeleting, words]);

  useEffect(() => {
    const timer = setTimeout(typeText, typingSpeed);
    return () => clearTimeout(timer);
  }, [typeText, typingSpeed]);

  // Generate random positions for floating elements
  const generateRandomPosition = (index: number): React.CSSProperties => ({
    left: `${index * 15 + Math.random() * 20}%`,
    top: `${Math.random() * 80}%`,
    animationDelay: `${Math.random() * 5}s`,
  });

  useEffect(() => {
    // Generate random positions and animation delays on the client side
    const positions = floatingIcons.map((_, i) => generateRandomPosition(i));
    setFloatingIconPositions(positions);
  }, []);

  const floatingIcons = [
    <Sparkles key="sparkles" size={24} className="text-primary-400" />,
    <Star key="star" size={20} className="text-secondary-400" />,
    <Wand2 key="wand" size={22} className="text-accent-400" />,
    <Zap key="zap" size={18} className="text-primary-300" />,
  ];

  return (
    <section
      id={id}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20 animate-gradient-xy" />

      {/* Glowing orb effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-pulse" />

      {/* Floating elements */}
      <div className="absolute inset-0">
        {floatingIcons.map((icon, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={floatingIconPositions[i]}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 inline-block animate-bounce-slow">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 text-sm font-medium border border-primary-500/20 shadow-lg backdrop-blur-sm">
              <Zap className="w-4 h-4 inline-block mr-2" />
              AI-Powered Innovation
            </span>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500">
            Revolutionize Your
            <div className="h-20 md:h-24 relative">
              <span className="text-foreground relative">
                {currentText}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <span className="animate-blink">|</span>
            </div>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your creative workflow with the most advanced AI platform
            for content creators
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link href={"/dashboard"}>
              <button
                onMouseEnter={() => setIsHoveredStart(true)}
                onMouseLeave={() => setIsHoveredStart(false)}
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg hover:shadow-primary-500/25 flex items-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight
                    className={`transition-transform duration-300 ${
                      isHoveredStart ? "translate-x-1" : ""
                    }`}
                    size={20}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>

            <button
              onMouseEnter={() => setIsHoveredDemo(true)}
              onMouseLeave={() => setIsHoveredDemo(false)}
              onClick={() => setIsVideoModalOpen(true)}
              className="group px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm flex items-center gap-2"
            >
              Watch Demo
              <Play
                className={`transition-transform duration-300 ${
                  isHoveredDemo ? "scale-110" : ""
                }`}
                size={20}
              />
            </button>
          </div>

          {/* Trust indicators */}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 max-w-4xl w-full relative">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              Close
            </button>
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              {/* Add video player here */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
