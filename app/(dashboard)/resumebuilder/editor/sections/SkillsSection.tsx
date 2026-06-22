"use client";

import React, { useEffect, useMemo, useState } from "react";
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { ResumeFormState } from "../[id]/types";
import GenerateSkillsForm from "./GenerateSkills";
import { RESUME_THEME_REGISTRY } from "@/app/(dashboard)/resumes/templates/templateRegistry";

type SkillsSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function SkillsSection({
  form: resumeData,
  setForm: setResumeData,
}: SkillsSectionProps) {
  const themeCategory = useMemo(() => {
    const theme = RESUME_THEME_REGISTRY.find(
      (t) => t.id === resumeData.themeId,
    );

    return theme?.category || "Professional";
  }, [resumeData.themeId]);

  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  const [searchedJobTitle, setSearchedJobTitle] = useState<string | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      setResumeData((prev) => ({
        ...prev,
        skills: values.skills?.filter(Boolean).map((s) => s!.trim()) || [],
      }));
    });

    return () => subscription.unsubscribe();
  }, [form, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Soft & Hard Skills
        </h2>
        <p className="text-sm italic text-muted-foreground">
          Optimizing for your{" "}
          <span className="font-bold text-red-600">{themeCategory}</span>{" "}
          layout.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <div className="mb-2 flex items-center justify-between">
                  <FormLabel className="ml-1 text-[10px] font-bold uppercase">
                    Skill List
                  </FormLabel>

                  <span className="text-[10px] font-bold uppercase text-red-500">
                    Target: 6-10 Skills
                  </span>
                </div>

                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Project Management, React, Leadership..."
                    className="min-h-[120px] rounded-2xl shadow-sm"
                    value={field.value?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);

                      field.onChange(skills);
                    }}
                  />
                </FormControl>

                <FormDescription className="text-[10px]">
                  Separate with commas.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <GenerateSkillsForm
              resumeData={resumeData}
              onSkillsGenerated={(skills) => {
                const current = form.getValues("skills") || [];

                form.setValue(
                  "skills",
                  Array.from(new Set([...current, ...skills])),
                  {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  },
                );
              }}
              onJobTitleSearched={setSearchedJobTitle}
              onSuggestedSkills={setSuggestedSkills}
            />
          </div>

          {searchedJobTitle && (
            <p className="mt-4 text-center text-[10px] text-muted-foreground">
              Analyzed <strong>{suggestedSkills.length}</strong> skills for
              &quot;
              {searchedJobTitle}&quot;
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}
