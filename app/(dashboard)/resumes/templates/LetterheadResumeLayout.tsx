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

type LetterheadResumeLayoutProps = {
  data?: ResumeData;
};

export default function LetterheadResumeLayout({
  data = {},
}: LetterheadResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white text-slate-900 shadow-sm print:shadow-none">
      <header className="border-b-4 border-slate-800 bg-slate-100 px-12 py-8">
        <div className="flex items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              {fullName || "Your Name"}
            </h1>

            {data.jobTitle && (
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                {data.jobTitle}
              </p>
            )}
          </div>

          <div className="text-right text-sm text-slate-700">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.address && <p>{data.address}</p>}
          </div>
        </div>
      </header>

      <main className="px-12 py-10">
        {data.summary && (
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-800">
              Professional Summary
            </h2>

            <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-800">
              Professional Experience
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

                    <p className="whitespace-nowrap text-xs text-slate-500">
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
          <section className="mb-10">
            <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-800">
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

        {skills.length > 0 && (
          <section>
            <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-800">
              Skills
            </h2>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
              {skills.map((skill, index) => (
                <div key={`${skill}-${index}`}>• {skill}</div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
