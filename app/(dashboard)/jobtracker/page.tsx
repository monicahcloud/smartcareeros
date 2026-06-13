import JobTrackerBoard from "@/app/components/jobtracker/JobTrackerBoard";
import { getTrackedJobs } from "./actions";
import Link from "next/link";

export default async function JobTrackerPage() {
  const jobs = await getTrackedJobs();

  return (
    <main className="space-y-8">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Application Tracker
        </p>

        <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
          Track Every Opportunity
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          Manage saved jobs, applications, interviews, offers, and follow-ups in
          one organized workspace.
        </p>
        <Link
          href="/jobtracker/new"
          className="mt-6 inline-flex h-12 items-center justify-center bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
          Add Job
        </Link>
      </section>

      <JobTrackerBoard jobs={jobs} />
    </main>
  );
}
