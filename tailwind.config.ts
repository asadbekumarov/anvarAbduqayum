import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0A0A0A",
          dark: "#050505",
          light: "#121212",
        },
        elevated: {
          DEFAULT: "#141414",
          surface: "#181818",
          highlight: "#222222",
        },
        border: {
          DEFAULT: "#262626",
          subtle: "#1C1C1C",
          strong: "#383838",
        },
        gold: {
          DEFAULT: "#C5A880",
          light: "#E2C79D",
          hover: "#D4B48A",
          dark: "#9E7D3B",
          dim: "rgba(197, 168, 128, 0.15)",
        },
        champagne: {
          DEFAULT: "#D8C29D",
          soft: "#E5D4B8",
          dark: "#C5A880",
        },
        navy: {
          DEFAULT: "#0B132B",
          900: "#0B132B",
          950: "#070D1F",
          surface: "#0F172A",
        },
        platinum: {
          DEFAULT: "#94A3B8",
          light: "#CBD5E1",
          dark: "#64748B",
        },
        muted: {
          DEFAULT: "#737373",
          light: "#A3A3A3",
          dark: "#525252",
        },
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-outfit)", "'Outfit'", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        outfit: ["var(--font-sans)", "'Outfit'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
