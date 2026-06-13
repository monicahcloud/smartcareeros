"use client";

import { Job, JobStatus } from "@prisma/client";
import JobColumn from "./JobColumn";

const columns: {
  title: string;
  statuses: JobStatus[];
}[] = [
  { title: "Saved", statuses: ["SAVED"] },
  { title: "Started", statuses: ["APPLICATION_STARTED"] },
  { title: "Applied", statuses: ["APPLIED"] },
  {
    title: "Interviewing",
    statuses: ["INTERVIEW_SCHEDULED", "INTERVIEW_COMPLETED"],
  },
  {
    title: "Offer",
    statuses: ["OFFER_RECEIVED", "HIRED"],
  },
  {
    title: "Closed",
    statuses: ["REJECTED", "WITHDRAWN"],
  },
];

export default function JobTrackerBoard({ jobs }: { jobs: Job[] }) {
  return (
    <section className="grid gap-5 xl:grid-cols-6">
      {columns.map((column) => (
        <JobColumn
          key={column.title}
          title={column.title}
          jobs={jobs.filter((job) => column.statuses.includes(job.status))}
        />
      ))}
    </section>
  );
}
