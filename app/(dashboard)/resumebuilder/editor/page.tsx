import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ResumeEditor from "./[id]/ResumeEditor";
import { mapToResumeValues } from "@/lib/utils";

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

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      techSkills: true,
      workExperience: true,
      education: true,
      certifications: true,
      projects: true,
    },
  });

  if (!resume) {
    notFound();
  }
  return <ResumeEditor resumeToEdit={mapToResumeValues(resume)} />;
}
