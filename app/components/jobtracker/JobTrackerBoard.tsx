"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Job, JobStatus } from "@prisma/client";
import JobColumn from "./JobColumn";
import { updateJobStatus } from "@/app/(dashboard)/jobtracker/actions";

const columns: {
  title: string;
  dropStatus: JobStatus;
  statuses: JobStatus[];
}[] = [
  { title: "Saved", dropStatus: "SAVED", statuses: ["SAVED"] },
  {
    title: "Started",
    dropStatus: "APPLICATION_STARTED",
    statuses: ["APPLICATION_STARTED"],
  },
  { title: "Applied", dropStatus: "APPLIED", statuses: ["APPLIED"] },
  {
    title: "Interviewing",
    dropStatus: "INTERVIEW_SCHEDULED",
    statuses: ["INTERVIEW_SCHEDULED", "INTERVIEW_COMPLETED"],
  },
  {
    title: "Offer",
    dropStatus: "OFFER_RECEIVED",
    statuses: ["OFFER_RECEIVED", "HIRED"],
  },
  {
    title: "Closed",
    dropStatus: "REJECTED",
    statuses: ["REJECTED", "WITHDRAWN"],
  },
];

export default function JobTrackerBoard({ jobs }: { jobs: Job[] }) {
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const jobId = active.id.toString();
    const newStatus = over.id.toString() as JobStatus;

    const job = jobs.find((job) => job.id === jobId);

    if (!job || job.status === newStatus) return;

    await updateJobStatus(jobId, newStatus);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="grid gap-5 xl:grid-cols-6">
        {columns.map((column) => (
          <JobColumn
            key={column.title}
            title={column.title}
            status={column.dropStatus}
            jobs={jobs.filter((job) => column.statuses.includes(job.status))}
          />
        ))}
      </section>
    </DndContext>
  );
}
