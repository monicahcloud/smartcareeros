import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import prisma from "@/lib/prisma";

import ResumePreviewView from "./ResumePreviewView";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewResumePage({ params }: PageProps) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    redirect("/sign-in");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id,
      clerkId,
    },
    include: {
      workExperience: true,
      education: true,
      techSkills: true,
      certifications: true,
      projects: true,
      accomplishments: true,
    },
  });

  if (!resume) {
    notFound();
  }

  return <ResumePreviewView resume={resume} />;
}
