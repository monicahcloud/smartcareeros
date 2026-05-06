import CoverLetterTemplateCard from "./CoverLetterTemplateCard";
import { COVER_LETTER_THEME_REGISTRY } from "./templates/templateRegistry";

export default function TemplateSelector() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {COVER_LETTER_THEME_REGISTRY.map((theme) => (
        <CoverLetterTemplateCard key={theme.id} theme={theme} />
      ))}
    </div>
  );
}
