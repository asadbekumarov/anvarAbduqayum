"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItemData {
  id: string;
  step: string;
  title: string;
  description: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
  onActiveChange?: (index: number) => void;
}

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

export function Accordion({
  items,
  defaultOpenId,
  className = "",
  onActiveChange,
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? (items.length > 0 ? items[0].id : null)
  );

  const toggleItem = (id: string, idx: number) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (onActiveChange) {
      onActiveChange(next ? idx : -1);
    }
  };

  return (
    <div className={`relative divide-y divide-border border-y border-border ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const buttonId = `accordion-button-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={`relative transition-colors duration-300 ${
              isOpen ? "bg-elevated/50" : "hover:bg-elevated/20"
            }`}
          >
            {/* Active Step Metallic Gold Left Indicator */}
            {isOpen && (
              <motion.div
                layoutId="active-accordion-gold-line"
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#DFBA73] via-[#C5A059] to-[#9E7D3B] shadow-[0_0_12px_rgba(223,186,115,0.4)] z-10"
                transition={{ duration: 0.35, ease: EASE_SWISS }}
              />
            )}

            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id, idx)}
                className="w-full py-6 sm:py-8 px-4 sm:px-8 flex items-center justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold group"
              >
                <div className="flex items-baseline gap-6 sm:gap-8 flex-1">
                  <span
                    className={`font-serif text-xl sm:text-2xl font-light shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-gold font-medium" : "text-gold/60 group-hover:text-gold"
                    }`}
                  >
                    /{item.step}
                  </span>
                  <span
                    className={`font-serif text-lg sm:text-2xl tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-white font-medium" : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Tactile Motion Rotate Plus/Close Icon */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE_SWISS }}
                  className={`w-8 h-8 shrink-0 border flex items-center justify-center transition-colors duration-300 rounded-[2px] ${
                    isOpen
                      ? "border-gold text-gold bg-gold/10"
                      : "border-border text-muted group-hover:border-gold/40 group-hover:text-white"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </motion.div>
              </button>
            </h3>

            {/* Framer Motion Zero-Jank Seamless Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: EASE_SWISS }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-8 pb-8 pl-14 sm:pl-20 max-w-3xl">
                    <p className="text-sm sm:text-base text-muted font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
