"use client";

import { useState, useRef } from "react";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { contactDetails, paymentConfig, countries } from "@/data/site-content";
import PaymentStep from "@/components/registration/PaymentStep";
import RegistrationConfirmed from "@/components/registration/RegistrationConfirmed";
import { registrationCopy, type Locale, type RegistrationCopy } from "@/components/registration/registration-copy";
import { countryLabels } from "@/data/countries-i18n";

// "standard": paid delegate pass (visa question + payment step).
// "in-china": selected participants already in China — no visa, no payment.
// "waitlist": next-edition waitlist — visa question kept, no payment.
export type RegistrationVariant = "standard" | "in-china" | "waitlist";

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
  b2bInterest: "",
  needsVisa: false,
  dietary: "",
  notes: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData, t: RegistrationCopy["form"]["errors"]): Errors {
  const errors: Errors = {};
  if (!data.firstName.trim()) errors.firstName = t.firstName;
  if (!data.lastName.trim()) errors.lastName = t.lastName;
  if (!data.email.trim()) {
    errors.email = t.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = t.emailInvalid;
  }
  if (!data.phone.trim()) errors.phone = t.phone;
  if (!data.country.trim()) errors.country = t.country;
  if (!data.nationality.trim()) errors.nationality = t.nationality;
  if (!data.b2bInterest) errors.b2bInterest = t.b2bInterest;
  if (!data.consent) errors.consent = t.consent;
  return errors;
}

export default function RegistrationForm({
  variant = "standard",
  locale = "en",
}: {
  variant?: RegistrationVariant;
  locale?: Locale;
}) {
  const inChina = variant === "in-china";
  const waitlist = variant === "waitlist";
  const t = registrationCopy[locale].form;
  // [stored English value, displayed label]
  const countryOptions = locale === "en" ? countries.map((c) => [c, c]) : countryLabels[locale];
  const [form, setForm] = useState<FormData>(initialForm);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [recordId, setRecordId] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const firstErrorRef = useRef<HTMLElement | null>(null);

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
    const errs = validate(form, t.errors);
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
          registrationType: variant,
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
    if (inChina || waitlist) {
      return (
        <RegistrationConfirmed
          name={`${form.firstName} ${form.lastName}`.trim()}
          locale={locale}
          waitlist={waitlist}
        />
      );
    }
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
                {t.errorTitle}
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {t.errorBefore}{" "}
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-[var(--green-bright)] hover:underline"
                >
                  {contactDetails.email}
                </a>{" "}
                {t.errorAfter}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions? WhatsApp */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-sm border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-secondary)]">
        <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden="true" />
        <span>{t.whatsappPrompt}</span>
        {paymentConfig.whatsapp.map((w) => (
          <a
            key={w.number}
            href={`https://wa.me/${w.number}?text=${encodeURIComponent(t.whatsappMessage)}`}
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
        aria-label={t.ariaLabel}
        ref={firstErrorRef as React.RefObject<HTMLFormElement>}
      >
        <div className="space-y-6">
          {/* Personal info */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              {t.personalLegend}
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-firstName" className={labelClass}>
                  {t.firstName} <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
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
                  placeholder={t.firstNamePlaceholder}
                />
                {errors.firstName && touched.firstName && (
                  <p id="err-firstName" className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className={t.lastNameFirst ? "order-first" : undefined}>
                <label htmlFor="field-lastName" className={labelClass}>
                  {t.lastName} <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
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
                  placeholder={t.lastNamePlaceholder}
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
                  {t.email} <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
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
                  placeholder={t.emailPlaceholder}
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
                  {t.phone} <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
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
                  placeholder={t.phonePlaceholder}
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
                  {t.country} <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
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
                  <option value="">{t.selectCountry}</option>
                  {countryOptions.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
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
                  {t.nationality} <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
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
                  <option value="">{t.selectNationality}</option>
                  {countryOptions.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
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
              {t.professionalLegend}
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-company" className={labelClass}>
                  {t.company}
                </label>
                <input
                  id="field-company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={set("company")}
                  onBlur={blur("company")}
                  className={inputClass("company")}
                  placeholder={t.companyPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="field-jobTitle" className={labelClass}>
                  {t.jobTitle}
                </label>
                <input
                  id="field-jobTitle"
                  type="text"
                  autoComplete="organization-title"
                  value={form.jobTitle}
                  onChange={set("jobTitle")}
                  onBlur={blur("jobTitle")}
                  className={inputClass("jobTitle")}
                  placeholder={t.jobTitlePlaceholder}
                />
              </div>
            </div>

            <div>
              <label htmlFor="field-industry" className={labelClass}>
                {t.industry}
              </label>
              <select
                id="field-industry"
                value={form.industry}
                onChange={set("industry")}
                onBlur={blur("industry")}
                className={inputClass("industry")}
              >
                <option value="">{t.selectIndustry}</option>
                {t.industries.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </fieldset>

          {/* Summit preferences */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              {t.preferencesLegend}
            </legend>

            <div>
              <span className={`${labelClass} mb-2 block`}>
                {t.b2bQuestion}{" "}
                <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
              </span>
              <div
                className="flex flex-col gap-2 sm:flex-row sm:gap-6"
                role="radiogroup"
                aria-required="true"
                aria-labelledby="b2b-label"
              >
                {t.b2bOptions.map(([value, label]) => (
                  <label key={value} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="b2bInterest"
                      value={value}
                      checked={form.b2bInterest === value}
                      onChange={set("b2bInterest")}
                      onBlur={blur("b2bInterest")}
                      className="accent-[var(--green-bright)]"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">{label}</span>
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

            {/* Already in China, no visa needed */}
            {!inChina && (
              <div className="flex items-start gap-3">
                <input
                  id="field-needsVisa"
                  type="checkbox"
                  checked={form.needsVisa}
                  onChange={set("needsVisa")}
                  className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--green-bright)]"
                />
                <label htmlFor="field-needsVisa" className="cursor-pointer text-sm text-[var(--text-secondary)]">
                  {t.needsVisa}
                </label>
              </div>
            )}
          </fieldset>

          {/* Additional details, not asked on the waitlist */}
          {!waitlist && (
            <fieldset className="space-y-4">
              <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
                {t.additionalLegend}
              </legend>

              <div>
                <label htmlFor="field-dietary" className={labelClass}>
                  {t.dietary}
                </label>
                <input
                  id="field-dietary"
                  type="text"
                  value={form.dietary}
                  onChange={set("dietary")}
                  onBlur={blur("dietary")}
                  className={inputClass("dietary")}
                  placeholder={t.dietaryPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="field-notes" className={labelClass}>
                  {t.notes}
                </label>
                <textarea
                  id="field-notes"
                  rows={3}
                  value={form.notes}
                  onChange={set("notes")}
                  onBlur={blur("notes")}
                  className={`${inputClass("notes")} resize-none`}
                  placeholder={t.notesPlaceholder}
                />
              </div>
            </fieldset>
          )}

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
                  {t.consent} <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>
                </label>
                <p id="consent-description" className="mt-1 text-[11px] text-[var(--text-secondary)]/60">
                  {t.consentNote}
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
              {status === "submitting"
                ? t.submitting
                : inChina
                  ? t.submitInChina
                  : waitlist
                    ? t.submitWaitlist
                    : t.submit}
            </button>
            <p id="form-required-note" className="mt-2 text-[11px] text-[var(--text-secondary)]">
              {t.requiredBefore} <span className="text-[var(--red-primary)]">*</span> {t.requiredAfter}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
