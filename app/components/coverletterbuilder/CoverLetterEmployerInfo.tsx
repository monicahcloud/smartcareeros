"use client";

import React, { useEffect, useState } from "react";
import { employerInfoSchema, EmployerInfoValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness } from "lucide-react";

import { CoverLetterFormProps } from "@/lib/types";
import FormStepWrapper from "./FormStepWrapper";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CoverLetterEmployerInfo({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const [showJobDescription, setShowJobDescription] = useState(false);

  const existingJobDescription =
    typeof coverLetterData.content === "object" &&
    coverLetterData.content !== null &&
    "jobDescriptionText" in coverLetterData.content
      ? String(
          (coverLetterData.content as { jobDescriptionText?: string })
            .jobDescriptionText ?? "",
        )
      : "";

  const [jobDescriptionText, setJobDescriptionText] = useState(
    existingJobDescription,
  );

  const form = useForm<EmployerInfoValues>({
    resolver: zodResolver(employerInfoSchema),
    defaultValues: {
      recipientName: coverLetterData.recipientName ?? "",
      companyName: coverLetterData.companyName ?? "",
      companyEmail: coverLetterData.companyEmail ?? "",
      companyPhone: coverLetterData.companyPhone ?? "",
      companyAddress: coverLetterData.companyAddress ?? "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    });

    return () => subscription.unsubscribe();
  }, [form, setCoverLetterData]);

  useEffect(() => {
    setCoverLetterData((prev) => ({
      ...prev,
      content: {
        ...(typeof prev.content === "object" && prev.content !== null
          ? prev.content
          : {}),
        jobDescriptionText,
      },
    }));
  }, [jobDescriptionText, setCoverLetterData]);

  return (
    <FormStepWrapper
      title="Employer Details"
      description="Provide the company details and optionally paste the job description for a stronger AI-generated letter.">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Hiring Manager / Recipient
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. John Doe or Hiring Manager"
                    className="bg-slate-50/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-slate-50/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-slate-50/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Phone
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="bg-slate-50/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="City, State"
                      className="bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <section className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <BriefcaseBusiness className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.18em] text-red-900">
                    Job Description
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-red-900/70">
                    Paste the job description so the AI draft can match the
                    role, company needs, and keywords.
                  </p>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => setShowJobDescription((prev) => !prev)}
                className="bg-red-600 text-xs font-black uppercase tracking-widest hover:bg-black">
                {showJobDescription ? "Hide" : "Paste Job Description"}
              </Button>
            </div>

            {showJobDescription && (
              <div className="mt-5">
                <Textarea
                  value={jobDescriptionText}
                  onChange={(e) => setJobDescriptionText(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="min-h-[260px] border-red-100 bg-white text-sm leading-7"
                />

                <p className="mt-2 text-xs font-semibold text-red-900/60">
                  This will be used when generating the AI draft in the Letter
                  Content step.
                </p>
              </div>
            )}
          </section>
        </form>
      </Form>
    </FormStepWrapper>
  );
}
