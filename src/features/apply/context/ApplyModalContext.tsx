"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ApplyModal } from "../components/ApplyModal";

export const SERVICE_TITLES: Record<string, string> = {
  "01": "Strategik audit va rivojlanish xaritasi",
  "02": "Operatsion tizimlashtirish va reglamentlar",
  "03": "B2B/B2C sotuv bo'limini qurish va marketing",
  "04": "Korporativ boshqaruv va HR-arxitektura",
  "05": "Muzokaralar va B2B kommunikatsiya standartlari",
  "06": "Biznes transformatsiyasi va shaxsiy treking",
  "service-01": "Strategik audit va rivojlanish xaritasi",
  "service-02": "Operatsion tizimlashtirish va reglamentlar",
  "service-03": "B2B/B2C sotuv bo'limini qurish va marketing",
  "service-04": "Korporativ boshqaruv va HR-arxitektura",
  "service-05": "Muzokaralar va B2B kommunikatsiya standartlari",
  "service-06": "Biznes transformatsiyasi va shaxsiy treking",
};

export type OpenApplyOptions =
  | string
  | {
      service?: string;
      [key: string]: unknown;
    };

export interface ApplyModalContextValue {
  isOpen: boolean;
  selectedService: string | null;
  openApply: (options?: OpenApplyOptions | unknown) => void;
  closeApply: () => void;
}

const ApplyModalContext = createContext<ApplyModalContextValue>({
  isOpen: false,
  selectedService: null,
  openApply: () => {},
  closeApply: () => {},
});

export const useApplyModal = () => {
  const context = useContext(ApplyModalContext);
  if (!context) {
    throw new Error("useApplyModal must be used within an ApplyModalProvider");
  }
  return context;
};

export function ApplyModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const openApply = useCallback((options?: OpenApplyOptions | unknown) => {
    if (typeof options === "string") {
      const resolved = SERVICE_TITLES[options] || options;
      setSelectedService(resolved);
    } else if (
      options &&
      typeof options === "object" &&
      "service" in (options as Record<string, unknown>)
    ) {
      const rawService = (options as { service?: string }).service;
      if (rawService) {
        const resolved = SERVICE_TITLES[rawService] || rawService;
        setSelectedService(resolved);
      } else {
        setSelectedService(null);
      }
    } else {
      setSelectedService(null);
    }
    setIsOpen(true);
  }, []);

  const closeApply = useCallback(() => {
    setIsOpen(false);
    setSelectedService(null);
  }, []);

  return (
    <ApplyModalContext.Provider
      value={{ isOpen, selectedService, openApply, closeApply }}
    >
      {children}
      <ApplyModal
        isOpen={isOpen}
        onClose={closeApply}
        selectedService={selectedService}
      />
    </ApplyModalContext.Provider>
  );
}
