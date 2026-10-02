import { cloneElement, isValidElement, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { deleteUser } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Check, UserRound, UsersRound } from "lucide-react";
import { Button } from "@/components/common/Button";
import { db } from "@/lib/firebase";
import { createApplicantAccount, makeApplicationId, saveApplicantRecords } from "@/lib/account";
import type { ApplicantType } from "@/lib/account";

const inputClass = "w-full rounded-md border border-border bg-input-background px-4 py-3 text-sm outline-none transition focus:border-black/50 focus:ring-2 focus:ring-black/10";
const labelClass = "mb-2 block text-sm font-medium";

type FormStatus = "idle" | "submitting" | "error";
type FieldName = "applicantName" | "studentName" | "fatherName" | "motherName" | "email" | "password" | "mobile" | "alternateMobile" | "dob" | "gender" | "classApplying" | "address";

const initialForm = {
  userType: "" as ApplicantType | "",
  applicantName: "",
  studentName: "",
  dob: "",
  gender: "",
  fatherName: "",
  motherName: "",
  classApplying: "",
  previousSchool: "",
  mobile: "",
  alternateMobile: "",
  email: "",
  password: "",
  address: "",
  howHeard: "",
  referralCode: "",
  agreedTerms: false,
  location: "",
};

function validateField(name: FieldName, value: string) {
  const cleaned = value.trim();
  if (name === "applicantName" && cleaned.length < 2) return "Please enter your name.";
  if (name === "studentName" && cleaned.length < 2) return "Please enter the student’s name.";
  if ((name === "fatherName" || name === "motherName") && cleaned.length < 2) return "Please enter a name.";
  if (name === "email" && !/^\S+@\S+\.\S+$/.test(cleaned)) return "Please enter a valid email address.";
  if (name === "password" && value.length < 8) return "Use at least 8 characters for the account password.";
  if (name === "mobile" && !/^[6-9]\d{9}$/.test(value)) return "Please enter a valid 10-digit Indian mobile number.";
  if (name === "alternateMobile" && value && !/^[6-9]\d{9}$/.test(value)) return "Please enter a valid 10-digit Indian mobile number.";
  if (name === "classApplying" && !cleaned) return "Please select a class.";
  if (name === "dob" && !cleaned) return "Please enter the student's date of birth.";
  if (name === "gender" && !cleaned) return "Please select an option.";
  if (name === "address" && cleaned.length < 5) return "Please enter your residential address.";
  return "";
}

