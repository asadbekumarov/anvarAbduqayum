"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ApplyModal } from "../components/ApplyModal";

interface ApplyModalContextValue {
  isOpen: boolean;
  openApply: () => void;
  closeApply: () => void;
}

const ApplyModalContext = createContext<ApplyModalContextValue>({
  isOpen: false,
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

  const openApply = useCallback(() => setIsOpen(true), []);
  const closeApply = useCallback(() => setIsOpen(false), []);

  return (
    <ApplyModalContext.Provider value={{ isOpen, openApply, closeApply }}>
      {children}
      <ApplyModal isOpen={isOpen} onClose={closeApply} />
    </ApplyModalContext.Provider>
  );
}
