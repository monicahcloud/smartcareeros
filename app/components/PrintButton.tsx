"use client";

interface PrintButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export default function PrintButton({ contentRef }: PrintButtonProps) {
  const handleDownload = async () => {
    const htmlElement = contentRef.current;

    if (!htmlElement) return;

    const clone = htmlElement.cloneNode(true) as HTMLElement;

    const response = await fetch("/api/coverletter/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: "Cover_Letter",
        html: clone.outerHTML,
      }),
    });

    if (!response.ok) {
      throw new Error("PDF generation failed");
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Cover_Letter.pdf";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="rounded-full bg-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white shadow-2xl transition hover:bg-red-600">
      Download PDF
    </button>
  );
}
