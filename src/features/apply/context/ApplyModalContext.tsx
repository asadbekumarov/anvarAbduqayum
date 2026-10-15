"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ApplyModal } from "../components/ApplyModal";

interface ApplyModalContextValue {
  isOpen: boolean;
  selectedService: string | null;
  openApply: (serviceName?: string | unknown) => void;
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

  const openApply = useCallback((serviceName?: string | unknown) => {
    if (typeof serviceName === "string") {
      setSelectedService(serviceName);
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
