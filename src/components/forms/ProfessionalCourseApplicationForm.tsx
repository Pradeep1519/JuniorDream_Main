import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { getProfessionalCourseBySlug } from "@/data/professionalCourses";
import { useAuth } from "@/components/auth/AuthProvider";
import { createProfessionalApplication } from "@/lib/professionalApplications";
import type { PaymentPlan } from "@/lib/paymentService";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;

type Step = 1 | 2 | 3 | 4;

interface FormState {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  educationLevel: string;
  college: string;
  degree: string;
  graduationYear: string;
  experienceLevel: string;
  technicalExperience: string;
  careerGoal: string;
}

const emptyForm: FormState = {
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  state: "",
  educationLevel: "",
  college: "",
  degree: "",
  graduationYear: "",
  experienceLevel: "",
  technicalExperience: "",
  careerGoal: "",
};

const steps = ["Basic info", "Education", "Your goals", "Review & payment"] as const;

function normalizeMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
}

function isValidIndianMobile(value: string) {
  const digits = normalizeMobile(value);
  return /^\d{10}$/.test(digits) && /^[6-9]/.test(digits);
}

function getFieldError(field: keyof FormState, value: string) {
  switch (field) {
    case "fullName":
      return value.trim().length >= 2 ? "" : "Please enter your full name.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.";
    case "mobile":
      return isValidIndianMobile(value) ? "" : "Enter a valid 10-digit mobile number starting with 6-9.";
    case "city":
      return value.trim().length >= 2 ? "" : "City is required.";
    case "state":
      return value.trim().length >= 2 ? "" : "State is required.";
    case "educationLevel":
      return value.trim().length >= 2 ? "" : "Education level is required.";
    case "college":
      return value.trim().length >= 2 ? "" : "College or university name is required.";
    case "degree":
      return value.trim().length >= 2 ? "" : "Degree or course name is required.";
    case "graduationYear":
      if (!/^\d{4}$/.test(value.trim())) return "Enter a valid 4-digit graduation year.";
      const year = Number(value.trim());
      const currentYear = new Date().getFullYear();
      return year >= 1980 && year <= currentYear + 8 ? "" : "Graduation year must be realistic.";
    case "experienceLevel":
      return value.trim().length >= 2 ? "" : "Please share your current experience level.";
    case "technicalExperience":
      return value.trim().length >= 2 ? "" : "Please tell us your technical background.";
    case "careerGoal":
      return value.trim().length >= 10 ? "" : "Tell us your career goal in a bit more detail.";
    default:
      return "";
  }
}

