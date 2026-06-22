"use client";

import Image from "next/image";
import { ResumeData } from "./types";

type RightHeaderResumeLayoutProps = {
  data?: ResumeData;
};

export default function RightHeaderResumeLayout({
  data = {},
}: RightHeaderResumeLayoutProps) {
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
    <div className="mx-auto grid min-h-[1056px] w-[850px] grid-cols-[1fr_300px] bg-[#d39100] font-sans text-[#2f4f16] shadow-sm print:shadow-none">
      {/* LEFT CONTENT */}
      <main className="bg-[#fdd47c] pt-12">
        <header className="px-16 pb-8">
          <h1 className="text-4xl font-black tracking-widest">
            {fullName || "Your Name"}
          </h1>
        </header>

        {data.summary && (
          <section className="bg-white px-16 py-10">
            <p className="text-xl font-black leading-6 tracking-narrow text-[#2f6b16]">
              {data.summary}
            </p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section>
            <SectionTitle>Professional Experience</SectionTitle>

            <div className="bg-white px-16 py-8">
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-black leading-5 text-[#2f6b16]">
                          {job.position}
                        </h3>

                        <p className="mt-1 text-lg font-bold italic leading-5 text-[#2f6b16]">
                          {job.company}
                        </p>

                        {job.location && (
                          <p className="text-lg font-bold italic leading-5 text-[#2f6b16]">
                            {job.location}
                          </p>
                        )}
                      </div>

                      <p className="whitespace-nowrap text-lg font-black italic text-[#2f6b16]">
                        {job.startDate}
                        {job.endDate ? ` - ${job.endDate}` : ""}
                      </p>
                    </div>

                    <BulletText text={job.description} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>

            <div className="bg-white px-16 py-8">
              <div className="space-y-5">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-lg font-black leading-5 text-[#2f6b16]">
                        {edu.degree}
                      </h3>

                      <p className="mt-1 text-lg font-bold leading-5 text-[#2f6b16]">
                        {edu.school}
                      </p>

                      {edu.location && (
                        <p className="text-lg font-bold leading-5 text-[#2f6b16]">
                          {edu.location}
                        </p>
                      )}
                    </div>

                    <p className="whitespace-nowrap text-lg font-black text-[#2f6b16]">
                      {edu.endDate || edu.startDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>

            <div className="bg-white px-16 py-8">
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-black text-[#2f6b16]">
                      {project.name}
                    </h3>

                    {project.role && (
                      <p className="text-base font-bold italic text-[#2f6b16]">
                        {project.role}
                      </p>
                    )}

                    <BulletText text={project.description} />

                    {!!project.technologies?.length && (
                      <p className="mt-2 text-sm font-bold text-[#2f6b16]">
                        {project.technologies.join(" • ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="px-10 py-16 text-white">
        {showPhoto && (
          <div className="mb-12 flex justify-center">
            <Image
              src={photoSrc}
              alt={fullName || "Resume photo"}
              width={160}
              height={160}
              className="h-40 w-40 rounded-full object-cover"
            />
          </div>
        )}

        <section className="mb-14 text-xl leading-7">
          {data.address && <p>{data.address}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.email && <p>{data.email}</p>}
        </section>

        <section className="mb-14 text-xl leading-7">
          {data.linkedin && <p>WWW: LinkedIn</p>}
          {data.website && <p>WWW: Online Profile</p>}
          {data.github && <p>WWW: GitHub</p>}
        </section>

        {(skills.length > 0 || techSkills.length > 0) && (
          <section className="mb-14">
            <h2 className="mb-5 text-3xl font-black text-white">Key Skills</h2>

            <div className="space-y-5">
              {[...skills, ...techSkills].map((skill, index) => (
                <SkillBar
                  key={`${String(skill)}-${index}`}
                  name={typeof skill === "string" ? skill : skill.name}
                  value={getSkillWidth(index)}
                />
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-3xl font-black text-white">
              Certifications
            </h2>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{cert.name}</p>
                  <p className="text-sm">
                    {[cert.issuer, cert.issuedDate].filter(Boolean).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {accomplishments.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-3xl font-black text-white">Highlights</h2>

            <div className="space-y-4">
              {accomplishments.map((item, index) => (
                <div key={index}>
                  <p className="text-lg font-bold">{item.title}</p>
                  {item.impact && <p className="text-sm">{item.impact}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {interests.length > 0 && (
          <section>
            <h2 className="mb-5 text-3xl font-black text-white">Interests</h2>
            <p className="text-lg leading-6">{interests.join(" • ")}</p>
          </section>
        )}
      </aside>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="px-16 py-2 text-3xl font-black tracking-[0.08em] text-[#2f4f16]">
      {children}
    </h2>
  );
}

function BulletText({ text }: { text?: string }) {
  if (!text) return null;

  const bullets = text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <ul className="mt-4 list-disc space-y-3 pl-6 text-lg font-bold leading-6 text-[#2f6b16]">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

function SkillBar({ name, value }: { name?: string; value: number }) {
  if (!name) return null;

  return (
    <div>
      <p className="mb-2 text-lg leading-5">{name}</p>
      <div className="h-5 w-full border-2 border-white bg-white">
        <div className="h-full bg-[#d39100]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function getSkillWidth(index: number) {
  const widths = [82, 78, 72, 60, 66, 88, 74, 70];
  return widths[index % widths.length];
}
