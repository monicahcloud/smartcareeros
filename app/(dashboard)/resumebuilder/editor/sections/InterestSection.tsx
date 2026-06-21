"use client";

import { Heart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeFormState } from "../[id]/types";

type InterestSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function InterestSection({
  form,
  setForm,
}: InterestSectionProps) {
  function updateInterests(value: string) {
    const interests = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setForm((prev) => ({
      ...prev,
      interests,
    }));
  }

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

        <Textarea
          placeholder="e.g. Chess, Cooking, Graphic Design, Hiking, Volunteering..."
          className="min-h-[150px] resize-none rounded-xl border-slate-200 shadow-sm"
          value={(form.interests || []).join(", ")}
          onChange={(e) => updateInterests(e.target.value)}
        />

        <p className="text-[10px] italic">
          Separate each interest with a comma.
        </p>
      </div>
    </div>
  );
}
