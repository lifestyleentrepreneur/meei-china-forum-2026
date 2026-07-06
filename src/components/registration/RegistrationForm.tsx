"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { contactDetails, paymentConfig, countries } from "@/data/site-content";
import PaymentStep from "@/components/registration/PaymentStep";

const passOptions = [
  { value: "delegate", label: "Delegate Pass" },
  { value: "business", label: "Business Matchmaking Pass" },
  { value: "vip", label: "VIP Delegation Pass" },
  { value: "unsure", label: "Not sure yet" },
];

const industries = [
  "Agriculture & Agribusiness",
  "Banking & Finance",
  "Construction & Real Estate",
  "Energy & Natural Resources",
  "Food & Beverages",
  "Government & Public Sector",
  "Healthcare & Pharmaceuticals",
  "Information Technology",
  "Logistics & Supply Chain",
  "Manufacturing & Industry",
  "Mining & Minerals",
  "Professional Services",
  "Retail & Consumer Goods",
  "Telecommunications",
  "Trade & Commerce",
  "Tourism & Hospitality",
  "Other",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  nationality: string;
  company: string;
  jobTitle: string;
  industry: string;
  preferredPass: string;
  b2bInterest: string;
  needsVisa: boolean;
  dietary: string;
  notes: string;
  consent: boolean;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  nationality: "",
  company: "",
  jobTitle: "",
  industry: "",
  preferredPass: "",
  b2bInterest: "",
  needsVisa: false,
  dietary: "",
  notes: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone.trim()) errors.phone = "Phone or WhatsApp number is required.";
  if (!data.country.trim()) errors.country = "Country of residence is required.";
  if (!data.nationality.trim()) errors.nationality = "Nationality is required.";
  if (!data.preferredPass) errors.preferredPass = "Please select a registration package.";
  if (!data.b2bInterest) errors.b2bInterest = "Please indicate your interest in B2B matchmaking.";
  if (!data.consent) errors.consent = "You must agree to the data use notice to proceed.";
  return errors;
}

