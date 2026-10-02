import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { JobOpportunity } from "@/data/jobOpportunities";

interface JobOpportunityCardProps {
  job: JobOpportunity;
  applyTo: string;
  variant?: "light" | "dark";
}

export function JobOpportunityCard({ job, applyTo, variant = "light" }: JobOpportunityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const descriptionId = `${job.id}-description`;
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "rounded-[20px] border border-white/15 bg-white/[0.04] p-5"
          : "rounded-[20px] border border-black/10 bg-white p-5"
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={
            isDark
              ? "rounded-full border border-white/20 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-white/70"
              : "rounded-full border border-black/15 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-black/60"
          }
        >
          {job.format}
        </span>
        <span className={isDark ? "text-[0.62rem] font-medium uppercase tracking-[0.1em] text-white/40" : "text-[0.62rem] font-medium uppercase tracking-[0.1em] text-black/40"}>
          {job.track}
        </span>
      </div>

      <h3 className={isDark ? "mt-3 text-lg font-medium text-white" : "mt-3 text-lg font-medium text-black"}>{job.title}</h3>
      <p className={isDark ? "mt-2 text-sm leading-6 text-white/60" : "mt-2 text-sm leading-6 text-black/60"}>{job.summary}</p>
      <p className={isDark ? "mt-3 text-xs font-medium uppercase tracking-[0.08em] text-white/40" : "mt-3 text-xs font-medium uppercase tracking-[0.08em] text-black/40"}>
        {job.timeline}
      </p>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={descriptionId}
        className={
          isDark
            ? "mt-4 inline-flex min-h-9 items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            : "mt-4 inline-flex min-h-9 items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-black underline decoration-black/25 underline-offset-4 hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        }
      >
        View description
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <ul
          id={descriptionId}
          className={
            isDark
              ? "mt-3 space-y-2 border-t border-white/15 pt-3 text-sm leading-6 text-white/60"
              : "mt-3 space-y-2 border-t border-black/10 pt-3 text-sm leading-6 text-black/60"
          }
        >
          {job.details.map((detail) => (
            <li key={detail}>• {detail}</li>
          ))}
        </ul>
      )}

      <Link
        to={applyTo}
        className={
          isDark
            ? "mt-5 inline-flex min-h-10 items-center gap-2 bg-white px-4 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            : "mt-5 inline-flex min-h-10 items-center gap-2 bg-black px-4 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        }
      >
        Apply for this drive <ArrowRight size={13} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default JobOpportunityCard;
