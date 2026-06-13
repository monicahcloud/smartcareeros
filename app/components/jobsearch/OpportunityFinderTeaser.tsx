import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Search } from "lucide-react";

export default function OpportunityFinderTeaser() {
  return (
    <section className="border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
            <Search className="h-4 w-4" />
            Opportunity Finder
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-black">
            Find roles and track every move.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Search live job opportunities, save roles to your tracker, and start
            applications without losing sight of your pipeline.
          </p>
        </div>

        <Link
          href="/jobsearch"
          className="inline-flex h-12 items-center justify-center gap-2 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black">
          Search Jobs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="border border-slate-200 bg-slate-50 p-5">
          <BriefcaseBusiness className="mb-3 h-5 w-5 text-red-600" />
          <p className="text-sm font-black text-black">Search Opportunities</p>
          <p className="mt-2 text-sm text-slate-500">
            Find live roles by keyword, category, city, and state.
          </p>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-5">
          <BriefcaseBusiness className="mb-3 h-5 w-5 text-red-600" />
          <p className="text-sm font-black text-black">Save To Tracker</p>
          <p className="mt-2 text-sm text-slate-500">
            Save jobs directly into your application pipeline.
          </p>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-5">
          <BriefcaseBusiness className="mb-3 h-5 w-5 text-red-600" />
          <p className="text-sm font-black text-black">Auto-Track Apply</p>
          <p className="mt-2 text-sm text-slate-500">
            Start applications and update your tracker automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
