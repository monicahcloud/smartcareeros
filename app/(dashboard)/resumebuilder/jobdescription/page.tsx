import JobDescriptionResumeForm from "@/app/components/resumebuilder/JobDescriptionResumeForm";

export const metadata = {
  title: "Resume From Job Description | Smart CareerOS",
  description: "Generate a tailored resume from a pasted job description.",
};

export default function ResumeFromJobDescriptionPage() {
  return (
    <main className="space-y-8">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Resume From Job Description
        </p>

        <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
          Tailor Your Resume To The Role
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
          Paste a job description and Smart CareerOS will help you build a
          targeted resume aligned with the skills, experience, and keywords
          employers are looking for.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Step 1
          </p>

          <h2 className="mt-2 text-xl font-black uppercase tracking-tight text-black">
            Paste Job Description
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Add the full job posting including responsibilities, qualifications,
            and requirements.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Step 2
          </p>

          <h2 className="mt-2 text-xl font-black uppercase tracking-tight text-black">
            AI Analysis
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Smart CareerOS identifies keywords, skills, certifications,
            experience requirements, and role expectations.
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Step 3
          </p>

          <h2 className="mt-2 text-xl font-black uppercase tracking-tight text-black">
            Generate Resume
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Generate a tailored resume draft and continue editing inside the
            Resume Editor.
          </p>
        </div>
      </section>

      <JobDescriptionResumeForm />
    </main>
  );
}
