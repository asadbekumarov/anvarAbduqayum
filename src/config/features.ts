/**
 * Feature Flags and Section Toggle Configuration
 * Controls which modules and sections are rendered in v1 and future releases.
 */

export interface FeatureFlags {
  // Hidden modules for future versions
  consulting: boolean;
  investment: boolean;

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
  // Consulting & Investment are strictly disabled in v1 as per requirements
  consulting: false,
  investment: false,

  // All 9 core v1 sections are enabled by default and toggleable
  sections: {
    hero: true,
    dossier: true,
    portfolio: true,
    timeline: true,
    principles: true,
    numbers: true,
    exportUzbic: true,
    mistakes: true,
    media: true,
    contact: true,
  },
};

