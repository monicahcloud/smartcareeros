"use client";

import { CareerProfileFormState } from "../types";

interface BasicInfoSectionProps {
  form: CareerProfileFormState;
  setForm: React.Dispatch<React.SetStateAction<CareerProfileFormState>>;
}

type BasicInfoField =
  | "fullName"
  | "headline"
  | "email"
  | "phone"
  | "location"
  | "website"
  | "linkedin"
  | "gitHub"
  | "summary";

export default function BasicInfoSection({
  form,
  setForm,
}: BasicInfoSectionProps) {
  function updateField(field: BasicInfoField, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="space-y-4">
      <input
        value={form.fullName}
        onChange={(e) => updateField("fullName", e.target.value)}
        placeholder="Full Name"
        className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
      />

      <input
        value={form.headline}
        onChange={(e) => updateField("headline", e.target.value)}
        placeholder="Professional Headline"
        className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Email"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="Phone"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="Location"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.website}
          onChange={(e) => updateField("website", e.target.value)}
          placeholder="Website / Portfolio"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.linkedin}
          onChange={(e) => updateField("linkedin", e.target.value)}
          placeholder="LinkedIn URL"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.gitHub}
          onChange={(e) => updateField("gitHub", e.target.value)}
          placeholder="GitHub URL"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />
      </div>

      <textarea
        value={form.summary}
        onChange={(e) => updateField("summary", e.target.value)}
        placeholder="Career Profile Summary"
        className="min-h-48 w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
      />
    </div>
  );
}
