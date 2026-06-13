/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { letterBodySchema, LetterBodyValues } from "@/lib/validation";
import { CoverLetterFormProps } from "@/lib/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormStepWrapper from "../../(dashboard)/coverletterbuilder/editor/FormStepWrapper";
import RichTextEditor from "../../(dashboard)/coverletterbuilder/editor/RichTextEditor";
import { generateCoverLetter } from "../../(dashboard)/coverletterbuilder/editor/actions";

function textToParagraphHtml(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

export default function CoverLetterBody({
  coverLetterData,
  setCoverLetterData,
  jobDescription,
}: CoverLetterFormProps) {
  const [isGeneratingManual, setIsGeneratingManual] = useState(false);
  const [isGeneratingJobDescription, setIsGeneratingJobDescription] =
    useState(false);

  const [manualAi, setManualAi] = useState({
    jobTitle: coverLetterData.jobTitle || "",
    yearsExperience: "",
    achievements: "",
    tools: "",
  });

  const form = useForm<LetterBodyValues>({
    resolver: zodResolver(letterBodySchema),
    defaultValues: {
      body: coverLetterData.body ?? "",
    },
  });

  const watchedBody = useWatch({
    control: form.control,
    name: "body",
  });

  useEffect(() => {
    setCoverLetterData((prev) => ({
      ...prev,
      body: watchedBody ?? "",
    }));
  }, [watchedBody, setCoverLetterData]);

  const parsedData =
    jobDescription?.parsedData && typeof jobDescription.parsedData === "object"
      ? (jobDescription.parsedData as {
          applicantName?: string;
          professionalHeadline?: string;
          education?: string;
          yearsExperience?: string;
          tools?: string;
          relevantExperience?: string;
        })
      : {};

  const applyGeneratedLetter = (aiContent: string) => {
    const htmlContent = aiContent.trim().startsWith("<")
      ? aiContent
      : textToParagraphHtml(aiContent);

    form.setValue("body", htmlContent, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setCoverLetterData((prev) => ({
      ...prev,
      body: htmlContent,
    }));
  };

  const handleGenerateManual = async () => {
    if (!manualAi.jobTitle.trim() && !coverLetterData.jobTitle) {
      toast.error("Enter a job title first");
      return;
    }

    try {
      setIsGeneratingManual(true);

      const aiContent = await generateCoverLetter({
        jobTitle:
          manualAi.jobTitle || coverLetterData.jobTitle || "Professional Role",
        companyName: coverLetterData.companyName || "",
        yearsExperience: manualAi.yearsExperience,
        achievements: manualAi.achievements,
        tools: manualAi.tools,
      });

      applyGeneratedLetter(aiContent);
      toast.success("Cover letter generated");
    } catch (error) {
      console.error(error);
      toast.error("Could not generate cover letter");
    } finally {
      setIsGeneratingManual(false);
    }
  };

  const handleGenerateFromJobDescription = async () => {
    if (!jobDescription?.rawText) {
      toast.error("No job description found");
      return;
    }

    try {
      setIsGeneratingJobDescription(true);

      const aiContent = await generateCoverLetter({
        jobTitle: coverLetterData.jobTitle || jobDescription.title || "",
        companyName:
          coverLetterData.companyName || jobDescription.company || "",
        applicantName: parsedData.applicantName,
        professionalHeadline: parsedData.professionalHeadline,
        education: parsedData.education,
        yearsExperience: parsedData.yearsExperience,
        tools: parsedData.tools,
        relevantExperience: parsedData.relevantExperience,
        jobDescription: jobDescription.rawText,
      });

      applyGeneratedLetter(aiContent);

      setCoverLetterData((prev) => ({
        ...prev,
        firstName: parsedData.applicantName?.split(" ")[0] || prev.firstName,
        lastName:
          parsedData.applicantName?.split(" ").slice(1).join(" ") ||
          prev.lastName,
        jobTitle: jobDescription.title || prev.jobTitle,
        companyName: jobDescription.company || prev.companyName,
      }));

      toast.success("Cover letter generated from job description");
    } catch (error) {
      console.error(error);
      toast.error("Could not generate cover letter");
    } finally {
      setIsGeneratingJobDescription(false);
    }
  };

  return (
    <FormStepWrapper
      title="Letter Content"
      description="Generate a draft with AI, then refine it in the editor.">
      <Form {...form}>
        <form className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-slate-900">
                  AI Draft Assistant
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Use manual details or generate directly from a saved job
                  description.
                </p>
              </div>

              <div
                className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                  jobDescription
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                Job Description: {jobDescription ? "Loaded" : "Not Loaded"}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Input
                placeholder="Job title"
                value={manualAi.jobTitle}
                onChange={(e) =>
                  setManualAi((prev) => ({
                    ...prev,
                    jobTitle: e.target.value,
                  }))
                }
              />

              <Input
                placeholder="Years of experience"
                value={manualAi.yearsExperience}
                onChange={(e) =>
                  setManualAi((prev) => ({
                    ...prev,
                    yearsExperience: e.target.value,
                  }))
                }
              />

              <Input
                placeholder="Tools / technologies"
                value={manualAi.tools}
                onChange={(e) =>
                  setManualAi((prev) => ({
                    ...prev,
                    tools: e.target.value,
                  }))
                }
                className="md:col-span-2"
              />

              <Input
                placeholder="Achievements or background"
                value={manualAi.achievements}
                onChange={(e) =>
                  setManualAi((prev) => ({
                    ...prev,
                    achievements: e.target.value,
                  }))
                }
                className="md:col-span-2"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={handleGenerateManual}
                disabled={isGeneratingManual || isGeneratingJobDescription}
                className="bg-black font-black uppercase tracking-widest hover:bg-red-600">
                {isGeneratingManual ? "Generating..." : "Generate AI Draft"}
              </Button>

              {jobDescription && (
                <Button
                  type="button"
                  onClick={handleGenerateFromJobDescription}
                  disabled={isGeneratingManual || isGeneratingJobDescription}
                  className="bg-green-600 font-black uppercase tracking-widest hover:bg-black">
                  {isGeneratingJobDescription
                    ? "Generating..."
                    : "Generate From Job Description"}
                </Button>
              )}
            </div>
          </section>

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Letter Body
                </FormLabel>

                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Dear Hiring Manager, I am excited to apply for..."
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
