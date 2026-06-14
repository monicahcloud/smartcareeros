export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ResumeEditor from "./ResumeEditor";

export default async function ResumeEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return null;

  const resumeToEdit = await prisma.resume.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      workExperience: true,
      education: true,
      techSkills: true,
    },
  });

  if (!resumeToEdit) {
    notFound();
  }

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
