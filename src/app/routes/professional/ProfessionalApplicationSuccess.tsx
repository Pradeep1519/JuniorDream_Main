import { Link, Navigate, useLocation } from "react-router";
import { Check, Copy, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ProfessionalApplicationSummary {
  applicationId: string;
  courseName: string;
  courseDuration?: string;
  feeDisplay?: string;
  emiPlan?: string | null;
  paymentStatus: "pending" | "initiated" | "successful" | "failed" | "cancelled" | "refunded";
}

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;

export function ProfessionalApplicationSuccess() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const summary = location.state as ProfessionalApplicationSummary | null;

  if (!summary) return <Navigate to="/professional/programs" replace />;

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(summary.applicationId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-18">
      <section className="rounded-[28px] border border-black/10 bg-white px-5 py-9 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-[#F5F5F2] text-black" aria-hidden="true">
          <Check size={26} strokeWidth={2} />
        </div>
        <p className="mt-5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Application confirmation</p>
        <h1 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={serif}>Application Submitted Successfully</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/60">
          Course: <span className="font-medium text-black">{summary.courseName}</span>
        </p>

        <div className="mx-auto mt-7 max-w-md rounded-[20px] border border-black/10 bg-[#F8F8F6] p-5">
          <p className="m-0 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-black/40">Application ID</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <p className="m-0 break-all text-xl font-medium tracking-[0.06em] text-black">{summary.applicationId}</p>
            <button type="button" onClick={copyId} className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-2 text-xs text-black/70 hover:border-black">
              {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <dl className="mx-auto mt-6 grid max-w-md gap-4 text-left sm:grid-cols-2">
          {summary.courseDuration && (
            <div><dt className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">Duration</dt><dd className="mt-1 text-sm text-black/75">{summary.courseDuration}</dd></div>
          )}
          {summary.feeDisplay && (
            <div><dt className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">Fee</dt><dd className="mt-1 text-sm text-black/75">{summary.feeDisplay}</dd></div>
          )}
          {summary.emiPlan && (
            <div><dt className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">Payment plan</dt><dd className="mt-1 text-sm text-black/75">{summary.emiPlan}</dd></div>
          )}
          <div><dt className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">Payment status</dt><dd className="mt-1 text-sm capitalize text-black/75">{summary.paymentStatus}</dd></div>
        </dl>
      </section>

      <section className="mt-8 rounded-[28px] border border-black/10 bg-[#F8F8F6] p-6 sm:p-8">
        <h2 className="m-0 text-xl font-light text-black" style={serif}>What's next?</h2>
        <ol className="mt-5 grid list-none gap-5 p-0 sm:grid-cols-2">
          {[
            ["01", "Application review", "Our team reviews the information you've submitted."],
            ["02", "Mentor / course team follow-up", "We'll reach out using the contact details on your application."],
            ["03", "Payment confirmation", "If applicable, your payment status will update once it's verified — it is not marked successful automatically."],
            ["04", "Course onboarding", "Enrollment details are shared only after your application and payment are confirmed."],
          ].map(([number, title, description]) => (
            <li key={number} className="border-t border-black/15 pt-3">
              <span className="text-[0.6rem] text-black/35">{number}</span>
              <h3 className="mt-2 text-sm font-medium text-black">{title}</h3>
              <p className="mb-0 mt-1 text-xs leading-5 text-black/55">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/professional/programs" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white">
          Explore more programs <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default ProfessionalApplicationSuccess;
