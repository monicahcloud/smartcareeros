"use client";

type ResumeEditorStep = {
  key: string;
  title: string;
};

type ResumeEditorBreadcrumbsProps<T extends string> = {
  steps: readonly ResumeEditorStep[];
  currentStep: T;
  setCurrentStep: (step: T) => void;
};

export default function ResumeEditorBreadcrumbs<T extends string>({
  steps,
  currentStep,
  setCurrentStep,
}: ResumeEditorBreadcrumbsProps<T>) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
      {steps.map((step, index) => {
        const isActive = currentStep === step.key;

        return (
          <button
            key={step.key}
            type="button"
            onClick={() => setCurrentStep(step.key as T)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition ${
              isActive
                ? "bg-red-600 text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}>
            {index + 1}. {step.title}
          </button>
        );
      })}
    </div>
  );
}
