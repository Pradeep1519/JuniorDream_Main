import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { Check, Copy, LayoutDashboard } from "lucide-react";
import { Container } from "@/components/common/Container";
import { useAuth } from "@/components/auth/AuthProvider";

interface ApplicationSummary {
  interest?: boolean;
  applicationId: string;
  applicantName: string;
  studentName: string;
  userType: "student" | "parent";
  classApplying: string;
  stream: string;
  streamTitle?: string;
  batchLevel?: string | null;
  tier?: string | null;
  status?: string;
}

export function ApplicationSuccess() {
  const location = useLocation();
  const { profile, loading, profileLoading } = useAuth();
  const [copied, setCopied] = useState(false);
  const summary = location.state as ApplicationSummary | null;

  if (!summary && !loading && !profileLoading && !profile) return <Navigate to="/apply" replace />;

  const application = summary ?? (profile ? {
    applicationId: profile.applicationId,
    applicantName: profile.name,
    studentName: profile.studentName,
    userType: profile.userType,
    classApplying: profile.classApplying,
    stream: profile.stream,
    batchLevel: profile.batchLevel,
    tier: profile.tier,
    status: profile.applicationStatus,
  } : null);

  const copyId = async () => {
    if (!application?.applicationId) return;
    try {
      await navigator.clipboard.writeText(application.applicationId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  if (!application) {
    return <Container className="py-20"><p className="text-sm text-black/55">Loading your application confirmation...</p></Container>;
  }

  const courseTitle = application.streamTitle ?? (application.stream === "engineering" ? "Engineering" : application.stream);

  return (
    <Container className="py-10 md:py-16">
      <div className="mx-auto max-w-3xl">
        <section className="account-enter border border-black/10 bg-white px-5 py-8 text-center sm:px-10 sm:py-11">
          <div className="account-success-mark mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#F5F5F2] text-black" aria-hidden="true"><Check size={26} strokeWidth={2} /></div>
          <p className="mt-5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Application confirmation</p>
          <h1 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{application.interest ? "Interest Registered" : "Application Submitted Successfully"}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/60">Thank you, {application.applicantName}. {application.interest ? "Your interest has been recorded." : "Your application has been received successfully. Application submission is not course enrollment."}</p>

          <div className="mx-auto mt-7 max-w-md border border-black/10 bg-[#F8F8F6] p-5 sm:p-6">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/40">{application.interest ? "Registration ID" : "Application ID"}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <p className="m-0 break-all text-xl font-medium tracking-[0.08em] text-black sm:text-2xl">{application.applicationId}</p>
              <button type="button" onClick={copyId} className="inline-flex min-h-9 items-center gap-1.5 border border-black/15 bg-white px-3 py-2 text-xs text-black/70 hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black" aria-label="Copy application ID">
                {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy ID"}
              </button>
            </div>
            <p aria-live="polite" className="mt-2 min-h-4 text-xs text-black/45">{copied ? "Application ID copied!" : "Keep this ID for your records."}</p>
          </div>
        </section>

        {!application.interest && <>
          <section className="mt-8 border border-black/10 bg-white p-5 sm:p-7">
            <h2 className="m-0 text-xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Application summary</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Summary label="Applicant" value={application.applicantName} />
              <Summary label="You are" value={application.userType === "parent" ? "Parent" : "Student"} />
              {application.userType === "parent" && <Summary label="Student" value={application.studentName} />}
              <Summary label="Class" value={`Class ${application.classApplying}`} />
              <Summary label="Program" value={courseTitle} />
              <Summary label="Application status" value="Submitted" />
              {Boolean(profile?.createdAt) && <Summary label="Application date" value={formatDate(profile?.createdAt)} />}
              {application.batchLevel && <Summary label="Batch" value={application.batchLevel} />}
              {application.tier && <Summary label="Plan" value={application.tier} />}
            </dl>
          </section>

          <section className="mt-8 border-y border-black/10 bg-[#F8F8F6] py-6 sm:py-8">
            <h2 className="m-0 text-xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>What happens next?</h2>
            <ol className="mt-5 grid list-none gap-5 p-0 sm:grid-cols-2">
              {[
                ["01", "Application received", "Your application has been successfully submitted."],
                ["02", "Application review", "The Junior Dream team can review the information you provided."],
                ["03", "Connect with you", "The team can follow up using the contact details on your application."],
                ["04", "Course enrollment", "Student Portal access is enabled only after a separate enrollment is confirmed."],
              ].map(([number, title, description]) => <li key={number} className="border-t border-black/15 pt-3"><span className="text-[0.62rem] text-black/35">{number}</span><h3 className="mt-2 text-sm font-medium">{title}</h3><p className="mb-0 mt-1 text-xs leading-5 text-black/55">{description}</p></li>)}
            </ol>
          </section>
        </>}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {!application.interest && <Link to="/dashboard" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline hover:bg-black/80"><LayoutDashboard size={15} aria-hidden="true" /> Go to Dashboard</Link>}
          <Link to="/programs" className="inline-flex min-h-11 items-center border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline hover:border-black">Explore Courses</Link>
        </div>
      </div>
    </Container>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/40">{label}</dt><dd className="mb-0 mt-1 text-sm text-black/75">{value}</dd></div>;
}

function formatDate(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value) || typeof value.toDate !== "function") return "Not available yet";
  return value.toDate().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}