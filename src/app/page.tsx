"use client";
import React from "react";
import HeroSection from "@/components/LandingPage/HeroSection/HeroSection";
import VideoSection from "@/components/LandingPage/VideoSection/VideoSection";
import DetailedFeatures from "@/components/LandingPage/FeaturesSection/FeaturesSection";
import ShowcaseSection from "@/components/LandingPage/ShowcaseSection/ShowcaseSection";
import ContentCreationSection from "@/components/LandingPage/ContentCreation/ContentCreation";
import TemplatesSection from "@/components/LandingPage/TemplateSection/TemplateSection";
import ImageGenerationSection from "@/components/LandingPage/ImageGenerationSection/ImageGenerationSection";
import VoiceGenerationSection from "@/components/LandingPage/VoiceGeneration/VoiceGeneration";
import ComprehensiveSection from "@/components/LandingPage/ComprehensiveSection/ComprehensiveSection";
import ReviewSection from "@/components/LandingPage/ReviewSection/ReviewSection";
import PricingSection from "@/components/LandingPage/PricingSection/PricingSection";
import FAQSection from "@/components/LandingPage/FAQSection/FAQSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <HeroSection id="hero" />
      <VideoSection id="video" />
      <DetailedFeatures id="features" />
      <ShowcaseSection id="showcase" />
      <ContentCreationSection id="content-creation" />
      <TemplatesSection id="templates" />
      <ImageGenerationSection id="image-generation" />
      <VoiceGenerationSection id="voice-generation" />
      <ComprehensiveSection id="comprehensive" />
      <ReviewSection />
      <PricingSection id="pricing" />
      <FAQSection />
    </div>
  );
};

export default HomePage;
