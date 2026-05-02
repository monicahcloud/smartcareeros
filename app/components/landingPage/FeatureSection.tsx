"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const resumeBars = [0.45, 0.7, 0.55, 0.9, 0.65, 0.82];

export default function FeatureSection() {
  return (
    <section id="features" className="relative bg-white py-24">
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-red-600">
              Platform Features
            </p>

            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-black md:text-6xl">
              The Career <br />
              <span className="text-red-600">Command Center.</span>
            </h2>
          </div>

          <p className="max-w-xs text-lg font-bold text-slate-500">
            AI-powered tools designed to help job seekers build, apply, prepare,
            and grow with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          {/* BIG BLOCK: Resume + Cover Letter AI */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-black p-10 text-white md:col-span-2 md:row-span-2">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-[90px]" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-[90px]" />

            <div className="relative z-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center bg-red-600 shadow-lg shadow-red-500/20">
                <FileText className="h-7 w-7 text-white" />
              </div>

              <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-red-400">
                AI Resume + Cover Letter Builder
              </p>

              <h3 className="mb-5 text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">
                Build Career Assets That Open Doors.
              </h3>

              <p className="max-w-md text-lg font-medium leading-8 text-slate-300">
                Create tailored resumes and cover letters with AI assistance,
                smart formatting, keyword suggestions, and role-specific
                improvements.
              </p>
            </div>

            <div className="relative z-10 mt-12 space-y-4">
              <div className="border border-white/10 bg-white/[0.06] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-black text-white">
                    Resume Match Score
                  </span>
                  <span className="text-sm font-black text-red-400">92%</span>
                </div>

                <div className="h-3 overflow-hidden bg-white/10">
                  <div className="h-full w-[92%] bg-red-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["ATS-ready", "Role-tailored", "AI-written", "Editable"].map(
                  (item) => (
                    <div
                      key={item}
                      className="border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold text-white/80">
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className="flex h-20 items-end gap-1.5 opacity-70 transition-opacity group-hover:opacity-100">
                {resumeBars.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [`${h * 45}%`, `${h * 100}%`, `${h * 45}%`],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2 + h,
                      ease: "easeInOut",
                    }}
                    className="w-full bg-red-600"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* MEDIUM BLOCK: AI Interview Simulator */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative flex flex-col justify-between overflow-hidden border border-slate-200 bg-slate-50 p-8 md:col-span-2">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative z-10 flex items-start justify-between gap-6">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center bg-red-600 text-white">
                  <MessageSquare className="h-6 w-6" />
                </div>

                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
                  Interview Prep
                </p>

                <h3 className="text-3xl font-black uppercase leading-none text-black">
                  AI Interview Simulator
                </h3>

                <p className="mt-4 max-w-xl font-medium leading-7 text-slate-500">
                  Practice realistic interview questions, improve your answers,
                  and walk into interviews with stronger confidence.
                </p>
              </div>

              <ArrowUpRight className="hidden h-7 w-7 text-slate-300 transition-colors group-hover:text-red-600 sm:block" />
            </div>
          </motion.div>

          {/* SMALL BLOCK: Job Search */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group flex min-h-[240px] flex-col justify-between border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex h-11 w-11 items-center justify-center bg-black">
              <Briefcase className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h3 className="mb-3 text-2xl font-black uppercase leading-tight text-black">
                Job Search
              </h3>

              <p className="text-sm font-semibold leading-6 text-slate-500">
                Search opportunities and keep your next move organized from one
                place.
              </p>
            </div>
          </motion.div>

          {/* SMALL BLOCK: Career Resources */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-red-600 p-8 text-white">
            <BookOpen className="absolute -bottom-3 -right-3 h-24 w-24 opacity-10 transition-transform group-hover:scale-110" />

            <div className="flex h-11 w-11 items-center justify-center bg-white/20 backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <h3 className="mb-3 text-2xl font-black uppercase leading-tight">
                Career Resources
              </h3>

              <p className="text-sm font-semibold leading-6 text-red-50">
                Access career tips, guides, and resources that help you move
                smarter.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
