/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fileReplacer } from "@/lib/utils";
import useDebounce from "@/app/hooks/useDebounce";
import { saveResume } from "./actions";
import { ResumeFormState } from "../resumebuilder/editor/[id]/types";

export default function useAutoSaveResume(resumeData: ResumeFormState) {
  const searchParams = useSearchParams();
  const [resumeId, setResumeId] = useState(resumeData.id);
  const debounceResumeData = useDebounce(resumeData, 1500);
  const [lastSaveData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debounceResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debounceResumeData);

        const photoChanged =
          JSON.stringify(lastSaveData.photo, fileReplacer) !==
          JSON.stringify(newData.photo, fileReplacer);

        const updatedResume = await saveResume({
          ...newData,
          photo: photoChanged ? newData.photo : undefined,
          id: resumeId,
        } as any);

        setResumeId(updatedResume.id);

        setLastSavedData({
          ...newData,
          id: updatedResume.id,
          photo: undefined,
          photoUrl: updatedResume.photoUrl ?? newData.photoUrl,
        });

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.error("Autosave failed:", error);

        toast.error("Could not save changes", {
          description: (
            <div className="space-y-3">
              <p>We couldn&apos;t save your changes. Please try again.</p>
              <Button variant="secondary" onClick={() => save()}>
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }
    const hasUnsavedChanges =
      JSON.stringify(debounceResumeData, fileReplacer) !==
      JSON.stringify(lastSaveData, fileReplacer);

    if (hasUnsavedChanges && debounceResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debounceResumeData,
    isSaving,
    lastSaveData,
    isError,
    resumeId,
    searchParams,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSaveData),
  };
}
