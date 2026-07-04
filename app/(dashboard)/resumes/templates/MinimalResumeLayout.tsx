"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type MinimalResumeLayoutProps = {
  data?: ResumeData;
};

export default function MinimalResumeLayout({
  data = {},
}: MinimalResumeLayoutProps) {
  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const themeColor = data.themeColor || "#DB2777";
  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl ?? "";
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto flex min-h-[1056px] w-[850px] bg-white font-sans text-black shadow-sm print:shadow-none">
      <aside
        className="w-[285px] px-10 py-10 text-white"
        style={{ backgroundColor: themeColor }}>
        <div className="mb-10 flex justify-center">
          {showPhoto ? (
            <Image
              src={photoSrc}
              alt={fullName || "Resume photo"}
              width={145}
              height={145}
              className="h-[145px] w-[145px] rounded-2xl border-4 border-white object-cover"
            />
          ) : (
            <div className="flex h-[145px] w-[145px] items-center justify-center rounded-2xl border-4 border-white bg-white/10 text-4xl font-black">
              {data.firstName?.[0] || "Y"}
              {data.lastName?.[0] || "N"}
            </div>
          )}
        </div>

        <div className="mb-14 text-center">
          <h1 className="text-2xl font-black uppercase leading-tight">
            {fullName || "Your Name"}
          </h1>

          {data.jobTitle && (
            <p className="mt-3 text-sm font-bold uppercase tracking-wide text-slate-300">
              {data.jobTitle}
            </p>
          )}
        </div>

        <SidebarSection title="Contact">
          <div className="space-y-1 text-xs leading-5">
            {data.address && <p>{data.address}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.email && <p>{data.email}</p>}
            {data.linkedin && <p>{data.linkedin}</p>}
            {data.gitHub && <p>{data.gitHub}</p>}
            {data.website && <p>{data.website}</p>}
          </div>
        </SidebarSection>

        {interests.length > 0 && (
          <SidebarSection title="Interests">
            <p className="text-sm leading-5">{interests.join(" • ")}</p>
          </SidebarSection>
        )}
        {projects.length > 0 && (
          <SidebarSection title="Projects">
            <div className="space-y-4 text-xs leading-5">
              {projects.slice(0, 3).map((project, index) => (
                <div key={index}>
                  <p className="font-black uppercase">{project.name}</p>

                  {project.role && (
                    <p className="font-semibold text-white/85">
                      {project.role}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-1 text-white/90">{project.description}</p>
                  )}

                  {!!project.technologies?.length && (
                    <p className="mt-1 font-semibold text-white/80">
                      {project.technologies.join(" • ")}
                    </p>
                  )}

                  {project.url && (
                    <p className="mt-1 break-words text-[10px] text-white/70">
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </SidebarSection>
        )}

        {accomplishments.length > 0 && (
          <SidebarSection title="Accomplishments">
            <div className="space-y-4 text-xs leading-5">
              {accomplishments.slice(0, 3).map((item, index) => (
                <div key={index}>
                  <p className="font-black uppercase">{item.title}</p>

                  {(item.organization || item.date) && (
                    <p className="font-semibold text-white/80">
                      {[item.organization, item.date]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}

                  {item.impact && (
                    <p className="mt-1 font-bold text-white">{item.impact}</p>
                  )}

                  {item.description && (
                    <p className="mt-1 text-white/90">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </SidebarSection>
        )}
      </aside>

      <main className="relative flex-1 px-12 py-12">
        <AccentTab color="bg-[#ffc400]" top="top-10" />
        <AccentTab color="bg-[#2f7fbd]" top="top-[245px]" />
        <AccentTab color="bg-[#d90000]" top="top-[560px]" />
        <AccentTab color="bg-[#86d840]" top="top-[760px]" />

        {data.summary && (
          <MainSection title="Profile" themeColor={themeColor}>
            <p className="text-xs font-semibold leading-5 text-black">
              {data.summary}
            </p>
          </MainSection>
        )}

        {workExperience.length > 0 && (
          <MainSection title="Work Experience" themeColor={themeColor}>
            <div className="space-y-5">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-sm font-black uppercase">
                        {job.company || "Company Name"}
                      </h3>

                      <p className="text-xs font-black uppercase">
                        {job.position || "Job Title"}
                        {job.location ? ` - ${job.location}` : ""}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-xs font-black">
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

        <div className="grid grid-cols-2 gap-10 py-7">
          {skills.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xl font-normal uppercase"
                style={{ color: themeColor }}>
                Skills
              </h2>

              <div className="space-y-2 text-xs font-semibold leading-5">
                {skills.slice(0, 8).map((skill, index) => (
                  <p key={`${skill}-${index}`}>• {skill}</p>
                ))}
              </div>
            </section>
          )}

          {techSkills.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xl font-normal uppercase"
                style={{ color: themeColor }}>
                Technical Skills
              </h2>

              <div className="space-y-3">
                {techSkills.slice(0, 6).map((skill, index) => (
                  <RatingSkill
                    key={`${getTechSkillName(skill)}-${index}`}
                    name={getTechSkillName(skill)}
                    rating={getTechSkillRating(skill)}
                    themeColor={themeColor}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {education.length > 0 && (
          <MainSection title="Education" themeColor={themeColor}>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[90px_1fr_120px] gap-4 text-xs">
                  <p className="font-black">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>

                  <p className="font-semibold">
                    {edu.school}
                    {edu.location ? ` • ${edu.location}` : ""}
                  </p>

                  <p>{edu.degree}</p>
                </div>
              ))}
            </div>
          </MainSection>
        )}
        {certifications.length > 0 && (
          <MainSection title="Certifications" themeColor={themeColor}>
            <div className="space-y-3 text-xs leading-5">
              {certifications.slice(0, 4).map((cert, index) => (
                <div key={index}>
                  <p className="font-black">{cert.name}</p>
                  <p>{cert.issuer}</p>
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* {accomplishments.length > 0 && (
          <MainSection title="Achievements" themeColor={themeColor}>
            <div className="space-y-3 text-xs leading-5 ">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <p className="font-black ">{item.title}</p>
                  {item.impact && <p>{item.impact}</p>}
                  {item.description && <p>{item.description}</p>}
                </div>
              ))}
            </div>
          </MainSection>
        )} */}
      </main>
    </div>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 last:mb-0">
      <div className="mb-4">
        <h2 className="text-lg font-black uppercase tracking-[0.18em] text-white">
          {title}
        </h2>

        <div className="mt-2 flex items-center gap-3">
          <div className="h-[2px] w-12 rounded-full bg-white" />
          <div className="h-px flex-1 bg-white/25" />
        </div>
      </div>

      <div className="space-y-2">{children}</div>
    </section>
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
    <section className="mb-8 last:mb-0">
      <div className="mb-4 flex items-center gap-4">
        <h2
          className="whitespace-nowrap text-xl font-normal uppercase"
          style={{ color: themeColor }}>
          {title}
        </h2>

        <div
          className="h-px flex-1"
          style={{ backgroundColor: `${themeColor}40` }}
        />
      </div>

      {children}
    </section>
  );
}

function AccentTab({ color, top }: { color: string; top: string }) {
  return (
    <div
      className={`absolute left-0 h-[105px] w-7 rounded-r-md ${color} ${top}`}
    />
  );
}

function BulletText({ text }: { text?: string }) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);

  return (
    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs font-semibold leading-5">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function RatingSkill({
  name,
  rating,
  themeColor,
}: {
  name?: string;
  rating: number;
  themeColor: string;
}) {
  if (!name) return null;

  return (
    <div className="grid grid-cols-[1fr_90px] items-center gap-4 text-xs">
      <p className="font-semibold">{name}</p>

      <p className="tracking-[0.15em]" style={{ color: themeColor }}>
        {"★".repeat(rating)}
        <span className="text-slate-300">{"☆".repeat(5 - rating)}</span>
      </p>
    </div>
  );
}

function getTechSkillName(skill: string | { name?: string }) {
  return typeof skill === "string" ? skill : skill.name || "";
}

function getTechSkillRating(skill: string | { rating?: number }) {
  return typeof skill === "string" ? 3 : skill.rating || 3;
}
function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";

  if (startDate && endDate) return `${startDate} - ${endDate}`;

  return startDate || endDate || "";
}
