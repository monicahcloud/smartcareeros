"use client";

import { useState } from "react";
import { CareerProfileFormState } from "../types";

interface TechSkillsSectionProps {
  form: CareerProfileFormState;
  setForm: React.Dispatch<React.SetStateAction<CareerProfileFormState>>;
}

export default function TechSkillsSection({
  form,
  setForm,
}: TechSkillsSectionProps) {
  const [techSkillInput, setTechSkillInput] = useState("");

  function addTechSkill(skill: string) {
    const cleaned = skill.trim();
    if (!cleaned) return;

    setForm((prev) => ({
      ...prev,
      techSkills: Array.from(new Set([...prev.techSkills, cleaned])),
    }));
  }

  function removeTechSkill(skill: string) {
    setForm((prev) => ({
      ...prev,
      techSkills: prev.techSkills.filter((s) => s !== skill),
    }));
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        Technical Skills
      </label>

      <div className="flex gap-3">
        <input
          value={techSkillInput}
          onChange={(e) => setTechSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTechSkill(techSkillInput);
              setTechSkillInput("");
            }
          }}
          placeholder="Power BI"
          className="h-12 flex-1 border border-slate-200 px-4 outline-none focus:border-red-600"
        />

        <button
          type="button"
          onClick={() => {
            addTechSkill(techSkillInput);
            setTechSkillInput("");
          }}
          className="h-12 bg-black px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {form.techSkills.length === 0 ? (
          <p className="text-sm text-slate-400">
            No technical skills added yet.
          </p>
        ) : (
          form.techSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => removeTechSkill(skill)}
              className="border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-600 hover:text-red-600">
              {skill} ×
            </button>
          ))
        )}
      </div>
    </div>
  );
}
