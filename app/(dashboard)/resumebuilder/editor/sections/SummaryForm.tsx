"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { summarySchema, SummaryValues } from "@/lib/validation";
import { ResumeFormState } from "../[id]/types";
import GenerateSummaryButton from "./GenerateSummaryButtons";
import { RESUME_THEME_REGISTRY } from "@/app/(dashboard)/resumes/templates/templateRegistry";

type SummarySectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function SummarySection({
  form: resumeData,
  setForm: setResumeData,
}: SummarySectionProps) {
  const themeCategory = useMemo(() => {
    const theme = RESUME_THEME_REGISTRY.find(
      (t) => t.id === resumeData.themeId,
    );

    return theme?.category || "Professional";
  }, [resumeData.themeId]);

  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData((prev) => ({
        ...prev,
        summary: values.summary || "",
      }));
    });

    return () => unsubscribe();
  }, [form, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Professional Summary
        </h2>

        <p className="text-sm italic text-muted-foreground">
          Drafting a summary for your{" "}
          <span className="font-bold text-blue-600">{themeCategory}</span>{" "}
          layout.
        </p>
      </div>

      <div className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <div className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
              SUMMARY
            </div>

            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Career Positioning
            </span>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-start">
                    <GenerateSummaryButton
                      resumeData={resumeData}
                      category={themeCategory}
                      onSummaryGenerated={(summary) => {
                        form.setValue("summary", summary);
                        setResumeData((prev) => ({
                          ...prev,
                          summary,
                        }));
                      }}
                    />
                  </div>

                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[150px] resize-none rounded-xl border-slate-200 shadow-sm"
                      placeholder="Describe your professional journey..."
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
