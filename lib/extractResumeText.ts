import mammoth from "mammoth";

const PDF_MIME_TYPE = "application/pdf";

const DOCX_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const TXT_MIME_TYPE = "text/plain";

export async function extractResumeText(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (file.type === TXT_MIME_TYPE || fileName.endsWith(".txt")) {
    const text = await file.text();

    return ensureReadableText(cleanText(text));
  }

  if (file.type === DOCX_MIME_TYPE || fileName.endsWith(".docx")) {
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      buffer: Buffer.from(arrayBuffer),
    });

    return ensureReadableText(cleanText(result.value));
  }

  if (file.type === PDF_MIME_TYPE || fileName.endsWith(".pdf")) {
    return extractPdfText(file);
  }

  if (fileName.endsWith(".doc")) {
    throw new Error(
      "Legacy DOC files are not supported. Please save the document as PDF, DOCX, or TXT.",
    );
  }

  throw new Error(
    "Unsupported file type. Please upload a PDF, DOCX, or TXT file.",
  );
}

async function extractPdfText(file: File): Promise<string> {
  /*
   * Keep pdf-parse out of the top-level module imports.
   * Otherwise Next.js tries to bundle and evaluate it while
   * registering the Inngest endpoint.
   */
  const { PDFParse } = await import("pdf-parse");

  const arrayBuffer = await file.arrayBuffer();

  const parser = new PDFParse({
    data: new Uint8Array(arrayBuffer),
  });

  try {
    const result = await parser.getText();

    return ensureReadableText(cleanText(result.text));
  } finally {
    await parser.destroy();
  }
}

function cleanText(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensureReadableText(text: string): string {
  if (!text) {
    throw new Error(
      "This document does not contain readable text. If it is a scanned PDF, please upload the original DOCX or a searchable PDF.",
    );
  }

  if (text.length < 30) {
    throw new Error(
      "The document does not contain enough readable text to parse as a résumé.",
    );
  }

  return text;
}
