"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { debounce } from "lodash";

import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import { ResumeFormState } from "../[id]/types";
import FormStepWrapper from "@/app/components/coverletterbuilder/FormStepWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RESUME_THEME_REGISTRY } from "@/app/(dashboard)/resumes/templates/templateRegistry";
import { Textarea } from "@/components/ui/textarea";

type BasicInfoSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function BasicInfoSection({
  form: resumeData,
  setForm: setResumeData,
}: BasicInfoSectionProps) {
  const currentTheme = useMemo(() => {
    return RESUME_THEME_REGISTRY.find(
      (theme) => theme.id === resumeData.themeId,
    );
  }, [resumeData.themeId]);

  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      resumeTitle: resumeData.resumeTitle || "",
      description: resumeData.description || "",
      resumeType:
        currentTheme?.category || resumeData.resumeType || "CORPORATE",
      jobDescriptionId: resumeData.jobDescriptionId || "",
      jobDescriptionText: resumeData.jobDescriptionText || "",
      targetRole: resumeData.targetRole || "",
      targetCompany: resumeData.targetCompany || "",
    },
  });

  useEffect(() => {
    if (currentTheme?.category) {
      form.setValue("resumeType", currentTheme.category);
    }
  }, [currentTheme, form]);

  useEffect(() => {
    const debouncedUpdate = debounce((values: GeneralInfoValues) => {
      setResumeData((prev) => ({
        ...prev,
        resumeTitle: values.resumeTitle || "",
        resumeType: values.resumeType || "CORPORATE",
        description: values.description || "",
        jobDescriptionText: values.jobDescriptionText || "",
        targetRole: values.targetRole || "",
        targetCompany: values.targetCompany || "",
      }));
    }, 300);

    const subscription = form.watch((values) => {
      debouncedUpdate(values as GeneralInfoValues);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel();
    };
  }, [form, setResumeData]);

  return (
    <FormStepWrapper
      title="General Settings"
      description="Name your resume, confirm the template, and save the resume type.">
      <Form {...form}>
        <form className="space-y-8">
          <div className="relative overflow-hidden border border-slate-200 bg-black p-6 text-white shadow-sm">
            <div className="absolute right-0 top-0 h-32 w-32 bg-red-600/25 blur-3xl" />

            <div className="relative z-10 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-red-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-400">
                  Active Template
                </p>

                <h3 className="mt-2 text-xl font-black uppercase tracking-tight">
                  {currentTheme?.name || "Resume Template"}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This resume is currently categorized as{" "}
                  {currentTheme?.category ||
                    resumeData.resumeType ||
                    "standard"}
                  .
                </p>
              </div>
            </div>
          </div>

          <input type="hidden" {...form.register("resumeType")} />

          <FormField
            control={form.control}
            name="resumeTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Resume Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Senior Developer Resume 2026"
                    className="h-12 border-slate-200 bg-slate-50 font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <div>
              <FormLabel className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                Target Job Description
              </FormLabel>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste the full job posting here. Smart CareerOS will use it to
                tailor your summary, skills, work experience bullets, and ATS
                keyword suggestions.
              </p>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">
                How this helps
              </p>
              <p className="mt-2 text-sm leading-6 text-red-900">
                Copy the job description from LinkedIn, Indeed, the company
                website, or your saved job description page. Include
                responsibilities, qualifications, tools, and required skills for
                best results.
              </p>
            </div>

            <Textarea
              value={resumeData.jobDescriptionText || ""}
              onChange={(e) =>
                setResumeData((prev) => ({
                  ...prev,
                  jobDescriptionText: e.target.value,
                }))
              }
              placeholder="Paste the full job description here..."
              className="min-h-[260px] resize-none rounded-xl border-slate-200 bg-slate-50"
            />

            <p className="text-[10px] italic text-slate-400">
              Optional, but recommended for a stronger ATS-tailored resume.
            </p>
          </div>
        </form>
      </Form>
    </FormStepWrapper>
  );
}
