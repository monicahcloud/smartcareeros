// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { toast } from "sonner";

// import useDebounce from "@/app/hooks/useDebounce";
// import { Button } from "@/components/ui/button";
// import { fileReplacer } from "@/lib/utils";

// import { saveResume } from "./actions";
// import type { ResumeFormState } from "../resumebuilder/editor/[id]/types";

// export default function useAutoSaveResume(resumeData: ResumeFormState) {
//   const searchParams = useSearchParams();

//   const [resumeId, setResumeId] = useState(resumeData.id);

//   const debouncedResumeData = useDebounce(resumeData, 1500);

//   const [lastSavedData, setLastSavedData] = useState<ResumeFormState>(() =>
//     structuredClone(resumeData),
//   );

//   const [isSaving, setIsSaving] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const isSavingRef = useRef(false);

//   /*
//    * Stores the serialized version that most recently failed.
//    * This prevents the same failed payload from retrying forever.
//    */
//   const failedDataRef = useRef<string | null>(null);

//   const hasUnsavedChanges = useMemo(() => {
//     return (
//       serializeResumeData(resumeData) !== serializeResumeData(lastSavedData)
//     );
//   }, [resumeData, lastSavedData]);

//   useEffect(() => {
//     let cancelled = false;

//     const serializedDebouncedData = serializeResumeData(debouncedResumeData);

//     const serializedLastSavedData = serializeResumeData(lastSavedData);

//     async function save() {
//       if (isSavingRef.current) {
//         return;
//       }

//       try {
//         isSavingRef.current = true;
//         setIsSaving(true);
//         setIsError(false);

//         const newData = structuredClone(debouncedResumeData);

//         const previousPhoto =
//           lastSavedData.photo instanceof File ? lastSavedData.photo : undefined;

//         const currentPhoto =
//           newData.photo instanceof File ? newData.photo : undefined;

//         const photoChanged =
//           serializeFile(previousPhoto) !== serializeFile(currentPhoto);

//         const photoUrlChanged = lastSavedData.photoUrl !== newData.photoUrl;

//         const updatedResume = await saveResume({
//           ...newData,

//           id: resumeId,

//           /*
//            * Only pass an actual File to the server action.
//            */
//           photo: photoChanged && currentPhoto ? currentPhoto : undefined,

//           /*
//            * undefined = preserve existing photo
//            * null = remove photo
//            * string = use the supplied URL
//            */
//           photoUrl: photoUrlChanged ? newData.photoUrl || null : undefined,
//         });

//         if (cancelled) {
//           return;
//         }

//         failedDataRef.current = null;

//         setResumeId(updatedResume.id);

//         setLastSavedData({
//           ...newData,
//           id: updatedResume.id,
//           photo: undefined,
//           photoUrl: updatedResume.photoUrl ?? newData.photoUrl ?? undefined,
//         });

//         if (searchParams.get("resumeId") !== updatedResume.id) {
//           const newSearchParams = new URLSearchParams(searchParams);

//           newSearchParams.set("resumeId", updatedResume.id);

//           window.history.replaceState(
//             null,
//             "",
//             `?${newSearchParams.toString()}`,
//           );
//         }
//       } catch (error) {
//         if (cancelled) {
//           return;
//         }

//         failedDataRef.current = serializedDebouncedData;

//         setIsError(true);

//         console.error("Autosave failed:", error);

//         toast.error("Could not save changes", {
//           description: (
//             <div className="space-y-3">
//               <p>We couldn&apos;t save your changes. Please try again.</p>

//               <Button
//                 variant="secondary"
//                 onClick={() => {
//                   failedDataRef.current = null;
//                   setIsError(false);
//                   void save();
//                 }}>
//                 Retry
//               </Button>
//             </div>
//           ),
//         });
//       } finally {
//         isSavingRef.current = false;

//         if (!cancelled) {
//           setIsSaving(false);
//         }
//       }
//     }

//     const hasDebouncedChanges =
//       serializedDebouncedData !== serializedLastSavedData;

//     const currentPayloadAlreadyFailed =
//       failedDataRef.current === serializedDebouncedData;

//     if (
//       hasDebouncedChanges &&
//       !isSavingRef.current &&
//       !currentPayloadAlreadyFailed
//     ) {
//       void save();
//     }

//     return () => {
//       cancelled = true;
//     };
//   }, [debouncedResumeData, lastSavedData, resumeId, searchParams]);

//   return {
//     isSaving,
//     isError,
//     hasUnsavedChanges,
//   };
// }

// function serializeResumeData(data: ResumeFormState): string {
//   return JSON.stringify(data, fileReplacer);
// }

// function serializeFile(file?: File): string {
//   if (!file) {
//     return "";
//   }

//   return JSON.stringify({
//     name: file.name,
//     size: file.size,
//     type: file.type,
//     lastModified: file.lastModified,
//   });
// }
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
