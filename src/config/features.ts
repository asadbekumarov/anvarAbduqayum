/**
 * Feature Flags and Section Toggle Configuration
 * Controls which modules and sections are rendered in v1 and future releases.
 */

export type BookingMode = "telegram" | "calcom";

const resolveDemoMode = (): boolean => {
  const envVal = process.env.NEXT_PUBLIC_DEMO_MODE?.trim().toLowerCase();
  if (envVal === "true") return true;
  return false;
};

const resolvePartnershipIntake = (): boolean => {
  return process.env.NEXT_PUBLIC_PARTNERSHIP_INTAKE?.trim().toLowerCase() === "true";
};

const resolveVentureDossiers = (): boolean => {
  return process.env.NEXT_PUBLIC_VENTURE_DOSSIERS?.trim().toLowerCase() === "true";
};

const resolveMediaLibrary = (): boolean => {
  return process.env.NEXT_PUBLIC_MEDIA_LIBRARY?.trim().toLowerCase() === "true";
};

const resolveExportPortal = (): boolean => {
  return process.env.NEXT_PUBLIC_EXPORT_PORTAL?.trim().toLowerCase() === "true";
};

export interface FeatureFlags {
  // Reversible private demo safety mode (discloses independent concept & blocks real lead delivery)
  demoMode: boolean;

  // Reversible public booking flow toggle (default: "telegram" until Cal.com is confirmed)
  bookingMode: BookingMode;

  // Hidden / temporarily disabled modules
  consulting: boolean;
  investment: boolean;
  quiz: boolean;
  partnershipIntake: boolean;
  ventureDossiers: boolean;
  mediaLibrary: boolean;
  exportPortal: boolean;

  // v1 active sections toggles
  sections: {
    hero: boolean;
    dossier: boolean;
    portfolio: boolean;
    timeline: boolean;
    initiatives: boolean;
    principles: boolean;
    numbers: boolean;
    exportUzbic: boolean;
    mistakes: boolean;
    media: boolean;
    contact: boolean;
  };
}

export const featuresConfig: FeatureFlags = {
  // Set to false (or NEXT_PUBLIC_DEMO_MODE=false) only for authorized official production launch
  demoMode: resolveDemoMode(),

  // Temporary safe handoff to official Telegram administrator pending verified Cal.com config
  bookingMode: "telegram",

  // Consulting, Investment, legacy /test, and isolated B2B intake prototype are disabled by default
  consulting: false,
  investment: false,
  quiz: false,
  partnershipIntake: resolvePartnershipIntake(),
  ventureDossiers: resolveVentureDossiers(),
  mediaLibrary: resolveMediaLibrary(),
  exportPortal: resolveExportPortal(),

  // Active Concept 3 homepage sections (compact 5-section landing page)
  sections: {
    hero: true,
    dossier: false,
    portfolio: true,
    timeline: false,
    initiatives: false,
    principles: true,
    numbers: false,
    exportUzbic: false,
    mistakes: false,
    media: true,
    contact: true,
  },
};

