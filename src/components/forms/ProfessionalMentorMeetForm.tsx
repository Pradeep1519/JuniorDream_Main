import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, Clock, MessageCircle, X } from "lucide-react";
import { saveContactSubmission } from "@/lib/contactSubmissions";

const discussionTopics = [
  "Course fit and prerequisites",
  "Projects and learning approach",
  "Technology stack and tools",
  "Career direction",
];

const fieldClass = "min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black/60 focus:ring-2 focus:ring-black/10";

export function ProfessionalMentorMeetForm({ courseName, className = "" }: { courseName: string; className?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [availability, setAvailability] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const normalizedMobile = mobile.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  const nameError = name.trim().length < 2 ? "Enter your name." : "";
  const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "Enter a valid email address." : "";
  const mobileError = !/^[6-9]\d{9}$/.test(normalizedMobile) ? "Enter a valid 10-digit Indian mobile number." : "";

  function toggleTopic(topic: string) {
    setTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setError(false);
    if (nameError || emailError || mobileError || !availability || topics.length === 0 || !consent) return;

    setSubmitting(true);
    try {
      const discussion = [
        `20-minute mentor meeting request for ${courseName}`,
        `Preferred contact window: ${availability}`,
        `Topics: ${topics.join(", ")}`,
      ].join("\n");

      await saveContactSubmission({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: normalizedMobile,
        userType: "student",
        classLevel: "College / professional",
        interestedIn: "mentorship",
        message: discussion,
      });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-8" role="status" aria-live="polite">
        <CheckCircle2 size={28} className="text-emerald-700" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-medium text-black">Request received</h3>
        <p className="mt-2 text-sm leading-6 text-black/60">The Junior Dream team will contact you using the details you shared to coordinate a 20-minute conversation. Your preferred window is a request, not a confirmed booking.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`rounded-[24px] border border-black/10 bg-white/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:p-7 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F1EE] text-black/70"><MessageCircle size={17} aria-hidden="true" /></span>
        <div>
          <h3 className="m-0 text-lg font-medium text-black">Request your mentor conversation</h3>
          <p className="mb-0 mt-1 flex items-center gap-1.5 text-xs text-black/50"><Clock size={13} aria-hidden="true" /> 20 minutes · no pressure · course-specific guidance</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-black/65">
          Name <span aria-hidden="true">*</span>
          <input className={`${fieldClass} mt-2`} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} aria-invalid={attempted && Boolean(nameError)} aria-describedby={attempted && nameError ? "mentor-name-error" : undefined} />
          {attempted && nameError && <span id="mentor-name-error" className="mt-1 block text-xs text-red-700">{nameError}</span>}
        </label>
        <label className="text-xs font-medium text-black/65">
          Email <span aria-hidden="true">*</span>
          <input className={`${fieldClass} mt-2`} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} aria-invalid={attempted && Boolean(emailError)} aria-describedby={attempted && emailError ? "mentor-email-error" : undefined} />
          {attempted && emailError && <span id="mentor-email-error" className="mt-1 block text-xs text-red-700">{emailError}</span>}
        </label>
        <label className="text-xs font-medium text-black/65 sm:col-span-2">
          Mobile number <span aria-hidden="true">*</span>
          <input className={`${fieldClass} mt-2`} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit Indian mobile number" value={mobile} onChange={(event) => setMobile(event.target.value.slice(0, 16))} aria-invalid={attempted && Boolean(mobileError)} aria-describedby={attempted && mobileError ? "mentor-mobile-error" : undefined} />
          {attempted && mobileError && <span id="mentor-mobile-error" className="mt-1 block text-xs text-red-700">{mobileError}</span>}
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-xs font-medium text-black/65">What time generally works for you? <span aria-hidden="true">*</span></legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["Weekday morning", "Weekday afternoon", "Weekday evening", "Weekend / flexible"].map((slot) => (
            <label key={slot} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs transition ${availability === slot ? "border-black bg-black text-white" : "border-black/10 bg-[#F8F8F6] text-black/65 hover:border-black/30"}`}>
              <input className="sr-only" type="radio" name="mentor-availability" value={slot} checked={availability === slot} onChange={() => setAvailability(slot)} />
              {slot}
            </label>
          ))}
        </div>
        {attempted && !availability && <p className="mt-1 text-xs text-red-700">Choose a preferred contact window.</p>}
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-xs font-medium text-black/65">What would you like to discuss? <span aria-hidden="true">*</span></legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {discussionTopics.map((topic) => (
            <label key={topic} className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-black/10 bg-[#F8F8F6] px-3 py-2.5 text-xs leading-5 text-black/65">
              <input className="mt-0.5 h-4 w-4 shrink-0 accent-black" type="checkbox" checked={topics.includes(topic)} onChange={() => toggleTopic(topic)} />
              {topic}
            </label>
          ))}
        </div>
        {attempted && topics.length === 0 && <p className="mt-1 text-xs text-red-700">Select at least one discussion topic.</p>}
      </fieldset>

      <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-black/55">
        <input className="mt-1 h-4 w-4 shrink-0 accent-black" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>I agree that Junior Dream may use these details to respond to my mentor-meeting request. If I’m under 18, a parent or guardian should submit this request with me.</span>
      </label>
      {attempted && !consent && <p className="mt-1 text-xs text-red-700">Please confirm consent to continue.</p>}

      {error && <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-red-700"><CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />We couldn’t send the request. Please retry, or email info@juniordream.com.</p>}

      <button type="submit" disabled={submitting} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition hover:bg-black/80 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        {submitting ? "Sending request…" : "Request a 20-minute meet"}
        {!submitting && <ArrowRight size={14} aria-hidden="true" />}
      </button>
      <p className="mb-0 mt-3 text-center text-[0.68rem] leading-5 text-black/40">We’ll contact you to agree a time. Submitting this form does not reserve a meeting slot.</p>
    </form>
  );
}

