"use client";

import { ResumeFormState } from "../[id]/types";

type BasicInfoSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

type BasicInfoField =
  | "resumeTitle"
  | "jobTitle"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address"
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
        value={form.resumeTitle}
        onChange={(e) => updateField("resumeTitle", e.target.value)}
        placeholder="Resume Title"
        className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
      />

      <input
        value={form.jobTitle}
        onChange={(e) => updateField("jobTitle", e.target.value)}
        placeholder="Target Job Title"
        className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          placeholder="First Name"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <input
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          placeholder="Last Name"
          className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
        />
      </div>

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

      <input
        value={form.address}
        onChange={(e) => updateField("address", e.target.value)}
        placeholder="Location"
        className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
      />

      <textarea
        value={form.summary}
        onChange={(e) => updateField("summary", e.target.value)}
        placeholder="Professional Summary"
        className="min-h-40 w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
      />
    </div>
  );
}
