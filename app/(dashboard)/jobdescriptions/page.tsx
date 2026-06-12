import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function JobDescriptionsPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in");

  const jobDescriptions = await prisma.jobDescription.findMany({
    where: { clerkId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600">
              Job Descriptions
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Saved Job Descriptions
            </h1>
          </div>

          <Link
            href="/jobdescriptions/new"
            className="bg-red-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-black">
            Add New
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobDescriptions.map((job) => (
            <Link
              key={job.id}
              href={`/jobdescriptions/${job.id}`}
              className="border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-300 hover:shadow-xl">
              <h2 className="text-lg font-black uppercase tracking-tight text-slate-950">
                {job.title || "Untitled Job"}
              </h2>

              <p className="mt-1 text-sm font-bold text-slate-500">
                {job.company || "Company not listed"}
              </p>

              <p className="mt-4 line-clamp-4 text-sm text-slate-500">
                {job.rawText}
              </p>

              <p className="mt-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Updated {job.updatedAt.toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