export function ApplicationForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const stream = searchParams.get("stream") || "engineering";
  const prefilledBatch = searchParams.get("batch") || "";
  const prefilledClass = searchParams.get("class") || "";
  const prefilledTier = searchParams.get("tier") || "";
  const isInterestRegistration = stream === "medical" || stream === "civil-services";
  const collectionName = stream === "medical" ? "medical_interests" : stream === "civil-services" ? "civil_services_interests" : "applications";
  const prefix = stream === "medical" ? "MD" : stream === "civil-services" ? "CS" : "JR";
  const [formData, setFormData] = useState(() => ({ ...initialForm, classApplying: prefilledClass }));
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submissionLock = useRef(false);

  const getPasswordStrength = (value: string) => {
    const length = value.length;
    const hasLetter = /[a-z]/i.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[^a-zA-Z0-9]/.test(value);
    const score = [hasLetter, hasNumber, hasSymbol, length >= 8].filter(Boolean).length;
    if (!value) return { label: "", tone: "bg-transparent", width: "0%" };
    if (score <= 2) return { label: "Weak", tone: "bg-red-500", width: "35%" };
    if (score === 3) return { label: "Medium", tone: "bg-amber-500", width: "70%" };
    return { label: "Strong", tone: "bg-emerald-600", width: "100%" };
  };
  const passwordStrength = getPasswordStrength(formData.password);

  const updateField = (name: keyof typeof initialForm, value: string | boolean) => {
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const fieldError = (name: FieldName) => touched[name] || attempted ? validateField(name, formData[name]) : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionLock.current) return;
    setAttempted(true);
    setErrorMessage("");

    if (!formData.userType) {
      setErrorMessage("Please select whether you are a Student or Parent.");
      document.getElementById("applicant-type")?.focus();
      return;
    }

    const requiredFields: FieldName[] = isInterestRegistration
      ? ["applicantName", ...(formData.userType === "parent" ? ["studentName" as const] : []), "mobile", "classApplying"]
      : ["applicantName", ...(formData.userType === "parent" ? ["studentName" as const] : ["fatherName" as const, "motherName" as const]), "email", "password", "mobile", "classApplying", "dob", "gender", "address"];
    if (requiredFields.some((field) => validateField(field, formData[field]))) return;
    if (!isInterestRegistration && !formData.agreedTerms) {
      setErrorMessage("Please accept the terms to continue.");
      return;
    }
    if (isInterestRegistration && (!formData.location.trim() || !formData.agreedTerms)) {
      setErrorMessage("Please enter your location and accept the terms to continue.");
      return;
    }

    submissionLock.current = true;
    setStatus("submitting");
    try {
      if (isInterestRegistration) {
        const interestId = makeApplicationId(prefix);
        const applicantName = formData.applicantName.trim();
        const studentName = formData.userType === "student" ? applicantName : formData.studentName.trim();
        await setDoc(doc(db, collectionName, interestId), {
          interestId,
          userType: formData.userType,
          applicantName,
          studentName,
          classApplying: formData.classApplying,
          mobile: `+91${formData.mobile}`,
          email: formData.email.trim().toLowerCase() || null,
          location: formData.location.trim(),
          stream,
          status: "interest_registered",
          agreedTerms: formData.agreedTerms,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        navigate("/application-success", {
          state: {
            interest: true,
            applicationId: interestId,
            applicantName,
            studentName,
            userType: formData.userType,
            classApplying: formData.classApplying,
            stream,
          },
        });
        return;
      }

      const accountUser = await createApplicantAccount(formData.email.trim().toLowerCase(), formData.password, formData.applicantName.trim());
      try {
        const applicantName = formData.applicantName.trim();
        const studentName = formData.userType === "student" ? applicantName : formData.studentName.trim();
        const applicationId = makeApplicationId(prefix);
        const streamTitle = stream === "engineering" ? "Engineering" : stream;
        const profile = {
          name: applicantName,
          email: formData.email.trim().toLowerCase(),
          mobile: `+91${formData.mobile}`,
          userType: formData.userType,
          studentName,
          classApplying: formData.classApplying,
          previousSchool: formData.previousSchool.trim() || null,
          stream,
          batchLevel: prefilledBatch || null,
          tier: prefilledTier || null,
        };
        const application = {
          applicationId,
          applicantName,
          studentName,
          userType: formData.userType,
          dob: formData.dob || null,
          gender: formData.gender || null,
          fatherName: formData.fatherName.trim() || null,
          motherName: formData.motherName.trim() || null,
          stream,
          streamTitle,
          classApplying: formData.classApplying,
          batchLevel: prefilledBatch || null,
          tier: prefilledTier || null,
          previousSchool: formData.previousSchool.trim() || null,
          mobile: `+91${formData.mobile}`,
          alternateMobile: formData.alternateMobile ? `+91${formData.alternateMobile}` : null,
          email: formData.email.trim().toLowerCase(),
          address: formData.address.trim(),
          howHeard: formData.howHeard || null,
          referralCode: formData.referralCode.trim() || null,
          agreedTerms: formData.agreedTerms,
        };
        await saveApplicantRecords(accountUser, applicationId, profile, application);
        navigate("/application-success", {
          state: {
            applicationId,
            applicantName,
            studentName,
            userType: formData.userType,
            classApplying: formData.classApplying,
            stream,
            streamTitle,
            batchLevel: prefilledBatch || null,
            tier: prefilledTier || null,
            status: "new",
          },
        });
      } catch {
        await deleteUser(accountUser).catch(() => undefined);
        setErrorMessage("Your application could not be saved. Please retry; if this continues, contact Junior Dream for help.");
        setStatus("error");
      }
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
      setErrorMessage(code.includes("email-already-in-use")
        ? "An account already exists for this email. Sign in to continue or use another email."
        : "We could not submit your application. Please check your details and try again.");
      setStatus("error");
    } finally {
      submissionLock.current = false;
      setStatus((current) => current === "submitting" ? "idle" : current);
    }
  };

  const nameLabel = formData.userType === "parent" ? "Parent / Guardian Name" : "Student's Full Name";
  const passwordLabel = "Create password";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {(prefilledBatch || prefilledClass) && (
        <div className="rounded-md bg-secondary px-4 py-3 text-sm">
          Applying for: <strong>{prefilledBatch || "Engineering"}</strong>{prefilledClass && ` (Class ${prefilledClass})`}{prefilledTier && ` — ${prefilledTier} Plan`}
        </div>
      )}
      {isInterestRegistration && (
        <div className="rounded-md border border-black/10 bg-[#F8F8F6] px-4 py-3 text-sm">
          Registering interest for: <strong>{stream === "medical" ? "Medical Foundations" : "Civil Services Leadership"}</strong>
        </div>
      )}

      <fieldset className="m-0 border-0 p-0" id="applicant-type">
        <legend className={labelClass}>Are you a? <span className="text-red-700">*</span></legend>
        <div className="grid grid-cols-2 gap-3">
          {([
            ["student", "Student", UserRound],
            ["parent", "Parent", UsersRound],
          ] as const).map(([value, label, Icon]) => {
            const selected = formData.userType === value;
            return (
              <button key={value} type="button" onClick={() => updateField("userType", value)} aria-pressed={selected} className={`flex min-h-14 items-center justify-between border px-4 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${selected ? "border-black bg-black text-white" : "border-black/15 bg-white text-black/65 hover:border-black/40"}`}>
                <span className="flex items-center gap-2"><Icon size={17} aria-hidden="true" />{label}</span>
                {selected && <Check size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        {attempted && !formData.userType && <p className="mt-2 text-xs text-red-700">Please select whether you are a Student or Parent.</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`${nameLabel} *`} error={fieldError("applicantName")}>
          <input name="applicantName" autoComplete="name" value={formData.applicantName} onChange={(event) => updateField("applicantName", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, applicantName: true }))} placeholder={formData.userType === "parent" ? "Parent / guardian name" : "Student name"} className={inputClass} maxLength={100} />
        </Field>
        {formData.userType === "parent" && <Field label="Child / Student Name *" error={fieldError("studentName")}>
          <input name="studentName" value={formData.studentName} onChange={(event) => updateField("studentName", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, studentName: true }))} placeholder="Student's full name" className={inputClass} maxLength={100} />
        </Field>}
        <Field label={`Email Address${isInterestRegistration ? "" : " *"}`} error={isInterestRegistration ? undefined : fieldError("email")}>
          <input type="email" name="email" autoComplete="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, email: true }))} placeholder="you@example.com" className={inputClass} maxLength={254} />
        </Field>
        {!isInterestRegistration && (
          <Field label={`${passwordLabel} *`} error={fieldError("password")}>
            <div>
              <input type="password" name="password" autoComplete="new-password" value={formData.password} onChange={(event) => updateField("password", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, password: true }))} placeholder="At least 8 characters" className={inputClass} minLength={8} />
              {formData.password && (
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-[0.12em] text-black/50">
                    <span>Password strength</span>
                    <span>{passwordStrength.label}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/5">
                    <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.tone}`} style={{ width: passwordStrength.width }} />
                  </div>
                </div>
              )}
            </div>
          </Field>
        )}
        <Field label="Mobile Number *" error={fieldError("mobile")}>
          <div className="flex">
            <span className="flex items-center border border-r-0 border-border bg-[#F6F6F4] px-3 text-sm text-black/50">+91</span>
            <input type="tel" inputMode="numeric" autoComplete="tel-national" name="mobile" value={formData.mobile} onChange={(event) => updateField("mobile", event.target.value.replace(/\D/g, "").slice(0, 10))} onBlur={() => setTouched((previous) => ({ ...previous, mobile: true }))} placeholder="10-digit number" className={`${inputClass} rounded-l-none`} maxLength={10} />
          </div>
        </Field>
        <Field label="Class Applying For *" error={fieldError("classApplying")}>
          <select name="classApplying" value={formData.classApplying} onChange={(event) => updateField("classApplying", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, classApplying: true }))} className={inputClass}>
            <option value="">Select class</option>
            {[6, 7, 8, 9, 10, 11, 12].map((grade) => <option key={grade} value={String(grade)}>Class {grade}</option>)}
          </select>
        </Field>
        {!isInterestRegistration && <>
          <Field label="Date of Birth *" error={fieldError("dob")}>
            <input type="date" name="dob" value={formData.dob} onChange={(event) => updateField("dob", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, dob: true }))} className={inputClass} />
          </Field>
          <Field label="Gender *" error={fieldError("gender")}>
            <select name="gender" value={formData.gender} onChange={(event) => updateField("gender", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, gender: true }))} className={inputClass}>
              <option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
          </Field>
          {formData.userType === "student" && <>
            <Field label="Father's Name *" error={fieldError("fatherName")}>
              <input name="fatherName" value={formData.fatherName} onChange={(event) => updateField("fatherName", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, fatherName: true }))} className={inputClass} />
            </Field>
            <Field label="Mother's Name *" error={fieldError("motherName")}>
              <input name="motherName" value={formData.motherName} onChange={(event) => updateField("motherName", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, motherName: true }))} className={inputClass} />
            </Field>
          </>}
          <Field label="Previous School" error={undefined}>
            <input name="previousSchool" value={formData.previousSchool} onChange={(event) => updateField("previousSchool", event.target.value)} className={inputClass} />
          </Field>
        </>}
        <Field label="Alternate Number" error={fieldError("alternateMobile")}>
          <div className="flex">
            <span className="flex items-center border border-r-0 border-border bg-[#F6F6F4] px-3 text-sm text-black/50">+91</span>
            <input type="tel" inputMode="numeric" name="alternateMobile" value={formData.alternateMobile} onChange={(event) => updateField("alternateMobile", event.target.value.replace(/\D/g, "").slice(0, 10))} onBlur={() => setTouched((previous) => ({ ...previous, alternateMobile: true }))} placeholder="Optional" className={`${inputClass} rounded-l-none`} maxLength={10} />
          </div>
        </Field>
      </div>

      {isInterestRegistration ? (
        <Field label="Location *" error={attempted && !formData.location.trim() ? "Please enter your location." : undefined}>
          <input name="location" value={formData.location} onChange={(event) => updateField("location", event.target.value)} placeholder="City, State" className={inputClass} />
        </Field>
      ) : <>
        <Field label="Full Residential Address *" error={fieldError("address")}>
          <textarea name="address" rows={3} value={formData.address} onChange={(event) => updateField("address", event.target.value)} onBlur={() => setTouched((previous) => ({ ...previous, address: true }))} className={`${inputClass} resize-y`} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="How did you hear about us?" error={undefined}>
            <select name="howHeard" value={formData.howHeard} onChange={(event) => updateField("howHeard", event.target.value)} className={inputClass}>
              <option value="">Select</option><option value="social_media">Social Media</option><option value="friend_family">Friend/Family</option><option value="newspaper">Newspaper</option><option value="other">Other</option>
            </select>
          </Field>
          <Field label="Referral Code (if any)" error={undefined}>
            <input name="referralCode" value={formData.referralCode} onChange={(event) => updateField("referralCode", event.target.value)} placeholder="Optional" className={inputClass} />
          </Field>
        </div>
      </>}

      <label className="flex items-start gap-3 text-sm leading-6 text-foreground/70">
        <input type="checkbox" name="agreedTerms" checked={formData.agreedTerms} onChange={(event) => updateField("agreedTerms", event.target.checked)} className="mt-1 h-4 w-4 accent-black" />
        <span>I declare the information is correct and agree to the <Link to="/terms" className="text-black underline underline-offset-2">Terms of Service</Link> and <Link to="/privacy" className="text-black underline underline-offset-2">Privacy Policy</Link>.</span>
      </label>

      {errorMessage && <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting Application..." : isInterestRegistration ? "Register Interest" : "Submit Application"}
      </Button>
      {!isInterestRegistration && <p className="m-0 text-center text-xs text-black/45">Your account will let you return to your application dashboard. Application submission does not enroll you in a course.</p>}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  const id = `application-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
      id,
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? `${id}-error` : undefined,
    })
    : children;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>{label}</label>
      {control}
      {error && <p id={`${id}-error`} className="mb-0 mt-1.5 text-xs text-red-700">{error}</p>}
    </div>
  );
}