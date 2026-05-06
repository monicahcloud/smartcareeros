"use client";

import { Eye, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showMobilePreview: boolean;
  setShowMobilePreview: (value: boolean) => void;
}

export default function CoverLetterEditorFooter({
  showMobilePreview,
  setShowMobilePreview,
}: Props) {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
      <div className="flex items-center justify-center">
        <Button
          type="button"
          variant="outline"
          className="gap-2 rounded-xl"
          onClick={() => setShowMobilePreview(!showMobilePreview)}>
          {showMobilePreview ? (
            <>
              <Pencil className="size-4" />
              Edit
            </>
          ) : (
            <>
              <Eye className="size-4" />
              Preview
            </>
          )}
        </Button>
      </div>
    </footer>
  );
}
