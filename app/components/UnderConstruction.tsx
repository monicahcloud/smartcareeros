import Link from "next/link";
import { ArrowRight, Clock, Mail, Sparkles } from "lucide-react";

export default function UnderConstruction() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        {/* Background accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/40 bg-red-600/15">
            <Sparkles className="h-7 w-7 text-red-500" />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
            Smart CareerOS
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Something powerful is coming soon.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            We’re building a smarter career platform to help job seekers create
            resumes, write cover letters, track applications, prepare for
            interviews, and manage the entire job search in one place.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="mailto:monicahcloud@vitanovadesigns.cloud"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
              Contact Us
              <Mail className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-red-500 hover:text-red-400">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              "AI Resume & Coverletter Builder",
              "AI Stimulated Interview Practice",
              "Job Search & Application Tracker",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Clock className="mx-auto mb-3 h-5 w-5 text-red-500" />
                <p className="text-sm font-medium text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
