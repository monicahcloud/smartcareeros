/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import FormStepWrapper from "./FormStepWrapper";
import RichTextEditor from "./RichTextEditor";
import { generateCoverLetter } from "./actions";

export default function CoverLetterBody({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
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

  const handleAiGeneration = async (params: any) => {
    const aiContent = await generateCoverLetter(params);

    form.setValue("body", aiContent, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setCoverLetterData((prev) => ({
      ...prev,
      body: aiContent,
    }));
  };

  return (
    <FormStepWrapper
      title="Letter Content"
      description="Write your pitch or use AI to generate a draft based on your specific goals.">
      <Form {...form}>
        <form className="space-y-6">
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
                    generateAI={handleAiGeneration}
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
