"use client";

import { ResumeData } from "./types";

type CenterHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function CenterHeaderResumeLayout({
  data = {},
}: CenterHeaderResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

  const contactItems = [
    data.phone,
    data.email,
    data.address,
    data.linkedin,
    data.github,
    data.website,
  ].filter(Boolean);

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white px-12 py-10 font-sans text-slate-800 shadow-sm print:shadow-none">
      <header className="border border-[#b7a56b] px-10 py-8 text-center">
        <h1 className="text-5xl font-light uppercase tracking-[0.14em] text-slate-500">
          {fullName || "Your Name"}
        </h1>

        {data.jobTitle && (
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.4em] text-slate-600">
            {data.jobTitle}
          </p>
        )}
      </header>

      {contactItems.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-[#b7a56b] pb-4 text-xs text-slate-600">
          {contactItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      )}

      {data.summary && (
        <section className="mt-5 text-center">
          <h2 className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-slate-700">
            Professional Summary
          </h2>

          <p className="mx-auto max-w-3xl text-xs leading-5 text-slate-600">
            {data.summary}
          </p>
        </section>
      )}

      <main className="mt-8 grid grid-cols-[230px_1fr] gap-8">
        <aside>
          {education.length > 0 && (
            <SideSection title="Education">
              {education.map((edu, index) => (
                <div key={index} className="mb-4 text-right">
                  <h3 className="text-xs font-black uppercase tracking-wide">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-slate-600">{edu.school}</p>
                  {edu.location && (
                    <p className="text-xs text-slate-500">{edu.location}</p>
                  )}
                  <p className="text-[10px] text-slate-500">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
                  </p>
                </div>
              ))}
            </SideSection>
          )}

          {skills.length > 0 && (
            <SideSection title="Skills">
              <div className="space-y-2 text-right text-xs text-slate-600">
                {skills.map((skill, index) => (
                  <p key={`${skill}-${index}`}>{skill}</p>
                ))}
              </div>
            </SideSection>
          )}

          {techSkills.length > 0 && (
            <SideSection title="Computer">
              <div className="space-y-2 text-right text-xs text-slate-600">
                {techSkills.map((skill, index) => (
                  <p key={`${String(skill)}-${index}`}>
                    {typeof skill === "string" ? skill : skill.name}
                  </p>
                ))}
              </div>
            </SideSection>
          )}

          {certifications.length > 0 && (
            <SideSection title="Certifications">
              <div className="space-y-3 text-right text-xs text-slate-600">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-bold">{cert.name}</p>
                    <p>{cert.issuer}</p>
                    <p className="text-[10px]">
                      {[cert.issuedDate, cert.expiresDate]
                        .filter(Boolean)
                        .join(" - ")}
                    </p>
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {interests.length > 0 && (
            <SideSection title="Interests">
              <p className="text-right text-xs leading-5 text-slate-600">
                {interests.join(" • ")}
              </p>
            </SideSection>
          )}
        </aside>

        <section>
          {workExperience.length > 0 && (
            <MainSection title="Professional Experience">
              <div className="space-y-6">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wide text-slate-700">
                          {job.position}
                        </h3>

                        <p className="text-xs font-semibold uppercase text-slate-600">
                          {job.company}
                          {job.location ? ` - ${job.location}` : ""}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-[10px] font-bold uppercase text-slate-500">
                        {job.startDate}
                        {job.endDate ? ` - ${job.endDate}` : ""}
                      </p>
                    </div>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </MainSection>
          )}

          {projects.length > 0 && (
            <MainSection title="Projects">
              <div className="space-y-5">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-xs font-black uppercase tracking-wide">
                      {project.name}
                    </h3>
                    {project.role && (
                      <p className="text-xs font-semibold text-slate-600">
                        {project.role}
                      </p>
                    )}
                    <BulletText text={project.description} />
                    {!!project.technologies?.length && (
                      <p className="mt-1 text-[10px] font-bold text-slate-500">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </MainSection>
          )}

          {accomplishments.length > 0 && (
            <MainSection title="Accomplishments">
              <div className="space-y-4">
                {accomplishments.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-xs font-black uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {[item.organization, item.date]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                    <BulletText text={item.description} />
                    {item.impact && (
                      <p className="mt-1 text-xs font-bold text-slate-700">
                        Impact: {item.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </MainSection>
          )}
        </section>
      </main>
    </div>
  );
}

function MainSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 border-b border-[#b7a56b] pb-2 text-xs font-black uppercase tracking-[0.35em] text-slate-700">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-7 border-b border-[#b7a56b] pb-4">
      <h2 className="mb-3 text-right text-xs font-black uppercase tracking-[0.35em] text-slate-700">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletText({ text }: { text?: string }) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-600">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}
