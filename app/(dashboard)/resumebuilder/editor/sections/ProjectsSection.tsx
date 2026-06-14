"use client";

import { useState } from "react";
import { ProjectItem, ResumeFormState } from "../[id]/types";

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
    <div className="border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Projects
          </p>
          <h3 className="mt-1 text-xl font-black text-black">
            Career Projects
          </h3>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="bg-black px-4 py-2 text-xs font-black uppercase text-white">
          Add Project
        </button>
      </div>

      {form.projects.map((project, index) => (
        <div key={index} className="mt-6 space-y-4 border border-slate-200 p-6">
          <input
            value={project.name}
            onChange={(e) => updateProject(index, "name", e.target.value)}
            placeholder="Project Name"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <input
            value={project.role}
            onChange={(e) => updateProject(index, "role", e.target.value)}
            placeholder="Your Role"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <textarea
            value={project.description}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
            placeholder="Describe the project, outcomes, and impact..."
            className="min-h-28 w-full resize-none border border-slate-200 p-4 outline-none focus:border-red-600"
          />

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Technologies
            </label>

            <div className="flex gap-3">
              <input
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
                    addProjectTechnology(index, projectTechInputs[index] || "");
                    setProjectTechInputs((prev) => ({ ...prev, [index]: "" }));
                  }
                }}
                placeholder="React"
                className="h-12 flex-1 border border-slate-200 px-4 outline-none focus:border-red-600"
              />

              <button
                type="button"
                onClick={() => {
                  addProjectTechnology(index, projectTechInputs[index] || "");
                  setProjectTechInputs((prev) => ({ ...prev, [index]: "" }));
                }}
                className="h-12 bg-black px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-600">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.length === 0 ? (
                <p className="text-sm text-slate-400">No technologies added.</p>
              ) : (
                project.technologies.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => removeProjectTechnology(index, tech)}
                    className="border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-600 hover:text-red-600">
                    {tech} ×
                  </button>
                ))
              )}
            </div>
          </div>

          <input
            value={project.url}
            onChange={(e) => updateProject(index, "url", e.target.value)}
            placeholder="Project URL"
            className="h-12 w-full border border-slate-200 px-4 outline-none focus:border-red-600"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="border border-red-200 px-4 py-2 text-xs font-black uppercase text-red-600 transition hover:bg-red-50">
              Remove Project
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
