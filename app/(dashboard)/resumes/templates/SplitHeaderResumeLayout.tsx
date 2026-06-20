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

type SplitHeaderResumeLayoutProps = {
  data: ResumeData;
};

export default function SplitHeaderResumeLayout({
  data,
}: SplitHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white text-slate-900 shadow-sm print:shadow-none">
      {/* Header */}
      <header className="grid grid-cols-[1.3fr_0.7fr] border-b border-slate-300 px-10 py-8">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-wide">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              {data.jobTitle}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-1 text-right text-sm text-slate-600">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.address && <p>{data.address}</p>}
        </div>
      </header>

      <main className="px-10 py-8">
        {data.summary && (
          <section className="mb-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Profile
            </h2>
            <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
          </section>
        )}

        {data.workExperience && data.workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-slate-300 pb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Experience
            </h2>

            <div className="space-y-7">
              {data.workExperience.map((job, index) => (
                <div key={index} className="grid grid-cols-[0.32fr_1fr] gap-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {job.startDate}
                    {job.endDate ? ` - ${job.endDate}` : ""}
                  </p>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {job.position}
                    </h3>

                    <p className="text-sm font-medium text-slate-600">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>

                    {job.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {job.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-slate-300 pb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Education
            </h2>

            <div className="space-y-5">
              {data.education.map((edu, index) => (
                <div key={index} className="grid grid-cols-[0.32fr_1fr] gap-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {edu.degree}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="mb-4 border-b border-slate-300 pb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Skills
            </h2>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700">
              {data.skills.map((skill, index) => (
                <span key={`${skill}-${index}`}>{skill}</span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
