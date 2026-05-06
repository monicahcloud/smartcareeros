export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/getCurrentUser";
import CoverLetterEditor from "../../coverletter/CoverLetterEditor";

export const metadata: Metadata = {
  title: "Cover Letter Editor | Smart CareerOS",
  description:
    "Create, edit, preview, and save your Smart CareerOS cover letter.",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{
    coverLetterId?: string;
    themeId?: string;
  }>;
};

export default async function CoverLetterEditorPage({
  searchParams,
}: PageProps) {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const { coverLetterId, themeId } = params;

  const [coverLetterToEdit, resumes] = await Promise.all([
    coverLetterId
      ? prisma.coverLetter.findFirst({
          where: {
            id: coverLetterId,
            userId: dbUser.id,
          },
        })
      : null,

    prisma.resume.findMany({
      where: {
        userId: dbUser.id,
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

  if (coverLetterId && !coverLetterToEdit) {
    return notFound();
  }

  return (
    <CoverLetterEditor
      userId={dbUser.id}
      clerkId={dbUser.clerkId}
      initialThemeId={themeId || "classic-left"}
      coverLetterToEdit={coverLetterToEdit}
      resumes={resumes}
    />
  );
}
