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

type MinimalResumeLayoutProps = {
  data?: ResumeData;
};

export default function MinimalResumeLayout({
  data = {},
}: MinimalResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-12 py-10 text-slate-900 shadow-sm print:shadow-none">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-wide">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-500">
            {data.jobTitle}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
        </div>
      </header>

      {data.summary && (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            Summary
          </h2>

          <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            Experience
          </h2>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-medium text-slate-900">
                      {job.position}
                    </h3>

                    <p className="text-sm text-slate-600">
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
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            Education
          </h2>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-medium text-slate-900">
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
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            Skills
          </h2>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700">
            {skills.map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
