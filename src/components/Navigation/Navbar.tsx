"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Wand2,
  Mic,
  ImageIcon,
  PenTool,
  Share2,
  VideoIcon,
  Search,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "./NavItems";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleDropdownOpen = (label: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(label);
  };

  const handleDropdownClose = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Height of the navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        // Using cubic-bezier for a more natural easing
        const start = window.scrollY;
        const target = offsetPosition;
        const distance = target - start;
        const duration = 1000; // Increased duration for smoother animation
        const startTime = performance.now();

        function easeInOutCubic(t: number): number {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animate(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          window.scrollTo({
            top: start + distance * easeInOutCubic(progress),
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
      }
    }
    setIsMobileMenuOpen(false);
  };

  // For a smoother navbar background transition, update the scroll threshold logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / 100; // Normalize scroll progress
      const threshold = Math.min(scrollProgress, 1); // Cap at 1
      const opacity = threshold * 0.8; // Max opacity of 0.8

      setIsScrolled(window.scrollY > 20);
      document.documentElement.style.setProperty(
        "--navbar-opacity",
        opacity.toString()
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tool") ||
    pathname.startsWith("/mindmap")
  ) {
    return null;
  }
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              OmniCreate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.dropdownItems && handleDropdownOpen(item.label)
                }
                onMouseLeave={handleDropdownClose}
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-primary-600 font-medium transition-colors"
                >
                  {item.label}
                  {item.dropdownItems && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.dropdownItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden">
                    <div className="max-h-[min(75vh,800px)] overflow-y-auto scrollbar-thin">
                      <div className="p-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="flex items-start gap-3 p-3 hover:bg-neutral-50 rounded-lg group transition-all"
                          >
                            <div className="p-2 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                              {dropdownItem.icon}
                            </div>
                            <div>
                              <div className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                                {dropdownItem.label}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {dropdownItem.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/demo"
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary-600/20"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => {
                        if (item.dropdownItems) {
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label
                          );
                        } else {
                          scrollToSection(item.href);
                        }
                      }}
                      className="flex items-center justify-between w-full py-2 text-neutral-600 hover:text-primary-600 font-medium transition-colors"
                    >
                      {item.label}
                      {item.dropdownItems && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {item.dropdownItems && activeDropdown === item.label && (
                      <div className="mt-2 ml-4 max-h-[60vh] overflow-y-auto scrollbar-thin">
                        <div className="space-y-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="flex items-start gap-3 p-3 hover:bg-neutral-50 rounded-lg group transition-all"
                            >
                              <div className="p-2 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                                {dropdownItem.icon}
                              </div>
                              <div>
                                <div className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                                  {dropdownItem.label}
                                </div>
                                <div className="text-sm text-neutral-500">
                                  {dropdownItem.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="h-px bg-neutral-100 my-2" />
                <Link
                  href="/login"
                  className="py-2 text-neutral-700 font-medium hover:text-primary-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/demo"
                  className="py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-center"
                >
                  Request Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
