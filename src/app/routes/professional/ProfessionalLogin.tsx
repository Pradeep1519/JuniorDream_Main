import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Network, Sparkles } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  PROFESSIONAL_APPLICATION_ROUTE,
  PROFESSIONAL_DASHBOARD_ROUTE,
  PROFESSIONAL_FORGOT_PASSWORD_ROUTE,
  PROFESSIONAL_SIGNUP_ROUTE,
} from "@/lib/professionalRoutes";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProfessionalLogin() {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  const isForgotPassword = location.pathname === "/professional/forgot-password";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  if (!loading && user && !isForgotPassword && profile?.platform === "professional") return <Navigate to={PROFESSIONAL_DASHBOARD_ROUTE} replace />;

  const validateEmail = () => {
    setEmailTouched(true);
    return !getEmailError(email);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setEmailTouched(true);
    setPasswordTouched(true);
    if (getEmailError(email) || !password) return;

    setSubmitting(true);
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    } catch (loginError) {
      const code = typeof loginError === "object" && loginError && "code" in loginError ? String(loginError.code) : "";
      if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
        setError("The email or password you entered is incorrect.");
      } else if (code.includes("network")) {
        setError("We couldn't connect right now. Please try again.");
      } else {
        setError("We couldn't sign you in right now. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!validateEmail()) return;
    setResetBusy(true);
    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setResetSent(true);
    } catch (resetError) {
      const code = typeof resetError === "object" && resetError && "code" in resetError ? String(resetError.code) : "";
      setError(code.includes("network") ? "We couldn't connect right now. Please try again." : "We couldn't send a reset email right now. Please try again.");
    } finally {
      setResetBusy(false);
    }
  };

  return (
    <div className="professional-auth min-h-screen bg-[#F8F8F6] text-[#171717]">
      <header className="professional-auth__header bg-[#0A0A0A] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link to="/professional" className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white no-underline sm:text-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#D7B77A]"><Network size={17} aria-hidden="true" /></span>
            <span>Junior Dream <span className="text-[#D7B77A]">/</span> Professional</span>
          </Link>
          <Link to="/professional" className="inline-flex items-center gap-2 text-xs text-white/65 no-underline transition-colors hover:text-white sm:text-sm">
            <ArrowLeft size={14} aria-hidden="true" /> <span className="hidden sm:inline">Back to website</span><span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl flex-col items-center px-4 py-10 sm:px-8 sm:py-16">
        <div className="professional-auth__card w-full max-w-xl rounded-[26px] border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(0,0,0,0.08)] sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-black/[0.07] pb-6">
            <div>
              <p className="m-0 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#98700B]">Professional portal</p>
              <p className="mt-2 text-xs text-black/50">Your next chapter starts here</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F6F1E7] text-[#98700B]"><LockKeyhole size={17} aria-hidden="true" /></div>
          </div>

          {isForgotPassword ? (
            resetSent ? (
              <div className="space-y-5" role="status">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F2EA] text-[#1D6B43]"><Check size={22} aria-hidden="true" /></div>
                <h1 className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Check your inbox.</h1>
                <p className="text-sm leading-7 text-black/60">We sent a password reset link if an account exists for this email.</p>
                <Link to="/professional/login" className="inline-flex items-center gap-2 text-sm font-medium text-[#765708] underline underline-offset-4">Back to login <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
            ) : (
              <form onSubmit={handleReset} noValidate className="space-y-6">
                <div><p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-black/40">Account recovery</p><h1 className="mt-3 text-3xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Reset your password</h1><p className="mt-3 text-sm leading-7 text-black/60">Enter your professional account email and we will send a reset link.</p></div>
                <FieldEmail value={email} error={emailTouched ? getEmailError(email) : ""} onBlur={() => setEmailTouched(true)} onChange={(value) => { setEmail(value); setError(""); }} />
                <ErrorMessage message={error} />
                <button type="submit" disabled={resetBusy} className="auth-primary">{resetBusy ? "Sending link..." : "Send reset link"}</button>
                <Link to="/professional/login" className="block text-center text-sm text-black/55 underline underline-offset-4">Back to login</Link>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="mb-7">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#F8F5EE] px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-[#80600E]"><Sparkles size={12} aria-hidden="true" /> Career-ready learning</div>
                <h1 className="text-4xl font-light leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Welcome back.</h1>
                <p className="mt-3 text-sm leading-6 text-black/55">Sign in to continue your professional learning journey.</p>
              </div>
              <FieldEmail
                value={email}
                error={emailTouched ? getEmailError(email) : ""}
                onBlur={() => setEmailTouched(true)}
                onChange={(value) => {
                  setEmail(value);
                  setError("");
                }}
              />
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="professional-password" className="text-xs font-medium text-black/65">Password</label>
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="inline-flex items-center gap-1 text-xs text-black/55 hover:text-black" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}{showPassword ? "Hide" : "Show"}</button>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" size={16} aria-hidden="true" />
                  <input
                    id="professional-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    aria-invalid={passwordTouched && !password}
                    aria-describedby={passwordTouched && !password ? "professional-password-error" : undefined}
                    value={password}
                    onBlur={() => setPasswordTouched(true)}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="auth-input auth-input--with-icon"
                  />
                </div>
                {passwordTouched && !password && <p id="professional-password-error" className="mt-2 text-xs text-red-700">Please enter your password.</p>}
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="inline-flex cursor-pointer items-center gap-2 text-black/55"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-[#98700B]" /> Remember me</label>
                <Link to={PROFESSIONAL_FORGOT_PASSWORD_ROUTE} className="font-medium text-[#765708] underline underline-offset-4">Forgot password?</Link>
              </div>
              <ErrorMessage message={error} />
              <button type="submit" disabled={submitting} className="auth-primary">{submitting ? "Signing in..." : "Sign in to your account"}</button>
              <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-black/30"><span className="h-px flex-1 bg-black/10" /> or <span className="h-px flex-1 bg-black/10" /></div>
              <button type="button" disabled className="auth-google" title="Google sign-in will be available soon"><span className="inline-flex items-center gap-3"><GoogleMark /> Continue with Google</span><span className="text-[0.65rem] text-black/35">Coming soon</span></button>
              <p className="pt-2 text-center text-sm text-black/55">New to Junior Dream? <Link to={PROFESSIONAL_SIGNUP_ROUTE} className="font-medium text-[#765708] underline underline-offset-4">Create an account</Link></p>
              <p className="text-center text-xs text-black/45">Ready to enroll in a course? <Link to={PROFESSIONAL_APPLICATION_ROUTE} className="font-medium text-[#765708] underline underline-offset-4">Apply here</Link></p>
            </form>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-black/40">A focused space for your next professional chapter.</p>
      </main>
    </div>
  );
}

function GoogleMark() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.21Z" /><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.75Z" /><path fill="#FBBC05" d="M6.53 13.84A5.85 5.85 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.64H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.52Z" /><path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.22 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.71 5.39l3.24 2.52C7.3 7.85 9.46 6.13 12 6.13Z" /></svg>;
}

function getEmailError(value: string) {
  if (!value.trim()) return "Please enter your email address.";
  if (!emailPattern.test(value.trim())) return "Please enter a valid email address.";
  return "";
}

function FieldEmail({ value, error, onChange, onBlur }: { value: string; error: string; onChange: (value: string) => void; onBlur: () => void }) {
  return (
    <div>
      <label htmlFor="professional-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-black/60">Email</label>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" size={16} aria-hidden="true" />
        <input
          id="professional-email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "professional-email-error" : undefined}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your email"
          className="auth-input auth-input--with-icon"
        />
      </div>
      {error && <p id="professional-email-error" className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return message ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm leading-6 text-red-700">{message}</div> : null;
}