export function ProfessionalMentorMeetModal({
  courseName,
  isOpen,
  onClose,
}: {
  courseName: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-backdrop-enter fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="Close mentor conversation dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-[rgba(12,12,12,0.16)]"
      />

      <div className="popup-panel-enter relative w-full max-w-[1280px] rounded-[28px] border border-black/10 bg-[#efeeea] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-5">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            aria-label="Close mentor modal"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition hover:scale-105"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-6 rounded-[24px] bg-[#efeeea] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-[24px] border border-black/10 bg-[#efeeea] p-5 sm:p-6 lg:p-7">
            <p className="m-0 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-black/20 bg-white/80 text-[0.55rem] text-black/60">◌</span>
              A useful first conversation
            </p>

            <h2 className="mt-5 max-w-[420px] text-4xl font-light leading-[0.96] tracking-[-0.04em] text-black sm:text-[3.1rem]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Still Deciding Which Course Is Right For You?
            </h2>

            <p className="mt-6 max-w-[30rem] text-[1.05rem] leading-8 text-black/65">
              Request a focused 20-minute conversation. Share where you’re starting from, compare Data Analytics with Data Science, and ask anything about the course before applying.
            </p>

            <div className="mt-8 space-y-4">
              {[
                ["01", "Share your starting point", "Your education, current skills and what kind of work interests you."],
                ["02", "Explore the right direction", "Discuss course fit, learning path, projects and career possibilities."],
                ["03", "Agree a meeting time", "Tell us when you’re generally available; the team will contact you to confirm a slot."],
              ].map(([num, title, detail]) => (
                <div key={num} className="border-t border-black/10 pt-4">
                  <div className="flex gap-3">
                    <span className="pt-0.5 text-xs font-medium text-black/35">{num}</span>
                    <div>
                      <p className="m-0 text-[1.06rem] font-medium text-black">{title}</p>
                      <p className="mt-1 text-[0.98rem] leading-7 text-black/55">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[18px] border border-black/10 bg-[#f5f3f0] px-4 py-3 text-sm leading-6 text-black/55">
              No pressure and no job guarantees. This is a course-fit conversation; your meeting is confirmed only after the team contacts you.
            </div>
          </div>

          <div className="rounded-[24px] border border-black/10 bg-[#f7f6f3] p-5 sm:p-6 lg:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#efefeb] text-black/70">
                <MessageCircle size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="m-0 text-[1.9rem] font-light leading-tight tracking-[-0.04em] text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Request your mentor conversation
                </h3>
                <p className="m-0 mt-1 flex items-center gap-1.5 text-sm text-black/50">
                  <Clock size={14} aria-hidden="true" /> 20 minutes · no pressure · course-specific guidance
                </p>
              </div>
            </div>

            <div className="mt-6">
              <ProfessionalMentorMeetForm courseName={courseName} className="border-0 bg-transparent p-0 shadow-none sm:p-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
