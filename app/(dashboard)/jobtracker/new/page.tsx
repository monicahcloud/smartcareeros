import NewJobForm from "@/app/components/jobtracker/NewJobForm";

export default function NewJobPage() {
  return (
    <main className="space-y-8">
      <section className="border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 inline-flex border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          Add Opportunity
        </p>

        <h1 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl">
          Track A New Job
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          Add a role manually and move it through your application pipeline.
        </p>
      </section>

      <NewJobForm />
    </main>
  );
}
