/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <script src="https://cdn.tailwindcss.com"></script>

          <style>
            @page {
              size: A4;
              margin: 0;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: white;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            #document-container {
              width: 210mm;
              background: white;
              margin: 0 auto;
            }

            .resume-paper-container {
              width: 210mm !important;
              min-height: auto !important;
              height: auto !important;
              overflow: visible !important;
              box-shadow: none !important;
              margin: 0 !important;
              page-break-after: auto;
            }

            .resume-section,
            p,
            div,
            section,
            article {
              page-break-inside: avoid;
              break-inside: avoid;
            }

            img {
              page-break-inside: avoid;
              break-inside: avoid;
            }
          </style>
        </head>

        <body>
          <div id="document-container">
            ${values.html}
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, {
      waitUntil: "load",
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfUint8Array), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          values.filename || "resume"
        }.pdf"`,
      },
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
