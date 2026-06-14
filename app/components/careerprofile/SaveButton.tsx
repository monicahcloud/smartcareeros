"use client";

interface SaveButtonProps {
  isPending: boolean;
  onSave: () => void;
}

export default function SaveButton({ isPending, onSave }: SaveButtonProps) {
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={isPending}
      className="h-12 bg-red-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-black disabled:opacity-60">
      {isPending ? "Saving..." : "Save"}
    </button>
  );
}
