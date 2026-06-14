"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveResumeBasics } from "./actions";

type ResumeEditorProps = {
  resumeToEdit: {
    id: string;
    resumeTitle: string | null;
    resumeType: string | null;
    summary: string | null;
    jobTitle?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    skills?: string[];
  };
};

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [skillInput, setSkillInput] = useState("");
  const [form, setForm] = useState({
    resumeTitle: resumeToEdit.resumeTitle || "",
    jobTitle: resumeToEdit.jobTitle || "",
    firstName: resumeToEdit.firstName || "",
    lastName: resumeToEdit.lastName || "",
    email: resumeToEdit.email || "",
    phone: resumeToEdit.phone || "",
    address: resumeToEdit.address || "",
    summary: resumeToEdit.summary || "",
    skills: resumeToEdit.skills || [],
  });

  function updateField(name: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function addSkill(skill: string) {
    const cleaned = skill.trim();

    if (!cleaned) return;

    setForm((prev) => ({
      ...prev,
      skills: Array.from(new Set([...prev.skills, cleaned])),
    }));
  }

  function removeSkill(skill: string) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skill),
    }));
  }
  function handleSave() {
    startTransition(async () => {
      try {
        await saveResumeBasics({
          resumeId: resumeToEdit.id,
          ...form,
        });

        toast.success("Resume saved.");
      } catch (error) {
        console.error(error);
        toast.error("Could not save resume.");
      }
    });
  }

  return (
    <main className="grid min-h-screen gap-6 bg-slate-50 p-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-6">
        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Resume Editor
          </p>

          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-black">
            Edit Resume
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Start with the core resume details. We will add work experience,
            education, skills, and preview next.
          </p>
        </div>

        <div className="space-y-4 border border-slate-200 bg-white p-6 shadow-sm">
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
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Skills
            </label>

            <div className="flex gap-3">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(skillInput);
                    setSkillInput("");
                  }
                }}
                placeholder="Add a skill"
                className="h-12 flex-1 border border-slate-200 px-4 outline-none focus:border-red-600"
              />

              <button
                type="button"
                onClick={() => {
                  addSkill(skillInput);
                  setSkillInput("");
                }}
                className="h-12 bg-black px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.skills.length === 0 ? (
                <p className="text-sm text-slate-400">No skills added yet.</p>
              ) : (
                form.skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-600 hover:text-red-600">
                    {skill} ×
                  </button>
                ))
              )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isPending}
            className="h-12 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60">
            {isPending ? "Saving..." : "Save Resume"}
          </button>
        </div>
      </section>

      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
          Live Preview
        </p>

        <div className="min-h-[720px] border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black">
            {form.firstName || "First"} {form.lastName || "Last"}
          </h2>

          <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">
            {form.jobTitle || "Target Job Title"}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            {[form.email, form.phone, form.address].filter(Boolean).join(" • ")}
          </p>

          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
              Professional Summary
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-700">
              {form.summary || "Your professional summary will appear here."}
            </p>
          </div>
          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
              Skills
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.skills.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Skills will appear here.
                </p>
              ) : (
                form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
