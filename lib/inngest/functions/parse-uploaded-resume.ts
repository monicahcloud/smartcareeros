import { get } from "@vercel/blob";

import { inngest, resumeUploadedEvent } from "@/lib/inngest/client";
import prisma from "@/lib/prisma";
import { extractResumeText } from "@/lib/extractResumeText";
import { createResumeFromParsedData } from "@/lib/resume-parser/create-resume-from-parsed-data";
import { parseResumeWithAI } from "@/lib/parseResumeWithAI";

export const parseUploadedResume = inngest.createFunction(
  {
    id: "parse-uploaded-resume",
    retries: 3,
    triggers: [resumeUploadedEvent],
  },
  async ({ event, step }) => {
    const { uploadId, userId, clerkId } = event.data;

    const upload = await step.run("load-upload-record", async () => {
      return prisma.uploadedDocument.findFirstOrThrow({
        where: {
          id: uploadId,
          userId,
          clerkId,
          documentType: "RESUME",
        },
      });
    });

    await step.run("mark-processing", async () => {
      await prisma.uploadedDocument.update({
        where: {
          id: uploadId,
        },
        data: {
          parseStatus: "PROCESSING",
          progress: 15,
          currentStep: "Downloading uploaded résumé",
          parseError: null,
        },
      });
    });

    const fileData = await step.run("download-file", async () => {
      const location = upload.filePathname || upload.fileUrl;

      if (!location) {
        throw new Error("Uploaded résumé file location is missing.");
      }

      const result = await get(location, {
        access: "private",
      });

      if (!result || result.statusCode !== 200) {
        throw new Error("Unable to retrieve the uploaded résumé.");
      }

      const response = new Response(result.stream);
      const arrayBuffer = await response.arrayBuffer();

      return {
        bytes: Array.from(new Uint8Array(arrayBuffer)),
        fileName: upload.fileName || "uploaded-resume",
        mimeType: upload.fileMimeType || "application/octet-stream",
      };
    });

    const resumeText = await step.run("extract-text", async () => {
      await prisma.uploadedDocument.update({
        where: {
          id: uploadId,
        },
        data: {
          progress: 35,
          currentStep: "Extracting résumé text",
        },
      });

      const file = new File(
        [new Uint8Array(fileData.bytes)],
        fileData.fileName,
        {
          type: fileData.mimeType,
        },
      );

      const text = await extractResumeText(file);

      await prisma.uploadedDocument.update({
        where: {
          id: uploadId,
        },
        data: {
          rawText: text,
          progress: 50,
          currentStep: "Résumé text extracted",
        },
      });

      return text;
    });

    const parsedResume = await step.run("parse-with-ai", async () => {
      await prisma.uploadedDocument.update({
        where: {
          id: uploadId,
        },
        data: {
          progress: 65,
          currentStep: "AI is organizing your résumé",
        },
      });

      const parsed = await parseResumeWithAI(resumeText, upload.isFederal);

      await prisma.uploadedDocument.update({
        where: {
          id: uploadId,
        },
        data: {
          parsedData: parsed,
          parser: "openai-gpt-5",
          progress: 80,
          currentStep: "Résumé information organized",
        },
      });

      return parsed;
    });

    const resume = await step.run("create-resume", async () => {
      await prisma.uploadedDocument.update({
        where: {
          id: uploadId,
        },
        data: {
          progress: 90,
          currentStep: "Building editable résumé",
        },
      });

      return createResumeFromParsedData({
        userId,
        clerkId,
        uploadId,
        uploadedFileUrl: upload.fileUrl || "",
        rawText: resumeText,
        parsedResume,
        isFederal: upload.isFederal,
      });
    });

    return {
      success: true,
      uploadId,
      resumeId: resume.id,
    };
  },
);
