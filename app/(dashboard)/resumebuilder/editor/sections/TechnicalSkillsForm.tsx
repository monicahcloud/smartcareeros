"use client";

import { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
import { Trash2 } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeFormState } from "../[id]/types";

type TechSkill = {
  name: string;
  rating: number;
};

type TechnicalSkillsSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function TechnicalSkillsSection({
  form,
  setForm,
}: TechnicalSkillsSectionProps) {
  const [techSkills, setTechSkills] = useState<TechSkill[]>(
    form.techSkills.map((skill) =>
      typeof skill === "string" ? { name: skill, rating: 3 } : skill,
    ),
  );

  function handleAddSkill() {
    setTechSkills((prev) => [...prev, { name: "", rating: 3 }]);
  }

  function handleUpdateSkill(index: number, updated: TechSkill) {
    setTechSkills((prev) =>
      prev.map((skill, i) => (i === index ? updated : skill)),
    );
  }

  function handleRemoveSkill(index: number) {
    setTechSkills((prev) => prev.filter((_, i) => i !== index));
  }

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      techSkills: techSkills.map((skill) => skill.name).filter(Boolean),
    }));
  }, [techSkills, setForm]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Technical Expertise
        </h2>

        <p className="text-sm italic text-muted-foreground">
          Rate your proficiency in specific tools or languages.
        </p>
      </div>

      <div className="space-y-3">
        {techSkills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-100 md:flex-row">
            <div className="w-full flex-1">
              <p className="mb-1 ml-1 text-[10px] font-bold uppercase text-slate-400">
                Tool / Language
              </p>

              <Input
                value={skill.name}
                placeholder="e.g. TypeScript"
                className="rounded-xl"
                onChange={(e) =>
                  handleUpdateSkill(index, {
                    ...skill,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col items-center px-4">
              <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">
                Proficiency
              </p>

              <Rating
                style={{ maxWidth: 100 }}
                value={skill.rating}
                onChange={(value: number) =>
                  handleUpdateSkill(index, {
                    ...skill,
                    rating: value,
                  })
                }
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="self-end text-red-400 hover:text-red-600 md:self-center"
              onClick={() => handleRemoveSkill(index)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-2 border-dashed px-8"
          onClick={handleAddSkill}>
          + Add Technical Skill
        </Button>
      </div>
    </div>
  );
}
