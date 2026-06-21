"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { getCurrentDbUser } from "@/lib/getCurrentUser";

export async function deleteResume(resumeId: string) {
  const dbUser = await getCurrentDbUser();

  if (!dbUser) {
    redirect("/sign-in");
  }

  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: dbUser.id,
    },
    select: {
      id: true,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  await prisma.resume.delete({
    where: {
      id: resume.id,
    },
  });

  revalidatePath("/resumes");
}
export async function saveResume(values: ResumeValues) {
  const { id } = values;

  const {
    photo,
    workExperiences,
    education,
    themeId,
    techSkills,
    ...resumeValues
  } = resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await prisma.resume.count({
      where: { userId },
    });
    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription level",
      );
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        shareToken: values.shareToken || undefined,
        themeId,
        photoUrl: newPhotoUrl,
        techSkills: {
          deleteMany: {},
          create: techSkills?.map((skill) => ({
            ...skill,
            rating: skill.rating,
          })),
        },
        workExperience: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        education: {
          deleteMany: {},
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        themeId,
        userId,
        user: {
          // FIX: connectOrCreate ensures the User record exists in your DB
          // before the Resume record is created.
          connectOrCreate: {
            where: { clerkId: userId },
            create: {
              clerkId: userId,
              email: resumeValues.email || "", // Fallback to provided resume email
              firstName: resumeValues.firstName || "",
              lastName: resumeValues.lastName || "",
            },
          },
        },
        photoUrl: newPhotoUrl,
        techSkills: {
          create: techSkills?.map((skill) => ({
            ...skill,
            rating: skill.rating,
          })),
        },
        workExperience: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        education: {
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
