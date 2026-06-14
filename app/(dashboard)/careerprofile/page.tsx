import { getCareerProfile } from "./actions";
import CareerProfileForm from "./CareerProfileForm";

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
          Build Your Master Profile
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500">
          Your Career Profile becomes the foundation for resumes, cover letters,
          job matching, and interview preparation across Smart CareerOS.
        </p>
      </section>

      <CareerProfileForm profile={profile} />
    </main>
  );
}
