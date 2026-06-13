"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Sparkles } from "lucide-react";

import { employerInfoSchema, EmployerInfoValues } from "@/lib/validation";
import { CoverLetterFormProps } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import FormStepWrapper from "./FormStepWrapper";
import { COVER_LETTER_THEME_REGISTRY } from "../../(dashboard)/coverletter/templates/templateRegistry";

export default function CoverLetterGeneralInfoForm({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const form = useForm<EmployerInfoValues>({
    resolver: zodResolver(employerInfoSchema),
    defaultValues: {
      companyName: coverLetterData.companyName || "",
      recipientName: coverLetterData.recipientName || "",
      companyEmail: coverLetterData.companyEmail || "",
      companyPhone: coverLetterData.companyPhone || "",
      companyAddress: coverLetterData.companyAddress || "",
    },
  });

  const watchedValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    setCoverLetterData((prev) => ({
      ...prev,
      ...watchedValues,
    }));
  }, [watchedValues, setCoverLetterData]);

  const currentTheme =
    COVER_LETTER_THEME_REGISTRY.find(
      (theme) => theme.id === coverLetterData.themeId,
    ) || COVER_LETTER_THEME_REGISTRY[0];

  return (
    <FormStepWrapper
      title="General Settings"
      description="Name the letter, confirm the template, and add the employer details.">
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
                  {currentTheme.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  This design is optimized for {currentTheme.bestFor}.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    Company / Letter Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Microsoft Data Analyst Cover Letter"
                      className="h-12 border-slate-200 bg-slate-50 font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    Recipient
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Hiring Manager"
                      className="h-12 border-slate-200 bg-slate-50 font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Company Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="hr@company.com"
                        className="h-12 border-slate-200 bg-slate-50 font-semibold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Company Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="123-456-7890"
                        className="h-12 border-slate-200 bg-slate-50 font-semibold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    Company Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="City, State or full mailing address"
                      className="h-12 border-slate-200 bg-slate-50 font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border border-red-100 bg-red-50 p-4">
            <div className="flex gap-3">
              <BriefcaseBusiness className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <p className="text-sm font-medium leading-6 text-red-900">
                Later, this section will also pull company details from an
                uploaded job description so the cover letter can be matched to
                the role automatically.
              </p>
            </div>
          </div>
        </form>
      </Form>
    </FormStepWrapper>
  );
}
