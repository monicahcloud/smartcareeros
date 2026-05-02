import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";

const pricingPlans = [
  {
    name: "7-Day Access",
    price: "$7",
    period: "one-time",
    description:
      "Perfect for job seekers who need quick access to career tools.",
    cta: "Start 7-Day Access",
    href: "/sign-up",
    featured: false,
    features: [
      "AI resume builder",
      "Cover letter generator",
      "Resume tips",
      "Interview prep tools",
      "Career resources",
    ],
  },
  {
    name: "Monthly",
    price: "$19",
    period: "per month",
    description: "Best for active job seekers applying consistently.",
    cta: "Start Monthly Plan",
    href: "/sign-up",
    featured: true,
    features: [
      "Everything in 7-Day Access",
      "Job application tracking",
      "AI interview simulator",
      "Resume optimization",
      "Cover letter templates",
      "Career dashboard",
    ],
  },
  {
    name: "Quarterly",
    price: "$49",
    period: "every 3 months",
    description:
      "Best value for long-term career growth and organized job searching.",
    cta: "Choose Quarterly",
    href: "/sign-up",
    featured: false,
    features: [
      "Everything in Monthly",
      "Extended access",
      "Ongoing resume updates",
      "Interview practice",
      "Job search organization",
      "Career strategy resources",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.08),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-red-600">
            Simple Pricing
          </p>

          <h2 className="text-4xl font-black tracking-tighter text-black sm:text-5xl lg:text-6xl">
            Choose the plan that fits your job search.
          </h2>

          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Start with short-term access or stay organized longer with monthly
            and quarterly options.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col border p-8 shadow-sm ${
                plan.featured
                  ? "border-black bg-black text-white shadow-2xl"
                  : "border-neutral-200 bg-white text-black"
              }`}>
              {plan.featured && (
                <div className="absolute right-6 top-6 inline-flex items-center gap-2 bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Popular
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  {plan.name}
                </h3>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-6xl font-black tracking-tighter">
                    {plan.price}
                  </span>
                  <span
                    className={`pb-2 text-sm font-bold ${
                      plan.featured ? "text-slate-400" : "text-neutral-500"
                    }`}>
                    {plan.period}
                  </span>
                </div>

                <p
                  className={`mt-5 min-h-16 text-sm leading-7 ${
                    plan.featured ? "text-slate-300" : "text-neutral-600"
                  }`}>
                  {plan.description}
                </p>
              </div>

              <Link
                href={plan.href}
                className={`mt-8 inline-flex h-14 items-center justify-center px-6 text-sm font-black uppercase tracking-[0.16em] transition ${
                  plan.featured
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-black text-white hover:bg-red-600"
                }`}>
                {plan.cta}
              </Link>

              <div
                className={`my-8 h-px ${
                  plan.featured ? "bg-white/10" : "bg-neutral-200"
                }`}
              />

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm font-semibold">
                    <CheckCircle2
                      className={`mt-0.5 h-5 w-5 shrink-0 ${
                        plan.featured ? "text-red-500" : "text-red-600"
                      }`}
                    />
                    <span
                      className={
                        plan.featured ? "text-slate-200" : "text-neutral-700"
                      }>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
