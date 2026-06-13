import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function ResumeEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const resume = await prisma.resume.findUnique({
    where: {
      id,
    },
  });

  if (!resume) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-black">{resume.resumeTitle}</h1>

      <div className="border p-6 rounded-xl">
        <h2 className="font-bold mb-3">Professional Summary</h2>

        <p>{resume.summary || "No summary yet"}</p>
      </div>
    </main>
  );
}
