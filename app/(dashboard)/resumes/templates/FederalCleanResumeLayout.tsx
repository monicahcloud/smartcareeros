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
    grade?: string;
    hoursPerWeek?: string;
    employmentType?: string;
    supervisor?: string;
    supervisorPhone?: string;
    mayContactSupervisor?: string;
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

type FederalCleanResumeLayoutProps = {
  data: ResumeData;
};

export default function FederalCleanResumeLayout({
  data,
}: FederalCleanResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  return (
    <div className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-12 py-10 text-slate-900 shadow-sm print:shadow-none">
      <header className="border-b-2 border-slate-900 pb-5">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
            {data.jobTitle}
          </p>
        )}

        <div className="mt-4 space-y-1 text-sm text-slate-700">
          {data.email && <p>Email: {data.email}</p>}
          {data.phone && <p>Phone: {data.phone}</p>}
          {data.address && <p>Address: {data.address}</p>}
        </div>
      </header>

      {data.summary && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em]">
            Professional Summary
          </h2>
          <p className="text-sm leading-7 text-slate-700">{data.summary}</p>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em]">
            Core Qualifications
          </h2>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-700">
            {data.skills.map((skill, index) => (
              <li key={`${skill}-${index}`}>• {skill}</li>
            ))}
          </ul>
        </section>
      )}

      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mt-9">
          <h2 className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
            Professional Experience
          </h2>

          <div className="space-y-8">
            {data.workExperience.map((job, index) => (
              <div key={index}>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {job.position}
                    </h3>
                    <p className="text-sm font-semibold text-slate-700">
                      {job.company}
                      {job.location ? ` • ${job.location}` : ""}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xs font-semibold text-slate-500">
                    {job.startDate}
                    {job.endDate ? ` - ${job.endDate}` : ""}
                  </p>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600">
                  {job.grade && <p>Grade: {job.grade}</p>}
                  {job.hoursPerWeek && (
                    <p>Hours per week: {job.hoursPerWeek}</p>
                  )}
                  {job.employmentType && (
                    <p>Employment Type: {job.employmentType}</p>
                  )}
                  {job.supervisor && <p>Supervisor: {job.supervisor}</p>}
                  {job.supervisorPhone && (
                    <p>Supervisor Phone: {job.supervisorPhone}</p>
                  )}
                  {job.mayContactSupervisor && (
                    <p>May Contact: {job.mayContactSupervisor}</p>
                  )}
                </div>

                {job.description && (
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mt-9">
          <h2 className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.2em]">
            Education
          </h2>

          <div className="space-y-5">
            {data.education.map((edu, index) => (
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
  );
}
