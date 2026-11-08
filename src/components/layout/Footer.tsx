import React from "react";
import { getContent } from "@/config/content";
import { siteMedia } from "@/config/siteMedia";
import { contactConfig } from "@/config/contact";

interface FooterProps {
  locale?: string;
}

export const Footer: React.FC<FooterProps> = ({ locale = "uz" }) => {
  const content = getContent(locale);

  return (
    <footer className="border-t border-[#1C1A17]/15 bg-[#EBE4D6] pt-16 pb-24 sm:pb-16 text-[#1C1A17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Blueprint specs & technical stamp */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#1C1A17]/10">
          {/* Identity & Technical Stamp */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E2541B]" />
              <span className="font-mono text-xs text-[#6B645A] tracking-wider uppercase">
                {siteMedia.brand.blueprintTag}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1A17]">
              {content.meta.founderName}
            </h2>
            <p className="text-sm text-[#6B645A] max-w-md leading-relaxed">
              {content.footer.tagline}
            </p>

            {/* Industrial blueprint frame stamp */}
            <div className="mt-4 p-3 border border-dashed border-[#1C1A17]/25 bg-[#F4EFE6]/60 rounded-[2px] font-mono text-[11px] text-[#6B645A] space-y-1">
              <div className="flex justify-between">
                <span>MATRITSA SERIYASI:</span>
                <span className="text-[#1C1A17] font-semibold">01-AA-UZ</span>
              </div>
              <div className="flex justify-between">
                <span>TEXNOLOGIK BOSHQARUV:</span>
                <span className="text-[#1C1A17]">AVTONOM STANDART</span>
              </div>
              <div className="flex justify-between">
                <span>STAMP:</span>
                <span className="text-[#E2541B]">{content.footer.blueprintStamp}</span>
              </div>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <span className="font-mono text-xs text-[#6B645A] uppercase tracking-wider block mb-3">
                Bo&apos;limlar
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#portfel" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    Biznes portfeli
                  </a>
                </li>
                <li>
                  <a href="#yol" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    Yo&apos;l xronologiyasi
                  </a>
                </li>
                <li>
                  <a href="#tamoyil" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    Qolip tamoyili
                  </a>
                </li>
                <li>
                  <a href="#raqamlar" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    Raqamlar va metrikalar
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs text-[#6B645A] uppercase tracking-wider block mb-3">
                Ekotizim
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#eksport" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    Eksport & UZBIC
                  </a>
                </li>
                <li>
                  <a href="#xatolar" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    Mening xatolarim
                  </a>
                </li>
                <li>
                  <a href="#media" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    Media va OAV
                  </a>
                </li>
                <li>
                  <a href="#aloqa" className="text-[#1C1A17]/80 hover:text-[#E2541B] transition-colors">
                    To&apos;g&apos;ridan-to&apos;g&apos;ri aloqa
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social and Telegram */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs text-[#6B645A] uppercase tracking-wider block">
              Rasmiy Aloqa
            </span>
            <div className="flex flex-col gap-2">
              <a
                href={contactConfig.telegramDirect.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target-48 px-3 py-2 border border-[#1C1A17]/15 bg-[#F4EFE6] rounded-[2px] font-mono text-xs text-[#1C1A17] hover:border-[#E2541B] hover:text-[#E2541B] transition-colors flex items-center justify-between"
              >
                <span>Telegram Direct</span>
                <span className="text-[#E2541B]">↗</span>
              </a>
              <a
                href={contactConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target-48 px-3 py-2 border border-[#1C1A17]/15 bg-[#F4EFE6] rounded-[2px] font-mono text-xs text-[#1C1A17] hover:border-[#E2541B] hover:text-[#E2541B] transition-colors flex items-center justify-between"
              >
                <span>Instagram</span>
                <span>↗</span>
              </a>
              <a
                href={contactConfig.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target-48 px-3 py-2 border border-[#1C1A17]/15 bg-[#F4EFE6] rounded-[2px] font-mono text-xs text-[#1C1A17] hover:border-[#E2541B] hover:text-[#E2541B] transition-colors flex items-center justify-between"
              >
                <span>YouTube</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Specs Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#6B645A]">
          <div>
            © {new Date().getFullYear()} {content.footer.founderName}. {content.footer.rightsReserved}
          </div>
          <div className="tracking-wider">
            {content.footer.licenseSpec}
          </div>
        </div>
      </div>
    </footer>
  );
};
