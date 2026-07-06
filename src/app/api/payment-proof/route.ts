import { NextResponse } from "next/server";

const AIRTABLE_API = "https://api.airtable.com/v0";
const AIRTABLE_CONTENT = "https://content.airtable.com/v0";
const MAX_BYTES = 5 * 1024 * 1024; // Airtable uploadAttachment limit
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];

export async function POST(req: Request) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_REGISTRATIONS_TABLE || "Registrations";
  const proofFieldId = process.env.AIRTABLE_PROOF_FIELD_ID || "fld9814XVQnSsDJN0";

  if (!token || !baseId) {
    return NextResponse.json(
      { error: "Payment upload is not configured yet." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const recordId = formData.get("recordId");
  const file = formData.get("file");

  if (typeof recordId !== "string" || !recordId) {
    return NextResponse.json({ error: "Missing registration reference." }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Please choose a file to upload." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 5 MB)." }, { status: 413 });
  }
  const contentType = file.type || "application/octet-stream";
  if (!ALLOWED.includes(contentType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Upload a JPG, PNG, or PDF." },
      { status: 415 }
    );
  }

  try {
    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

    // 1. Attach the proof file to the record's "Proof of Payment" field.
    const uploadRes = await fetch(
      `${AIRTABLE_CONTENT}/${baseId}/${recordId}/${proofFieldId}/uploadAttachment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType,
          file: base64,
          filename: file.name || "payment-proof",
        }),
      }
    );

    if (!uploadRes.ok) {
      const detail = await uploadRes.text();
      console.error("Airtable attachment upload error:", uploadRes.status, detail);
      return NextResponse.json(
        { error: "We couldn't upload your proof. Please try again or use WhatsApp." },
        { status: 502 }
      );
    }

    // 2. Mark the registration as Paid (awaiting manual verification).
    const patchRes = await fetch(
      `${AIRTABLE_API}/${baseId}/${encodeURIComponent(table)}/${recordId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: { "Payment Status": "Paid" }, typecast: true }),
      }
    );
    if (!patchRes.ok) {
      // Proof uploaded but status update failed — not fatal for the user.
      console.error("Payment status update failed:", patchRes.status, await patchRes.text());
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Payment proof upload failed:", err);
    return NextResponse.json(
      { error: "We couldn't upload your proof. Please try again or use WhatsApp." },
      { status: 502 }
    );
  }
}
