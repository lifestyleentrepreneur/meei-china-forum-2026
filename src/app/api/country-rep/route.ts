import { NextResponse } from "next/server";

const AIRTABLE_API = "https://api.airtable.com/v0";

type CountryRepBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  whatsapp?: string;
  country?: string;
  city?: string;
  role?: string;
  motivation?: string;
  network?: string;
  languages?: string;
  linkedin?: string;
  consent?: boolean;
};

export async function POST(req: Request) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_COUNTRY_REP_TABLE || "Country Rep";

  if (!token || !baseId) {
    // Not configured yet — surface a clear, non-technical message.
    return NextResponse.json(
      { error: "Applications are not fully configured yet. Please try again shortly." },
      { status: 503 }
    );
  }

  let data: CountryRepBody;
  try {
    data = (await req.json()) as CountryRepBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Minimal server-side validation (client validates too).
  if (
    !data.firstName?.trim() ||
    !data.lastName?.trim() ||
    !data.email?.trim() ||
    !data.whatsapp?.trim() ||
    !data.country?.trim() ||
    !data.consent
  ) {
    return NextResponse.json(
      { error: "First name, last name, email, WhatsApp, country, and consent are required." },
      { status: 400 }
    );
  }

  const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;

  // Map form fields -> Airtable column names (must match the base exactly).
  const fields: Record<string, unknown> = {
    "Full Name": fullName,
    "First Name": data.firstName.trim(),
    "Last Name": data.lastName.trim(),
    Email: data.email.trim(),
    WhatsApp: data.whatsapp.trim(),
    "Country to Represent": data.country.trim(),
    City: data.city ?? "",
    "Current Role / Organization": data.role ?? "",
    Motivation: data.motivation ?? "",
    "Network & Experience": data.network ?? "",
    Languages: data.languages ?? "",
    "LinkedIn / Profile": data.linkedin ?? "",
    Consent: !!data.consent,
    Status: "New",
  };

  try {
    const res = await fetch(
      `${AIRTABLE_API}/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // typecast lets Airtable create select options and coerce types.
        body: JSON.stringify({ fields, typecast: true }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Airtable country-rep error:", res.status, detail);
      return NextResponse.json(
        { error: "We couldn't save your application. Please try again." },
        { status: 502 }
      );
    }

    const record = (await res.json()) as { id: string };
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Country-rep submit failed:", err);
    return NextResponse.json(
      { error: "We couldn't save your application. Please try again." },
      { status: 502 }
    );
  }
}
