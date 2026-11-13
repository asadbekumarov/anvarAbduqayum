import type { Config } from "tailwindcss";
import { theme as conceptTheme } from "./src/config/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        authority: {
          dark: conceptTheme.colors.darkCanvas,
          darkSurface: conceptTheme.colors.darkSurface,
          darkElevated: conceptTheme.colors.darkSurfaceElevated,
          darkInk: conceptTheme.colors.darkInk,
          darkMuted: conceptTheme.colors.darkMuted,
          darkLine: conceptTheme.colors.darkLine,
          
          light: conceptTheme.colors.lightCanvas,
          lightSurface: conceptTheme.colors.lightSurface,
          lightSubtle: conceptTheme.colors.lightSurfaceSubtle,
          lightInk: conceptTheme.colors.lightInk,
          lightMuted: conceptTheme.colors.lightMuted,
          lightLine: conceptTheme.colors.lightLine,
          
          amber: conceptTheme.colors.amber,
          amberHover: conceptTheme.colors.amberHover,
          amberGlow: conceptTheme.colors.amberGlow,
          
          cobalt: conceptTheme.colors.cobalt,
          cobaltHover: conceptTheme.colors.cobaltHover,
        },
      },
      borderRadius: {
        none: "0px",
        sm: conceptTheme.geometry.radiusSm,
        DEFAULT: conceptTheme.geometry.radiusMd,
        md: conceptTheme.geometry.radiusMd,
        lg: conceptTheme.geometry.radiusLg,
      },
      fontFamily: {
        display: ["var(--font-sans)", "-apple-system", "sans-serif"],
        serif: ["var(--font-sans)", "-apple-system", "sans-serif"],
        sans: ["var(--font-sans)", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
