"use client";

import ResumeSaveButton from "./ResumeSaveButton";

type ResumeEditorFooterProps = {
  currentStepIndex: number;
  totalSteps: number;
  isPending: boolean;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
};

export default function ResumeEditorFooter({
  currentStepIndex,
  totalSteps,
  isPending,
  onBack,
  onNext,
  onSave,
}: ResumeEditorFooterProps) {
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-4">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep}
        className="h-12 border border-slate-200 px-6 text-xs font-black uppercase tracking-[0.16em] text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
        Back
      </button>

      <div className="flex gap-3">
        <ResumeSaveButton isPending={isPending} onSave={onSave} />

        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            className="h-12 bg-black px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={onSave}
            disabled={isPending}
            className="h-12 bg-black px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600 disabled:opacity-60">
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
