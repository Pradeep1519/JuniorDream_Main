import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";
import { Link } from "react-router";
import {
  ContactInterest,
  ContactSubmissionInput,
  ContactUserType,
  saveContactSubmission,
} from "@/lib/contactSubmissions";

type ContactField = keyof ContactSubmissionInput;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialForm: ContactSubmissionInput = {
  name: "",
  email: "",
  mobile: "",
  userType: "student",
  classLevel: "",
  interestedIn: "general",
  message: "",
};

const inputClass = "min-h-12 w-full border border-black/15 bg-[#FAFAF8] px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-black/60 focus:ring-2 focus:ring-black/10";
const labelClass = "mb-2 block text-xs font-medium text-black/75";

function normalizeIndianMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

function getFieldError(field: ContactField, value: string) {
  const trimmed = value.trim();
  if (field === "name" && (trimmed.length < 2 || trimmed.length > 100)) return "Enter a name between 2 and 100 characters.";
  if (field === "email" && (trimmed.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))) return "Enter a valid email address.";
  if (field === "mobile" && !/^[6-9]\d{9}$/.test(normalizeIndianMobile(value))) return "Enter a valid 10-digit Indian mobile number.";
  if (field === "interestedIn" && !trimmed) return "Choose a topic so we can direct your enquiry.";
  if (field === "message" && (trimmed.length < 10 || trimmed.length > 2000)) return "Your message must be between 10 and 2,000 characters.";
  return "";
}

