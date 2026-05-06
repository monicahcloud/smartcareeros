import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getCurrentDbUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const clerkUser = await currentUser();

  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null;

  return prisma.user.upsert({
    where: { clerkId },
    update: {
      email,
      firstName: clerkUser?.firstName ?? null,
      lastName: clerkUser?.lastName ?? null,
      imageUrl: clerkUser?.imageUrl ?? null,
    },
    create: {
      clerkId,
      email,
      firstName: clerkUser?.firstName ?? null,
      lastName: clerkUser?.lastName ?? null,
      imageUrl: clerkUser?.imageUrl ?? null,
    },
  });
}
