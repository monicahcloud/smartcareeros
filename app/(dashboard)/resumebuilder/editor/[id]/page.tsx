import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

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
    select: {
      id: true,
      clerkId: true,
    },
  });

  if (!user) return null;

  const [resumeToEdit, resumes] = await Promise.all([
    prisma.resume.findFirst({
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
    }),

    prisma.resume.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        resumeTitle: true,
        themeId: true,
        themeColor: true,
        borderStyle: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
  ]);

  if (!resumeToEdit) {
    notFound();
  }

  return (
    <ResumeEditor
      userId={user.id}
      clerkId={user.clerkId}
      initialThemeId={resumeToEdit.themeId || "classic-left"}
      resumeToEdit={resumeToEdit}
      resumes={resumes}
      jobDescription={null}
    />
  );
}
