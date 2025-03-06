import React, { useState, useEffect } from "react";
import {
  Mic,
  Play,
  Pause,
  Volume2,
  Sparkles,
  ArrowRight,
  Radio,
  User,
  Globe2,
  Settings2,
  Wand2,
} from "lucide-react";

interface VoiceGenerationProps {
  id: string;
}
const VoiceGenerationSection: React.FC<VoiceGenerationProps> = ({ id }) => {
  const [selectedVoice, setSelectedVoice] = useState("professional");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Simulate audio wave animation
  const [waveform, setWaveform] = useState<number[]>([]);

  useEffect(() => {
    // Generate random waveform data
    const generateWaveform = () => {
      const newWaveform = Array.from(
        { length: 40 },
        () => Math.random() * 0.8 + 0.2
      );
      setWaveform(newWaveform);
    };

    const interval = setInterval(generateWaveform, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const voices = [
    {
      id: "professional",
      name: "Professional",
      description: "Clear and authoritative voice perfect for business content",
      icon: <User className="w-5 h-5" />,
      accent: "American",
      gender: "Male/Female",
      sampleText: "Welcome to our professional AI voice generation platform.",
    },
    {
      id: "casual",
      name: "Casual",
      description: "Natural and friendly tone for social content",
      icon: <Radio className="w-5 h-5" />,
      accent: "Multiple",
      gender: "Male/Female",
      sampleText: "Hey there! Let's create something amazing together.",
    },
    {
      id: "multilingual",
      name: "Multilingual",
      description: "40+ languages with native accents",
      icon: <Globe2 className="w-5 h-5" />,
      accent: "Global",
      gender: "All",
      sampleText: "Create content in any language naturally.",
    },
  ];

  const features = [
    {
      name: "Accent Control",
      value: "40+ Accents",
      icon: <Globe2 className="w-5 h-5" />,
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      name: "Emotion Control",
      value: "12 Emotions",
      icon: <Sparkles className="w-5 h-5" />,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      name: "Voice Age",
      value: "20-70 years",
      icon: <User className="w-5 h-5" />,
      gradient: "from-pink-500/20 to-orange-500/20",
    },
    {
      name: "Languages",
      value: "40+ Languages",
      icon: <Volume2 className="w-5 h-5" />,
      gradient: "from-orange-500/20 to-blue-500/20",
    },
  ];

  return (
    <section
      id={id}
      className="py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated blobs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/10 text-blue-600 mb-8">
            <Mic className="w-5 h-5" />
            <span className="text-sm font-medium">AI Voice Generation</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Give Your Words a Voice
            </span>
          </h2>

          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Transform your text into natural-sounding speech with our AI voice
            generator. Choose from multiple voices, accents, and emotions.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Voice Selection Panel */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Choose Your Voice</h3>
              </div>

              <div className="space-y-4">
                {voices.map((voice) => (
                  <div
                    key={voice.id}
                    className={`group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      selectedVoice === voice.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-neutral-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedVoice === voice.id
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-100 text-neutral-600 group-hover:bg-blue-100"
                        }`}
                      >
                        {voice.icon}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{voice.name}</h4>
                        <p className="text-sm text-neutral-600">
                          {voice.description}
                        </p>
                        <div className="flex gap-4 mt-2 text-xs text-neutral-500">
                          <span>Accent: {voice.accent}</span>
                          <span>Gender: {voice.gender}</span>
                        </div>
                      </div>
                    </div>

                    {/* Audio Player */}
                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(!isPlaying);
                          setActiveDemo(voice.id);
                        }}
                        className={`p-2 rounded-full transition-all ${
                          isPlaying && activeDemo === voice.id
                            ? "bg-blue-500 text-white"
                            : "bg-neutral-100 text-neutral-600 hover:bg-blue-100"
                        }`}
                      >
                        {isPlaying && activeDemo === voice.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>

                      {/* Waveform */}
                      <div className="flex-1 h-8 flex items-center gap-0.5">
                        {waveform.map((height, index) => (
                          <div
                            key={index}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              isPlaying && activeDemo === voice.id
                                ? "bg-blue-500"
                                : "bg-neutral-300"
                            }`}
                            style={{
                              height: `${
                                isPlaying && activeDemo === voice.id
                                  ? height * 32
                                  : 8
                              }px`,
                              opacity:
                                isPlaying && activeDemo === voice.id ? 1 : 0.5,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Panel */}
            <div className="lg:border-l lg:pl-8">
              <div className="flex items-center gap-2 mb-6">
                <Wand2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Voice Features</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative p-4 rounded-xl bg-white border border-neutral-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                          {feature.icon}
                        </div>
                        <div className="text-lg font-semibold text-neutral-800">
                          {feature.name}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700">
                        {feature.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Text Input */}
              <div className="mt-8">
                <textarea
                  defaultValue="Transform your text into natural-sounding speech. Choose from multiple voices, accents, and emotions to create the perfect voiceover."
                  className="w-full h-32 p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none bg-neutral-50 text-neutral-600"
                  readOnly
                ></textarea>
              </div>

              {/* Generate Button */}
              <button className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Voice
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "99%", label: "Natural Speech" },
            { value: "40+", label: "Languages" },
            { value: "1000+", label: "Voice Variations" },
            { value: "24/7", label: "AI Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default VoiceGenerationSection;
