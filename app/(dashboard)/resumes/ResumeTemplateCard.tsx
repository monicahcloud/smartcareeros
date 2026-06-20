"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { ResumeThemeToken } from "@/app/(dashboard)/resumes/templates/templateRegistry";
import ResumePreview from "./ResumePreview";

const MOCK_DATA = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Product Manager",
  userEmail: "janedoe@email.com",
  userPhone: "123-456-7890",
  userAddress: "New York, NY",
  website: "janedoe.com",
  linkedin: "linkedin.com/in/janedoe",
  gitHub: "github.com/janedoe",
  summary:
    "Results-driven product manager with experience leading cross-functional teams, improving business processes, and delivering user-focused digital solutions.",
  workExperience: [
    {
      id: "1",
      position: "Product Manager",
      company: "Innovative Tech Solutions",
      startDate: "2021",
      endDate: "Present",
      description:
        "Led product planning, coordinated with design and engineering teams, and improved delivery timelines across multiple digital initiatives.",
    },
    {
      id: "2",
      position: "Business Analyst",
      company: "Brightway Systems",
      startDate: "2018",
      endDate: "2021",
      description:
        "Analyzed business requirements, documented workflows, and supported process improvements for internal operations teams.",
    },
  ],
  education: [
    {
      id: "1",
      school: "New York University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Business Administration",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  techSkills: [
    { id: "1", name: "Project Management" },
    { id: "2", name: "Agile" },
    { id: "3", name: "Data Analysis" },
    { id: "4", name: "Stakeholder Communication" },
  ],
  resumeTitle: "Product Manager Resume",
  resumeType: "Professional",
  themeId: "classic-left",
  themeColor: "#DC2626",
};

export default function ResumeTemplateCard({
  theme,
}: {
  theme: ResumeThemeToken;
}) {
  const router = useRouter();

  function handleSelect() {
    router.push(`/resumebuilder/editor?themeId=${theme.id}`);
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="group text-left transition-transform hover:-translate-y-2">
      <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm transition-all group-hover:border-red-500 group-hover:shadow-2xl">
        <CardContent className="p-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-white/30" />

            <div className="pointer-events-none absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.34]">
              <ResumePreview
                resumeData={{
                  ...MOCK_DATA,
                  themeId: theme.id,
                  themeColor: theme.defaultColor,
                }}
              />
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-black">
                  {theme.name}
                </h3>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {theme.category}
                </p>
              </div>

              <div
                className="h-5 w-5 border border-slate-200"
                style={{ backgroundColor: theme.defaultColor }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