// Reusable for every professional course — which course is used only depends on the ?course= slug.
export function ProfessionalCourseApplicationForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const courseSlug = searchParams.get("course") ?? "";
  const course = getProfessionalCourseBySlug(courseSlug);

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [selectedPlan, setSelectedPlan] = useState<"full" | number>("full");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    fullName: false,
    email: false,
    mobile: false,
    city: false,
    state: false,
    educationLevel: false,
    college: false,
    degree: false,
    graduationYear: false,
    experienceLevel: false,
    technicalExperience: false,
    careerGoal: false,
  });

  const planOptions = useMemo((): PaymentPlan[] => {
    if (!course?.fee) return [];
    const full: PaymentPlan = { label: "Full Payment", amount: course.fee.amount, months: 1 };
    const emis = (course.emiOptions ?? []).map((emi) => ({ label: emi.label, amount: emi.amount, months: emi.months }));
    return [full, ...emis];
  }, [course]);

  const update = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setStepError(null);
  };

  if (!courseSlug || !course) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Professional application</p>
        <h1 className="mt-4 text-3xl font-light text-black" style={serif}>Choose a course to apply for.</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-black/60">
          Pick a professional program first, then come back here with its "Apply now" button so we know exactly which course your application is for.
        </p>
        <Link to="/professional/programs" className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white">
          Browse programs <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const step1Valid = !getFieldError("fullName", form.fullName)
    && !getFieldError("email", form.email)
    && !getFieldError("mobile", form.mobile)
    && !getFieldError("city", form.city)
    && !getFieldError("state", form.state);
  const currentYear = new Date().getFullYear();
  const step2Valid = !getFieldError("educationLevel", form.educationLevel)
    && !getFieldError("college", form.college)
    && !getFieldError("degree", form.degree)
    && !getFieldError("graduationYear", form.graduationYear);
  const step3Valid = !getFieldError("experienceLevel", form.experienceLevel)
    && !getFieldError("technicalExperience", form.technicalExperience)
    && !getFieldError("careerGoal", form.careerGoal);

  function continueTo(nextStep: Step, isValid: boolean) {
    if (!isValid) {
      setStepError(step === 1
        ? "Check your details: full name, valid email, 10-digit mobile number, city and state."
        : step === 2
          ? "Complete each education field and enter a valid graduation year."
          : "Tell us your experience level, technical background and career goal.");
      return;
    }
    setStepError(null);
    setStep(nextStep);
  }

  const selectedPlanLabel = selectedPlan === "full" ? "Full Payment" : planOptions.find((p) => p.months === selectedPlan)?.label ?? null;

  const markTouched = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  async function handleSubmit() {
    if (!course) return;
    setSubmitting(true);
    setError(null);
    try {
      const applicationId = await createProfessionalApplication(user?.uid ?? null, {
        fullName: form.fullName,
        email: form.email,
        mobile: normalizeMobile(form.mobile),
        city: form.city,
        state: form.state,
        educationLevel: form.educationLevel,
        college: form.college,
        degree: form.degree,
        graduationYear: form.graduationYear,
        courseId: course.slug,
        courseName: course.title,
        courseDuration: course.duration,
        courseFee: course.fee?.amount,
        emiPlan: selectedPlanLabel,
        experienceLevel: form.experienceLevel,
        technicalExperience: form.technicalExperience,
        careerGoal: form.careerGoal,
        sourcePage: `professional/programs/${course.slug}`,
      });

      navigate("/professional/apply/success", {
        state: {
          applicationId,
          courseName: course.title,
          courseDuration: course.duration,
          feeDisplay: course.fee?.display,
          emiPlan: selectedPlanLabel,
          paymentStatus: "pending",
        },
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-18">
      <div className="rounded-[28px] border border-[#F1EAE1] bg-[linear-gradient(180deg,#fffdfb_0%,#faf7f3_100%)] p-4 shadow-[0_16px_48px_rgba(20,18,16,0.02)] sm:p-6">
        <div className="flex flex-col gap-4 border-b border-[#F3EDE5] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/30">Professional application</p>
            <h1 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={serif}>Applying for: {course.title}</h1>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#F0E7DF] bg-white/70 px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-black/50 backdrop-blur-sm">
            <ShieldCheck size={12} aria-hidden="true" />
            Secure application
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-black/55">Share a few details so the course team can understand your background and help you take the next step with the right track, mentor guidance, and payment plan.</p>

        <ol aria-label="Application progress" className="mt-7 grid grid-cols-4 gap-2">
          {steps.map((label, index) => {
            const number = (index + 1) as Step;
            const complete = number < step;
            const current = number === step;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => { if (complete) { setStep(number); setStepError(null); } }}
                  aria-current={current ? "step" : undefined}
                  aria-label={`Step ${number}: ${label}${complete ? ", completed" : current ? ", current step" : ""}`}
                  disabled={!complete && !current}
                  className={`flex min-h-12 w-full items-center gap-2 border-b-2 text-left text-[0.65rem] font-medium transition sm:text-xs ${current ? "border-[#C7B19A] text-black" : complete ? "border-[#E8DECE] text-black/60" : "border-[#F2EAE1] text-black/35"} disabled:cursor-default`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.62rem] ${current ? "bg-[#1F1B18] text-white" : complete ? "bg-[#F0E8DF] text-black" : "bg-[#F7F3EE] text-black/50"}`}>{complete ? <Check size={13} aria-hidden="true" /> : number}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
      <div className="rounded-[26px] border border-[#F2EAE2] bg-[linear-gradient(180deg,#ffffff_0%,#fbf9f7_100%)] p-5 shadow-[0_12px_32px_rgba(25,20,16,0.015)] sm:p-7">
        {step === 1 && (
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Step 1 of 4 — Basic information</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" autoComplete="name" value={form.fullName} onChange={update("fullName")} onBlur={() => markTouched("fullName")} error={touched.fullName ? getFieldError("fullName", form.fullName) : ""} />
              <Field label="Email" type="email" autoComplete="email" value={form.email} onChange={update("email")} onBlur={() => markTouched("email")} error={touched.email ? getFieldError("email", form.email) : ""} />
              <Field label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={form.mobile} onChange={update("mobile")} onBlur={() => markTouched("mobile")} error={touched.mobile ? getFieldError("mobile", form.mobile) : ""} />
              <Field label="City" autoComplete="address-level2" value={form.city} onChange={update("city")} onBlur={() => markTouched("city")} error={touched.city ? getFieldError("city", form.city) : ""} />
              <Field label="State" autoComplete="address-level1" value={form.state} onChange={update("state")} onBlur={() => markTouched("state")} error={touched.state ? getFieldError("state", form.state) : ""} />
            </div>
            {stepError && <p role="alert" className="mt-4 text-sm text-red-700">{stepError}</p>}
            <StepFooter onNext={() => continueTo(2, step1Valid)} />
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Step 2 of 4 — Education</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Current education level" value={form.educationLevel} onChange={update("educationLevel")} onBlur={() => markTouched("educationLevel")} error={touched.educationLevel ? getFieldError("educationLevel", form.educationLevel) : ""} placeholder="e.g. Final year, Graduate" />
              <Field label="College / University" value={form.college} onChange={update("college")} onBlur={() => markTouched("college")} error={touched.college ? getFieldError("college", form.college) : ""} />
              <Field label="Course / Degree" value={form.degree} onChange={update("degree")} onBlur={() => markTouched("degree")} error={touched.degree ? getFieldError("degree", form.degree) : ""} />
              <Field label="Graduation year" inputMode="numeric" value={form.graduationYear} onChange={update("graduationYear")} onBlur={() => markTouched("graduationYear")} error={touched.graduationYear ? getFieldError("graduationYear", form.graduationYear) : ""} placeholder={`e.g. ${currentYear}`} />
            </div>
            {stepError && <p role="alert" className="mt-4 text-sm text-red-700">{stepError}</p>}
            <StepFooter onBack={() => { setStepError(null); setStep(1); }} onNext={() => continueTo(3, step2Valid)} />
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Step 3 of 4 — Course information</p>
            <div className="mt-4 rounded-[18px] border border-[#EFE5DA] bg-[#F9F6F2] p-4">
              <p className="m-0 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">Applying for</p>
              <p className="mt-1 text-base font-medium text-black">{course.title}</p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Current experience level" value={form.experienceLevel} onChange={update("experienceLevel")} onBlur={() => markTouched("experienceLevel")} error={touched.experienceLevel ? getFieldError("experienceLevel", form.experienceLevel) : ""} placeholder="e.g. Beginner, some exposure" />
              <Field label="Previous technical experience" value={form.technicalExperience} onChange={update("technicalExperience")} onBlur={() => markTouched("technicalExperience")} error={touched.technicalExperience ? getFieldError("technicalExperience", form.technicalExperience) : ""} placeholder="e.g. None, Excel only, some Python" />
              <Field label="Career goal" value={form.careerGoal} onChange={update("careerGoal")} onBlur={() => markTouched("careerGoal")} error={touched.careerGoal ? getFieldError("careerGoal", form.careerGoal) : ""} className="sm:col-span-2" />
            </div>
            {stepError && <p role="alert" className="mt-4 text-sm text-red-700">{stepError}</p>}
            <StepFooter onBack={() => { setStepError(null); setStep(2); }} onNext={() => continueTo(4, step3Valid)} />
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Step 4 of 4 — Confirmation</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Summary label="Applicant" value={form.fullName} />
              <Summary label="Course" value={course.title} />
              {course.duration && <Summary label="Duration" value={course.duration} />}
              {course.fee && <Summary label="Fee" value={course.fee.display} />}
            </dl>

            {planOptions.length > 0 && (
              <div className="mt-6">
                <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Choose a payment option</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {planOptions.map((plan) => {
                    const isSelected = selectedPlan === (plan.label === "Full Payment" ? "full" : plan.months);
                    return (
                      <button
                        key={plan.label}
                        type="button"
                        onClick={() => setSelectedPlan(plan.label === "Full Payment" ? "full" : plan.months)}
                        className={`rounded-[16px] border p-4 text-left transition ${isSelected ? "border-[#D9C9B4] bg-[#1F1B18] text-white shadow-[0_12px_28px_rgba(34,28,24,0.08)]" : "border-[#EFE3D7] bg-[#FBF9F6] text-black hover:border-[#DCC9B0]"}`}
                      >
                        <p className="m-0 text-xs font-medium uppercase tracking-[0.08em] opacity-70">{plan.label}</p>
                        <p className="mt-1 text-base font-medium">
                          {plan.months > 1 ? `₹${plan.amount.toLocaleString("en-IN")}/month × ${plan.months}` : `₹${plan.amount.toLocaleString("en-IN")}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {course.emiRule && <p className="mt-3 text-xs leading-5 text-black/45">{course.emiRule}</p>}
              </div>
            )}

            <div className="mt-6 rounded-[16px] border border-[#EDE3D8] bg-[#F9F7F4] p-4 text-xs leading-6 text-black/55">
              Payment gateway integration is coming soon. Submitting now records your application with a <span className="font-medium text-black/70">pending</span> payment status — our team will follow up to complete payment.
            </div>

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-7 flex items-center justify-between gap-3">
              <button type="button" onClick={() => { setStepError(null); setStep(3); }} className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black/50 hover:text-black">
                <ArrowLeft size={14} aria-hidden="true" /> Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-black/85 disabled:opacity-60"
              >
                {submitting ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
                {submitting ? "Submitting…" : "Submit application"}
              </button>
            </div>
          </div>
        )}
      </div>
      <aside className="rounded-[24px] border border-[#F3EBE2] bg-[linear-gradient(180deg,#fffdfb_0%,#f9f6f2_100%)] p-5 lg:sticky lg:top-24">
        <p className="m-0 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-black/40">Your selected program</p>
        <h2 className="mt-3 text-lg font-medium text-black">{course.title}</h2>
        <dl className="mt-5 space-y-4">
          {course.duration && <Summary label="Duration" value={course.duration} />}
          {course.fee && <Summary label="Course fee" value={course.fee.display} />}
          <Summary label="Application step" value={`${step} of 4`} />
        </dl>
        {course.emiOptions && course.emiOptions.length > 0 && <p className="mb-0 mt-5 border-t border-black/10 pt-4 text-xs leading-5 text-black/50">Payment options are shown for review before you submit. No payment is taken on this form.</p>}
      </aside>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, onBlur, type = "text", inputMode, autoComplete, placeholder, className = "", error = "" }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur?: () => void; type?: string; inputMode?: "text" | "tel" | "numeric"; autoComplete?: string; placeholder?: string; className?: string; error?: string }) {
  return (
    <label className={`block text-xs font-medium uppercase tracking-[0.08em] ${error ? "text-red-700" : "text-black/50"} ${className}`}>
      {label}
      <input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`mt-2 block w-full rounded-[12px] border bg-white/80 px-4 py-3 text-sm font-normal normal-case tracking-normal text-black outline-none transition focus-visible:ring-2 ${error ? "border-red-300 focus-visible:border-red-400 focus-visible:ring-red-200" : "border-[#F0E3D8] bg-[#fffdfb] focus-visible:border-[#CCB39A] focus-visible:ring-[#F5EBDD]"}`}
      />
      {error && <span className="mt-2 block text-[0.62rem] font-medium normal-case tracking-normal text-red-600">{error}</span>}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">{label}</dt>
      <dd className="mt-1 text-sm text-black/75">{value}</dd>
    </div>
  );
}

function StepFooter({ onBack, onNext }: { onBack?: () => void; onNext: () => void }) {
  return (
    <div className="mt-7 flex items-center justify-between gap-3">
      {onBack ? (
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black/50 hover:text-black">
          <ArrowLeft size={14} aria-hidden="true" /> Back
        </button>
      ) : <span />}
      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center gap-2 rounded-full bg-[#1e1b1a] px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#2b2624] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BFA0]"
      >
        Continue <ArrowRight size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
