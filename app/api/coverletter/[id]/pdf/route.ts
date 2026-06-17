// app/api/coverletter/[id]/pdf/route.ts

import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import puppeteer from "puppeteer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const coverLetter = await prisma.coverLetter.findFirst({
    where: { id, clerkId },
    select: { id: true },
  });

  if (!coverLetter) {
    return new Response("Cover letter not found", { status: 404 });
  }

  const origin = req.nextUrl.origin;
  const previewUrl = `${origin}/coverletter/preview/${id}?print=1`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    const cookies = req.cookies.getAll().map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      domain: req.nextUrl.hostname,
      path: "/",
      httpOnly: true,
      secure: req.nextUrl.protocol === "https:",
      sameSite: "Lax" as const,
    }));

    if (cookies.length > 0) {
      await page.setCookie(...cookies);
    }

    await page.goto(previewUrl, {
      waitUntil: "networkidle0",
    });

    await page.emulateMediaType("print");

    await page.addStyleTag({
      content: `
    @page {
      size: A4;
      margin: 0;
    }

    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    .cover-letter-paper-container {
      width: 210mm !important;
      min-height: auto !important;
      height: auto !important;
      overflow: visible !important;
      box-shadow: none !important;
      margin: 0 auto !important;
      page-break-after: auto !important;
      break-after: auto !important;
    }

    .cover-letter-paper-container > div {
      height: auto !important;
      overflow: visible !important;
    }

    p,
    div,
    section,
    article {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .signature,
    .signature-section,
    .cover-letter-signature {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    img {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  `,
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="cover-letter-${id}.pdf"`,
      },
    });
  } finally {
    await browser.close();
  }
}
