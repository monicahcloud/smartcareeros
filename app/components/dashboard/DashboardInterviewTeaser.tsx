import Link from "next/link";
import {
  ArrowRight,
  Brain,
  MessageSquareText,
  Mic,
  Sparkles,
} from "lucide-react";

export default function DashboardInterviewTeaser() {
  return (
    <section className="border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
            <Mic className="h-4 w-4" />
            AI Interview Prep
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-black">
            Practice before the pressure.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Prepare for behavioral, technical, and role-based interviews with
            guided AI practice sessions. This workspace will help users build
            confidence before the real conversation.
          </p>
        </div>

        <Link
          href="/mockinterview"
          className="inline-flex h-12 items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
          Start Practice
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="border border-slate-200 bg-slate-50 p-5">
          <Brain className="mb-3 h-5 w-5 text-red-600" />
          <p className="text-sm font-black text-black">Role-Based Practice</p>
          <p className="mt-2 text-sm text-slate-500">
            Practice questions tailored to a target role or career path.
          </p>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-5">
          <MessageSquareText className="mb-3 h-5 w-5 text-red-600" />
          <p className="text-sm font-black text-black">Answer Coaching</p>
          <p className="mt-2 text-sm text-slate-500">
            Get guided support for structuring stronger interview responses.
          </p>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-5">
          <Sparkles className="mb-3 h-5 w-5 text-red-600" />
          <p className="text-sm font-black text-black">Confidence Builder</p>
          <p className="mt-2 text-sm text-slate-500">
            Build repetition, clarity, and confidence before applying or
            interviewing.
          </p>
        </div>
      </div>
    </section>
  );
}
