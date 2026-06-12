"use client";

import { useUser } from "@clerk/nextjs";
import CareerCommandCenter from "../../components/dashboard/CareerCommandCenter";
import JobSearchWrapper from "@/app/components/jobsearch/JobSearchWrapper";

const Home = () => {
  const { user } = useUser();

  const username = user?.firstName || user?.username || "there";

  return (
    <>
      {/* 1. Career Workspace Section */}
      <CareerCommandCenter />
      <JobSearchWrapper />
      <main className="p-4 md:p-8 max-w-400 mx-auto space-y-16">
        {/* 2. Job Search Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-200 flex-1" />
          </div>
        </section>
        {/* 3. Career Insights Section */}
      </main>
    </>
  );
};

export default Home;
