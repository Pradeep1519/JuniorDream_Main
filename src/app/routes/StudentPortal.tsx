import { Link, Navigate } from "react-router";
import { LockKeyhole } from "lucide-react";
import { Container } from "@/components/common/Container";
import { useAuth } from "@/components/auth/AuthProvider";

export function StudentPortal() {
  const { user, profile, enrollment, loading, profileLoading } = useAuth();

  if (loading || (user && profileLoading)) return <Container className="py-20"><p className="text-sm text-black/55">Checking enrollment...</p></Container>;
  if (!user) return <Navigate to="/login?returnTo=%2Fstudent-portal" replace />;
  if (!profile) return <Navigate to="/dashboard" replace />;
  if (enrollment?.status?.toLowerCase() !== "enrolled") {
    return (
      <Container className="py-12 md:py-20">
        <section className="mx-auto max-w-xl border border-black/10 bg-white p-6 text-center sm:p-9">
          <LockKeyhole size={25} className="mx-auto text-black/50" aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Student Portal locked</h1>
          <p className="mt-3 text-sm leading-6 text-black/55">Student Portal access becomes available after a course enrollment is confirmed. An application alone does not unlock it.</p>
          <Link to="/programs" className="mt-6 inline-flex min-h-11 items-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline">Explore courses</Link>
        </section>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-20">
      <section className="mx-auto max-w-3xl border border-black/10 bg-white p-6 sm:p-9">
        <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-black/40">Enrolled learner</p>
        <h1 className="mt-3 text-3xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Welcome to the Student Portal, {profile.studentName}.</h1>
        <p className="mt-4 text-sm leading-7 text-black/60">Your enrollment is confirmed for {enrollment.courseName ?? "your course"}{enrollment.batchLevel ? ` · ${enrollment.batchLevel}` : ""}.</p>
        <p className="mt-6 border-t border-black/10 pt-5 text-sm leading-6 text-black/50">Class resources and learning tools will appear here when they are available for your enrollment.</p>
      </section>
    </Container>
  );
}