"use client";

import { useState } from "react";
import { CareerProfileFormState } from "../types";

interface SkillsSectionProps {
  form: CareerProfileFormState;
  setForm: React.Dispatch<React.SetStateAction<CareerProfileFormState>>;
}

export default function SkillsSection({ form, setForm }: SkillsSectionProps) {
  const [skillInput, setSkillInput] = useState("");

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
      skills: prev.skills.filter((s) => s !== skill),
    }));
  }

  return (
    <div className="space-y-3 border-t border-slate-200 pt-6">
      <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        Core Skills
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
          placeholder="Communication"
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
          <p className="text-sm text-slate-400">No core skills added yet.</p>
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
  );
}
