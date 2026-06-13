import Link from "next/link";
import { FileText, Upload, Target, Landmark, ArrowRight } from "lucide-react";

const workflows = [
  {
    title: "Create Resume",
    description:
      "Build a professional resume from scratch using the Smart CareerOS editor.",
    icon: FileText,
    href: "/resumebuilder/editor/new",
  },
  {
    title: "Upload Resume",
    description:
      "Import an existing resume and continue editing inside CareerOS.",
    icon: Upload,
    href: "/resumes/upload",
  },
  {
    title: "Resume From Job Description",
    description:
      "Paste a job description and generate a tailored resume draft.",
    icon: Target,
    href: "/resumebuilder/jobdescription",
  },
  {
    title: "Federal Resume",
    description:
      "Build a federal resume designed for government opportunities.",
    icon: Landmark,
    href: "/resumebuilder/federal",
  },
];

export default function ResumeBuilderPage() {
  return (
    <main className="space-y-10">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Resume Builder
        </p>

        <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
          How Would You Like To Start?
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
          Choose a workflow to create, upload, or tailor a resume for your next
          opportunity.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {workflows.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group border border-slate-200 bg-white p-8 shadow-sm transition hover:border-red-600 hover:shadow-md">
              <Icon className="h-8 w-8 text-red-600" />

              <h2 className="mt-5 text-2xl font-black uppercase tracking-tight text-black">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-red-600">
                Start Workflow
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
