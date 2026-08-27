"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type LegalTab = "terminos" | "privacidad" | "cookies";

interface LegalContextType {
  showLegalModal: boolean;
  activeLegalTab: LegalTab;
  openLegalModal: (tab: LegalTab) => void;
  closeLegalModal: () => void;
}

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export function LegalProvider({ children }: { children: ReactNode }) {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>("terminos");

  const openLegalModal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setShowLegalModal(true);
  };

  const closeLegalModal = () => setShowLegalModal(false);

  return (
    <LegalContext.Provider value={{ showLegalModal, activeLegalTab, openLegalModal, closeLegalModal }}>
      {children}
    </LegalContext.Provider>
  );
}

export function useLegal() {
  const context = useContext(LegalContext);
  if (context === undefined) {
    throw new Error("useLegal must be used within a LegalProvider");
  }
  return context;
}