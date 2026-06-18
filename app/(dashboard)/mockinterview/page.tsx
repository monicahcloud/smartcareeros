export const dynamic = "force-dynamic";

import { currentUser } from "@clerk/nextjs/server";
import MockInterviewSetupForm from "./MockInterviewSetupForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/app/components/SectionTitle";

const MockInterviewRoute = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center text-white">
        <h2 className="text-2xl font-semibold">You’re not signed in</h2>

        <p className="mt-2 max-w-md text-slate-400">
          Sign in to practice interviews for any role — whether you&apos;re in
          tech, healthcare, business, or any other field.
        </p>

        <div className="mt-6">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 md:px-6">
      {/* TITLE */}
      <SectionTitle
        text="Practice Interviews for Any Role — Powered by AI"
        subtext="Create a mock interview tailored to your job, industry, and experience level — then jump straight into a live AI session with real-time interaction and coaching feedback."
      />

      {/* FORM */}
      <MockInterviewSetupForm
        clerkId={user.id}
        userName={user.firstName ?? "Guest"}
      />
    </div>
  );
};

export default MockInterviewRoute;
