"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-2xl">
      Print / Download
    </button>
  );
}
