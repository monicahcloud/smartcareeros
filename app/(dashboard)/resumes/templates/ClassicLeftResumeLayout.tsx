import Image from "next/image";
import { ResumeData } from "./types";

type ClassicLeftResumeLayoutProps = {
  data?: ResumeData;
};

export default function ClassicLeftResumeLayout({
  data = {},
}: ClassicLeftResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl || data.photo;
  const showPhoto = Boolean(data.photo && photoSrc);

  return (
    <div className="mx-auto flex min-h-[1123px] w-full max-w-[794px] bg-white text-slate-900 shadow-sm print:shadow-none">
      {/* Left Sidebar */}
      <aside className="w-[32%] bg-slate-900 px-6 py-8 text-white">
        {showPhoto && (
          <div className="mb-6 flex justify-center">
            <Image
              src={typeof photoSrc === "string" ? photoSrc : ""}
              alt={fullName || "Resume photo"}
              className="h-28 w-28 rounded-full border-4 border-white object-cover"
            />
          </div>
        )}

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
          <SidebarTitle>Contact</SidebarTitle>

          <div className="space-y-2 break-words text-sm text-slate-200">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.address && <p>{data.address}</p>}
            {data.linkedin && <p>{data.linkedin}</p>}
            {data.github && <p>{data.github}</p>}
            {data.website && <p>{data.website}</p>}
          </div>
        </section>

        {skills.length > 0 && (
          <section className="mb-8">
            <SidebarTitle>Skills</SidebarTitle>

            <ul className="space-y-2 text-sm text-slate-200">
              {skills.map((skill, index) => (
                <li key={`${skill}-${index}`}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}

        {techSkills.length > 0 && (
          <section className="mb-8">
            <SidebarTitle>Technical Skills</SidebarTitle>

            <ul className="space-y-2 text-sm text-slate-200">
              {techSkills.map((skill, index) => (
                <li key={`${skill}-${index}`}>• {skill}</li>
              ))}
            </ul>
          </section>
        )}

        {interests.length > 0 && (
          <section>
            <SidebarTitle>Interests</SidebarTitle>

            <p className="text-sm leading-6 text-slate-200">
              {interests.join(" • ")}
            </p>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-[68%] px-8 py-8">
        {data.summary && (
          <section className="mb-8">
            <MainTitle>Professional Summary</MainTitle>
            <p className="text-sm leading-6 text-slate-700">{data.summary}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="mb-8">
            <MainTitle>Work Experience</MainTitle>

            <div className="space-y-6">
              {workExperience.map((job, index) => (
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
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                      {job.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8">
            <MainTitle>Education</MainTitle>

            <div className="space-y-5">
              {education.map((edu, index) => (
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

        {certifications.length > 0 && (
          <section className="mb-8">
            <MainTitle>Certifications</MainTitle>

            <div className="space-y-5">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {cert.name}
                  </h3>

                  {cert.issuer && (
                    <p className="text-sm font-medium text-slate-700">
                      {cert.issuer}
                    </p>
                  )}

                  <p className="text-xs font-semibold text-slate-500">
                    {cert.issuedDate}
                    {cert.expiresDate ? ` - ${cert.expiresDate}` : ""}
                  </p>

                  {cert.credentialUrl && (
                    <p className="mt-1 break-words text-xs text-slate-500">
                      {cert.credentialUrl}
                    </p>
                  )}

                  {cert.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-8">
            <MainTitle>Projects</MainTitle>

            <div className="space-y-5">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {project.name}
                  </h3>

                  {project.role && (
                    <p className="text-sm font-medium text-slate-700">
                      {project.role}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {project.description}
                    </p>
                  )}

                  {!!project.technologies?.length && (
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {project.technologies.join(" • ")}
                    </p>
                  )}

                  {project.url && (
                    <p className="mt-1 break-words text-xs text-slate-500">
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {accomplishments.length > 0 && (
          <section>
            <MainTitle>Accomplishments</MainTitle>

            <div className="space-y-5">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-700">
                    {item.organization}
                    {item.date ? ` | ${item.date}` : ""}
                  </p>

                  {item.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {item.description}
                    </p>
                  )}

                  {item.impact && (
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                      Impact: {item.impact}
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

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-slate-600 pb-2 text-xs font-bold uppercase tracking-[0.2em]">
      {children}
    </h2>
  );
}

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-800">
      {children}
    </h2>
  );
}
