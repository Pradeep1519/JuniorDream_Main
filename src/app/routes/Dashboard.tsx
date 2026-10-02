import { Link, Navigate } from "react-router";
import { ArrowRight, BookOpen, ChevronRight, GraduationCap, LockKeyhole, MessageSquareText, UserRound } from "lucide-react";
import { Container } from "@/components/common/Container";
import { useAuth } from "@/components/auth/AuthProvider";
import { getTimeGreeting } from "@/lib/greeting";

export function Dashboard() {
  const { user, profile, enrollment, loading, profileLoading } = useAuth();

  if (loading || (user && profileLoading)) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-24 rounded-[28px] border border-black/10 bg-white" />
          <div className="grid gap-5 md:grid-cols-3">
            <div className="h-52 rounded-[24px] border border-black/10 bg-white" />
            <div className="h-52 rounded-[24px] border border-black/10 bg-white" />
            <div className="h-52 rounded-[24px] border border-black/10 bg-white" />
          </div>
        </div>
      </Container>
    );
  }

  if (!user) return <Navigate to="/login?returnTo=%2Fdashboard" replace />;
  if (!profile) return <Container className="py-20"><h1 className="text-3xl font-light">Account profile unavailable</h1><p className="mt-3 text-sm text-black/60">We couldn’t load an application profile for this account. Contact Junior Dream for help.</p><Link to="/contact" className="mt-4 inline-block text-sm underline">Contact the team</Link></Container>;

  const isParent = profile.userType === "parent";
  const isEnrolled = enrollment?.status?.toLowerCase() === "enrolled";
  const programName = profile.stream === "engineering" ? "Engineering" : profile.stream;
  const applicationStatus = profile.applicationStatus === "new" ? "Submitted" : profile.applicationStatus;
  const greeting = getTimeGreeting();
  const firstName = profile.name?.split(" ")?.[0] ?? "Student";

  const heroMessage = isEnrolled
    ? "Your enrollment is confirmed and your learning journey is ready to continue."
    : profile.applicationStatus === "new"
      ? "Your application is in progress. We’ll keep you updated as it moves forward."
      : "You’re all set to explore the next step in your Junior Dream journey.";

  return (
    <div className="bg-[#F7F7F5] py-8 sm:py-10">
      <Container>
        <header className="rounded-[30px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">{isParent ? "Parent dashboard" : "Student dashboard"}</p>
              <h1 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{greeting}, {firstName}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">Welcome back to Junior Dream. {heroMessage}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-[#F8F8F7] px-3 py-2 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-black/60">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {isEnrolled ? "Enrollment active" : applicationStatus || "Application active"}
            </div>
          </div>
        </header>

        <div className="mt-7 grid gap-5 xl:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="flex items-center gap-2 text-black/45">
              <UserRound size={16} aria-hidden="true" />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em]">{isParent ? "Parent profile" : "Student profile"}</span>
            </div>
            <h2 className="mt-4 text-2xl font-light text-black">{profile.name}</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <AccountDetail label="Email" value={profile.email} />
              <AccountDetail label="Mobile" value={profile.mobile} />
              <AccountDetail label={isParent ? "Student" : "Class"} value={isParent ? profile.studentName : `Class ${profile.classApplying}`} />
              {isParent && <AccountDetail label="Child's class" value={`Class ${profile.classApplying}`} />}
              {profile.previousSchool && <AccountDetail label="School" value={profile.previousSchool} />}
            </dl>
            <div className="mt-5 border-t border-black/10 pt-4">
              <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline underline-offset-4">Update profile <ArrowRight size={13} aria-hidden="true" /></Link>
            </div>
          </section>

          <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-6">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-black/45">Application status</p>
            <h2 className="mt-4 text-2xl font-light text-black">{applicationStatus}</h2>
            <div className="mt-5 rounded-2xl bg-[#F8F8F6] p-4">
              <div className="flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-[0.12em] text-black/45">
                <span>Current stage</span>
                <span>{applicationStatus}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5">
                <div className="h-full rounded-full bg-black" style={{ width: isEnrolled ? "100%" : applicationStatus === "Submitted" ? "50%" : "75%" }} />
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <AccountDetail label="Application ID" value={profile.applicationId} />
              <AccountDetail label="Program" value={programName} />
              <AccountDetail label="Date" value={formatDate(profile.createdAt)} />
              {profile.batchLevel && <AccountDetail label="Batch" value={profile.batchLevel} />}
              {profile.tier && <AccountDetail label="Plan" value={profile.tier} />}
            </dl>
            <Link to="/application-success" className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline underline-offset-4">View application <ArrowRight size={13} aria-hidden="true" /></Link>
          </section>

          <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="flex items-center gap-2 text-black/45">
              <BookOpen size={16} aria-hidden="true" />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em]">Course enrollment</span>
            </div>
            {isEnrolled ? (
              <>
                <h2 className="mt-4 text-2xl font-light text-black">{enrollment.courseName ?? "Enrolled course"}</h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <AccountDetail label="Status" value={enrollment.status} />
                  {enrollment.batchLevel && <AccountDetail label="Batch" value={enrollment.batchLevel} />}
                  {enrollment.duration && <AccountDetail label="Duration" value={enrollment.duration} />}
                  {enrollment.startDate && <AccountDetail label="Start date" value={enrollment.startDate} />}
                </dl>
                <Link to="/student-portal" className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white no-underline hover:bg-black/85">Open Student Portal <ArrowRight size={13} aria-hidden="true" /></Link>
              </>
            ) : (
              <>
                <h2 className="mt-4 text-2xl font-light text-black">Ready to begin?</h2>
                <p className="mt-3 text-sm leading-6 text-black/60">Application submission and course enrollment are separate. Once your enrollment is confirmed, your student portal and course access will appear here.</p>
                <div className="mt-5 space-y-3">
                  <Link to="/programs" className="inline-flex w-full items-center justify-between rounded-2xl border border-black/10 bg-[#F8F8F6] px-4 py-3 text-sm font-medium text-black no-underline hover:border-black/20">
                    Explore courses <ChevronRight size={15} aria-hidden="true" />
                  </Link>
                  <div className="flex items-start gap-2 rounded-2xl border border-black/10 bg-[#F8F8F6] px-4 py-3 text-xs leading-5 text-black/55">
                    <LockKeyhole size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                    Student Portal unlocks only after enrollment is confirmed.
                  </div>
                </div>
              </>
            )}
          </section>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="flex items-center gap-2 text-black/45">
              <GraduationCap size={16} aria-hidden="true" />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em]">Quick actions</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <QuickAction href="/application-success" label="My application" description="Review your details" />
              <QuickAction href="/programs" label="Explore courses" description="Browse programs" />
              <QuickAction href="/faq" label="FAQs" description="Common answers" />
              <QuickAction href="/contact" label="Contact support" description="Talk to the team" />
            </div>
          </section>

          <section className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="flex items-center gap-2 text-black/45">
              <MessageSquareText size={16} aria-hidden="true" />
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.16em]">Need help?</span>
            </div>
            <h2 className="mt-4 text-2xl font-light text-black">Ask Junior Dream AI</h2>
            <p className="mt-3 text-sm leading-6 text-black/60">Have a question about your course, application, or the next step in your learning journey?</p>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-ai-counsellor"))} className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-4 py-3 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white hover:bg-black/85">
              Chat with AI <ArrowRight size={13} aria-hidden="true" />
            </button>
          </section>
        </div>
      </Container>
    </div>
  );
}

function QuickAction({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link to={href} className="rounded-2xl border border-black/10 bg-[#F8F8F6] p-4 text-left no-underline transition hover:border-black/20 hover:bg-white">
      <div className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/45">{description}</div>
      <div className="mt-3 text-base font-medium text-black">{label}</div>
    </Link>
  );
}

function AccountDetail({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3"><dt className="text-xs text-black/45">{label}</dt><dd className="m-0 break-words text-sm text-black/75 sm:text-right">{value}</dd></div>;
}

function formatDate(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value) || typeof value.toDate !== "function") return "Not available yet";
  return value.toDate().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}