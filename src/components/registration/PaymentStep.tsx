"use client";

import { useState, useRef } from "react";
import {
  CheckCircle2,
  Copy,
  Check,
  Upload,
  Loader2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { paymentConfig } from "@/data/site-content";

function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-[var(--text-secondary)]">
          {label}
        </p>
        <p className="truncate font-body text-sm font-medium text-[var(--text-primary)]">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(value.replace(/\s+/g, ""));
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="flex shrink-0 items-center gap-1 rounded-sm border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--green-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)]"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function PaymentStep({
  recordId,
  name,
}: {
  recordId: string | null;
  name: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const waMessage = `Hello MEEI Program, I'm ${name || "a delegate"}. I've completed my registration for the China–Africa Business & Investment Summit and would like to submit my proof of payment.`;

  const handleUpload = async () => {
    if (!file || !recordId) return;
    setStatus("uploading");
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("recordId", recordId);
      fd.append("file", file);
      const res = await fetch("/api/payment-proof", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Upload failed. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <div
        className="rounded-sm border border-[var(--green-primary)] bg-[var(--green-dark)]/20 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[var(--green-bright)]" aria-hidden="true" />
        <h2 className="font-heading text-xl font-semibold uppercase tracking-wide text-[var(--text-primary)]">
          Proof of Payment Received
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          Thank you. Our team will verify your payment and confirm your place by email. You&apos;ll
          hear from us shortly.
        </p>
        <a href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--green-bright)] hover:underline">
          ← Return to homepage
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pre-registered banner */}
      <div className="flex items-start gap-3 rounded-sm border border-[var(--green-primary)] bg-[var(--green-dark)]/20 p-4">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--green-bright)]" aria-hidden="true" />
        <div>
          <p className="font-body text-sm font-semibold text-[var(--text-primary)]">
            You&apos;re pre-registered{name ? `, ${name.split(" ")[0]}` : ""}!
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            One step left — complete your payment to confirm your place.
          </p>
        </div>
      </div>

      {/* Amount */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          Amount due
        </p>
        <p className="mt-1 font-heading text-3xl font-bold text-[var(--text-primary)]">
          {paymentConfig.total}
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Pay the equivalent shown for the account you use.
        </p>
      </div>

      {/* Accounts */}
      <div>
        <p className="mb-3 font-body text-sm font-semibold text-[var(--text-primary)]">
          Transfer to one of these accounts
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paymentConfig.accounts.map((acc) => (
            <div
              key={acc.id}
              className="flex flex-col rounded-sm border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-body text-sm font-semibold text-[var(--text-primary)]">
                  {acc.currency}
                </span>
                <span className="font-heading text-sm font-bold text-[var(--green-bright)]">
                  {acc.amount}
                </span>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {acc.bank && <CopyRow label="Bank" value={acc.bank} />}
                <CopyRow label="Account name" value={acc.accountName} />
                {"accountNumber" in acc && acc.accountNumber && (
                  <CopyRow label="Account number" value={acc.accountNumber} />
                )}
                {"iban" in acc && acc.iban && <CopyRow label="IBAN" value={acc.iban} />}
                {"swift" in acc && acc.swift && <CopyRow label="SWIFT / BIC" value={acc.swift} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proof of payment */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="font-body text-sm font-semibold text-[var(--text-primary)]">
          Submit your proof of payment
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Upload your receipt below, <span className="font-medium">or</span> send it to us on
          WhatsApp. Either one confirms your payment.
        </p>

        {/* Upload */}
        <div className="mt-4">
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setStatus("idle");
            }}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--green-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-bright)]"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              {file ? "Change file" : "Choose file"}
            </button>
            {file && (
              <span className="truncate text-sm text-[var(--text-secondary)]">{file.name}</span>
            )}
          </div>

          {file && (
            <button
              type="button"
              onClick={handleUpload}
              disabled={status === "uploading"}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #078442 0%, #00A85A 100%)" }}
            >
              {status === "uploading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Uploading…
                </>
              ) : (
                "Upload proof of payment"
              )}
            </button>
          )}

          {status === "error" && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--red-primary)]">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errorMsg}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="mt-5 border-t border-[var(--border)] pt-4">
          <p className="mb-2 text-sm text-[var(--text-secondary)]">Or send your proof on WhatsApp:</p>
          <div className="flex flex-wrap gap-2">
            {paymentConfig.whatsapp.map((w) => (
              <a
                key={w.number}
                href={waLink(w.number, waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {w.display}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
