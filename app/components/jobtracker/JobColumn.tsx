"use client";

import { Job, JobStatus } from "@prisma/client";
import JobCard from "./JobCard";

export default function JobColumn({
  title,
  jobs,
}: {
  title: string;
  jobs: Job[];
}) {
  return (
    <div className="min-h-[400px] border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-black">
          {title}
        </h2>

        <span className="flex h-7 w-7 items-center justify-center bg-white text-xs font-black text-slate-500">
          {jobs.length}
        </span>
      </div>

      <div className="space-y-3">
        {jobs.length === 0 ? (
          <div className="border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-400">
            No jobs here yet.
          </div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
