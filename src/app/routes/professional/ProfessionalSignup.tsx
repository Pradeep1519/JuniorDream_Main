import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate } from "react-router";
import { ArrowLeft, ArrowRight, BookOpen, Check, Eye, EyeOff, LockKeyhole, Mail, Network, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { createProfessionalAccount } from "@/lib/account";
import { PROFESSIONAL_DASHBOARD_ROUTE, PROFESSIONAL_LOGIN_ROUTE } from "@/lib/professionalRoutes";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signupSteps = [
  { number: "01", title: "Choose your direction", description: "Explore professional courses and compare learning paths." },
  { number: "02", title: "Build with intention", description: "Review the curriculum, projects, and support for your chosen track." },
  { number: "03", title: "Move at your pace", description: "Keep your professional account ready for the next step." },
];

export function ProfessionalSignup() {
  const { user, profile, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [error, setError] = useState("");

  if (!loading && user && profile?.platform === "professional") {
    return <Navigate to={PROFESSIONAL_DASHBOARD_ROUTE} replace />;
  }

  const nameError = name.trim().length >= 2 ? "" : "Please enter your full name.";
  const emailError = !email.trim()
    ? "Please enter your email address."
    : emailPattern.test(email.trim())
      ? ""
      : "Please enter a valid email address.";
  const passwordError = password.length >= 8 ? "" : "Use at least 8 characters for your password.";
  const confirmPasswordError = password === confirmPassword ? "" : "Passwords do not match.";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setError("");
    if (nameError || emailError || passwordError || confirmPasswordError || !acceptedTerms) return;

    setSubmitting(true);
    try {
      await createProfessionalAccount(email.trim().toLowerCase(), password, name.trim());
      setAccountCreated(true);
    } catch (signupError) {
      const code = typeof signupError === "object" && signupError && "code" in signupError ? String(signupError.code) : "";
      if (code.includes("email-already-in-use")) {
        setError("An account already exists with this email. Please log in instead.");
      } else if (code.includes("weak-password")) {
        setError("Choose a stronger password with at least 8 characters.");
      } else if (code.includes("invalid-email")) {
        setError("Please enter a valid email address.");
      } else if (code.includes("network")) {
        setError("We couldn't connect right now. Please try again.");
      } else {
        setError("We couldn't create your account right now. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="professional-auth min-h-screen bg-[#F5F4F0] text-[#171717]">
      <header className="professional-auth__header bg-[#0A0A0A] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to="/professional" className="inline-flex min-w-0 items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-white no-underline sm:text-sm sm:tracking-[0.2em]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#D7B77A]"><Network size={17} aria-hidden="true" /></span>
            <span>Junior Dream <span className="text-[#D7B77A]">/</span> Professional</span>
          </Link>
          <Link to={PROFESSIONAL_LOGIN_ROUTE} className="inline-flex shrink-0 items-center gap-2 text-xs text-white/65 no-underline transition-colors hover:text-white sm:text-sm">
            <ArrowLeft size={14} aria-hidden="true" /> <span className="hidden sm:inline">Back to login</span><span className="sm:hidden">Login</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl items-center gap-6 px-4 py-7 sm:px-8 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <section className="relative overflow-hidden rounded-[26px] bg-[#10100F] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:p-9 lg:min-h-[650px] lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(184,134,11,0.22),transparent_42%)]" aria-hidden="true" />
          <div className="relative flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.17em] text-[#D7B77A]">
              <Sparkles size={13} aria-hidden="true" /> Your professional space
            </div>
            <h1 className="mt-8 max-w-lg text-4xl font-light leading-[1.08] sm:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Make room for what you want to become.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60 sm:text-base">
              Create an account to explore focused learning paths and keep your professional course journey in one place.
            </p>

            <div className="mt-8 border-t border-white/10">
              {signupSteps.map((step) => (
                <div key={step.number} className="grid grid-cols-[36px_1fr] gap-3 border-b border-white/10 py-4">
                  <span className="pt-0.5 text-[0.62rem] font-medium tracking-[0.12em] text-[#D7B77A]">{step.number}</span>
                  <div>
                    <h2 className="text-sm font-medium text-white">{step.title}</h2>
                    <p className="mt-1 text-xs leading-5 text-white/50">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/professional/programs" className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/75 no-underline transition-colors hover:text-white">
              Browse professional courses <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <div className="mt-8 hidden items-center gap-2 border-t border-white/10 pt-5 text-[0.65rem] uppercase tracking-[0.12em] text-white/40 lg:mt-auto lg:flex">
              <BookOpen size={14} aria-hidden="true" /> Clear information. Thoughtful decisions.
            </div>
          </div>
        </section>

        <section className="professional-auth__card w-full rounded-[26px] border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.07)] sm:p-8 lg:p-10" aria-labelledby="professional-signup-title">
          {accountCreated ? (
            <div className="py-8 text-center" role="status" aria-live="polite">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F6F1E7] text-[#98700B]"><Check size={23} aria-hidden="true" /></div>
              <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#98700B]">Account created</p>
              <h2 className="mt-3 text-3xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Your next step is ready.</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/55">We’re preparing your professional account. You’ll continue to your dashboard automatically.</p>
            </div>
          ) : (
            <>
              <div className="mb-7 border-b border-black/[0.07] pb-6">
                <p className="m-0 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#98700B]">Professional portal · Create account</p>
                <h2 id="professional-signup-title" className="mt-3 text-3xl font-light leading-tight sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>A considered start.</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-black/55">Use your details to set up your professional learning account.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="professional-signup-name" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-black/60">Full name</label>
                  <input id="professional-signup-name" type="text" autoComplete="name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} aria-invalid={attempted && Boolean(nameError)} aria-describedby={attempted && nameError ? "professional-signup-name-error" : undefined} placeholder="Your full name" className="auth-input" />
                  {attempted && nameError && <p id="professional-signup-name-error" className="mt-2 text-xs text-red-700">{nameError}</p>}
                </div>

                <div>
                  <label htmlFor="professional-signup-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-black/60">Email address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" size={16} aria-hidden="true" />
                    <input id="professional-signup-email" type="email" autoComplete="email" required value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} aria-invalid={attempted && Boolean(emailError)} aria-describedby={attempted && emailError ? "professional-signup-email-error" : undefined} placeholder="you@example.com" className="auth-input auth-input--with-icon" />
                  </div>
                  {attempted && emailError && <p id="professional-signup-email-error" className="mt-2 text-xs text-red-700">{emailError}</p>}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="professional-signup-password" className="text-xs font-medium uppercase tracking-[0.1em] text-black/60">Password</label>
                    <span className="text-[0.68rem] text-black/40">At least 8 characters</span>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" size={16} aria-hidden="true" />
                    <input id="professional-signup-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={attempted && Boolean(passwordError)} aria-describedby={attempted && passwordError ? "professional-signup-password-error" : undefined} placeholder="Create a password" className="auth-input auth-input--with-icon auth-input--with-action" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 text-xs text-black/55 hover:text-black" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}{showPassword ? "Hide" : "Show"}</button>
                  </div>
                  {attempted && passwordError && <p id="professional-signup-password-error" className="mt-2 text-xs text-red-700">{passwordError}</p>}
                </div>

                <div>
                  <label htmlFor="professional-signup-confirm-password" className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-black/60">Confirm password</label>
                  <input id="professional-signup-confirm-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} aria-invalid={attempted && Boolean(confirmPasswordError)} aria-describedby={attempted && confirmPasswordError ? "professional-signup-confirm-password-error" : undefined} placeholder="Enter your password again" className="auth-input" />
                  {attempted && confirmPasswordError && <p id="professional-signup-confirm-password-error" className="mt-2 text-xs text-red-700">{confirmPasswordError}</p>}
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-black/55">
                    <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#98700B]" />
                    <span>I agree to the <Link to="/terms" className="font-medium text-[#765708] underline underline-offset-2">Terms</Link> and <Link to="/privacy" className="font-medium text-[#765708] underline underline-offset-2">Privacy Policy</Link>.</span>
                  </label>
                  {attempted && !acceptedTerms && <p className="mt-2 text-xs text-red-700">Please accept the Terms and Privacy Policy to continue.</p>}
                </div>

                {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm leading-6 text-red-700">{error}</div>}
                <button type="submit" disabled={submitting} className="auth-primary inline-flex items-center justify-center gap-2">
                  {submitting ? "Creating account..." : "Create professional account"}
                  {!submitting && <ArrowRight size={15} aria-hidden="true" />}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-black/55">Already have an account? <Link to={PROFESSIONAL_LOGIN_ROUTE} className="font-medium text-[#765708] underline underline-offset-4">Log in</Link></p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProfessionalSignup;