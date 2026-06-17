"use client";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const presetColors = [
  "#0F172A", // slate
  "#1E293B",
  "#2563EB", // blue
  "#7C3AED", // purple
  "#DB2777", // pink
  "#DC2626", // red
  "#EA580C", // orange
  "#CA8A04", // yellow
  "#16A34A", // green
  "#0891B2", // cyan
  "#000000",
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
      <div className="flex flex-wrap gap-2">
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
