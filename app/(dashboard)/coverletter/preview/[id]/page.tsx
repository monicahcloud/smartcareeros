import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import CoverLetterPreviewView from "../CoverLetterPreviewView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewCoverLetterPage({ params }: PageProps) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in");

  const coverLetter = await prisma.coverLetter.findFirst({
    where: {
      id,
      clerkId,
    },
  });

  if (!coverLetter) return notFound();

  return <CoverLetterPreviewView coverLetter={coverLetter} />;
}
