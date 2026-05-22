"use client";

import { Eye, Pencil, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showMobilePreview: boolean;
  setShowMobilePreview: (value: boolean) => void;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
  isError?: boolean;
}

export default function CoverLetterEditorFooter({
  showMobilePreview,
  setShowMobilePreview,
  isSaving,
  hasUnsavedChanges,
  isError,
}: Props) {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {isSaving ? (
            <span className="flex items-center gap-2 text-slate-500">
              <Loader2 className="size-4 animate-spin" />
              Saving
            </span>
          ) : isError ? (
            <span className="flex items-center gap-2 text-red-600">
              <AlertCircle className="size-4" />
              Save Failed
            </span>
          ) : hasUnsavedChanges ? (
            <span className="text-amber-600">Unsaved Changes</span>
          ) : (
            <span className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="size-4" />
              Saved
            </span>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          className="gap-2 rounded-xl md:hidden"
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
