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

  const workExperience = data.workExperience ?? [];
  const education = data.education ?? [];
  const skills = data.skills ?? [];
  const techSkills = data.techSkills ?? [];
  const certifications = data.certifications ?? [];
  const projects = data.projects ?? [];
  const accomplishments = data.accomplishments ?? [];
  const interests = data.interests ?? [];

  const photoSrc = data.photoUrl;
  const showPhoto = Boolean(data.showPhoto && photoSrc);

  return (
    <div className="mx-auto flex min-h-[1056px] w-[850px] bg-white font-sans text-black shadow-sm print:shadow-none">
      <aside className="w-[285px] bg-black px-10 py-10 text-white">
        <div className="mb-10 flex justify-center">
          {showPhoto ? (
            <Image
              src={photoSrc}
              alt={fullName || "Resume photo"}
              width={145}
              height={145}
              className="h-[145px] w-[145px] rounded-2xl border-4 border-[#ffbf00] object-cover"
            />
          ) : (
            <div className="flex h-[145px] w-[145px] items-center justify-center rounded-2xl border-4 border-[#ffbf00] bg-white/10 text-4xl font-black">
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
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-300">
              {data.jobTitle}
            </p>
          )}
        </div>

        <SidebarSection title="Contact">
          <div className="space-y-3 text-xs leading-5">
            {data.address && <p>{data.address}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.email && <p>{data.email}</p>}
            {data.linkedin && <p>{data.linkedin}</p>}
            {data.github && <p>{data.github}</p>}
            {data.website && <p>{data.website}</p>}
          </div>
        </SidebarSection>

        {interests.length > 0 && (
          <SidebarSection title="Interests">
            <div className="space-y-2 text-xs leading-5">
              {interests.map((interest, index) => (
                <p key={`${interest}-${index}`}>{interest}</p>
              ))}
            </div>
          </SidebarSection>
        )}

        {projects.length > 0 && (
          <SidebarSection title="Projects">
            <div className="space-y-4 text-xs leading-5">
              {projects.slice(0, 3).map((project, index) => (
                <div key={index}>
                  <p className="font-bold">{project.name}</p>
                  {project.role && <p>{project.role}</p>}
                </div>
              ))}
            </div>
          </SidebarSection>
        )}
      </aside>

      <main className="relative flex-1 px-12 py-10">
        <AccentTab color="bg-[#ffc400]" top="top-10" />
        <AccentTab color="bg-[#2f7fbd]" top="top-[245px]" />
        <AccentTab color="bg-[#d90000]" top="top-[560px]" />
        <AccentTab color="bg-[#86d840]" top="top-[760px]" />

        {data.summary && (
          <MainSection title="Profile">
            <p className="text-xs font-semibold leading-5 text-black">
              {data.summary}
            </p>
          </MainSection>
        )}

        {workExperience.length > 0 && (
          <MainSection title="Work Experience">
            <div className="space-y-5">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-xs font-black uppercase">
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

        <div className="grid grid-cols-2 gap-10 border-y border-slate-300 py-7">
          {(skills.length > 0 || techSkills.length > 0) && (
            <section>
              <h2 className="mb-4 text-xl font-normal uppercase">Skills</h2>

              <div className="space-y-3">
                {[...skills, ...techSkills].slice(0, 6).map((skill, index) => (
                  <RatingSkill
                    key={`${String(skill)}-${index}`}
                    name={typeof skill === "string" ? skill : skill.name}
                    rating={getRating(index)}
                  />
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-normal uppercase">Expertise</h2>

              <div className="space-y-3 text-xs leading-5">
                {certifications.slice(0, 4).map((cert, index) => (
                  <div key={index}>
                    <p className="font-black">{cert.name}</p>
                    <p>{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {education.length > 0 && (
          <MainSection title="Education">
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[90px_1fr_120px] gap-4 text-xs">
                  <p className="font-black">
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ""}
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

        {accomplishments.length > 0 && (
          <MainSection title="Awards">
            <div className="space-y-3 text-xs leading-5">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <p className="font-black">{item.title}</p>
                  {item.impact && <p>{item.impact}</p>}
                  {item.description && <p>{item.description}</p>}
                </div>
              ))}
            </div>
          </MainSection>
        )}
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
    <section className="mb-10">
      <h2 className="mb-5 text-sm font-black uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </section>
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
    <section className="mb-9">
      <h2 className="mb-4 text-xl font-normal uppercase">{title}</h2>
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

function RatingSkill({ name, rating }: { name?: string; rating: number }) {
  if (!name) return null;

  return (
    <div className="grid grid-cols-[1fr_90px] items-center gap-4 text-xs">
      <p className="font-semibold">{name}</p>
      <p className="tracking-[0.15em] text-slate-400">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </p>
    </div>
  );
}

function getRating(index: number) {
  const ratings = [4, 5, 3, 4, 5, 3];
  return ratings[index % ratings.length];
}
