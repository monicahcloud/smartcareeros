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

type BoldToplineResumeLayoutProps = {
  data?: ResumeData;
};

export default function BoldToplineResumeLayout({
  data = {},
}: BoldToplineResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const skills = data.skills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white text-slate-900 shadow-sm print:shadow-none">
      <div className="h-4 w-full bg-slate-900" />

      <div className="px-12 py-10">
        <header className="border-b border-slate-300 pb-6">
          <h1 className="text-5xl font-black uppercase tracking-wide">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
              {data.jobTitle}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.address && <span>{data.address}</span>}
          </div>
        </header>

        {data.summary && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-black uppercase tracking-[0.25em]">
              Summary
            </h2>

            <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.25em]">
              Skills
            </h2>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
              {skills.map((skill, index) => (
                <p key={`${skill}-${index}`}>• {skill}</p>
              ))}
            </div>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-black uppercase tracking-[0.25em]">
              Experience
            </h2>

            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-5">
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
            <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-black uppercase tracking-[0.25em]">
              Education
            </h2>

            <div className="space-y-5">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {edu.degree}
                    </h3>

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
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
