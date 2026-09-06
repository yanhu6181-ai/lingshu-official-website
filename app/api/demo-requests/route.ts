import { db } from "../../../db";
import { demoRequests } from "../../../db/schema";

export const runtime = "nodejs";

const consentVersion = "2026-08-24";

function clean(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    if (clean(payload.website)) return Response.json({ ok: true }, { status: 201 });

    const name = clean(payload.name, 80);
    const company = clean(payload.company, 120);
    const email = clean(payload.email, 160).toLowerCase();
    const phone = clean(payload.phone, 80);
    const primaryNeed = clean(payload.primaryNeed, 120);
    const locale = clean(payload.locale, 10) || "zh-CN";
    const privacyConsent = payload.privacyConsent === true;
    const platforms = Array.isArray(payload.platforms)
      ? payload.platforms.map((item) => clean(item, 40)).filter(Boolean).slice(0, 10)
      : [];

    if (!name || !company || !email || !phone || !primaryNeed || !privacyConsent) {
      return Response.json({ error: "Missing required fields or consent." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    await db.insert(demoRequests).values({ name, company, email, phone, platforms,
      primaryNeed, locale, consentVersion, marketingConsent: payload.marketingConsent === true,
      sourceUrl: clean(payload.sourceUrl, 500) });

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Unable to submit this request right now." }, { status: 500 });
  }
}
