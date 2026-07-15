import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    uploadId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { uploadId } = await context.params;

  const upload = await prisma.uploadedDocument.findFirst({
    where: {
      id: uploadId,
      clerkId,
      documentType: "RESUME",
    },
    select: {
      id: true,
      parseStatus: true,
      progress: true,
      currentStep: true,
      parseError: true,
      resumeId: true,
    },
  });

  if (!upload) {
    return NextResponse.json({ error: "Upload not found" }, { status: 404 });
  }

  return NextResponse.json(upload);
}
