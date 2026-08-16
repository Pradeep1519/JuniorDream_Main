import { useParams, Link, Navigate } from "react-router";
import { Container } from "@/components/common/Container";
import { engineeringBatches, BATCH_CYCLE } from "@/data/engineeringCurriculum";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;
const mono = { fontFamily: "'Space Mono', 'JetBrains Mono', 'Courier New', monospace" } as const;

export function ClassDetail() {
  const { classNumber } = useParams<{ classNumber: string }>();
  const cls = parseInt((classNumber || "").replace("class-", ""), 10);

  const batch = engineeringBatches.find((b) => b.classes.includes(cls));

  if (!batch || !cls) {
    return <Navigate to="/programs/engineering" replace />;
  }

  return (
    <Container className="py-20">
      <div className="text-center mb-4">
        <Link
          to="/programs/engineering"
          className="no-underline"
          style={{ ...sans, fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(0,0,0,0.4)", textTransform: "uppercase" }}
        >
          ← All Classes
        </Link>
      </div>

      <div className="text-center mb-14">
        <span
          className="inline-block uppercase tracking-[0.2em] text-black/30 mb-4"
          style={{ ...mono, fontSize: "0.7rem", letterSpacing: "0.25em" }}
        >
          {batch.batchLevel} &middot; {batch.customName}
        </span>
        <h1
          className="text-black font-light leading-tight m-0"
          style={{ ...serif, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontStyle: "italic" }}
        >
          Class {cls} — Engineering Track
        </h1>
        <p className="text-black/50 max-w-[600px] mx-auto mt-4" style={{ ...sans, fontSize: "0.9rem", lineHeight: 1.6 }}>
          {BATCH_CYCLE.note}
        </p>
      </div>

      {/* Curriculum overview */}
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-3 gap-8 mb-20">
        <div>
          <span className="block uppercase tracking-wider text-black/30 mb-2" style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}>
            School Syllabus Covered
          </span>
          <ul className="space-y-1.5 m-0 p-0" style={{ listStyle: "none" }}>
            {batch.schoolSubjects.map((s) => (
              <li key={s} style={{ ...sans, fontSize: "0.85rem", color: "rgba(0,0,0,0.65)" }}>— {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="block uppercase tracking-wider text-black/30 mb-2" style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}>
            What We'll Teach
          </span>
          <ul className="space-y-1.5 m-0 p-0" style={{ listStyle: "none" }}>
            {batch.techTopics.map((t) => (
              <li key={t} style={{ ...sans, fontSize: "0.85rem", color: "rgba(0,0,0,0.65)" }}>— {t}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="block uppercase tracking-wider text-black/30 mb-2" style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}>
            Certificates You'll Earn
          </span>
          <ul className="space-y-1.5 m-0 p-0" style={{ listStyle: "none" }}>
            {batch.certificates.map((c) => (
              <li key={c} style={{ ...sans, fontSize: "0.85rem", color: "rgba(0,0,0,0.65)" }}>🎓 {c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="text-center mb-10">
        <h2 className="m-0 text-black" style={{ ...serif, fontSize: "1.8rem", fontStyle: "italic" }}>
          Choose Your Plan
        </h2>
        <p className="text-black/40 mt-2" style={{ ...sans, fontSize: "0.8rem" }}>
          Billed monthly, {BATCH_CYCLE.startMonth} – {BATCH_CYCLE.endMonth}. Cancel anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
        {batch.tiers.map((tier) => (
          <div
            key={tier.id}
            style={{
              border: tier.highlight ? "2px solid #000000" : "1px solid rgba(0,0,0,0.1)",
              backgroundColor: tier.highlight ? "#000000" : "#FFFFFF",
              color: tier.highlight ? "#FFFFFF" : "#000000",
              padding: "32px 28px",
              position: "relative",
            }}
          >
            {tier.highlight && (
              <span
                style={{
                  ...mono,
                  position: "absolute",
                  top: -12,
                  left: 28,
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  padding: "4px 10px",
                  textTransform: "uppercase",
                }}
              >
                Most Popular
              </span>
            )}

            <span
              className="block uppercase tracking-widest mb-3"
              style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.15em", opacity: 0.6 }}
            >
              {tier.name}
            </span>

            <div className="mb-1">
              <span style={{ ...serif, fontSize: "1.9rem", fontStyle: "italic" }}>{tier.monthlyFee}</span>
            </div>
            {tier.originalMonthlyFee && (
              <span
                style={{
                  ...sans,
                  fontSize: "0.8rem",
                  textDecoration: "line-through",
                  opacity: 0.4,
                }}
              >
                {tier.originalMonthlyFee}
              </span>
            )}

            <ul className="space-y-2.5 m-0 p-0 mt-6 mb-8" style={{ listStyle: "none" }}>
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2"
                  style={{ ...sans, fontSize: "0.82rem", lineHeight: 1.5, opacity: 0.9 }}
                >
                  <span style={{ flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to={`/apply?stream=engineering&batch=${encodeURIComponent(batch.batchLevel)}&class=${cls}&tier=${encodeURIComponent(tier.name)}`}
              className="no-underline block text-center"
              style={{
                ...sans,
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                padding: "14px",
                backgroundColor: tier.highlight ? "#FFFFFF" : "#000000",
                color: tier.highlight ? "#000000" : "#FFFFFF",
              }}
            >
              Apply — {tier.name}
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ClassDetail;
