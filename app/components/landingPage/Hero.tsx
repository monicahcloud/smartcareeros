import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { SectionGridBackground } from "../SectionGridBackground";

const highlights = [
  "AI Resumes and Cover Letters",
  "AI Interview Simulations",
  "Job Search",
  "Job Application Tracking",
];

const floatingCards = [
  {
    title: "Resume Score",
    value: "92%",
    icon: FileText,
  },
  {
    title: "Applications Tracked",
    value: "24",
    icon: LayoutDashboard,
  },
  {
    title: "AI Suggestions",
    value: "Ready",
    icon: Sparkles,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6  pt-6 text-black ">
      <SectionGridBackground opacity="0.03" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between py-4">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/images/logo.png"
              alt="Smart CareerOS"
              width={190}
              height={48}
              priority
              className="h-auto w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
            <Link href="#features" className="transition hover:text-black">
              Features
            </Link>
            <Link href="#how-it-works" className="transition hover:text-black">
              How it works
            </Link>
            <Link href="#pricing" className="transition hover:text-black">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden text-sm font-bold text-slate-500 transition hover:text-black sm:inline-flex">
              Sign in
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-700">
              Get Started
            </Link>
          </div>
        </header>

        {/* Hero content */}
        <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-red-600">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Platform
            </div>

            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl lg:text-5xl xl:text-8xl">
              The Operating System
              <br />
              For Your
              <br />
              <span className="text-red-600">Next Career.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              Smart CareerOS gives you one place to build resumes and cover
              letters, apply for jobs using our unique job search engines,
              prepare for interviews, and land my next career.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-red-700">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:border-red-500/50 hover:bg-red-50 hover:text-red-700">
                Explore Features
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Product visual */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-red-500/10 blur-3xl" />

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)]">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                      Career Dashboard
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-black">
                      Job Search Command Center
                    </h3>
                  </div>

                  <div className="rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
                    Live
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {floatingCards.map((card) => {
                    const Icon = card.icon;

                    return (
                      <div
                        key={card.title}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                          <Icon className="h-5 w-5" />
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                          {card.title}
                        </p>
                        <p className="mt-2 text-2xl font-black text-black">
                          {card.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-black">
                      Resume Optimization
                    </p>
                    <p className="text-sm font-black text-red-600">92%</p>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[92%] rounded-full bg-red-600" />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Tailor resume for Product Analyst role",
                    "Create cover letter for remote position",
                    "Prepare interview questions for next round",
                  ].map((task) => (
                    <div
                      key={task}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <CheckCircle2 className="h-5 w-5 text-red-600" />
                      <span className="text-sm font-semibold text-slate-600">
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
