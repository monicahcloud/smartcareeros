"use client";

export default function CareerProfileHeader() {
  return (
    <div className="border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
        Profile Details
      </p>

      <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-black">
        Core Career Information
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Start with the information that will be reused across your resumes,
        cover letters, interview preparation, and job applications.
      </p>
    </div>
  );
}
