import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import DashboardLayoutClient from "../components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | Smart CareerOS",
  description:
    "Manage your career in one place — build resumes, track applications, prepare for interviews, and move closer to your next offer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  /**
   * Later, when database + subscription logic is ready:
   *
   * - Get DB user by Clerk ID
   * - Get subscription level
   * - Get resume count
   * - Get cover letter count
   * - Get interview count
   * - Show first-time user modal
   */

  const userStats = {
    level: "free",
    resumeCount: 0,
    letterCount: 0,
    interviewCount: 0,
  };

  return (
    <DashboardLayoutClient userStats={userStats}>
      {children}
    </DashboardLayoutClient>
  );
}
