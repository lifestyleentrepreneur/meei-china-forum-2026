import { NextResponse } from "next/server";

const AIRTABLE_API = "https://api.airtable.com/v0";
const AIRTABLE_CONTENT = "https://content.airtable.com/v0";
const MAX_BYTES = 5 * 1024 * 1024; // Airtable uploadAttachment limit
const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export async function POST(req: Request) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_COUNTRY_REP_TABLE || "Country Rep";
  const photoFieldId = process.env.AIRTABLE_COUNTRY_REP_PHOTO_FIELD_ID || "fldJZT7Hpc7veLwet";

  if (!token || !baseId) {
    // Not configured yet — surface a clear, non-technical message.
    return NextResponse.json(
      { error: "Applications are not fully configured yet. Please try again shortly." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  const firstName = str("firstName");
  const lastName = str("lastName");
  const email = str("email");
  const whatsapp = str("whatsapp");
  const country = str("country");
  const consent = str("consent") === "true";
  const photo = formData.get("photo");

  // Minimal server-side validation (client validates too).
  if (!firstName || !lastName || !email || !whatsapp || !country || !consent) {
    return NextResponse.json(
      { error: "First name, last name, email, WhatsApp, country, and consent are required." },
      { status: 400 }
    );
  }

  // Photo is compulsory.
  if (!(photo instanceof File) || photo.size === 0) {
    return NextResponse.json({ error: "Please upload a photo of yourself." }, { status: 400 });
  }
  if (photo.size > MAX_BYTES) {
    return NextResponse.json({ error: "Photo is too large (max 5 MB)." }, { status: 413 });
  }
  const contentType = photo.type || "application/octet-stream";
  if (!ALLOWED_IMAGE.includes(contentType)) {
    return NextResponse.json(
      { error: "Unsupported image type. Upload a JPG, PNG, or WEBP." },
      { status: 415 }
    );
  }

  const fullName = `${firstName} ${lastName}`;

  // Map form fields -> Airtable column names (must match the base exactly).
  const fields: Record<string, unknown> = {
    "Full Name": fullName,
    "First Name": firstName,
    "Last Name": lastName,
    Email: email,
    WhatsApp: whatsapp,
    "Country to Represent": country,
    City: str("city"),
    "Current Role / Organization": str("role"),
    Motivation: str("motivation"),
    "Network & Experience": str("network"),
    Languages: str("languages"),
    "LinkedIn / Profile": str("linkedin"),
    Consent: consent,
    Status: "New",
  };

  try {
    // 1. Create the application record.
    const createRes = await fetch(
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

    if (!createRes.ok) {
      const detail = await createRes.text();
      console.error("Airtable country-rep create error:", createRes.status, detail);
      return NextResponse.json(
        { error: "We couldn't save your application. Please try again." },
        { status: 502 }
      );
    }

    const record = (await createRes.json()) as { id: string };

    // 2. Attach the photo to the record's "Photo" field.
    const base64 = Buffer.from(await photo.arrayBuffer()).toString("base64");
    const uploadRes = await fetch(
      `${AIRTABLE_CONTENT}/${baseId}/${record.id}/${photoFieldId}/uploadAttachment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType,
          file: base64,
          filename: photo.name || "photo",
        }),
      }
    );

    if (!uploadRes.ok) {
      const detail = await uploadRes.text();
      console.error("Airtable country-rep photo upload error:", uploadRes.status, detail);
      // The record exists but the photo failed — flag it so staff can follow up.
      await fetch(
        `${AIRTABLE_API}/${baseId}/${encodeURIComponent(table)}/${record.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields: { Status: "Reviewing" }, typecast: true }),
        }
      ).catch(() => {});
      return NextResponse.json(
        { error: "Your details were saved, but the photo upload failed. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Country-rep submit failed:", err);
    return NextResponse.json(
      { error: "We couldn't save your application. Please try again." },
      { status: 502 }
    );
  }
}
