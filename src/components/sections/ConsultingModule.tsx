import React from "react";

/**
 * Consulting Module (Hidden behind feature flag featuresConfig.consulting)
 * Reserved for future releases. Will not render in v1.
 */
export const ConsultingModule: React.FC = () => {
  return (
    <section className="py-20 bg-[#F4EFE6] border-b border-[#1C1A17]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 border border-[#1C1A17]/20 bg-[#EBE4D6]">
          <span className="font-mono text-xs text-[#E2541B]">KELGUSI MODUL</span>
          <h3 className="font-serif text-2xl font-bold mt-2">
            Konsalting va Strategik Hamkorlik
          </h3>
          <p className="text-sm text-[#6B645A] mt-2">
            Ushbu bo&apos;lim keyingi versiyalarda faollashtiriladi.
          </p>
        </div>
      </div>
    </section>
  );
};

