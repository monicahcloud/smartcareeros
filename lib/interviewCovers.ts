const interviewCoverMap: Record<string, string[]> = {
  Technology: ["/coding.jpg", "/technology.jpg"],
  Healthcare: ["/healthcare.jpg", "/ambulance.jpg"],
  Finance: ["/finance1.png", "/finance2.png"],
  Education: ["/education1.png", "/education2.png"],
  Marketing: ["/marketing1.png", "/marketing2.png"],
  Sales: ["/sales1.png", "/sales2.png"],
  Operations: ["/operations1.png"],
  "Human Resources": ["/hr1.png", "/hr2.png"],
  "Customer Service": ["/customer1.png", "/customer2.png"],
  General: ["/ambulance.jpg", "/general2.png"],
  Administrative: ["/admin1.png", "/admin2.png"],
  Legal: ["/legal1.png", "/legal2.png"],
  Retail: ["/retail1.png", "/retail2.png"],
  Hospitality: ["/hospitality1.png", "/hospitality2.png"],
  Other: ["/ambulance.jpg", "/general2.png"],
};

export function getInterviewCover(industry?: string) {
  const normalizedIndustry = industry?.toLowerCase().trim();

  if (!normalizedIndustry) {
    return getRandomFromCategory("General");
  }

  const matchedCategory = Object.keys(interviewCoverMap).find((key) =>
    normalizedIndustry.includes(key.toLowerCase()),
  );

  return getRandomFromCategory(matchedCategory || "General");
}

function getRandomFromCategory(category?: string) {
  const safeCategory =
    category && interviewCoverMap[category] ? category : "Other";

  const covers = interviewCoverMap[safeCategory];

  if (!covers || covers.length === 0) {
    return "/covers/general2.png";
  }

  const randomIndex = Math.floor(Math.random() * covers.length);

  return `/covers${covers[randomIndex]}`;
}
