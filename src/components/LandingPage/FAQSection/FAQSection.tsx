import React, { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  FileText,
  Users,
  Bot,
  Zap,
  Settings,
  CreditCard,
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQData {
  general: FAQ[];
  content: FAQ[];
  billing: FAQ[];
}

type TabId = keyof FAQData;

interface OpenItems {
  [key: string]: boolean;
}

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [openItems, setOpenItems] = useState<OpenItems>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const tabs = [
    {
      id: "general" as const,
      label: "General",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: "content" as const,
      label: "Content",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "billing" as const,
      label: "Billing & Plans",
      icon: <CreditCard className="w-5 h-5" />,
    },
  ];

  const faqs: FAQData = {
    general: [
      {
        question: "What is OmniCreate AI?",
        answer:
          "OmniCreate AI is an all-in-one content creation platform that uses advanced artificial intelligence to help you create high-quality content across multiple formats - from blog posts to videos, images, and more.",
      },
      {
        question: "How accurate is the AI-generated content?",
        answer:
          "Our AI generates highly accurate content with over 99% precision. However, we always recommend reviewing and editing the output to ensure it perfectly matches your brand voice and requirements.",
      },
      {
        question: "Can I customize the AI's writing style?",
        answer:
          "Yes! You can customize the tone, style, and voice of the AI to match your brand's personality. We offer multiple templates and the ability to train the AI on your existing content.",
      },
      {
        question: "What types of content can I create?",
        answer:
          "You can create a wide variety of content including blog posts, social media posts, marketing copy, product descriptions, video scripts, email newsletters, and more.",
      },
    ],
    content: [
      {
        question: "How does the content creation process work?",
        answer:
          "Our AI analyzes your requirements and generates content using advanced language models. You can specify parameters like tone, style, and format, then review and edit the generated content before finalizing.",
      },
      {
        question: "What content formats are supported?",
        answer:
          "We support a wide range of formats including blog posts, social media content, marketing copy, video scripts, product descriptions, email newsletters, and more.",
      },
      {
        question: "How do I ensure the content matches my brand voice?",
        answer:
          "You can customize the AI's output by providing examples of your brand voice, setting specific guidelines, and using our brand voice training feature. The AI learns and adapts to your preferred style over time.",
      },
      {
        question: "Can I edit and refine the generated content?",
        answer:
          "Yes, absolutely! All generated content can be edited, refined, and customized using our built-in editor. You have full control over the final output.",
      },
    ],
    billing: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers for enterprise customers. All payments are processed securely through our payment partners.",
      },
      {
        question: "Can I change my plan anytime?",
        answer:
          "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any payments accordingly.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, we'll provide a full refund.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees! The price you see is what you pay. All features included in your plan are clearly listed, and we'll never charge you extra without your explicit consent.",
      },
    ],
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-primary-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 mb-6">
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">
              Frequently Asked Questions
            </span>
          </div>

          {/* <h2 className="text-4xl md:text-6xl font-bold mb-6"> */}
          <h2 className="text-4xl md:text-6xl font-bold leading-normal bg-clip-text py-4 text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            Got Questions?
            {/* <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
             */}
            {/* </span> */}
          </h2>

          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Find answers to common questions about our AI-powered content
            creation platform.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex gap-4 p-2 bg-neutral-100 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:bg-white/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs[activeTab].map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleItem(`${activeTab}-${index}`)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg font-medium text-neutral-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${
                    openItems[`${activeTab}-${index}`] ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openItems[`${activeTab}-${index}`] ? "pb-4" : "max-h-0"
                }`}
              >
                <p className="text-neutral-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-600 mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300">
            <Zap className="w-5 h-5" />
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
