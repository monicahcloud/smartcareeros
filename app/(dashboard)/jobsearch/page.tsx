import JobSearchWrapper from "@/app/components/jobsearch/JobSearchWrapper";

export const metadata = {
  title: "Opportunity Finder | Smart CareerOS",
  description:
    "Search job opportunities and save them directly into your Smart CareerOS application tracker.",
};

export default function JobSearchPage() {
  return (
    <main className="space-y-8">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Opportunity Finder
        </p>

        <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
          Discover Your Next Role
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          Search live job opportunities, save roles to your tracker, and begin
          applications without losing your place in the process.
        </p>
      </section>

      <JobSearchWrapper />
    </main>
  );
}
