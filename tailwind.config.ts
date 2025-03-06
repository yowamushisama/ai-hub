import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Rich dark theme colors
        "rich-black": "var(--rich-black)",
        "deep-space": "var(--deep-space)",
        "midnight-blue": "var(--midnight-blue)",
        // Glowing accent colors
        "neon-blue": "var(--neon-blue)",
        "electric-purple": "var(--electric-purple)",
        "cosmic-purple": "var(--cosmic-purple)",
        // Existing color scales
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
          950: "var(--accent-950)",
        },
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
          950: "var(--neutral-950)",
        },
        surface: {
          50: "var(--surface-50)",
          100: "var(--surface-100)",
          200: "var(--surface-200)",
          300: "var(--surface-300)",
          400: "var(--surface-400)",
        },
        success: {
          50: "var(--success-50)",
          500: "var(--success-500)",
          900: "var(--success-900)",
        },
        warning: {
          50: "var(--warning-50)",
          500: "var(--warning-500)",
          900: "var(--warning-900)",
        },
        error: {
          50: "var(--error-50)",
          500: "var(--error-500)",
          900: "var(--error-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-primary)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        cursive: ["var(--font-cursive)"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "float-text": "floatText 3s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "0% 0%",
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "100% 100%",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        sparkle: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(0.8)",
          },
        },
        glow: {
          "0%, 100%": {
            opacity: "1",
            filter: "brightness(1)",
          },
          "50%": {
            opacity: "0.8",
            filter: "brightness(1.2)",
          },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        floatText: {
          "0%, 100%": {
            transform: "translateY(0) rotate(-4deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotate(-4deg)",
          },
        },
      },
      backgroundImage: {
        "gradient-cosmic": "var(--gradient-cosmic)",
        "gradient-aurora": "var(--gradient-aurora)",
        "gradient-nebula": "var(--gradient-nebula)",
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-blue-purple": "var(--gradient-blue-purple)",
        "gradient-sunset": "var(--gradient-sunset)",
        "gradient-ocean": "var(--gradient-ocean)",
      },
      backdropBlur: {
        cosmic: "20px",
      },
      // Add custom glass effect utilities
      backgroundColor: {
        glass: "var(--glass-bg)",
      },
      borderColor: {
        glass: "var(--glass-border)",
      },
      boxShadow: {
        "glow-primary": "0 0 20px var(--primary-400)",
        "glow-secondary": "0 0 20px var(--secondary-400)",
        "glow-accent": "0 0 20px var(--accent-400)",
        "glow-cosmic":
          "0 0 30px var(--neon-blue), 0 0 60px var(--cosmic-purple)",
      },
    },
  },
  plugins: [],
} satisfies Config;
