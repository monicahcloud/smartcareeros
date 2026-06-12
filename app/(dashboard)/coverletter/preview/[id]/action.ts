"use server";

import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function updateCoverLetterBranding(
  id: string,
  themeId: string,
  themeColor: string,
  showPhoto: boolean,
) {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Unauthorized");

  return prisma.coverLetter.update({
    where: { id },
    data: {
      themeId,
      themeColor,
      showPhoto,
    },
  });
}

export async function deleteCoverLetter(id: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Unauthorized");

  const coverLetter = await prisma.coverLetter.findFirst({
    where: {
      id,
      clerkId,
    },
  });

  if (!coverLetter) throw new Error("Cover letter not found");

  if (coverLetter.userPhotoUrl) {
    await del(coverLetter.userPhotoUrl);
  }

  await prisma.coverLetter.delete({
    where: { id },
  });

  revalidatePath("/coverletter");
}

export async function createCoverLetterShareLink(id: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) throw new Error("Unauthorized");

  const coverLetter = await prisma.coverLetter.findFirst({
    where: {
      id,
      clerkId,
    },
  });

  if (!coverLetter) throw new Error("Cover letter not found");

  const shareToken = coverLetter.shareToken || randomUUID();

  await prisma.coverLetter.update({
    where: { id },
    data: { shareToken },
  });

  return shareToken;
}
