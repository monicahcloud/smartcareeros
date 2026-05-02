"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "../PrimaryButton";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_30%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-7xl xl:text-8xl">
            Ready to land that
          </h2>

          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-7xl xl:text-8xl">
            dream job
            <br />
            <span className="text-red-600"> or your next promotion?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-8 text-slate-400 md:text-xl">
            Join thousands of professionals securing interviews with Smart
            CareerOS.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <PrimaryButton
              asChild
              className="h-16 border border-red-500 bg-red-600 px-12 text-lg font-black uppercase tracking-[0.18em] transition hover:bg-red-700">
              <Link href="/sign-up">Get Started Free</Link>
            </PrimaryButton>

            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-slate-300 transition hover:text-white">
              Already have an account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              "AI Resume Builder",
              "Interview Preparation",
              "Job Search Engine",
            ].map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-white/[0.04] px-6 py-5 text-sm font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
