import { Link, Navigate } from "react-router";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { PROFESSIONAL_LOGIN_ROUTE } from "@/lib/professionalRoutes";

export function ProfessionalDashboard() {
  const { user, profile, loading, profileLoading } = useAuth();
  if (loading || profileLoading) return <div className="min-h-[70vh]" />;
  if (!user || !profile || profile.platform !== "professional") return <Navigate to={PROFESSIONAL_LOGIN_ROUTE} replace />;
  return <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-20 sm:px-6"><div className="w-full rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-10"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8EEF8]"><BriefcaseBusiness size={20} aria-hidden="true" /></div><p className="mt-7 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Professional workspace</p><h1 className="mt-3 text-4xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Your learning dashboard is being prepared.</h1><p className="mt-4 max-w-xl text-sm leading-7 text-black/60">You are signed in to the Professional Courses experience. Course enrollment and professional profile tools will appear here.</p><Link to="/professional/programs" className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white no-underline">Explore programs <ArrowRight size={14} aria-hidden="true" /></Link></div></div>;
}