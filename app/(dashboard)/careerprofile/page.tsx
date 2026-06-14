import { getCareerProfile } from "./actions";
import CreateCoverLetterFromProfileButton from "./CareerCoverLetterFromProfileButton";
import CareerProfileForm from "./CareerProfileForm";
import CreateResumeFromProfileButton from "./CreateResumeFromProfileButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Career Profile | Smart CareerOS",
  description:
    "Build your master career profile for resumes, cover letters, interviews, and job matching.",
};

export default async function CareerProfilePage() {
  const profile = await getCareerProfile();

  return (
    <main className="space-y-8">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Career Profile
        </p>

        <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
          Build Your Career Source of Truth
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
          Store your career information once. Smart CareerOS uses your profile
          to create targeted resumes, cover letters, job matches, interview
          answers, and career documents without making you re-enter the same
          details every time.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Step 1
            </p>
            <h3 className="mt-2 font-black uppercase text-black">
              Complete Profile
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Add your experience, skills, education, projects, and
              accomplishments.
            </p>
          </div>

          <div className="border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Step 2
            </p>
            <h3 className="mt-2 font-black uppercase text-black">
              Generate Documents
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use your profile to create resumes and cover letters faster.
            </p>
          </div>

          <div className="border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Step 3
            </p>
            <h3 className="mt-2 font-black uppercase text-black">
              Tailor & Apply
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Customize each document for a specific role, then track your
              applications.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CreateResumeFromProfileButton />
          <CreateCoverLetterFromProfileButton />
        </div>
      </section>

      <CareerProfileForm profile={profile} />
    </main>
  );
}
