// export const dynamic = "force-dynamic";

// import type { Metadata } from "next";
// import { notFound, redirect } from "next/navigation";

// import prisma from "@/lib/prisma";
// import { getCurrentDbUser } from "@/lib/getCurrentUser";
// import CoverLetterEditor from "../../../components/coverletter/CoverLetterEditor";

// export const metadata: Metadata = {
//   title: "Cover Letter Editor | Smart CareerOS",
//   description:
//     "Create, edit, preview, and save your Smart CareerOS cover letter.",
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

// type PageProps = {
//   searchParams: Promise<{
//     coverLetterId?: string;
//     themeId?: string;
//     jobDescriptionId?: string;
//   }>;
// };

// export default async function CoverLetterEditorPage({
//   searchParams,
// }: PageProps) {
//   const dbUser = await getCurrentDbUser();

//   if (!dbUser) {
//     redirect("/sign-in");
//   }

//   const params = await searchParams;
//   const { coverLetterId, themeId, jobDescriptionId } = params;

//   const [coverLetterToEdit, resumes, jobDescription] = await Promise.all([
//     coverLetterId
//       ? prisma.coverLetter.findFirst({
//           where: {
//             id: coverLetterId,
//             userId: dbUser.id,
//           },
//         })
//       : null,

//     prisma.resume.findMany({
//       where: {
//         userId: dbUser.id,
//       },
//       select: {
//         id: true,
//         resumeTitle: true,
//         themeId: true,
//         themeColor: true,
//         borderStyle: true,
//       },
//       orderBy: {
//         updatedAt: "desc",
//       },
//     }),

//     jobDescriptionId
//       ? prisma.jobDescription.findFirst({
//           where: {
//             id: jobDescriptionId,
//             userId: dbUser.id,
//           },
//         })
//       : null,
//   ]);

//   if (jobDescriptionId && !jobDescription) {
//     return notFound();
//   }

//   if (coverLetterId && !coverLetterToEdit) {
//     return notFound();
//   }

//   return (
//     <CoverLetterEditor
//       userId={dbUser.id}
//       clerkId={dbUser.clerkId}
//       initialThemeId={themeId || "classic-left"}
//       coverLetterToEdit={coverLetterToEdit}
//       resumes={resumes}
//       jobDescription={jobDescription}
//     />
//   );
// }

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
    select: { id: true },
  });

  if (!user) return null;

  const coverLetter = await prisma.coverLetter.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!coverLetter) {
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
