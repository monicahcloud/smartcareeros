export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import CoverLetterEditor from "@/app/components/coverletter/CoverLetterEditor";

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
    themeId?: string;
    jobDescriptionId?: string;
  }>;
};

export default async function NewCoverLetterEditorPage({
  searchParams,
}: PageProps) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const themeId = params.themeId || "classic-left";
  const jobDescriptionId = params.jobDescriptionId;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      clerkId: true,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const [resumes, jobDescription] = await Promise.all([
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

    jobDescriptionId
      ? prisma.jobDescription.findFirst({
          where: {
            id: jobDescriptionId,
            userId: user.id,
          },
        })
      : null,
  ]);

  const coverLetter = await prisma.coverLetter.create({
    data: {
      userId: user.id,
      clerkId: user.clerkId,
      themeId,
      themeColor: "#dc2626",
      template: themeId,
      showPhoto: true,
      companyName: jobDescription?.company || "",
      jobTitle: jobDescription?.title || "",
      content: jobDescription
        ? {
            source: "job-description",
            jobDescriptionId: jobDescription.id,
          }
        : {
            source: "manual",
          },
    },
  });

  redirect(
    `/coverletterbuilder/editor/${coverLetter.id}${
      jobDescriptionId ? `?jobDescriptionId=${jobDescriptionId}` : ""
    }`,
  );
}
