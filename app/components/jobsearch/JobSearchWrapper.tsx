"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Briefcase, Filter, MapPin, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { US_STATES } from "@/app/utils/states";
import { loadCategories } from "@/app/utils/categories.client";
import SaveJobButton from "./SaveJobButton";
import ApplyJobButton from "./ApplyJobButton";

type AdzunaJob = {
  id: string;
  title: string;
  description?: string;
  contract_type?: string;
  created?: string;
  salary_min?: number;
  salary_max?: number;
  redirect_url: string;
  category?: {
    label?: string;
  };
  company: {
    display_name: string;
  };
  location: {
    area: string[];
    display_name: string;
  };
};

function formatSalary(job: AdzunaJob) {
  const min = job.salary_min;
  const max = job.salary_max;

  if (min && max) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }

  if (min) {
    return `$${min.toLocaleString()}+`;
  }

  return "Not disclosed";
}

function formatPostedDate(date?: string) {
  if (!date) return "Posted date unavailable";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function JobSearchWrapper() {
  const [jobs, setJobs] = useState<AdzunaJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<AdzunaJob | null>(null);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState<
    { label: string; slug: string }[]
  >([]);

  useEffect(() => {
    loadCategories().then(setCategories).catch(console.error);
  }, []);

  async function fetchJobs() {
    setLoading(true);

    try {
      const search = new URLSearchParams({
        q: query,
        state,
        city,
        page: "1",
      });

      if (category) {
        search.set("cat", category);
      }

      const response = await fetch(`/api/adzuna?${search.toString()}`);

      if (!response.ok) {
        throw new Error(`Job search failed: ${response.status}`);
      }

      const data = await response.json();
      const safeJobs = Array.isArray(data) ? data : [];

      setJobs(safeJobs);
      setSelectedJob(safeJobs[0] ?? null);
    } catch (error) {
      console.error("Job search error:", error);
      setJobs([]);
      setSelectedJob(null);
    } finally {
      setLoading(false);
    }
  }

  const selectedSalary = useMemo(() => {
    if (!selectedJob) return "";
    return formatSalary(selectedJob);
  }, [selectedJob]);

  return (
    <section className="space-y-8">
      <div className="border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Search Engine
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tight text-black">
            Search Live Opportunities
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Search jobs, review details, save opportunities to your tracker, or
            start an application while Smart CareerOS keeps the process
            organized.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="relative">
            <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title or keyword"
              className="pl-10"
            />
          </div>

          <Select value={state} onValueChange={setState}>
            <SelectTrigger>
              <MapPin className="mr-2 h-4 w-4 text-slate-400" />
              <SelectValue placeholder="State" />
            </SelectTrigger>

            <SelectContent>
              {US_STATES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4 text-slate-400" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={fetchJobs}
            disabled={loading}
            className="bg-red-600 font-black uppercase tracking-[0.16em] text-white hover:bg-black">
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="font-bold text-slate-500">Loading opportunities...</p>
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-bold text-slate-500">
            Start by searching for a role, keyword, or location.
          </p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Results
              </p>
              <p className="text-sm font-black text-black">{jobs.length}</p>
            </div>

            <div className="max-h-[760px] space-y-3 overflow-y-auto pr-1">
              {jobs.map((job) => {
                const isSelected = selectedJob?.id === job.id;

                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`w-full border bg-white p-4 text-left shadow-sm transition hover:border-red-600 ${
                      isSelected ? "border-red-600" : "border-slate-200"
                    }`}>
                    <div className="mb-3 flex items-center gap-2 text-slate-400">
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {job.company?.display_name ?? "Unknown Company"}
                      </span>
                    </div>

                    <h3 className="text-lg font-black uppercase leading-tight text-black">
                      {job.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {job.location?.display_name ?? "Location unavailable"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                      <span className="border border-slate-200 px-2 py-1">
                        {formatSalary(job)}
                      </span>
                      <span className="border border-slate-200 px-2 py-1">
                        {formatPostedDate(job.created)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedJob && (
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 border-b border-slate-200 pb-6">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-red-600">
                  Selected Opportunity
                </p>

                <h2 className="text-3xl font-black uppercase tracking-tight text-black">
                  {selectedJob.title}
                </h2>

                <p className="mt-3 text-base font-bold text-slate-700">
                  {selectedJob.company?.display_name ?? "Unknown Company"}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedJob.location?.display_name ?? "Location unavailable"}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                  <span className="border border-slate-200 px-3 py-2">
                    {selectedSalary}
                  </span>

                  <span className="border border-slate-200 px-3 py-2">
                    {formatPostedDate(selectedJob.created)}
                  </span>

                  {selectedJob.contract_type && (
                    <span className="border border-slate-200 px-3 py-2">
                      {selectedJob.contract_type}
                    </span>
                  )}

                  {selectedJob.category?.label && (
                    <span className="border border-slate-200 px-3 py-2">
                      {selectedJob.category.label}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <SaveJobButton
                    position={selectedJob.title}
                    company={selectedJob.company?.display_name ?? "Unknown"}
                    location={selectedJob.location?.display_name}
                    salary={selectedSalary}
                    url={selectedJob.redirect_url}
                  />

                  <ApplyJobButton
                    position={selectedJob.title}
                    company={selectedJob.company?.display_name ?? "Unknown"}
                    location={selectedJob.location?.display_name}
                    salary={selectedSalary}
                    url={selectedJob.redirect_url}
                  />
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Job Description
                </p>

                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {selectedJob.description || "No description available."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
