import { useState } from "react";
import { Container } from "@/components/common/Container";
import { Link } from "react-router";

const programsData = [
  {
    id: "engineering",
    icon: "🏗️",
    title: "Engineering Excellence",
    subtitle: "JEE Advanced + Tech Careers",
    target: "JEE Advanced, 20+ Tech Specializations",
    mentors: "Amazon SDE-II, Google L4, Microsoft Engineers",
    subFields: [
      "Software Development",
      "Data Engineering",
      "AI/ML Engineering",
      "DevOps & Cloud",
      "Networking",
      "Cybersecurity",
    ],
    curriculum: [
      "Weekly coding bootcamps",
      "Live projects with MNC tools",
      "LeetCode mastery sessions",
      "System design foundations",
      "Internship pipelines",
    ],
    outcomes: "Portfolio development, MNC internship placements, top-100 JEE ranks",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "civil-services",
    icon: "🏛️",
    title: "Civil Services Leadership",
    subtitle: "IAS / IPS / UPSC CSE",
    target: "UPSC CSE (Prelims, Mains, Interview)",
    mentors: "Serving/Retired IAS, IPS, IRS Officers",
    subFields: [
      "SDM / ASP (Entry Level)",
      "DM / SP (Mid Level)",
      "Secretary / DGP (Senior Level)",
      "Cabinet Secretary (Top Level)",
    ],
    curriculum: [
      "GS paper mastery",
      "Current affairs deep analysis",
      "Essay frameworks",
      "Personality test simulations",
      "Governance case studies",
    ],
    outcomes: "85%+ Prelims clearance rate, interview shortlists",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "medical",
    icon: "🏥",
    title: "Medical Foundations",
    subtitle: "NEET UG / AIIMS / JIPMER",
    target: "NEET UG, AIIMS, JIPMER",
    mentors: "AIIMS, Apollo, Fortis Consultants (4+ years)",
    subFields: [
      "Radiology",
      "Cardiology",
      "Dermatology",
      "Emergency Medicine",
      "Orthopedics",
      "Pediatrics",
      "Psychiatry",
      "General Medicine",
    ],
    curriculum: [
      "NCERT mastery",
      "Clinical case analysis",
      "Diagnostic reasoning",
      "Medical ethics",
      "Mock NEET environment",
    ],
    outcomes: "Top 100 NEET ranks, AIIMS shortlists",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop&auto=format",
  },
];

export function ProgramsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" } as const;
  const mono = { fontFamily: "'Space Mono', 'JetBrains Mono', 'Courier New', monospace" } as const;

  const active = programsData[activeTab];

  return (
    <section className="bg-[#FAFAFA]" style={{ paddingTop: 100, paddingBottom: 120 }}>
      <Container>
        {/* ─── HEADER ─── */}
        <div className="text-center mb-16">
          <span
            className="inline-block uppercase tracking-[0.2em] text-black/30 mb-4"
            style={{ ...mono, fontSize: "0.7rem", letterSpacing: "0.25em" }}
          >
            Our Programs
          </span>
          <h2
            className="text-black font-light leading-tight m-0"
            style={{
              ...serif,
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            Comprehensive Learning
            <br />
            <em style={{ fontStyle: "italic" }}>Journey</em>
          </h2>
          <p
            className="text-black/40 max-w-[500px] mx-auto mt-4"
            style={{ ...sans, fontSize: "0.85rem", lineHeight: 1.6 }}
          >
            From academic excellence to career mastery, our flagship programs are designed to
            transform students into industry-ready professionals.
          </p>
        </div>

        {/* ─── TAB BUTTONS ─── */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {programsData.map((prog, i) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(i)}
              className="transition-all duration-500"
              style={{
                ...sans,
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: activeTab === i ? 500 : 400,
                color: activeTab === i ? "#FFFFFF" : "rgba(0,0,0,0.5)",
                backgroundColor: activeTab === i ? "#000000" : "transparent",
                border: activeTab === i ? "1px solid #000000" : "1px solid rgba(0,0,0,0.12)",
                padding: "10px 22px",
                cursor: "pointer",
              }}
            >
              {prog.icon} {prog.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* ─── ACTIVE PROGRAM CONTENT ─── */}
        <div
          className="transition-all duration-700 ease-out"
          key={activeTab}
          style={{ opacity: 1, transform: "translateY(0)" }}
        >
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 max-w-[1100px] mx-auto">
            {/* Left - Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Right - Details */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <span
                  className="text-3xl block mb-2"
                >
                  {active.icon}
                </span>
                <h3
                  className="text-black font-light leading-tight m-0"
                  style={{
                    ...serif,
                    fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                    fontStyle: "italic",
                  }}
                >
                  {active.title}
                </h3>
                <p
                  className="text-black/40 mt-1"
                  style={{ ...sans, fontSize: "0.8rem", letterSpacing: "0.05em" }}
                >
                  {active.subtitle}
                </p>
              </div>

              {/* Target & Mentors */}
              <div className="space-y-3">
                <div>
                  <span
                    className="block uppercase tracking-wider text-black/30 mb-1"
                    style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}
                  >
                    Target
                  </span>
                  <span style={{ ...sans, fontSize: "0.85rem", color: "rgba(0,0,0,0.7)" }}>
                    {active.target}
                  </span>
                </div>
                <div>
                  <span
                    className="block uppercase tracking-wider text-black/30 mb-1"
                    style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}
                  >
                    Mentors
                  </span>
                  <span style={{ ...sans, fontSize: "0.85rem", color: "rgba(0,0,0,0.7)" }}>
                    {active.mentors}
                  </span>
                </div>
              </div>

              {/* Sub-fields Tags */}
              <div>
                <span
                  className="block uppercase tracking-wider text-black/30 mb-2"
                  style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}
                >
                  Specializations
                </span>
                <div className="flex flex-wrap gap-2">
                  {active.subFields.map((field) => (
                    <span
                      key={field}
                      style={{
                        ...sans,
                        fontSize: "0.65rem",
                        color: "rgba(0,0,0,0.5)",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(0,0,0,0.08)",
                        padding: "4px 10px",
                      }}
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <span
                  className="block uppercase tracking-wider text-black/30 mb-2"
                  style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}
                >
                  Curriculum Highlights
                </span>
                <ul className="space-y-1.5 m-0 p-0" style={{ listStyle: "none" }}>
                  {active.curriculum.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2"
                      style={{ ...sans, fontSize: "0.8rem", color: "rgba(0,0,0,0.6)" }}
                    >
                      <span style={{ color: "rgba(0,0,0,0.2)" }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.05)",
                  padding: "14px 18px",
                }}
              >
                <span
                  className="block uppercase tracking-wider text-black/30 mb-1"
                  style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.15em" }}
                >
                  Outcomes
                </span>
                <span style={{ ...sans, fontSize: "0.8rem", color: "rgba(0,0,0,0.7)", lineHeight: 1.5 }}>
                  {active.outcomes}
                </span>
              </div>

              {/* CTA */}
              <Link
                to={active.id === "engineering" ? "/programs/engineering" : "/programs"}
                style={{
                  ...sans,
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                  border: "1px solid #000000",
                  padding: "14px 32px",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000000";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
              >
                Explore {active.title.split(" ")[0]} Program →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}