import { getCategoryMap } from "@/app/utils/categories.server";
import { NextRequest, NextResponse } from "next/server";

const toTitle = (value: string) =>
  value
    .toLowerCase()
    .split(" ")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");

function isDistrictOfColumbia(value: string) {
  const normalized = value.trim().toLowerCase();

  return (
    normalized === "dc" ||
    normalized === "d.c." ||
    normalized === "washington dc" ||
    normalized === "washington d.c." ||
    normalized === "district of columbia"
  );
}

export async function GET(req: NextRequest) {
  const { ADZUNA_APP_ID, ADZUNA_APP_KEY } = process.env;

  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    return NextResponse.json(
      { error: "Missing Adzuna credentials" },
      { status: 500 },
    );
  }

  const params = req.nextUrl.searchParams;

  const q = params.get("q") || "developer";
  const stateRaw = params.get("state") || "";
  const cityRaw = params.get("city") || "";
  const page = Number(params.get("page") || 1);
  const catRaw = params.get("cat") || "";

  const isDC = isDistrictOfColumbia(stateRaw) || isDistrictOfColumbia(cityRaw);

  const state = isDC ? "District of Columbia" : stateRaw;
  const city = isDC ? "Washington" : cityRaw ? toTitle(cityRaw) : "";

  const categoryMap = await getCategoryMap();
  const categorySlug = categoryMap.get(catRaw) ?? catRaw;

  const baseUrl =
    `https://api.adzuna.com/v1/api/jobs/us/search/${page}` +
    `?app_id=${ADZUNA_APP_ID}` +
    `&app_key=${ADZUNA_APP_KEY}` +
    `&results_per_page=30` +
    `&what=${encodeURIComponent(q)}` +
    (categorySlug ? `&category=${encodeURIComponent(categorySlug)}` : "");

  const where = isDC
    ? "Washington, DC"
    : [city, state].filter(Boolean).join(", ");

  let url = "";

  if (isDC) {
    url = `${baseUrl}&where=${encodeURIComponent(
      "Washington, DC",
    )}&content-type=application/json`;
  } else if (state) {
    const locationParts = [
      "location0=us",
      `location1=${encodeURIComponent(state)}`,
    ];

    if (city) {
      locationParts.push(`location3=${encodeURIComponent(city)}`);
    }

    url = `${baseUrl}&${locationParts.join("&")}&content-type=application/json`;
  } else if (city) {
    url = `${baseUrl}&where=${encodeURIComponent(
      where,
    )}&content-type=application/json`;
  } else {
    url = `${baseUrl}&location0=us&content-type=application/json`;
  }

  let response = await fetch(url);
  let isValidJson =
    response.ok && response.headers.get("content-type")?.includes("json");

  if (!isValidJson && (city || isDC)) {
    const fallbackUrl =
      `${baseUrl}&where=${encodeURIComponent(where)}` +
      `&content-type=application/json`;

    response = await fetch(fallbackUrl);
    isValidJson =
      response.ok && response.headers.get("content-type")?.includes("json");
  }

  if (!isValidJson) {
    const text = await response.text().catch(() => "");

    console.error("Adzuna error:", text.slice(0, 300));

    return NextResponse.json(
      { error: "Adzuna request failed" },
      { status: 502 },
    );
  }

  const data = await response.json();

  return NextResponse.json(data.results ?? []);
}
