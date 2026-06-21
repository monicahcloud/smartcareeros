"use client";

import { createContext, useContext } from "react";
import { ResumeFormState } from "../[id]/types";
import { ResumeThemeToken } from "@/app/(dashboard)/resumes/templates/templateRegistry";

type ResumePreviewContextValue = {
  data: ResumeFormState;
  theme: ResumeThemeToken;
  primaryColor: string;
  fullName: string;
  contactItems: string[];
  photoSrc: string | null;
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
