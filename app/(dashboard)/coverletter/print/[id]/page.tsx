import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import puppeteer from "puppeteer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function GET(
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
    select: {
      id: true,
      shareToken: true,
    },
  });

  if (!coverLetter) {
    return new Response("Cover letter not found", { status: 404 });
  }

  const origin = req.nextUrl.origin;
  const previewUrl = `${origin}/coverletter/share/${coverLetter.shareToken}?print=1`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.goto(previewUrl, {
      waitUntil: "networkidle0",
    });

    await page.emulateMediaType("print");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
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
