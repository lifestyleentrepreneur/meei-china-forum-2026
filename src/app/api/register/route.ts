import { NextResponse } from "next/server";

const AIRTABLE_API = "https://api.airtable.com/v0";

type RegistrationBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  nationality?: string;
  company?: string;
  jobTitle?: string;
  industry?: string;
  preferredPass?: string;
  b2bInterest?: string;
  visaInfo?: string;
  dietary?: string;
  notes?: string;
  consent?: boolean;
};

export async function POST(req: Request) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_REGISTRATIONS_TABLE || "Registrations";

  if (!token || !baseId) {
    // Not configured yet — surface a clear, non-technical message.
    return NextResponse.json(
      { error: "Registration is not fully configured yet. Please try again shortly." },
      { status: 503 }
    );
  }

  let data: RegistrationBody;
  try {
    data = (await req.json()) as RegistrationBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Minimal server-side validation (client validates too).
  if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim() || !data.consent) {
    return NextResponse.json(
      { error: "First name, last name, email, and consent are required." },
      { status: 400 }
    );
  }

  const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;

  // Map form fields -> Airtable column names (must match the base exactly).
  const fields: Record<string, unknown> = {
    "Full Name": fullName,
    "First Name": data.firstName.trim(),
    "Last Name": data.lastName.trim(),
    Email: data.email?.trim(),
    Phone: data.phone ?? "",
    "Country of Residence": data.country ?? "",
    Nationality: data.nationality ?? "",
    Company: data.company ?? "",
    "Job Title": data.jobTitle ?? "",
    Industry: data.industry ?? "",
    "Preferred Pass": "Delegate Pass",
    "B2B Interest": data.b2bInterest ?? "",
    "Needs Visa Support": data.visaInfo ?? "",
    "Dietary Requirements": data.dietary ?? "",
    Notes: data.notes ?? "",
    Consent: !!data.consent,
    "Payment Status": "Pending",
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
      console.error("Airtable registration error:", res.status, detail);
      return NextResponse.json(
        { error: "We couldn't save your registration. Please try again." },
        { status: 502 }
      );
    }

    const record = (await res.json()) as { id: string };
    // Return the record id so the payment step can attach proof to it later.
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Registration submit failed:", err);
    return NextResponse.json(
      { error: "We couldn't save your registration. Please try again." },
      { status: 502 }
    );
  }
}
