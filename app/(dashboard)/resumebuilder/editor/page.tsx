export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ResumeType } from "@prisma/client";

export const metadata: Metadata = {
  title: "Resume Editor | Smart CareerOS",
  description: "Create, edit, preview, and save your Smart CareerOS resume.",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams: Promise<{
    themeId?: string;
    resumeType?: string;
  }>;
};

export default async function NewResumeEditorPage({ searchParams }: PageProps) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const params = await searchParams;

  const themeId = params.themeId ?? "classic-left";
  const resumeType =
    params.resumeType && params.resumeType in ResumeType
      ? (params.resumeType as ResumeType)
      : ResumeType.CORPORATE;

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

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      clerkId: user.clerkId,
      resumeTitle: "Untitled Resume",
      resumeType,
      themeId,
      themeColor: "#2563eb",
      borderStyle: "squircle",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      jobTitle: "",
      summary: "",
      skills: [],
    },
    select: {
      id: true,
    },
  });

  redirect(`/resumebuilder/editor/${resume.id}`);
}
