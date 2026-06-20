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

type ExecutiveResumeLayoutProps = {
  data: ResumeData;
};

export default function ExecutiveResumeLayout({
  data,
}: ExecutiveResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-12 py-10 text-slate-900 shadow-sm print:shadow-none">
      <header className="border-b-4 border-slate-900 pb-6">
        <h1 className="text-5xl font-bold uppercase tracking-wide">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-3 text-base font-semibold uppercase tracking-[0.25em] text-slate-600">
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
          <h2 className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-slate-900">
            Executive Profile
          </h2>
          <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-slate-900">
            Core Competencies
          </h2>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
            {data.skills.map((skill, index) => (
              <p key={`${skill}-${index}`}>• {skill}</p>
            ))}
          </div>
        </section>
      )}

      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-black uppercase tracking-[0.25em] text-slate-900">
            Professional Experience
          </h2>

          <div className="space-y-8">
            {data.workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-bold uppercase text-slate-900">
                      {job.position}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xs font-bold uppercase text-slate-500">
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

      {data.education && data.education.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 border-b border-slate-300 pb-2 text-sm font-black uppercase tracking-[0.25em] text-slate-900">
            Education
          </h2>

          <div className="space-y-5">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {edu.school}
                    {edu.location ? ` • ${edu.location}` : ""}
                  </p>
                </div>

                <p className="whitespace-nowrap text-xs font-bold uppercase text-slate-500">
                  {edu.startDate}
                  {edu.endDate ? ` - ${edu.endDate}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