export default function RegistrationForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>(() => {
    const pass = searchParams?.get("pass") ?? "";
    const validPass = passOptions.find((p) => p.value === pass)?.value ?? "";
    return { ...initialForm, preferredPass: validPass };
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [recordId, setRecordId] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const firstErrorRef = useRef<HTMLElement | null>(null);

  // Preselect pass from URL on navigation
  useEffect(() => {
    const pass = searchParams?.get("pass") ?? "";
    const validPass = passOptions.find((p) => p.value === pass)?.value ?? "";
    if (validPass) setForm((f) => ({ ...f, preferredPass: validPass }));
  }, [searchParams]);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const blur = (field: keyof FormData) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true])
    ) as Partial<Record<keyof FormData, boolean>>;
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Focus first error
      const firstKey = Object.keys(errs)[0] as keyof FormData;
      const el = document.getElementById(`field-${firstKey}`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          visaInfo: form.needsVisa ? "Yes" : "No",
        }),
      });
      if (!res.ok) throw new Error("Registration request failed");
      const data = await res.json().catch(() => ({}));
      setRecordId(data.id ?? null);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof FormData) =>
    `mt-1 block w-full rounded-sm border bg-[var(--background-elevated)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--green-bright)] focus:border-transparent ${
      errors[field] && touched[field]
        ? "border-[var(--red-primary)]"
        : "border-[var(--border)] focus:border-[var(--green-bright)]"
    }`;

  const labelClass = "block font-body text-sm font-medium text-[var(--text-primary)]";
  const errorClass = "mt-1 flex items-center gap-1 text-xs text-[var(--red-primary)]";

  if (status === "success") {
    return (
      <PaymentStep
        recordId={recordId}
        name={`${form.firstName} ${form.lastName}`.trim()}
      />
    );
  }

  return (
    <div>
      {/* Submission error notice */}
      {status === "error" && (
        <div
          className="mb-6 rounded-sm border border-[var(--gold)] bg-[var(--gold)]/10 p-4"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-[var(--ivory)]">
                Something went wrong submitting your registration.
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Please try again, or contact{" "}
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-[var(--green-bright)] hover:underline"
                >
                  {contactDetails.email}
                </a>{" "}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions? WhatsApp */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-secondary)]">
        <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden="true" />
        <span>Have questions? Chat with us on WhatsApp:</span>
        {paymentConfig.whatsapp.map((w) => (
          <a
            key={w.number}
            href={`https://wa.me/${w.number}?text=${encodeURIComponent(
              "Hello MEEI Program, I have a question about the China–Africa Business & Investment Summit."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--green-bright)] hover:underline"
          >
            {w.display}
          </a>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Summit registration form"
        ref={firstErrorRef as React.RefObject<HTMLFormElement>}
      >
        <div className="space-y-6">
          {/* Personal info */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              Personal Information
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-firstName" className={labelClass}>
                  First Name <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <input
                  id="field-firstName"
                  type="text"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={set("firstName")}
                  onBlur={blur("firstName")}
                  aria-required="true"
                  aria-invalid={!!(errors.firstName && touched.firstName)}
                  aria-describedby={errors.firstName && touched.firstName ? "err-firstName" : undefined}
                  className={inputClass("firstName")}
                  placeholder="First name"
                />
                {errors.firstName && touched.firstName && (
                  <p id="err-firstName" className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-lastName" className={labelClass}>
                  Last Name <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <input
                  id="field-lastName"
                  type="text"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={set("lastName")}
                  onBlur={blur("lastName")}
                  aria-required="true"
                  aria-invalid={!!(errors.lastName && touched.lastName)}
                  aria-describedby={errors.lastName && touched.lastName ? "err-lastName" : undefined}
                  className={inputClass("lastName")}
                  placeholder="Last name"
                />
                {errors.lastName && touched.lastName && (
                  <p id="err-lastName" className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-email" className={labelClass}>
                  Email Address <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <input
                  id="field-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  aria-required="true"
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby={errors.email && touched.email ? "err-email" : undefined}
                  className={inputClass("email")}
                  placeholder="you@example.com"
                />
                {errors.email && touched.email && (
                  <p id="err-email" className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-phone" className={labelClass}>
                  Phone / WhatsApp <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <input
                  id="field-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  onBlur={blur("phone")}
                  aria-required="true"
                  aria-invalid={!!(errors.phone && touched.phone)}
                  aria-describedby={errors.phone && touched.phone ? "err-phone" : undefined}
                  className={inputClass("phone")}
                  placeholder="+1 234 567 8900"
                />
                {errors.phone && touched.phone && (
                  <p id="err-phone" className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-country" className={labelClass}>
                  Country of Residence <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <select
                  id="field-country"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={set("country")}
                  onBlur={blur("country")}
                  aria-required="true"
                  aria-invalid={!!(errors.country && touched.country)}
                  aria-describedby={errors.country && touched.country ? "err-country" : undefined}
                  className={inputClass("country")}
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.country && touched.country && (
                  <p id="err-country" className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.country}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-nationality" className={labelClass}>
                  Nationality <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <select
                  id="field-nationality"
                  value={form.nationality}
                  onChange={set("nationality")}
                  onBlur={blur("nationality")}
                  aria-required="true"
                  aria-invalid={!!(errors.nationality && touched.nationality)}
                  aria-describedby={errors.nationality && touched.nationality ? "err-nationality" : undefined}
                  className={inputClass("nationality")}
                >
                  <option value="">Select nationality</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.nationality && touched.nationality && (
                  <p id="err-nationality" className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.nationality}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Professional info */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              Professional Information
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-company" className={labelClass}>
                  Company or Organization
                </label>
                <input
                  id="field-company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={set("company")}
                  onBlur={blur("company")}
                  className={inputClass("company")}
                  placeholder="Your company or organization"
                />
              </div>

              <div>
                <label htmlFor="field-jobTitle" className={labelClass}>
                  Job Title
                </label>
                <input
                  id="field-jobTitle"
                  type="text"
                  autoComplete="organization-title"
                  value={form.jobTitle}
                  onChange={set("jobTitle")}
                  onBlur={blur("jobTitle")}
                  className={inputClass("jobTitle")}
                  placeholder="Your job title"
                />
              </div>
            </div>

            <div>
              <label htmlFor="field-industry" className={labelClass}>
                Industry or Sector
              </label>
              <select
                id="field-industry"
                value={form.industry}
                onChange={set("industry")}
                onBlur={blur("industry")}
                className={inputClass("industry")}
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </fieldset>

          {/* Summit preferences */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              Summit Preferences
            </legend>

            <div>
              <label htmlFor="field-preferredPass" className={labelClass}>
                Preferred Registration Package <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
              </label>
              <select
                id="field-preferredPass"
                value={form.preferredPass}
                onChange={set("preferredPass")}
                onBlur={blur("preferredPass")}
                aria-required="true"
                aria-invalid={!!(errors.preferredPass && touched.preferredPass)}
                aria-describedby={errors.preferredPass && touched.preferredPass ? "err-preferredPass" : undefined}
                className={inputClass("preferredPass")}
              >
                <option value="">Select a package</option>
                {passOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.preferredPass && touched.preferredPass && (
                <p id="err-preferredPass" className={errorClass} role="alert">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {errors.preferredPass}
                </p>
              )}
            </div>

            <div>
              <span className={`${labelClass} mb-2 block`}>
                Are you interested in B2B Matchmaking Sessions?{" "}
                <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
              </span>
              <div
                className="flex flex-col gap-2 sm:flex-row sm:gap-6"
                role="radiogroup"
                aria-required="true"
                aria-labelledby="b2b-label"
              >
                {["Yes", "No", "Undecided"].map((val) => (
                  <label key={val} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="b2bInterest"
                      value={val.toLowerCase()}
                      checked={form.b2bInterest === val.toLowerCase()}
                      onChange={set("b2bInterest")}
                      onBlur={blur("b2bInterest")}
                      className="accent-[var(--green-bright)]"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">{val}</span>
                  </label>
                ))}
              </div>
              {errors.b2bInterest && touched.b2bInterest && (
                <p id="err-b2bInterest" className={errorClass} role="alert">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {errors.b2bInterest}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="field-needsVisa"
                type="checkbox"
                checked={form.needsVisa}
                onChange={set("needsVisa")}
                className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--green-bright)]"
              />
              <label htmlFor="field-needsVisa" className="cursor-pointer text-sm text-[var(--text-secondary)]">
                I need visa support (invitation letter and assistance with the visa procedure).
              </label>
            </div>
          </fieldset>

          {/* Additional details */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              Additional Details
            </legend>

            <div>
              <label htmlFor="field-dietary" className={labelClass}>
                Dietary or Accessibility Requirements
              </label>
              <input
                id="field-dietary"
                type="text"
                value={form.dietary}
                onChange={set("dietary")}
                onBlur={blur("dietary")}
                className={inputClass("dietary")}
                placeholder="e.g. vegetarian, wheelchair access, etc."
              />
            </div>

            <div>
              <label htmlFor="field-notes" className={labelClass}>
                Additional Notes
              </label>
              <textarea
                id="field-notes"
                rows={3}
                value={form.notes}
                onChange={set("notes")}
                onBlur={blur("notes")}
                className={`${inputClass("notes")} resize-none`}
                placeholder="Any other information you would like to share with the organizers"
              />
            </div>
          </fieldset>

          {/* Consent */}
          <div>
            <div className="flex items-start gap-3">
              <input
                id="field-consent"
                type="checkbox"
                checked={form.consent}
                onChange={set("consent")}
                onBlur={blur("consent")}
                aria-required="true"
                aria-invalid={!!(errors.consent && touched.consent)}
                aria-describedby={errors.consent && touched.consent ? "err-consent" : "consent-description"}
                className="mt-0.5 h-4 w-4 accent-[var(--green-bright)] cursor-pointer"
              />
              <div>
                <label htmlFor="field-consent" className="cursor-pointer text-sm text-[var(--text-secondary)]">
                  I agree that MEEI Program may use the information provided in this form to process my registration interest and contact me about the summit. <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <p id="consent-description" className="mt-1 text-[11px] text-[var(--text-secondary)]/60">
                  Your information will be used solely for summit-related communication and will not be shared with third parties without your consent.
                </p>
              </div>
            </div>
            {errors.consent && touched.consent && (
              <p id="err-consent" className={`${errorClass} mt-2`} role="alert">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.consent}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--red-primary)] px-6 py-3.5 font-heading text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-[var(--red-hover)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--green-bright)] sm:w-auto"
              aria-describedby="form-required-note"
            >
              {status === "submitting" && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {status === "submitting" ? "Submitting…" : "Submit Registration Interest"}
            </button>
            <p id="form-required-note" className="mt-2 text-[11px] text-[var(--text-secondary)]">
              Fields marked <span className="text-[var(--red-primary)]">*</span> are required.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
