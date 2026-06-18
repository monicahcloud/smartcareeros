import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  BarChart3,
  MessageSquare,
  BookOpen,
  UserRound,
} from "lucide-react";

import { PrimaryButton } from "../PrimaryButton";
import { OutlineButton } from "../Outline";

const steps = [
  {
    number: "01",
    title: "Create Your Career Profile",
    description:
      "Build your professional profile once with your experience, skills, education, achievements, and career goals. It becomes the foundation for everything you do.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "Build Resumes & Cover Letters",
    description:
      "Use AI-powered tools to create tailored resumes and cover letters optimized for the roles you want.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Search Opportunities",
    description:
      "Explore live job opportunities and discover positions that align with your experience and career goals.",
    icon: Briefcase,
  },
  {
    number: "04",
    title: "Track Your Job Search",
    description:
      "Automatically organize viewed, saved, and applied jobs while managing interviews, follow-ups, and next steps from one dashboard.",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Prepare With AI",
    description:
      "Practice realistic interviews, improve your answers, and build confidence with AI-powered interview simulations.",
    icon: MessageSquare,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-red-50 px-6 py-24">
      {/* Soft background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.06),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:52px_52px] opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[500px_1fr] xl:grid-cols-[580px_1fr]">
          {/* Left Image */}
          <div className="relative mx-auto hidden lg:block">
            <div className="absolute inset-0 bg-red-600/20 blur-3xl" />

            <div className="relative overflow-hidden border border-red-100 bg-white shadow-2xl">
              <Image
                src="/images/interviewhero.png"
                alt="Smart CareerOS career illustration"
                width={900}
                height={900}
                priority
                className="h-auto w-[500px] object-cover xl:w-[580px]"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="text-center">
            <p className="mb-4 text-xl font-bold uppercase text-red-700">
              How Does{" "}
              <span className="font-black uppercase tracking-tighter text-black">
                Smart Career <span className="text-red-700">OS Work?</span>
              </span>
            </p>

            <h2 className="text-4xl font-black tracking-tighter text-black sm:text-5xl lg:text-6xl">
              One system for your next career move.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
              Smart CareerOS helps you build stronger resumes, apply for jobs,
              track progress, and prepare with confidence from first draft to
              final interview.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative border border-red-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="inline-flex shrink-0 bg-red-50 p-3 text-red-600">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-black tracking-[0.2em] text-red-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight text-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {step.description}
                </p>

                <div className="mt-6 h-1 w-12 bg-red-600 transition-all duration-200 group-hover:w-20" />
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryButton asChild className="h-14 px-10 text-base font-bold">
            <Link href="/sign-up">Get Started Free</Link>
          </PrimaryButton>

          <OutlineButton href="/blog">Explore Career Tips</OutlineButton>
        </div>
      </div>
    </section>
  );
}
