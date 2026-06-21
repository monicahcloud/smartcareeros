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
        currentTheme?.category || resumeData.resumeType || "classic",
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
        resumeType: values.resumeType || "",
        description: values.description || "",
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
        </form>
      </Form>
    </FormStepWrapper>
  );
}
