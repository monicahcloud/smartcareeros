"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { allSteps } from "../../(dashboard)/coverletterbuilder/editor/stepsCoverLetter";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function BreadcrumbsCoverLetter({
  currentStep,
  setCurrentStep,
}: BreadcrumbsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Breadcrumb>
        <BreadcrumbList className="flex-nowrap">
          {allSteps.map((step, index) => {
            const isActive = step.key === currentStep;

            return (
              <React.Fragment key={step.key}>
                <BreadcrumbItem>
                  {isActive ? (
                    <BreadcrumbPage className="whitespace-nowrap rounded-full bg-red-600 px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] text-white">
                      {step.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(step.key)}
                        className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                        {step.title}
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {index !== allSteps.length - 1 && (
                  <BreadcrumbSeparator className="mx-1 text-slate-300" />
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
