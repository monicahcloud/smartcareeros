"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Job } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import EditJobDetailsForm from "./EditJobDetailsForm";

function formatDate(date: Date | string | null) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function JobDetailsDialog({
  job,
  children,
}: {
  job: Job;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-black">
            {job.position}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Company
            </p>
            <p className="mt-1 text-base font-bold text-black">{job.company}</p>
          </div>

          {job.location && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Location
              </p>
              <p className="mt-1 text-sm text-slate-600">{job.location}</p>
            </div>
          )}

          {job.salary && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Salary
              </p>
              <p className="mt-1 text-sm text-slate-600">{job.salary}</p>
            </div>
          )}

          {job.source && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Source
              </p>
              <p className="mt-1 text-sm text-slate-600">{job.source}</p>
            </div>
          )}

          {job.notes && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Notes
              </p>
              <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600">
                {job.notes}
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Follow Up Date
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {formatDate(job.followUpDate) || "No follow-up scheduled"}
              </p>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Last Activity
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {formatDate(job.lastActivityAt) || "No activity recorded"}
              </p>
            </div>
          </div>

          {job.description && (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Description
              </p>
              <p className="mt-1 line-clamp-6 text-sm leading-6 text-slate-600">
                {job.description}
              </p>
            </div>
          )}

          <div className="border-t border-slate-200 pt-6">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Activity Timeline
            </p>

            <div className="space-y-4">
              <div className="border-l-2 border-red-600 pl-4">
                <p className="text-sm font-black text-black">
                  Added To Tracker
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatDate(job.createdAt)}
                </p>
              </div>

              {job.dateApplied && (
                <div className="border-l-2 border-slate-300 pl-4">
                  <p className="text-sm font-black text-black">Applied</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(job.dateApplied)}
                  </p>
                </div>
              )}

              {job.followUpDate && (
                <div className="border-l-2 border-slate-300 pl-4">
                  <p className="text-sm font-black text-black">
                    Follow Up Scheduled
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(job.followUpDate)}
                  </p>
                </div>
              )}

              {job.lastActivityAt && (
                <div className="border-l-2 border-slate-300 pl-4">
                  <p className="text-sm font-black text-black">Last Updated</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(job.lastActivityAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <EditJobDetailsForm job={job} />
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 bg-red-600 px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
              Open Job
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
