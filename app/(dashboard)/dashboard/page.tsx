import CareerCommandCenter from "@/app/components/dashboard/CareerCommandCenter";
import DashboardDocumentStats from "@/app/components/dashboard/DashboardDocumentStats";
import DashboardInterviewTeaser from "@/app/components/dashboard/DashboardInterviewTeaser";
import DashboardJobStats from "@/app/components/dashboard/DashboardJobStats";
import OpportunityFinderTeaser from "@/app/components/jobsearch/OpportunityFinderTeaser";

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      <CareerCommandCenter />
      <DashboardDocumentStats />
      <DashboardJobStats />
      <OpportunityFinderTeaser />
      <DashboardInterviewTeaser />
    </main>
  );
}
