import CareerCommandCenter from "@/app/components/dashboard/CareerCommandCenter";
import DashboardJobStats from "@/app/components/dashboard/DashboardJobStats";
import OpportunityFinderTeaser from "@/app/components/jobsearch/OpportunityFinderTeaser";

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      <CareerCommandCenter />
      <DashboardJobStats />
      <OpportunityFinderTeaser />
    </main>
  );
}
