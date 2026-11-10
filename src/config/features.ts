/**
 * Feature Flags and Section Toggle Configuration
 * Controls which modules and sections are rendered in v1 and future releases.
 */

export type BookingMode = "telegram" | "calcom";

export interface FeatureFlags {
  // Reversible public booking flow toggle (default: "telegram" until Cal.com is confirmed)
  bookingMode: BookingMode;

  // Hidden / temporarily disabled modules
  consulting: boolean;
  investment: boolean;
  quiz: boolean;

  // v1 active sections toggles
  sections: {
    hero: boolean;
    dossier: boolean;
    portfolio: boolean;
    timeline: boolean;
    principles: boolean;
    numbers: boolean;
    exportUzbic: boolean;
    mistakes: boolean;
    media: boolean;
    contact: boolean;
  };
}

export const featuresConfig: FeatureFlags = {
  // Temporary safe handoff to official Telegram administrator pending verified Cal.com config
  bookingMode: "telegram",

  // Consulting, Investment, and legacy un-migrated /test route are disabled in v1
  consulting: false,
  investment: false,
  quiz: false,

  // Active Concept 3 homepage sections (legacy unverified blocks disabled without deletion)
  sections: {
    hero: true,
    dossier: true,
    portfolio: true,
    timeline: true,
    principles: true,
    numbers: false,
    exportUzbic: false,
    mistakes: false,
    media: true,
    contact: true,
  },
};

