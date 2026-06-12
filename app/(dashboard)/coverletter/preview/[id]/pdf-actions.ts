"use server";

import { generatePdfFromUrl } from "@/lib/pdf";

export async function generateCoverLetterPdf(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "http://localhost:3000";

  const url = `${baseUrl}/coverletter/preview/${id}?pdf=1`;

  const pdfBuffer = await generatePdfFromUrl(url);

  return Buffer.from(pdfBuffer).toString("base64");
}
