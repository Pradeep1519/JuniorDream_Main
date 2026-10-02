import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Network, Sparkles } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  PROFESSIONAL_APPLICATION_ROUTE,
  PROFESSIONAL_DASHBOARD_ROUTE,
  PROFESSIONAL_FORGOT_PASSWORD_ROUTE,
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
  const [submitting, setSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (!loading && user && !isForgotPassword && profile?.platform === "professional") return <Navigate to={PROFESSIONAL_DASHBOARD_ROUTE} replace />;

  const validateEmail = () => {
    if (!email.trim() || !emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!validateEmail()) return;
    if (!password) {
      setError("Please enter your password.");
      return;
    }

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
    <div className="professional-auth min-h-screen overflow-x-hidden bg-[#080B10] text-white">
      <div className="professional-auth__grid pointer-events-none fixed inset-0" aria-hidden="true" />
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="professional-auth__visual relative flex min-h-[430px] flex-col justify-between overflow-hidden px-6 py-8 sm:px-10 lg:min-h-screen lg:px-16 lg:py-12">
          <div className="professional-auth__network pointer-events-none absolute inset-0" aria-hidden="true">
            <span className="professional-auth__node professional-auth__node--one" />
            <span className="professional-auth__node professional-auth__node--two" />
            <span className="professional-auth__node professional-auth__node--three" />
            <span className="professional-auth__node professional-auth__node--four" />
          </div>
          <div className={`relative z-10 professional-auth__reveal ${reduceMotion ? "professional-auth__reveal--ready" : ""}`}>
            <Link to="/professional" className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-white/70 no-underline">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5"><Network size={15} aria-hidden="true" /></span>
              Junior Dream / Professional
            </Link>
          </div>
          <div className={`relative z-10 max-w-xl professional-auth__reveal professional-auth__reveal--delay ${reduceMotion ? "professional-auth__reveal--ready" : ""}`}>
            <div className="mb-5 flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[#8CB9FF]"><Sparkles size={14} aria-hidden="true" /> Career-ready learning</div>
            <h1 className="max-w-lg text-5xl font-light leading-[0.98] sm:text-7xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Learn. Build. Become industry ready.</h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-base">Build practical technology skills that move your career forward.</p>
            <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/40"><span className="h-px w-12 bg-white/25" /> Data, software, cloud & AI</div>
          </div>
          <div className="relative z-10 hidden text-[0.65rem] uppercase tracking-[0.18em] text-white/35 lg:block">A focused space for your next chapter.</div>
        </section>

        <section className="flex items-center bg-[#F4F5F1] px-5 py-10 text-[#101317] sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md rounded-[28px] border border-black/10 bg-white/90 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-9">
            <div className="mb-9 flex items-center justify-between gap-4">
              <div><p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-black/40">Junior Dream Pro</p><p className="mt-2 text-xs text-black/45">Your professional learning space</p></div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B0E13] text-white"><LockKeyhole size={16} aria-hidden="true" /></div>
            </div>

            {isForgotPassword ? (
              resetSent ? (
                <div className="space-y-5" role="status"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F2EA] text-[#1D6B43]"><Check size={22} aria-hidden="true" /></div><h2 className="text-3xl font-light">Check your inbox.</h2><p className="text-sm leading-7 text-black/60">We sent a password reset link if an account exists for this email.</p><Link to="/professional/login" className="inline-flex items-center gap-2 text-sm font-medium text-black underline underline-offset-4">Back to login <ArrowRight size={14} aria-hidden="true" /></Link></div>
              ) : (
                <form onSubmit={handleReset} noValidate className="space-y-5"><p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-black/40">Account recovery</p><h1 className="text-3xl font-light">Reset your password</h1><p className="text-sm leading-7 text-black/60">Enter your professional account email and we will send a reset link.</p><FieldEmail value={email} onChange={setEmail} /><ErrorMessage message={error} /><button type="submit" disabled={resetBusy} className="auth-primary">{resetBusy ? "Sending link..." : "Send reset link"}</button><Link to="/professional/login" className="block text-center text-sm text-black/55 underline underline-offset-4">Back to login</Link></form>
              )
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div><p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-black/40">Welcome back</p><h1 className="mt-3 text-4xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Welcome back.</h1><p className="mt-3 text-sm leading-7 text-black/60">Log in to continue your professional learning journey.</p></div>
                <FieldEmail value={email} onChange={setEmail} />
                <div><div className="mb-2 flex items-center justify-between"><label htmlFor="professional-password" className="text-xs font-medium uppercase tracking-[0.12em] text-black/60">Password</label><button type="button" onClick={() => setShowPassword((value) => !value)} className="inline-flex items-center gap-1 text-xs text-black/55 hover:text-black" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}{showPassword ? "Hide" : "Show"}</button></div><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" size={16} aria-hidden="true" /><input id="professional-password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="auth-input pl-10 pr-4" /></div></div>
                <div className="flex items-center justify-between gap-3 text-sm"><label className="inline-flex items-center gap-2 text-black/55"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-[#0B0E13]" /> Remember me</label><Link to={PROFESSIONAL_FORGOT_PASSWORD_ROUTE} className="font-medium text-black underline underline-offset-4">Forgot Password?</Link></div>
                <ErrorMessage message={error} />
                <button type="submit" disabled={submitting} className="auth-primary">{submitting ? "Logging in..." : "Log In"}</button>
                <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-black/30"><span className="h-px flex-1 bg-black/10" /> or <span className="h-px flex-1 bg-black/10" /></div>
                <button type="button" disabled className="auth-google" title="Google sign-in will be available soon"><span className="inline-flex items-center gap-3"><GoogleMark /> Continue with Google</span><span className="text-[0.65rem] text-black/35">Coming soon</span></button>
                <p className="pt-2 text-center text-sm text-black/55">Don't have an account? <Link to={PROFESSIONAL_APPLICATION_ROUTE} className="font-medium text-black underline underline-offset-4">Apply / Create Account</Link></p>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function GoogleMark() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.21Z" /><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.75Z" /><path fill="#FBBC05" d="M6.53 13.84A5.85 5.85 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.64H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.36l3.24-2.52Z" /><path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.22 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.71 5.39l3.24 2.52C7.3 7.85 9.46 6.13 12 6.13Z" /></svg>;
}

function FieldEmail({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div><label htmlFor="professional-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-black/60">Email</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" size={16} aria-hidden="true" /><input id="professional-email" type="email" autoComplete="email" required value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter your email" className="auth-input pl-10" /></div></div>;
}

function ErrorMessage({ message }: { message: string }) {
  return message ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm leading-6 text-red-700">{message}</div> : null;
}