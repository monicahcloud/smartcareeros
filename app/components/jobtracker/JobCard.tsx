"use client";

import { updateJobStatus } from "@/app/(dashboard)/jobtracker/actions";
import { Job, JobStatus } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import JobDetailsDialog from "./JobDetailsDialog";
import { useDraggable } from "@dnd-kit/core";
const statuses: { label: string; value: JobStatus }[] = [
  { label: "Saved", value: "SAVED" },
  { label: "Started", value: "APPLICATION_STARTED" },
  { label: "Applied", value: "APPLIED" },
  { label: "Interview", value: "INTERVIEW_SCHEDULED" },
  { label: "Offer", value: "OFFER_RECEIVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Withdrawn", value: "WITHDRAWN" },
];

export default function JobCard({ job }: { job: Job }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: job.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <article
      className="border border-slate-200 bg-white p-4 shadow-sm"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      <JobDetailsDialog job={job}>
        <button className="w-full text-left">
          <h3 className="text-sm font-black uppercase leading-5 text-black">
            {job.position}
          </h3>

          <p className="mt-2 text-sm font-semibold text-slate-600">
            {job.company}
          </p>

          {job.location && (
            <p className="mt-1 text-xs text-slate-400">{job.location}</p>
          )}

          {job.salary && (
            <p className="mt-3 text-xs font-bold text-slate-500">
              {job.salary}
            </p>
          )}
        </button>
      </JobDetailsDialog>
      <select
        value={job.status}
        onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
        className="mt-4 h-10 w-full border border-slate-200 bg-white px-3 text-xs font-bold uppercase text-slate-700">
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      {job.url && (
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-red-600 hover:text-black">
          View Job
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </article>
  );
}
