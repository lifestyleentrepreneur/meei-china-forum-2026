"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Upload, X } from "lucide-react";
import { contactDetails, paymentConfig, countries } from "@/data/site-content";

const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  country: string;
  city: string;
  role: string;
  motivation: string;
  network: string;
  languages: string;
  linkedin: string;
  photo: File | null;
  consent: boolean;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  country: "",
  city: "",
  role: "",
  motivation: "",
  network: "",
  languages: "",
  linkedin: "",
  photo: null,
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
  if (!data.whatsapp.trim()) errors.whatsapp = "WhatsApp number is required.";
  if (!data.country.trim()) errors.country = "Please select the country you want to represent.";
  if (!data.motivation.trim()) errors.motivation = "Please tell us why you'd like to represent your country.";
  if (!data.photo) {
    errors.photo = "A photo of yourself is required.";
  } else if (!ALLOWED_IMAGE.includes(data.photo.type)) {
    errors.photo = "Unsupported image type. Upload a JPG, PNG, or WEBP.";
  } else if (data.photo.size > MAX_PHOTO_BYTES) {
    errors.photo = "Photo is too large (max 5 MB).";
  }
  if (!data.consent) errors.consent = "You must agree to the data use notice to proceed.";
  return errors;
}

export default function CountryRepForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const clearFieldError = (field: keyof FormData) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) clearFieldError(field);
  };

  const setPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, photo: file }));
    setTouched((t) => ({ ...t, photo: true }));
    setPhotoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
    // Re-validate the photo immediately for instant feedback.
    setErrors((prev) => {
      const next = { ...prev };
      delete next.photo;
      if (!file) next.photo = "A photo of yourself is required.";
      else if (!ALLOWED_IMAGE.includes(file.type)) next.photo = "Unsupported image type. Upload a JPG, PNG, or WEBP.";
      else if (file.size > MAX_PHOTO_BYTES) next.photo = "Photo is too large (max 5 MB).";
      return next;
    });
  };

  const removePhoto = () => {
    setForm((f) => ({ ...f, photo: null }));
    setPhotoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (photoInputRef.current) photoInputRef.current.value = "";
    setErrors((prev) => ({ ...prev, photo: "A photo of yourself is required." }));
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
      const firstKey = Object.keys(errs)[0] as keyof FormData;
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("firstName", form.firstName);
      fd.append("lastName", form.lastName);
      fd.append("email", form.email);
      fd.append("whatsapp", form.whatsapp);
      fd.append("country", form.country);
      fd.append("city", form.city);
      fd.append("role", form.role);
      fd.append("motivation", form.motivation);
      fd.append("network", form.network);
      fd.append("languages", form.languages);
      fd.append("linkedin", form.linkedin);
      fd.append("consent", String(form.consent));
      if (form.photo) fd.append("photo", form.photo);

      const res = await fetch("/api/country-rep", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Application request failed");
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
  const req = <span className="text-[var(--red-primary)]" aria-hidden="true">*</span>;

  if (status === "success") {
    return (
      <div
        className="rounded-sm border border-[var(--green-bright)] bg-[var(--green-bright)]/10 p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-[var(--green-bright)]" aria-hidden="true" />
        <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
          Application received — thank you!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-secondary)]">
          Our team will review your application to become a country representative and get back to you
          by email or WhatsApp. In the meantime, feel free to reach out with any questions.
        </p>
      </div>
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
                Something went wrong submitting your application.
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
              "Hello MEEI Program, I'm interested in becoming a country representative for the China–Africa Business & Investment Summit."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--green-bright)] hover:underline"
          >
            {w.display}
          </a>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Country representative application form">
        <div className="space-y-6">
          {/* About you */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              About You
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-firstName" className={labelClass}>
                  First Name {req}
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
                  className={inputClass("firstName")}
                  placeholder="First name"
                />
                {errors.firstName && touched.firstName && (
                  <p className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-lastName" className={labelClass}>
                  Surname {req}
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
                  className={inputClass("lastName")}
                  placeholder="Surname"
                />
                {errors.lastName && touched.lastName && (
                  <p className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-email" className={labelClass}>
                  Email Address {req}
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
                  className={inputClass("email")}
                  placeholder="you@example.com"
                />
                {errors.email && touched.email && (
                  <p className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-whatsapp" className={labelClass}>
                  WhatsApp Number {req}
                </label>
                <input
                  id="field-whatsapp"
                  type="tel"
                  autoComplete="tel"
                  value={form.whatsapp}
                  onChange={set("whatsapp")}
                  onBlur={blur("whatsapp")}
                  aria-required="true"
                  aria-invalid={!!(errors.whatsapp && touched.whatsapp)}
                  className={inputClass("whatsapp")}
                  placeholder="+234 806 361 8106"
                />
                {errors.whatsapp && touched.whatsapp && (
                  <p className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.whatsapp}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Photo */}
          <fieldset className="space-y-3">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              Your Photo {req}
            </legend>
            <p className="text-xs text-[var(--text-secondary)]">
              Upload a clear, recent photo of yourself (JPG, PNG, or WEBP, max 5 MB). This is used to identify our representatives.
            </p>

            <div className="flex items-center gap-4">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt="Preview of your uploaded photo"
                  className="h-20 w-20 shrink-0 rounded-sm border border-[var(--border)] object-cover"
                />
              ) : (
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border border-dashed border-[var(--border)] bg-[var(--background-elevated)] text-[var(--text-secondary)]/50"
                  aria-hidden="true"
                >
                  <Upload className="h-6 w-6" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <input
                  id="field-photo"
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  onChange={setPhoto}
                  aria-required="true"
                  aria-invalid={!!(errors.photo && touched.photo)}
                  className="sr-only"
                />
                <label
                  htmlFor="field-photo"
                  className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-sm border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--green-bright)] focus-within:ring-2 focus-within:ring-[var(--green-bright)]"
                >
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  {form.photo ? "Change photo" : "Choose photo"}
                </label>
                {form.photo && (
                  <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="max-w-[220px] truncate">{form.photo.name}</span>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="inline-flex items-center gap-1 text-[var(--red-primary)] hover:underline"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                      Remove
                    </button>
                  </span>
                )}
              </div>
            </div>
            {errors.photo && touched.photo && (
              <p className={errorClass} role="alert">
                <AlertCircle className="h-3 w-3" aria-hidden="true" />
                {errors.photo}
              </p>
            )}
          </fieldset>

          {/* Representation */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              Representation
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="field-country" className={labelClass}>
                  Country You Want to Represent {req}
                </label>
                <select
                  id="field-country"
                  autoComplete="country-name"
                  value={form.country}
                  onChange={set("country")}
                  onBlur={blur("country")}
                  aria-required="true"
                  aria-invalid={!!(errors.country && touched.country)}
                  className={inputClass("country")}
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.country && touched.country && (
                  <p className={errorClass} role="alert">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.country}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="field-city" className={labelClass}>
                  City
                </label>
                <input
                  id="field-city"
                  type="text"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={set("city")}
                  onBlur={blur("city")}
                  className={inputClass("city")}
                  placeholder="City where you're based"
                />
              </div>
            </div>

            <div>
              <label htmlFor="field-role" className={labelClass}>
                Current Role / Organization
              </label>
              <input
                id="field-role"
                type="text"
                autoComplete="organization-title"
                value={form.role}
                onChange={set("role")}
                onBlur={blur("role")}
                className={inputClass("role")}
                placeholder="e.g. Director at a trade association, entrepreneur, consultant"
              />
            </div>

            <div>
              <label htmlFor="field-languages" className={labelClass}>
                Languages You Speak
              </label>
              <input
                id="field-languages"
                type="text"
                value={form.languages}
                onChange={set("languages")}
                onBlur={blur("languages")}
                className={inputClass("languages")}
                placeholder="e.g. English, French, Mandarin"
              />
            </div>
          </fieldset>

          {/* Your fit */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--green-bright)]">
              Why You
            </legend>

            <div>
              <label htmlFor="field-motivation" className={labelClass}>
                Why do you want to be a country representative? {req}
              </label>
              <textarea
                id="field-motivation"
                rows={4}
                value={form.motivation}
                onChange={set("motivation")}
                onBlur={blur("motivation")}
                aria-required="true"
                aria-invalid={!!(errors.motivation && touched.motivation)}
                className={`${inputClass("motivation")} resize-none`}
                placeholder="Tell us what motivates you and how you'd promote the summit in your country."
              />
              {errors.motivation && touched.motivation && (
                <p className={errorClass} role="alert">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {errors.motivation}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="field-network" className={labelClass}>
                Relevant network & experience
              </label>
              <textarea
                id="field-network"
                rows={3}
                value={form.network}
                onChange={set("network")}
                onBlur={blur("network")}
                className={`${inputClass("network")} resize-none`}
                placeholder="Business networks, chambers of commerce, government or industry contacts, event or delegation experience, etc."
              />
            </div>

            <div>
              <label htmlFor="field-linkedin" className={labelClass}>
                LinkedIn or professional profile
              </label>
              <input
                id="field-linkedin"
                type="url"
                value={form.linkedin}
                onChange={set("linkedin")}
                onBlur={blur("linkedin")}
                className={inputClass("linkedin")}
                placeholder="https://linkedin.com/in/your-profile"
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
                aria-describedby={errors.consent && touched.consent ? undefined : "consent-description"}
                className="mt-0.5 h-4 w-4 accent-[var(--green-bright)] cursor-pointer"
              />
              <div>
                <label htmlFor="field-consent" className="cursor-pointer text-sm text-[var(--text-secondary)]">
                  I agree that MEEI Program may use the information provided in this form to review my
                  application and contact me about becoming a country representative. {req}
                </label>
                <p id="consent-description" className="mt-1 text-[11px] text-[var(--text-secondary)]/60">
                  Your information will be used solely for summit-related communication and will not be shared with third parties without your consent.
                </p>
              </div>
            </div>
            {errors.consent && touched.consent && (
              <p className={`${errorClass} mt-2`} role="alert">
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
              {status === "submitting" ? "Submitting…" : "Submit Application"}
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
