import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
        serif: ["var(--font-outfit)", "'Outfit'", "sans-serif"],
        sans: ["var(--font-outfit)", "'Outfit'", "sans-serif"],
        outfit: ["var(--font-outfit)", "'Outfit'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
