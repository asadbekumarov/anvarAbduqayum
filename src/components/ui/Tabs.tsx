"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const EASE_SWISS = [0.16, 1, 0.3, 1] as const;

export function Tabs({ items, activeId, onChange, className = "" }: TabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      onChange(items[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      onChange(items[prevIndex].id);
      tabRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`inline-flex border-b border-border w-full sm:w-auto ${className}`}
    >
      {items.map((tab, idx) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-6 py-4 text-xs font-sans uppercase tracking-[0.2em] font-medium transition-colors duration-200 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold -mb-px rounded-none ${
              isActive
                ? "text-gold font-semibold"
                : "text-muted hover:text-white"
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7D3B] shadow-[0_0_8px_rgba(223,186,115,0.4)]"
                transition={{ duration: 0.35, ease: EASE_SWISS }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
