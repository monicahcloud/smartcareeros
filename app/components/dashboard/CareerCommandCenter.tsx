"use client";

import { useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  FileSearch,
  FileText,
  MessagesSquare,
  NotebookPen,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const toolCards = [
  {
    icon: <UserRound className="h-6 w-6 text-red-600" />,
    title: "Career Profile",
    description: "Save your reusable career details in one place.",
    linkHref: "careerprofile",
  },
  {
    icon: <FileText className="h-6 w-6 text-red-600" />,
    title: "Resume Builder",
    description:
      "Create resumes from your profile, job descriptions, or uploads.",
    linkHref: "resumebuilder",
  },
  {
    icon: <NotebookPen className="h-6 w-6 text-red-600" />,
    title: "Cover Letter Studio",
    description: "Write tailored letters for every opportunity.",
    linkHref: "coverletter",
  },
  {
    icon: <FileSearch className="h-6 w-6 text-red-600" />,
    title: "Opportunity Finder",
    description: "Search for roles aligned with your next move.",
    linkHref: "jobsearch",
  },
  {
    icon: <BriefcaseBusiness className="h-6 w-6 text-red-600" />,
    title: "Application Tracker",
    description: "Monitor applications, interviews, and follow-ups.",
    linkHref: "jobtracker",
  },
  {
    icon: <MessagesSquare className="h-6 w-6 text-red-600" />,
    title: "Interview Simulator",
    description: "Practice before the pressure starts.",
    linkHref: "mockinterview",
  },
];

export default function CareerCommandCenter() {
  const { user } = useUser();
  const router = useRouter();

  const username =
    user?.firstName ||
    user?.username ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "there";

  return (
    <section className="mb-2 overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="relative p-6 md:p-10">
        <div className="absolute right-0 top-0 h-56 w-56 bg-red-600/10 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-red-600">
              Career Command Center
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-6xl">
              Build your next move,
              <br />
              <span className="text-red-600">{username}.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-500">
              Create stronger resumes, write sharper cover letters, organize
              your job search, and prepare for interviews from one focused
              workspace.
            </p>

            {/* <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resumebuilder"
                className="inline-flex h-12 items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
                Start Resume
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/jobsearch"
                className="inline-flex h-12 items-center justify-center border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-slate-700 transition hover:border-red-600 hover:text-red-600">
                Find Jobs
              </Link>
            </div> */}
          </div>

          <div className="border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Workspace Flow
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-black">
              Profile. Build. Apply. Track. Interview.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Start with your Career Profile so your resume, cover letters, job
              tracking, and interview tools can reuse the same accurate
              information.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {toolCards.map((tool, idx) => (
            <motion.button
              key={tool.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/${tool.linkHref}`)}
              className="w-full text-left">
              <Card className="group h-full border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-red-600 hover:shadow-lg">
                <div className="space-y-5">
                  <div className="flex h-12 w-12 items-center justify-center bg-red-50">
                    {tool.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-black transition-colors group-hover:text-red-600">
                      {tool.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
