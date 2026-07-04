"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type BoldToplineResumeLayoutProps = {
  data?: ResumeData;
};

export default function BoldToplineResumeLayout({
  data = {},
}: BoldToplineResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#234B63";

  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl ?? "";
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto min-h-[1056px] w-[850px] bg-white text-slate-900 shadow-sm print:shadow-none">
      <div
        className="ml-10 min-h-[1056px] border-l-[14px]"
        style={{ borderColor: themeColor }}>
        <div className="px-8 py-8">
          <header
            className="relative border-b-4 pb-6"
            style={{ borderColor: themeColor }}>
            <div className="flex items-center gap-6 pr-32">
              <ProfilePhoto
                showPhoto={showPhoto}
                photoSrc={photoSrc}
                fullName={fullName}
                firstName={data.firstName}
                lastName={data.lastName}
                themeColor={themeColor}
              />

              <div className="min-w-0 flex-1">
                <h1
                  className="break-words text-3xl font-black uppercase tracking-[0.14em]"
                  style={{ color: themeColor }}>
                  {fullName || "Your Name"}
                </h1>

                {data.jobTitle && (
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.25em] text-slate-600">
                    {data.jobTitle}
                  </p>
                )}
              </div>
            </div>

            <ContactRow data={data} themeColor={themeColor} />
          </header>

          <main className="mt-7 grid grid-cols-[200px_1fr] gap-8">
            <aside>
              {education.length > 0 && (
                <SideSection title="Education" themeColor={themeColor}>
                  <div className="space-y-5">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="text-[13px] font-black uppercase text-slate-800">
                          {edu.degree}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {edu.school}
                          {edu.location ? `, ${edu.location}` : ""}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-500">
                          {[edu.startDate, edu.endDate]
                            .filter(Boolean)
                            .join(" - ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </SideSection>
              )}

              {skills.length > 0 && (
                <SideSection
                  title="Professional Skills"
                  themeColor={themeColor}>
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <p
                        key={`${skill}-${index}`}
                        className="text-xs font-semibold text-slate-700">
                        • {skill}
                      </p>
                    ))}
                  </div>
                </SideSection>
              )}

              {techSkills.length > 0 && (
                <SideSection title="Technical Skills" themeColor={themeColor}>
                  <div className="space-y-3">
                    {techSkills.map((skill, index) => (
                      <SkillLine
                        key={`${skill.name}-${index}`}
                        name={skill.name}
                        value={(skill.rating / 5) * 100}
                        themeColor={themeColor}
                      />
                    ))}
                  </div>
                </SideSection>
              )}

              {certifications.length > 0 && (
                <SideSection title="Certifications" themeColor={themeColor}>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index}>
                        <h3 className="text-xs font-black text-slate-800">
                          {cert.name}
                        </h3>

                        <p className="mt-1 text-[11px] leading-4 text-slate-500">
                          {[cert.issuer, cert.issuedDate, cert.expiresDate]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </SideSection>
              )}

              {interests.length > 0 && (
                <SideSection title="Interests" themeColor={themeColor}>
                  <p className="text-xs leading-5 text-slate-600">
                    {interests.join(" • ")}
                  </p>
                </SideSection>
              )}
            </aside>

            <section>
              {data.summary && (
                <MainSection
                  title="Professional Summary"
                  themeColor={themeColor}>
                  <p className="text-[13px] leading-6 text-slate-700">
                    {data.summary}
                  </p>
                </MainSection>
              )}

              {workExperience.length > 0 && (
                <MainSection title="Work Experience" themeColor={themeColor}>
                  <div className="space-y-7">
                    {workExperience.map((job, index) => (
                      <div key={index}>
                        <h3 className="text-[15px] font-black uppercase text-slate-900">
                          {job.position || "Position Title"}
                        </h3>

                        <p className="mt-1 text-xs font-bold text-slate-700">
                          {job.company || "Company Name"}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-500">
                          {[
                            job.location,
                            formatDateRange(job.startDate, job.endDate),
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>

                        <BulletText text={job.description} />
                      </div>
                    ))}
                  </div>
                </MainSection>
              )}

              {projects.length > 0 && (
                <MainSection title="Projects" themeColor={themeColor}>
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={index}>
                        <h3 className="text-[15px] font-black uppercase text-slate-900">
                          {project.name}
                        </h3>

                        {project.role && (
                          <p className="mt-1 text-xs font-bold text-slate-700">
                            {project.role}
                          </p>
                        )}

                        <BulletText text={project.description} />

                        {!!project.technologies?.length && (
                          <p
                            className="mt-2 text-[11px] font-bold"
                            style={{ color: themeColor }}>
                            {project.technologies.join(" • ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </MainSection>
              )}

              {accomplishments.length > 0 && (
                <MainSection title="Achievements" themeColor={themeColor}>
                  <div className="space-y-6">
                    {accomplishments.map((item, index) => (
                      <div key={index}>
                        <h3 className="text-[15px] font-black uppercase text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[11px] font-semibold text-slate-500">
                          {[item.organization, item.date]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>

                        <BulletText text={item.description} />

                        {item.impact && (
                          <div className="mt-2">
                            <p
                              className="text-[11px] font-black uppercase tracking-[0.14em]"
                              style={{ color: themeColor }}>
                              Key Result
                            </p>

                            <p className="mt-1 text-xs font-bold leading-5 text-slate-700">
                              {item.impact}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </MainSection>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProfilePhoto({
  showPhoto,
  photoSrc,
  fullName,
  firstName,
  lastName,
  themeColor,
}: {
  showPhoto: boolean;
  photoSrc: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  themeColor: string;
}) {
  if (showPhoto) {
    return (
      <div
        className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[5px] bg-white p-1 shadow-md"
        style={{ borderColor: `${themeColor}40` }}>
        <Image
          src={photoSrc}
          alt={fullName || "Resume photo"}
          width={104}
          height={104}
          className="h-24 w-24 rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[5px] bg-white text-3xl font-black uppercase shadow-md"
      style={{
        borderColor: `${themeColor}40`,
        color: themeColor,
      }}>
      {getInitials(firstName, lastName)}
    </div>
  );
}

function ContactRow({
  data,
  themeColor,
}: {
  data: ResumeData;
  themeColor: string;
}) {
  const contactItems = [
    data.phone,
    data.email,
    data.address,
    data.linkedin,
    data.gitHub,
    data.website,
  ].filter(Boolean);

  if (contactItems.length === 0) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-slate-700">
      {contactItems.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: themeColor }}
          />
          {item}
        </span>
      ))}
    </div>
  );
}

function MainSection({
  title,
  children,
  themeColor,
}: {
  title: string;
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center gap-4">
        <h2
          className="text-sm font-black uppercase tracking-[0.14em]"
          style={{ color: themeColor }}>
          {title}
        </h2>

        <div
          className="h-px flex-1"
          style={{ backgroundColor: `${themeColor}55` }}
        />
      </div>

      {children}
    </section>
  );
}

function SideSection({
  title,
  children,
  themeColor,
}: {
  title: string;
  children: React.ReactNode;
  themeColor: string;
}) {
  return (
    <section className="mb-8">
      <h2
        className="mb-3 text-sm font-black uppercase tracking-[0.12em]"
        style={{ color: themeColor }}>
        {title}
      </h2>

      {children}
    </section>
  );
}

function SkillLine({
  name,
  value,
  themeColor,
}: {
  name?: string;
  value: number;
  themeColor: string;
}) {
  if (!name) return null;

  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold text-slate-700">{name}</p>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            backgroundColor: themeColor,
          }}
        />
      </div>
    </div>
  );
}

function BulletText({ text }: { text?: string }) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (bullets.length === 0) return null;

  return (
    <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-5 text-slate-600">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function getInitials(firstName?: string, lastName?: string) {
  const first = firstName?.trim()?.[0] ?? "Y";
  const last = lastName?.trim()?.[0] ?? "N";

  return `${first}${last}`.toUpperCase();
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }

  return startDate || endDate || "";
}

function getSkillWidth(index: number) {
  const widths = [85, 78, 72, 88, 80, 74, 90, 76];
  return widths[index % widths.length];
}
