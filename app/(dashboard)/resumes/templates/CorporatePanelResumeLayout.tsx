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

interface CorporatePanelResumeLayoutProps {
  data?: ResumeData;
}

export default function CorporatePanelResumeLayout({
  data = {},
}: CorporatePanelResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const skills = data.skills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];

  return (
    <div className="mx-auto flex min-h-[1123px] w-full max-w-[794px] bg-white shadow-sm print:shadow-none">
      <aside className="w-[30%] bg-slate-800 px-6 py-8 text-white">
        <div className="mb-10">
          <h1 className="text-3xl font-bold leading-tight">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-300">
              {data.jobTitle}
            </p>
          )}
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Contact
          </h2>

          <div className="space-y-2 text-sm text-slate-200">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.address && <p>{data.address}</p>}
          </div>
        </section>

        {skills.length > 0 && (
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Core Skills
            </h2>

            <div className="space-y-2 text-sm text-slate-200">
              {skills.map((skill, index) => (
                <p key={`${skill}-${index}`}>• {skill}</p>
              ))}
            </div>
          </section>
        )}
      </aside>

      <main className="w-[70%] px-8 py-8 text-slate-900">
        {data.summary && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
              Executive Summary
            </h2>

            <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
              Professional Experience
            </h2>

            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{job.position}</h3>

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
          <section>
            <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
              Education
            </h2>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold">{edu.degree}</h3>

                      <p className="text-sm text-slate-600">
                        {edu.school}
                        {edu.location ? ` • ${edu.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs text-slate-500">
                      {edu.startDate}
                      {edu.endDate ? ` - ${edu.endDate}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
