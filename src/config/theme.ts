/**
 * Concept D: The Authority Experience — Design System Tokens
 * Anvar Abduqayum Personal Brand & Business Ecosystem
 * Contrast: Dark Obsidian (#090A0D) <-> Light Cream (#F6F3EC)
 * Warm Amber Accent: #D97736 | Trust Cobalt: #2563EB
 */

export const theme = {
  colors: {
    // Dark Canvas (Hero, Portfolio, Booking CTA)
    darkCanvas: "#090A0D",
    darkSurface: "#12141A",
    darkSurfaceElevated: "#181B24",
    darkInk: "#F5F4F0",
    darkMuted: "#8E95A5",
    darkLine: "rgba(255, 255, 255, 0.09)",
    darkLineStrong: "rgba(255, 255, 255, 0.16)",

    // Light Cream Canvas (Consulting Dossier, Historical Journey)
    lightCanvas: "#F6F3EC",
    lightSurface: "#FFFFFF",
    lightSurfaceSubtle: "#EFEBE1",
    lightInk: "#14161A",
    lightMuted: "#666C7A",
    lightLine: "rgba(20, 22, 26, 0.1)",
    lightLineStrong: "rgba(20, 22, 26, 0.2)",

    // High-End Accents
    amber: "#D97736",
    amberHover: "#E68545",
    amberGlow: "rgba(217, 119, 54, 0.25)",
    amberSubtle: "rgba(217, 119, 54, 0.12)",

    cobalt: "#2563EB",
    cobaltHover: "#1D4ED8",
    cobaltGlow: "rgba(37, 99, 235, 0.25)",
    cobaltSubtle: "rgba(37, 99, 235, 0.12)",
  },

  fonts: {
    display: "var(--font-display)", // Playfair Display (Serif)
    sans: "var(--font-sans)",       // Plus Jakarta Sans
    mono: "var(--font-mono)",       // JetBrains Mono
  },

  geometry: {
    radiusSm: "2px",
    radiusMd: "4px",
    radiusLg: "8px",
    borderWidth: "1px",
  },

  shadows: {
    subtle: "0 2px 8px rgba(0, 0, 0, 0.2)",
    elevated: "0 12px 36px rgba(0, 0, 0, 0.4)",
    monolith: "0 24px 60px rgba(0, 0, 0, 0.7)",
  },
} as const;

export type Theme = typeof theme;
