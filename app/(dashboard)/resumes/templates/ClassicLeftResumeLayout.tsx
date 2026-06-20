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

type ClassicLeftResumeLayoutProps = {
  data?: ResumeData;
};

export default function ClassicLeftResumeLayout({
  data = {},
}: ClassicLeftResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  return (
    <div className="mx-auto flex min-h-[1123px] w-full max-w-[794px] bg-white text-slate-900 shadow-sm print:shadow-none">
      {/* Left Sidebar */}
      <aside className="w-[32%] bg-slate-900 px-6 py-8 text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-wide">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
              {data.jobTitle}
            </p>
          )}
        </div>

        <section className="mb-8">
          <h2 className="mb-3 border-b border-slate-600 pb-2 text-xs font-bold uppercase tracking-[0.2em]">
            Contact
          </h2>

          <div className="space-y-2 text-sm text-slate-200">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.address && <p>{data.address}</p>}
          </div>
        </section>

        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="mb-3 border-b border-slate-600 pb-2 text-xs font-bold uppercase tracking-[0.2em]">
              Skills
            </h2>

            <ul className="space-y-2 text-sm text-slate-200">
              {data.skills.map((skill, index) => (
                <li key={`${skill}-${index}`}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-[68%] px-8 py-8">
        {data.summary && (
          <section className="mb-8">
            <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-800">
              Professional Summary
            </h2>
            <p className="text-sm leading-6 text-slate-700">{data.summary}</p>
          </section>
        )}

        {data.workExperience && data.workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-800">
              Work Experience
            </h2>

            <div className="space-y-6">
              {data.workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {job.position}
                      </h3>
                      <p className="text-sm font-medium text-slate-700">
                        {job.company}
                        {job.location ? ` | ${job.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
                      {job.startDate}
                      {job.endDate ? ` - ${job.endDate}` : ""}
                    </p>
                  </div>

                  {job.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {job.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-800">
              Education
            </h2>

            <div className="space-y-5">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-slate-700">
                        {edu.school}
                        {edu.location ? ` | ${edu.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
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
