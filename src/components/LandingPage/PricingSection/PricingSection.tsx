import React, { useState } from "react";
import { Check, X, Zap, Sparkles, Star, Rocket } from "lucide-react";

interface PricingSectionProps {
  id: string;
}
const PricingSection: React.FC<PricingSectionProps> = ({ id }) => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "For individuals starting their content creation journey",
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        { name: "5,000 Words/month", included: true },
        { name: "10 AI Image Generations", included: true },
        { name: "5 Voice Generations", included: true },
        { name: "2 Video Generations", included: true },
        { name: "25+ Content Templates", included: true },
        { name: "Basic SEO Tools", included: true },
        { name: "Email Support", included: true },
        { name: "5 Languages", included: true },
        { name: "Basic Analytics", included: true },
        { name: "Community Access", included: true },
        { name: "API Access", included: false },
        { name: "Custom Templates", included: false },
        { name: "Priority Support", included: false },
      ],
    },
    {
      name: "Professional",
      description: "Perfect for professional content creators and small teams",
      monthlyPrice: 49,
      yearlyPrice: 490,
      popular: true,
      features: [
        { name: "50,000 Words/month", included: true },
        { name: "100 AI Image Generations", included: true },
        { name: "50 Voice Generations", included: true },
        { name: "20 Video Generations", included: true },
        { name: "100+ Content Templates", included: true },
        { name: "Advanced SEO Suite", included: true },
        { name: "Priority Email Support", included: true },
        { name: "25 Languages", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Community Access", included: true },
        { name: "Basic API Access", included: true },
        { name: "Custom Templates", included: true },
        { name: "Team Collaboration", included: true },
      ],
    },
    {
      name: "Enterprise",
      description: "For businesses requiring maximum AI capabilities",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        { name: "Unlimited Words", included: true },
        { name: "Unlimited AI Images", included: true },
        { name: "Unlimited Voice Gen", included: true },
        { name: "Unlimited Video Gen", included: true },
        { name: "Custom Templates", included: true },
        { name: "Enterprise SEO Tools", included: true },
        { name: "24/7 Priority Support", included: true },
        { name: "40+ Languages", included: true },
        { name: "Custom Analytics", included: true },
        { name: "Community Access", included: true },
        { name: "Full API Access", included: true },
        { name: "Custom Integration", included: true },
        { name: "Dedicated Manager", included: true },
      ],
    },
  ];

  return (
    <section
      id={id}
      className="py-24 bg-gradient-to-b from-white via-primary-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Choose Your Plan</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Pricing Plans for Every Creator
            </span>
          </h2>

          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12">
            Select the perfect plan for your content creation needs. Scale your
            creativity with our powerful AI tools.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span
              className={`text-lg ${
                !isYearly ? "text-neutral-900" : "text-neutral-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-primary-100 p-1 transition-colors duration-300"
            >
              <div
                className={`w-6 h-6 rounded-full bg-primary-600 transition-transform duration-300 transform ${
                  isYearly ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-lg ${
                isYearly ? "text-neutral-900" : "text-neutral-500"
              }`}
            >
              Yearly
              <span className="ml-2 text-sm text-primary-600">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-1 rounded-2xl transition-transform duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
                  : "bg-white shadow-lg"
              }`}
            >
              <div
                className={`${
                  plan.popular ? "bg-white" : "bg-white"
                } rounded-xl p-8 h-full shadow-lg hover:shadow-xl transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-600">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary-600">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-neutral-600">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-4 rounded-xl font-medium mb-8 transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
                      : "bg-primary-50 text-primary-600 hover:bg-primary-100"
                  }`}
                >
                  Get Started
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary-600" />
                      ) : (
                        <X className="w-5 h-5 text-neutral-400" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-neutral-700"
                            : "text-neutral-500"
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-600 mb-4">
            Need a custom plan for your enterprise?
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary-100 text-primary-600 rounded-xl hover:bg-primary-50 transition-colors">
            <Rocket className="w-5 h-5" />
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
