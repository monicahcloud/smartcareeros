"use client";

import { createContext, useContext } from "react";
import { ResumeData } from "./templates/types";

type ResumePreviewContextValue = {
  data: ResumeData;
  primaryColor: string;
  fullName: string;
  photoSrc: string | null;
  showPhoto: boolean;
  contactItems: string[];
  fonts: {
    heading: string;
    body: string;
  };
};

const ResumePreviewContext = createContext<ResumePreviewContextValue | null>(
  null,
);

export function ResumePreviewProvider({
  value,
  children,
}: {
  value: ResumePreviewContextValue;
  children: React.ReactNode;
}) {
  return (
    <ResumePreviewContext.Provider value={value}>
      {children}
    </ResumePreviewContext.Provider>
  );
}

export function useResumePreview() {
  const context = useContext(ResumePreviewContext);

  if (!context) {
    throw new Error(
      "useResumePreview must be used inside ResumePreviewProvider",
    );
  }

  return context;
}
