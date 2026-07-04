"use client";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const presetColors = [
  // Neutral
  "#000000",
  "#111827",
  "#1F2937",
  "#334155",
  "#475569",
  "#6B7280",

  // Blues
  "#1D4ED8",
  "#2563EB",
  "#3B82F6",
  "#0EA5E9",
  "#0284C7",
  "#1E40AF",

  // Teal / Cyan
  "#0F766E",
  "#0D9488",
  "#14B8A6",
  "#0891B2",
  "#06B6D4",

  // Greens
  "#166534",
  "#15803D",
  "#16A34A",
  "#22C55E",
  "#65A30D",

  // Gold / Yellow
  "#A16207",
  "#CA8A04",
  "#D97706",
  "#F59E0B",

  // Orange
  "#C2410C",
  "#EA580C",
  "#F97316",

  // Reds
  "#991B1B",
  "#B91C1C",
  "#DC2626",
  "#EF4444",

  // Pink / Rose
  "#BE123C",
  "#DB2777",
  "#E11D48",
  "#EC4899",

  // Purple
  "#5B21B6",
  "#6D28D9",
  "#7C3AED",
  "#8B5CF6",

  // Brown
  "#78350F",
  "#92400E",
  "#A16207",

  // White
  "#FFFFFF",
];

const ColorPicker = ({
  value,
  onChange,
  label = "Theme Color",
}: ColorPickerProps) => {
  return (
    <div className="space-y-3">
      {/* Label */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
          {label}
        </p>
      </div>

      {/* Selected Color Preview */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div
          className="h-10 w-10 rounded-full border-4 border-white shadow-md"
          style={{ backgroundColor: value }}
        />

        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-700">
            Selected Color
          </span>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">
            {value}
          </span>
        </div>

        {/* Native Picker */}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ml-auto h-10 w-16 cursor-pointer border-none bg-transparent"
        />
      </div>

      {/* Preset Colors */}
      <div className="grid grid-cols-8 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`h-8 w-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              value === color
                ? "border-slate-900 ring-2 ring-slate-300"
                : "border-white"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
