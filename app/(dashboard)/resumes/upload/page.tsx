import ResumeUpload from "./ResumeUpload";
import { CheckCircle2 } from "lucide-react";

const features = [
  "AI extracts your experience",
  "Builds an editable resume",
  "Suggests the best template",
  "ATS optimized",
];

export default function UploadResumePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center px-6 py-12">
      <div className="grid w-full gap-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_380px] lg:p-12">
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-600">
            SmartCareerOS
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            Upload Your Resume
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
            Upload an existing resume and let AI turn it into an editable,
            template-ready SmartCareerOS resume.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["PDF", "DOCX", "TXT"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-slate-600">
                ✓ {item}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <ResumeUpload />
          </div>
        </section>

        <aside className="rounded-[1.5rem] bg-slate-950 p-7 text-white">
          <h2 className="text-lg font-black uppercase tracking-wide">
            What happens next
          </h2>

          <div className="mt-6 space-y-5">
            {features.map((feature) => (
              <div key={feature} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue-400" />
                <p className="text-sm font-semibold leading-5">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-xs leading-5 text-white/80">
              Upload a PDF, DOCX, or TXT résumé up to 5MB. Your original
              document is stored privately while SmartCareerOS prepares the
              editable version.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
