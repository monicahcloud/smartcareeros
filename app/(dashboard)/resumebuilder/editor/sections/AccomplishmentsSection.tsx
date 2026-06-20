"use client";

import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { AccomplishmentItem, ResumeFormState } from "../[id]/types";

type AccomplishmentsSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function AccomplishmentsSection({
  form,
  setForm,
}: AccomplishmentsSectionProps) {
  function addAccomplishment() {
    setForm((prev) => ({
      ...prev,
      accomplishments: [
        ...prev.accomplishments,
        {
          title: "",
          organization: "",
          date: "",
          description: "",
          impact: "",
        },
      ],
    }));
  }

  function updateAccomplishment(
    index: number,
    field: keyof AccomplishmentItem,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function removeAccomplishment(index: number) {
    setForm((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Accomplishments
        </h2>

        <p className="text-sm italic text-muted-foreground">
          Highlight awards, achievements, recognition, and measurable impact.
        </p>
      </div>

      <div className="space-y-4">
        {form.accomplishments.map((item, index) => (
          <div
            key={index}
            className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                  ACC {index + 1}
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Achievement & Impact
                </span>
              </div>
            </div>

            {/* Title */}
            <Input
              value={item.title}
              onChange={(e) =>
                updateAccomplishment(index, "title", e.target.value)
              }
              placeholder="Achievement Title"
              className="rounded-xl"
            />

            {/* Organization */}
            <Input
              value={item.organization}
              onChange={(e) =>
                updateAccomplishment(index, "organization", e.target.value)
              }
              placeholder="Organization / Context"
              className="rounded-xl"
            />

            {/* Date */}
            <Input
              type="date"
              value={item.date}
              onChange={(e) =>
                updateAccomplishment(index, "date", e.target.value)
              }
              className="rounded-xl"
            />

            {/* Description */}
            <Textarea
              value={item.description}
              onChange={(e) =>
                updateAccomplishment(index, "description", e.target.value)
              }
              placeholder="Describe the accomplishment..."
              className="min-h-28 resize-none rounded-xl"
            />

            {/* Impact */}
            <Textarea
              value={item.impact}
              onChange={(e) =>
                updateAccomplishment(index, "impact", e.target.value)
              }
              placeholder="What measurable impact or result did this produce?"
              className="min-h-28 resize-none rounded-xl"
            />

            {/* Delete */}
            <div className="flex justify-end border-t border-slate-50 pt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600"
                onClick={() => removeAccomplishment(index)}>
                <Trash2 className="mr-2 size-3" />
                Delete Accomplishment
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="flex justify-center pt-6">
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full border-2 border-dashed px-10 transition-all hover:bg-slate-50"
          onClick={addAccomplishment}>
          <PlusCircle className="mr-2 size-4" />
          Add Accomplishment
        </Button>
      </div>
    </div>
  );
}
