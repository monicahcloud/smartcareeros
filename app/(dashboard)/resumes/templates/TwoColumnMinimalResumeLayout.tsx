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

type TwoColumnMinimalResumeLayoutProps = {
  data: ResumeData;
};

export default function TwoColumnMinimalResumeLayout({
  data,
}: TwoColumnMinimalResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-10 py-10 text-slate-900 shadow-sm print:shadow-none">
      {/* Header */}
      <header className="mb-10 border-b border-slate-300 pb-6">
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

      <div className="grid grid-cols-[0.32fr_1fr] gap-10">
        {/* Left Column */}
        <aside>
          {data.skills && data.skills.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                Skills
              </h2>

              <ul className="space-y-2 text-sm text-slate-700">
                {data.skills.map((skill, index) => (
                  <li key={`${skill}-${index}`}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {data.education && data.education.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                Education
              </h2>

              <div className="space-y-5">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {edu.degree}
                    </h3>

                    <p className="text-sm text-slate-600">{edu.school}</p>

                    {edu.location && (
                      <p className="text-xs text-slate-500">{edu.location}</p>
                    )}

                    <p className="mt-1 text-xs text-slate-500">
                      {edu.startDate}
                      {edu.endDate ? ` - ${edu.endDate}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main Column */}
        <main>
          {data.summary && (
            <section className="mb-10">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                Summary
              </h2>

              <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
            </section>
          )}

          {data.workExperience && data.workExperience.length > 0 && (
            <section>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                Experience
              </h2>

              <div className="space-y-8">
                {data.workExperience.map((job, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">
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
        </main>
      </div>
    </div>
  );
}
