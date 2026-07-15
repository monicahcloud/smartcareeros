import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { inngest, resumeUploadedEvent } from "@/lib/inngest/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension || !["pdf", "docx", "txt"].includes(extension)) {
    return null;
  }

  return extension;
}

export async function POST(request: Request) {
  let uploadId: string | undefined;

  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const isFederal = formData.get("isFederal") === "true";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const extension = getFileExtension(file.name);

    if (!extension || !ALLOWED_FILE_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error: "Please upload a PDF, DOCX, or TXT file.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Please upload a résumé under 5MB.",
        },
        { status: 400 },
      );
    }

    const pathname = [
      "uploaded-resumes",
      user.id,
      `${randomUUID()}.${extension}`,
    ].join("/");

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
    });

    const upload = await prisma.uploadedDocument.create({
      data: {
        userId: user.id,
        clerkId,

        documentType: "RESUME",

        fileName: file.name,
        fileUrl: blob.url,
        filePathname: blob.pathname,
        fileMimeType: file.type,
        fileSize: file.size,

        isFederal,

        parseStatus: "PENDING",
        progress: 5,
        currentStep: "Résumé queued for processing",
      },
    });

    uploadId = upload.id;

    await inngest.send(
      resumeUploadedEvent.create({
        uploadId: upload.id,
        userId: user.id,
        clerkId,
      }),
    );

    return NextResponse.json(
      {
        uploadId: upload.id,
        status: upload.parseStatus,
      },
      {
        status: 202,
      },
    );
  } catch (error) {
    console.error("Résumé upload failed:", error);

    if (uploadId) {
      await prisma.uploadedDocument
        .update({
          where: {
            id: uploadId,
          },
          data: {
            parseStatus: "FAILED",
            currentStep: "Upload failed",
            parseError:
              error instanceof Error
                ? error.message
                : "Unable to queue résumé processing.",
          },
        })
        .catch(console.error);
    }

    return NextResponse.json(
      {
        error: "Unable to upload the résumé.",
      },
      {
        status: 500,
      },
    );
  }
}
