import { eventType, Inngest, staticSchema } from "inngest";

export const resumeUploadedEvent = eventType("smartcareeros/resume.uploaded", {
  schema: staticSchema<{
    uploadId: string;
    userId: string;
    clerkId: string;
  }>(),
});

export const inngest = new Inngest({
  id: "smart-career-os",
});
