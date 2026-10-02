import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/auth/AuthProvider";
import { getTimeGreeting } from "@/lib/greeting";

export function Login() {
  const { user, profile, loading, profileLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isForgotPasswordRoute = location.pathname === "/forgot-password";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  const [resetError, setResetError] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const requestedPath = searchParams.get("returnTo") || "/dashboard";
  const returnTo = requestedPath.startsWith("/") && !requestedPath.startsWith("//") ? requestedPath : "/dashboard";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (!loading && user && !profileLoading && profile) return <Navigate to={returnTo} replace state={location.state} />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    } catch (loginError) {
      const code = typeof loginError === "object" && loginError && "code" in loginError ? String(loginError.code) : "";
      if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
        setError("We couldn’t sign you in with those details. Please check your email and password and try again.");
      } else if (code.includes("too-many-requests")) {
        setError("Too many attempts have been made. Please wait a moment and try again.");
      } else {
        setError("We couldn’t sign you in right now. Please try again in a moment.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setResetError("Please enter your email address.");
      return;
    }

    setResetBusy(true);
    setResetError("");
    try {
      await sendPasswordResetEmail(auth, trimmedEmail.toLowerCase());
      setResetSent(true);
    } catch (resetError) {
      const code = typeof resetError === "object" && resetError && "code" in resetError ? String(resetError.code) : "";
      if (code.includes("user-not-found")) {
        setResetError("We couldn’t find an account for that email. Please check the address or create a new application.");
      } else if (code.includes("invalid-email")) {
        setResetError("Please enter a valid email address.");
      } else if (code.includes("too-many-requests")) {
        setResetError("Too many password reset requests were sent. Please wait a little while and try again.");
      } else {
        setResetError("We couldn’t send a reset email right now. Please try again in a moment.");
      }
    } finally {
      setResetBusy(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#F7F7F5] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-[#D9EAF5] opacity-50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#E9E1D4] opacity-60 blur-3xl" />
        <div className="absolute left-1/3 top-1/3 h-28 w-28 rounded-full border border-black/10 bg-white/70" />
        <div className="absolute right-1/4 top-1/4 h-20 w-20 rotate-12 border border-black/10 bg-white/80" />
      </div>

      <div className={`relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr] ${reduceMotion ? "" : "animate-[fadeInUp_0.6s_ease-out]"}`}>
        <section className="relative flex items-center justify-center overflow-hidden rounded-[30px] border border-black/10 bg-[#121212] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.12)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_38%),linear-gradient(135deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0))]" />
          <div className="relative z-10 w-full max-w-xl">
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/80 ${reduceMotion ? "" : "animate-[fadeInUp_0.8s_ease-out]"}`}>
              <Sparkles size={12} aria-hidden="true" />
              Junior Dream Account
            </div>
            <h1 className={`text-4xl font-light leading-tight text-white md:text-5xl ${reduceMotion ? "" : "animate-[fadeInUp_0.9s_ease-out]"}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Your journey starts here.
            </h1>
            <p className={`mt-5 max-w-md text-sm leading-7 text-white/70 md:text-base ${reduceMotion ? "" : "animate-[fadeInUp_1.1s_ease-out]"}`}>
              Access your account, continue your application, and move forward with a learning path built for your goals.
            </p>

            <div className={`mt-8 grid gap-4 sm:grid-cols-2 ${reduceMotion ? "" : "animate-[fadeInUp_1.2s_ease-out]"}`}>
              {[
                { title: "Application access", text: "Track your progress and stay updated." },
                { title: "Course guidance", text: "Get matched to the right learning path." },
                { title: "Secure profile", text: "Your details stay protected with Firebase auth." },
                { title: "Student portal", text: "Unlock enrollment updates and learning access." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[0.7rem] font-semibold text-white/80">
                    <ShieldCheck size={16} aria-hidden="true" />
                  </div>
                  <h2 className="text-base font-medium text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
                </div>
              ))}
            </div>

            <div className={`mt-8 flex items-center gap-3 text-sm text-white/70 ${reduceMotion ? "" : "animate-[fadeInUp_1.25s_ease-out]"}`}>
              <div className="flex -space-x-2">
                {['JD', 'AI', 'ST'].map((item) => (
                  <div key={item} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[0.6rem] font-medium text-white">
                    {item}
                  </div>
                ))}
              </div>
              <span>Trusted by future-ready students and families.</span>
            </div>
          </div>
        </section>

        <section className={`relative rounded-[28px] border border-black/10 bg-white/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-7 md:p-8 ${reduceMotion ? "" : "animate-[fadeInUp_0.7s_ease-out]"}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F2] shadow-inner">
                <img src="/assets/images/logos/logo.png" alt="Junior Dream" className="h-6 w-auto" />
              </div>
              <div>
                <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/40">Junior Dream</p>
                <p className="m-0 text-xs text-black/60">{getTimeGreeting()}</p>
              </div>
            </div>
            <Link to="/" className="text-xs font-medium uppercase tracking-[0.12em] text-black/60 hover:text-black">Home</Link>
          </div>

          {!isForgotPasswordRoute ? (
            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              <div>
                <p className="m-0 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-black/40">Welcome back</p>
                <h2 className="mt-3 text-3xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Sign in</h2>
                <p className="mt-2 text-sm leading-6 text-black/55">Access your application, account details, and learning journey.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-black/60">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" aria-hidden="true" />
                    <input id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 w-full border border-black/15 bg-[#FAFAF8] pl-10 pr-4 py-3 text-sm text-black outline-none transition focus:border-black/50 focus:ring-2 focus:ring-black/10" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="login-password" className="block text-xs font-medium uppercase tracking-[0.12em] text-black/60">Password</label>
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-black/60 hover:text-black" aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="relative">
                    <LockKeyhole size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" aria-hidden="true" />
                    <input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-12 w-full border border-black/15 bg-[#FAFAF8] pl-10 pr-12 py-3 text-sm text-black outline-none transition focus:border-black/50 focus:ring-2 focus:ring-black/10" placeholder="Enter your password" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm text-black/60">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-black" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-medium text-black underline underline-offset-4">Forgot password?</Link>
              </div>

              {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">{error}</div>}

              <button type="submit" disabled={submitting} className="min-h-12 w-full rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-70">
                {submitting ? (
                  <span className="inline-flex items-center justify-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />Signing in...</span>
                ) : (
                  "Sign in"
                )}
              </button>

              <p className="text-center text-sm text-black/55">
                New to Junior Dream? <Link to="/apply" className="font-medium text-black underline underline-offset-4">Apply now</Link>
              </p>
            </form>
          ) : (
            <div className="mt-7">
              {!resetSent ? (
                <form onSubmit={handleResetPassword} noValidate className="space-y-5">
                  <div>
                    <Link to="/login" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black/60 hover:text-black">
                      <ArrowLeft size={14} aria-hidden="true" />
                      Back to login
                    </Link>
                    <h2 className="mt-4 text-3xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Reset your password</h2>
                    <p className="mt-2 text-sm leading-6 text-black/55">Enter the email address linked to your Junior Dream account and we will send you a reset link.</p>
                  </div>

                  <div>
                    <label htmlFor="reset-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-black/60">Email address</label>
                    <div className="relative">
                      <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" aria-hidden="true" />
                      <input id="reset-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 w-full border border-black/15 bg-[#FAFAF8] pl-10 pr-4 py-3 text-sm text-black outline-none transition focus:border-black/50 focus:ring-2 focus:ring-black/10" placeholder="you@example.com" />
                    </div>
                  </div>

                  {resetError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">{resetError}</div>}

                  <button type="submit" disabled={resetBusy} className="min-h-12 w-full rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-70">
                    {resetBusy ? (
                      <span className="inline-flex items-center justify-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />Sending link...</span>
                    ) : (
                      "Send reset link"
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF5EC] text-[#1B5E20]">
                    <CheckCircle2 size={28} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="m-0 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-black/40">Check your email</p>
                    <h2 className="mt-3 text-3xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Reset link sent</h2>
                    <p className="mt-2 text-sm leading-6 text-black/55">Password reset instructions have been sent to <span className="font-medium text-black">{email}</span>.</p>
                  </div>
                  <div className="space-y-3">
                    <Link to="/login" className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white no-underline hover:bg-black/85">Back to login</Link>
                    <button type="button" onClick={() => {
                      const syntheticEvent = { preventDefault: () => undefined } as FormEvent<HTMLFormElement>;
                      void handleResetPassword(syntheticEvent);
                    }} disabled={resetBusy} className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black transition hover:border-black disabled:cursor-not-allowed disabled:opacity-70">
                      {resetBusy ? "Resending..." : "Resend email"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Login;