"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { CoverLetterValues } from "@/lib/validation";
import { fileReplacer } from "@/lib/utils";
import useDebounce from "@/app/hooks/useDebounce";
import { saveCoverLetter } from "../coverletterbuilder/editor/actions";

function normalizeForSave(data: CoverLetterValues) {
  return {
    ...data,
    body: data.body ?? "",
    signatureUrl: data.signatureUrl || undefined,
    userPhotoUrl: data.userPhotoUrl || undefined,
    userPhoto:
      data.userPhoto instanceof File
        ? `${data.userPhoto.name}-${data.userPhoto.size}-${data.userPhoto.type}`
        : data.userPhoto || undefined,
  };
}

function snapshot(data: CoverLetterValues) {
  return JSON.stringify(normalizeForSave(data), fileReplacer);
}

export default function useAutoSaveCoverLetter(
  coverLetterData: CoverLetterValues,
) {
  const searchParams = useSearchParams();
  const debounced = useDebounce(coverLetterData, 1500);

  const coverLetterIdRef = useRef(coverLetterData.id);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(
    snapshot(coverLetterData),
  );
  const isSavingRef = useRef(false);
  const pendingSaveRef = useRef(false);

  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  useEffect(() => {
    const currentSnapshot = snapshot(debounced);
    console.log("CURRENT", currentSnapshot);
    console.log("LAST", lastSavedSnapshot);
    console.log("EQUAL?", currentSnapshot === lastSavedSnapshot);

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

        const saved = await saveCoverLetter({
          ...dataToSave,
          id: coverLetterIdRef.current,
          userPhoto:
            dataToSave.userPhoto === normalizeForSave(coverLetterData).userPhoto
              ? undefined
              : dataToSave.userPhoto,
        });

        coverLetterIdRef.current = saved.id;

        // const savedState = {
        //   ...debounced,
        //   id: saved.id,
        //   userPhoto: undefined,
        //   userPhotoUrl: saved.userPhotoUrl || debounced.userPhotoUrl,
        //   signatureUrl: saved.signatureUrl || debounced.signatureUrl,
        // };

        // setLastSavedSnapshot(snapshot(savedState));
        setLastSavedSnapshot(currentSnapshot);

        if (searchParams.get("coverLetterId") !== saved.id) {
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set("coverLetterId", saved.id);

          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }

        setStatus("idle");
      } catch (error) {
        console.error(error);
        setStatus("error");

        toast.error("Could not save changes");
      } finally {
        isSavingRef.current = false;

        if (pendingSaveRef.current) {
          pendingSaveRef.current = false;
        }
      }
    }

    save();
    // }, [debounced, searchParams, coverLetterData, lastSavedSnapshot]);
  }, [debounced, searchParams]);

  const currentSnapshot = useMemo(
    () => snapshot(coverLetterData),
    [coverLetterData],
  );

  return {
    isSaving: status === "saving",
    isError: status === "error",
    hasUnsavedChanges: currentSnapshot !== lastSavedSnapshot,
  };
}
