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

type BoxedHeaderResumeLayoutProps = {
  data: ResumeData;
};

export default function BoxedHeaderResumeLayout({
  data,
}: BoxedHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-10 py-10 text-slate-900 shadow-sm print:shadow-none">
      {/* Header Box */}
      <header className="rounded-lg border-2 border-slate-900 bg-slate-100 px-8 py-8 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-[0.15em]">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
            {data.jobTitle}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-slate-700">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.address && <span>{data.address}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
            Professional Summary
          </h2>

          <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
            Professional Experience
          </h2>

          <div className="space-y-8">
            {data.workExperience.map((job, index) => (
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

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
            Education
          </h2>

          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-4">
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
