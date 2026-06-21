/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import useDebounce from "@/app/hooks/useDebounce";
import { fileReplacer } from "@/lib/utils";
import { saveResume } from "@/app/(dashboard)/resumes/actions";
import { ResumeFormState } from "../resumebuilder/editor/[id]/types";

function normalizeForSave(data: ResumeFormState) {
  return {
    ...data,
    resumeTitle: data.resumeTitle || "Untitled Resume",
    resumeType: data.resumeType || "chronological",
    description: data.description || "",

    skills: data.skills ?? [],
    techSkills: data.techSkills ?? [],
    workExperience: data.workExperience ?? [],
    education: data.education ?? [],
    certifications: data.certifications ?? [],
    projects: data.projects ?? [],
    accomplishments: data.accomplishments ?? [],
    interests: data.interests ?? [],

    photo:
      data.photo instanceof File
        ? `${data.photo.name}-${data.photo.size}-${data.photo.type}`
        : data.photo || undefined,
    photoUrl: data.photoUrl || undefined,
  };
}

function snapshot(data: ResumeFormState) {
  return JSON.stringify(normalizeForSave(data), fileReplacer);
}

export default function useAutoSaveResume(resumeData: ResumeFormState) {
  const searchParams = useSearchParams();
  const debounced = useDebounce(resumeData, 1500);

  const resumeIdRef = useRef(resumeData.id);
  const isSavingRef = useRef(false);
  const pendingSaveRef = useRef(false);

  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(
    snapshot(resumeData),
  );
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  useEffect(() => {
    const currentSnapshot = snapshot(debounced);

    if (currentSnapshot === lastSavedSnapshot) return;

    if (isSavingRef.current) {
      pendingSaveRef.current = true;
      return;
    }

    async function save() {
      isSavingRef.current = true;
      pendingSaveRef.current = false;
      setStatus("saving");

      try {
        const dataToSave = normalizeForSave(debounced);

        const saved = await saveResume({
          ...dataToSave,
          id: resumeIdRef.current,
        } as any);

        resumeIdRef.current = saved.id;
        setLastSavedSnapshot(currentSnapshot);

        if (searchParams.get("resumeId") !== saved.id) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("resumeId", saved.id);

          window.history.replaceState(null, "", `?${params.toString()}`);
        }

        setStatus("idle");
      } catch (error) {
        console.error(error);
        setStatus("error");
        toast.error("Could not save resume changes");
      } finally {
        isSavingRef.current = false;

        if (pendingSaveRef.current) {
          pendingSaveRef.current = false;
        }
      }
    }

    save();
  }, [debounced, searchParams, lastSavedSnapshot]);

  const currentSnapshot = useMemo(() => snapshot(resumeData), [resumeData]);

  return {
    isSaving: status === "saving",
    isError: status === "error",
    hasUnsavedChanges: currentSnapshot !== lastSavedSnapshot,
  };
}
