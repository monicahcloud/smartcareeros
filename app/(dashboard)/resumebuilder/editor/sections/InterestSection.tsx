"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart } from "lucide-react";

import { EditorFormProps } from "@/lib/types";
import { interestSchema, InterestValues } from "@/lib/validation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

function InterestSection({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<InterestValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      interest: resumeData.interest || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData((prev) => ({
        ...prev,
        interest:
          values.interest
            ?.filter(Boolean)
            .map((item) => item.trim())
            .filter(Boolean) || [],
      }));
    });

    return () => unsubscribe();
  }, [form, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Interests
        </h2>

        <p className="text-sm italic text-muted-foreground">
          Showcase hobbies and passions that reflect your personality.
        </p>
      </div>

      <div className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
          <div className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
            INTERESTS
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Personal Branding
          </span>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
          <Heart className="mt-0.5 size-5 shrink-0 text-red-500" />

          <p className="text-sm leading-6 text-red-900">
            Include interests that help employers understand who you are beyond
            your work experience. Avoid controversial topics and focus on
            positive hobbies and passions.
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Chess, Cooking, Graphic Design, Hiking, Volunteering..."
                      className="min-h-[150px] resize-none rounded-xl border-slate-200 shadow-sm"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        field.onChange(
                          e.target.value.split(",").map((item) => item.trim()),
                        );
                      }}
                    />
                  </FormControl>

                  <FormDescription className="text-[10px] italic">
                    Separate each interest with a comma.
                  </FormDescription>

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

export default InterestSection;
