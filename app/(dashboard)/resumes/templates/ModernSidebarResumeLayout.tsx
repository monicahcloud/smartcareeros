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

interface ModernSidebarResumeLayoutProps {
  data: ResumeData;
}

export default function ModernSidebarResumeLayout({
  data,
}: ModernSidebarResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  return (
    <div className="mx-auto flex min-h-[1123px] w-full max-w-[794px] bg-white shadow-sm print:shadow-none">
      {/* Sidebar */}
      <aside className="w-[32%] bg-slate-100 px-6 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold leading-tight text-slate-900">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-500">
              {data.jobTitle}
            </p>
          )}
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            Contact
          </h2>

          <div className="space-y-2 text-sm text-slate-700">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.address && <p>{data.address}</p>}
          </div>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Skills
            </h2>

            <div className="space-y-2 text-sm text-slate-700">
              {data.skills.map((skill, index) => (
                <div key={`${skill}-${index}`}>{skill}</div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
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

      {/* Main Content */}
      <main className="w-[68%] px-8 py-8">
        {data.summary && (
          <section className="mb-10">
            <h2 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
              Professional Summary
            </h2>

            <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
          </section>
        )}

        {data.workExperience && data.workExperience.length > 0 && (
          <section>
            <h2 className="mb-5 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
              Experience
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
  );
}