export function ContactForm() {
  const [form, setForm] = useState<ContactSubmissionInput>(initialForm);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentTouched, setConsentTouched] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const submitLock = useRef(false);

  const updateField = <K extends ContactField>(field: K, value: ContactSubmissionInput[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const fieldError = (field: ContactField) =>
    touched[field] || attempted ? getFieldError(field, String(form[field])) : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitLock.current) return;
    setAttempted(true);
    setConsentTouched(true);

    const invalid = (Object.keys(form) as ContactField[]).some((field) => getFieldError(field, String(form[field])));
    if (invalid || !consent) return;

    submitLock.current = true;
    setStatus("submitting");
    try {
      await saveContactSubmission({
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: normalizeIndianMobile(form.mobile),
        message: form.message.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitLock.current = false;
    }
  };

  if (status === "success") {
    return (
      <section aria-live="polite" className="border border-black/10 bg-white p-6 sm:p-9">
        <CheckCircle2 size={28} className="text-black/70" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Message received</h2>
        <p className="mt-3 text-sm leading-7 text-black/60">Thank you for reaching out to Junior Dream. Your enquiry has been submitted for the team to review.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/" className="inline-flex min-h-11 items-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline hover:bg-black/80">Back to home</Link>
          <Link to="/programs" className="inline-flex min-h-11 items-center gap-2 border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline hover:border-black">Explore courses <ArrowRight size={14} aria-hidden="true" /></Link>
          <button type="button" onClick={() => { setForm(initialForm); setConsent(false); setTouched({}); setAttempted(false); setConsentTouched(false); setStatus("idle"); }} className="min-h-11 px-3 text-xs font-medium text-black/60 underline underline-offset-4 hover:text-black">Send another message</button>
        </div>
      </section>
    );
  }

  const consentError = consentTouched && !consent ? "Please confirm consent before sending your enquiry." : "";
  const userClassLabel = form.userType === "parent" ? "Child’s class" : form.userType === "student" ? "Your class" : "Class (optional)";

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-black/10 bg-white p-5 sm:p-7">
      <div className="mb-7">
        <h2 className="m-0 text-2xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Send us a message</h2>
        <p className="mt-2 text-sm leading-6 text-black/55">Share a few details and tell us what you’d like help with.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, name: true }))} className={inputClass} placeholder="Your name" maxLength={100} aria-invalid={Boolean(fieldError("name"))} aria-describedby={fieldError("name") ? "contact-name-error" : undefined} required />
          {fieldError("name") && <p id="contact-name-error" className="mt-1.5 text-xs text-red-700">{fieldError("name")}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, email: true }))} className={inputClass} placeholder="you@example.com" maxLength={254} aria-invalid={Boolean(fieldError("email"))} aria-describedby={fieldError("email") ? "contact-email-error" : undefined} required />
          {fieldError("email") && <p id="contact-email-error" className="mt-1.5 text-xs text-red-700">{fieldError("email")}</p>}
        </div>
        <div>
          <label htmlFor="contact-mobile" className={labelClass}>Mobile number <span aria-hidden="true">*</span></label>
          <input id="contact-mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" value={form.mobile} onChange={(event) => updateField("mobile", event.target.value.slice(0, 16))} onBlur={() => setTouched((previous) => ({ ...previous, mobile: true }))} className={inputClass} placeholder="+91 98765 43210" maxLength={16} aria-invalid={Boolean(fieldError("mobile"))} aria-describedby={fieldError("mobile") ? "contact-mobile-error" : undefined} required />
          {fieldError("mobile") && <p id="contact-mobile-error" className="mt-1.5 text-xs text-red-700">{fieldError("mobile")}</p>}
        </div>
        <div>
          <label htmlFor="contact-user-type" className={labelClass}>I am a <span aria-hidden="true">*</span></label>
          <select id="contact-user-type" name="userType" value={form.userType} onChange={(event) => updateField("userType", event.target.value as ContactUserType)} className={inputClass}>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-class" className={labelClass}>{userClassLabel}</label>
          <select id="contact-class" name="classLevel" value={form.classLevel} onChange={(event) => updateField("classLevel", event.target.value)} className={inputClass}>
            <option value="">Select if relevant</option>
            {[6, 7, 8, 9, 10, 11, 12].map((classNumber) => <option key={classNumber} value={`Class ${classNumber}`}>Class {classNumber}</option>)}
            <option value="College">College</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-interest" className={labelClass}>Interested in <span aria-hidden="true">*</span></label>
          <select id="contact-interest" name="interestedIn" value={form.interestedIn} onChange={(event) => updateField("interestedIn", event.target.value as ContactInterest)} onBlur={() => setTouched((previous) => ({ ...previous, interestedIn: true }))} className={inputClass} aria-invalid={Boolean(fieldError("interestedIn"))} required>
            <option value="engineering">Engineering</option>
            <option value="academic_courses">Academic courses</option>
            <option value="mentorship">Mentorship</option>
            <option value="admissions">Admission / enrollment</option>
            <option value="general">General information</option>
          </select>
          {fieldError("interestedIn") && <p className="mt-1.5 text-xs text-red-700">{fieldError("interestedIn")}</p>}
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-4">
          <label htmlFor="contact-message" className={`${labelClass} mb-0`}>Message <span aria-hidden="true">*</span></label>
          <span className="text-[0.68rem] text-black/40">{form.message.length}/2,000</span>
        </div>
        <textarea id="contact-message" name="message" rows={5} value={form.message} onChange={(event) => updateField("message", event.target.value.slice(0, 2000))} onBlur={() => setTouched((previous) => ({ ...previous, message: true }))} className={`${inputClass} min-h-36 resize-y`} placeholder="Tell us how we can help..." maxLength={2000} aria-invalid={Boolean(fieldError("message"))} aria-describedby={fieldError("message") ? "contact-message-error" : undefined} required />
        {fieldError("message") && <p id="contact-message-error" className="mt-1.5 text-xs text-red-700">{fieldError("message")}</p>}
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-black/60">
          <input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setConsentTouched(true); }} onBlur={() => setConsentTouched(true)} className="mt-1 h-4 w-4 shrink-0 accent-black" aria-describedby={consentError ? "contact-consent-error" : undefined} />
          <span>By submitting this form, you agree that Junior Dream may use the information provided to respond to your enquiry. If you’re under 18, please ask a parent or guardian to submit with you. Read our <Link to="/privacy" className="text-black underline underline-offset-2">Privacy Policy</Link>.</span>
        </label>
        {consentError && <p id="contact-consent-error" className="mt-1.5 text-xs text-red-700">{consentError}</p>}
      </div>

      {status === "error" && (
        <div role="alert" className="mt-5 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <div><p className="m-0 font-medium">Something went wrong</p><p className="mb-0 mt-1 text-red-700">We couldn’t submit your message right now. Please try again or contact us using the details on this page.</p></div>
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-black/80 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
      <p className="mt-3 text-center text-[0.68rem] text-black/40">Fields marked * are required.</p>
    </form>
  );
}