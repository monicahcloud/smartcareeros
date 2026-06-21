"use client";

type ResumeData = {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  summary?: string;
  skills?: string[];
  workExperience?: {
    position?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  education?: {
    school?: string;
    degree?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
  }[];
};

type CenterHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function CenterHeaderResumeLayout({
  data = {},
}: CenterHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-12 py-10 text-slate-900 shadow-sm print:shadow-none">
      <header className="text-center">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.22em] text-red-600">
            {data.jobTitle}
          </p>
        )}

        <p className="mt-4 text-xs font-medium text-slate-500">
          {[data.email, data.phone, data.address].filter(Boolean).join(" • ")}
        </p>
      </header>

      {data.summary && (
        <section className="mt-8">
          <h2 className="mb-3 text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-800">
            Professional Summary
          </h2>

          <p className="text-center text-sm leading-7 text-slate-700">
            {data.summary}
          </p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
            Work Experience
          </h2>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {job.position}
                    </h3>

                    <p className="text-sm font-medium text-slate-600">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
                    {job.startDate}
                    {job.endDate ? ` - ${job.endDate}` : ""}
                  </p>
                </div>

                {job.description && (
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
            Education
          </h2>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {edu.degree}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>

                  <p className="text-xs font-semibold text-slate-500">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-800">
            Skills
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
