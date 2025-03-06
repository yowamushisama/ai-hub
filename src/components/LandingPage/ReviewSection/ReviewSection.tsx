import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";

const ReviewSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-primary-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500/10 text-primary-600 mb-8">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">What Our Users Say</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Trusted by 50,000+ Creators
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Join the community of creative professionals who have transformed
            their content creation workflow
          </p>
        </div>

        {/* Featured Review Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-8">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="relative">
                  <Star
                    className="w-8 h-8 fill-yellow-400 text-yellow-400 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(250, 204, 21, 0.4))",
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                  <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-20" />
                </div>
              ))}
            </div>

            {/* Review Content */}
            <blockquote className="text-xl md:text-2xl text-neutral-800 font-medium mb-10 leading-relaxed text-center">
              "As a content creator, time is everything. OmniCreate's AI tools
              have been a game-changer for my workflow. I've cut my content
              creation time in half while actually improving quality. The AI
              understands my brand voice perfectly, and the multi-platform
              optimization is incredible. It's not just a tool – it's like
              having a full creative team backing you up 24/7. Absolutely worth
              every penny!"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    AK
                  </span>
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg text-neutral-900">
                  Alex Kim
                </div>
                <div className="text-neutral-600">
                  Digital Content Creator & Marketing Consultant
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-2xl group-hover:opacity-70 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-secondary-400/10 to-accent-400/10 rounded-full blur-2xl group-hover:opacity-70 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
