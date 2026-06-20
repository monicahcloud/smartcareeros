"use client";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

import { ProjectItem, ResumeFormState } from "../[id]/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ProjectsSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

export default function ProjectsSection({
  form,
  setForm,
}: ProjectsSectionProps) {
  const [projectTechInputs, setProjectTechInputs] = useState<
    Record<number, string>
  >({});

  function addProject() {
    setForm((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          role: "",
          description: "",
          technologies: [],
          url: "",
        },
      ],
    }));
  }

  function updateProject(
    index: number,
    field: keyof ProjectItem,
    value: string | string[],
  ) {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function removeProject(index: number) {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }

  function addProjectTechnology(projectIndex: number, technology: string) {
    const cleaned = technology.trim();

    if (!cleaned) return;

    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((project, index) =>
        index === projectIndex
          ? {
              ...project,
              technologies: Array.from(
                new Set([...(project.technologies || []), cleaned]),
              ),
            }
          : project,
      ),
    }));
  }

  function removeProjectTechnology(projectIndex: number, technology: string) {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((project, index) =>
        index === projectIndex
          ? {
              ...project,
              technologies: project.technologies.filter(
                (item) => item !== technology,
              ),
            }
          : project,
      ),
    }));
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Projects
        </h2>

        <p className="text-sm italic text-muted-foreground">
          Showcase career projects, technical work, and measurable outcomes.
        </p>
      </div>

      <div className="space-y-4">
        {form.projects.map((project, index) => (
          <div
            key={index}
            className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <div className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                  PROJECT {index + 1}
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Career Project
                </span>
              </div>
            </div>

            <Input
              value={project.name}
              onChange={(e) => updateProject(index, "name", e.target.value)}
              placeholder="Project Name"
              className="rounded-xl"
            />

            <Input
              value={project.role}
              onChange={(e) => updateProject(index, "role", e.target.value)}
              placeholder="Your Role"
              className="rounded-xl"
            />

            <Textarea
              value={project.description}
              onChange={(e) =>
                updateProject(index, "description", e.target.value)
              }
              placeholder="Describe the project, outcomes, and impact..."
              className="min-h-28 resize-none rounded-xl"
            />

            <div className="space-y-3">
              <label className="ml-1 text-[10px] font-bold uppercase text-slate-500">
                Technologies
              </label>

              <div className="flex gap-3">
                <Input
                  value={projectTechInputs[index] || ""}
                  onChange={(e) =>
                    setProjectTechInputs((prev) => ({
                      ...prev,
                      [index]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addProjectTechnology(
                        index,
                        projectTechInputs[index] || "",
                      );
                      setProjectTechInputs((prev) => ({
                        ...prev,
                        [index]: "",
                      }));
                    }
                  }}
                  placeholder="React"
                  className="h-12 flex-1 rounded-xl"
                />

                <Button
                  type="button"
                  className="h-12 rounded-xl bg-black px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600"
                  onClick={() => {
                    addProjectTechnology(index, projectTechInputs[index] || "");
                    setProjectTechInputs((prev) => ({
                      ...prev,
                      [index]: "",
                    }));
                  }}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    No technologies added.
                  </p>
                ) : (
                  project.technologies.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => removeProjectTechnology(index, tech)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-600 hover:text-red-600">
                      {tech} ×
                    </button>
                  ))
                )}
              </div>
            </div>

            <Input
              value={project.url}
              onChange={(e) => updateProject(index, "url", e.target.value)}
              placeholder="Project URL"
              className="rounded-xl"
            />

            <div className="flex justify-end border-t border-slate-50 pt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600"
                onClick={() => removeProject(index)}>
                <Trash2 className="mr-2 size-3" />
                Delete Project
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full border-2 border-dashed px-10 transition-all hover:bg-slate-50"
          onClick={addProject}>
          <PlusCircle className="mr-2 size-4" />
          Add Project
        </Button>
      </div>
    </div>
  );
}
