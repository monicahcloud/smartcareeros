import CoverLetterEditor from "@/app/components/coverletter/CoverLetterEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function CoverLetterEditorPage({
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

  const [coverLetterToEdit, resumes] = await Promise.all([
    prisma.coverLetter.findFirst({
      where: {
        id,
        userId: user.id,
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

  if (!coverLetterToEdit) {
    notFound();
  }

  return (
    <CoverLetterEditor
      userId={user.id}
      clerkId={user.clerkId}
      initialThemeId={coverLetterToEdit.themeId || "classic-left"}
      coverLetterToEdit={coverLetterToEdit}
      resumes={resumes}
      jobDescription={null}
    />
  );
}
