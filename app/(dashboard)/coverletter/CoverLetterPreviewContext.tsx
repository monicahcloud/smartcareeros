// components/cover-letter/CoverLetterPreviewContext.tsx

"use client";

import { createContext, useContext } from "react";
import { CoverLetterPreviewContextValue } from "./type";

const CoverLetterPreviewContext =
  createContext<CoverLetterPreviewContextValue | null>(null);

export function CoverLetterPreviewProvider({
  value,
  children,
}: {
  value: CoverLetterPreviewContextValue;
  children: React.ReactNode;
}) {
  return (
    <CoverLetterPreviewContext.Provider value={value}>
      {children}
    </CoverLetterPreviewContext.Provider>
  );
}

export function useCoverLetterPreview() {
  const context = useContext(CoverLetterPreviewContext);

  if (!context) {
    throw new Error(
      "useCoverLetterPreview must be used inside CoverLetterPreviewProvider",
    );
  }

  return context;
}
