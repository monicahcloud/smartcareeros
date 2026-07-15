"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import useDebounce from "@/app/hooks/useDebounce";
import { fileReplacer } from "@/lib/utils";
import type { CoverLetterValues } from "@/lib/validation";
import { saveCoverLetter } from "../coverletterbuilder/editor/actions";

function snapshot(data: CoverLetterValues): string {
  return JSON.stringify(data, fileReplacer);
}

export default function useAutoSaveCoverLetter(
  coverLetterData: CoverLetterValues,
) {
  const debouncedData = useDebounce(coverLetterData, 1500);

  const coverLetterIdRef = useRef(coverLetterData.id);
  const isSavingRef = useRef(false);
  const queuedDataRef = useRef<CoverLetterValues | null>(null);

  const [lastSavedSnapshot, setLastSavedSnapshot] = useState(() =>
    snapshot(coverLetterData),
  );

  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  useEffect(() => {
    let cancelled = false;

    async function persist(data: CoverLetterValues) {
      if (isSavingRef.current) {
        queuedDataRef.current = data;
        return;
      }

      const currentSnapshot = snapshot(data);

      if (currentSnapshot === lastSavedSnapshot) {
        return;
      }

      isSavingRef.current = true;
      setStatus("saving");

      try {
        const saved = await saveCoverLetter({
          ...data,
          id: coverLetterIdRef.current,
        });

        if (cancelled) {
          return;
        }

        coverLetterIdRef.current = saved.id;
        setLastSavedSnapshot(currentSnapshot);
        setStatus("idle");
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Cover-letter autosave failed:", error);
        setStatus("error");

        toast.error("Could not save cover letter changes");
      } finally {
        isSavingRef.current = false;

        const queuedData = queuedDataRef.current;
        queuedDataRef.current = null;

        if (queuedData && !cancelled) {
          void persist(queuedData);
        }
      }
    }

    void persist(debouncedData);

    return () => {
      cancelled = true;
    };
  }, [debouncedData, lastSavedSnapshot]);

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
