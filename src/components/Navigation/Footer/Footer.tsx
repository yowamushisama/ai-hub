"use client";
import React from "react";
import {
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Globe,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  const productLinks = [
    { name: "Features", href: "#features" },
    { name: "Templates", href: "#templates" },
    { name: "AI Blog Writer", href: "/tools/blog" },
    { name: "Image Generator", href: "/tools/image" },
    { name: "Voice Generator", href: "/tools/voice" },
    { name: "Video Creator", href: "/tools/video" },
    { name: "Integrations", href: "/integrations" },
    { name: "API Access", href: "/api" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press Kit", href: "/press" },
    { name: "Partners", href: "/partners" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Security", href: "/security" },
  ];
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tool") ||
    pathname.startsWith("/mindmap") ||
    pathname.startsWith("/image")
  ) {
    return null;
  }
  return (
    <footer className="bg-neutral-950 text-white relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 to-neutral-950/50 pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      {/* Newsletter Section */}
      <div className="relative border-b border-neutral-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 mb-6">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-400">
                Stay Connected
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Join the AI Revolution
            </h3>
            <p className="text-neutral-400 mb-8">
              Get exclusive updates on AI content creation, new features, and
              industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary-500/25 whitespace-nowrap flex items-center justify-center gap-2 group">
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-neutral-900">
                <Sparkles className="w-6 h-6 text-primary-400" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                OmniCreate
              </span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              Transform your content creation with AI-powered tools. Generate
              high-quality content, images, videos, and more in minutes.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <Youtube className="w-5 h-5" />, href: "#" },
                { icon: <Github className="w-5 h-5" />, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-primary-400 hover:bg-neutral-800 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-neutral-800 mt-16 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-neutral-900 text-primary-400 group-hover:bg-neutral-800 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-neutral-400 group-hover:text-primary-400 transition-colors">
                contact@omnicreate.ai
              </span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-neutral-900 text-primary-400 group-hover:bg-neutral-800 transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-neutral-400 group-hover:text-primary-400 transition-colors">
                +1 (555) 123-4567
              </span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-neutral-900 text-primary-400 group-hover:bg-neutral-800 transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-neutral-400 group-hover:text-primary-400 transition-colors">
                San Francisco, CA
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} OmniCreate. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-primary-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
