import { useState } from "react";
import { Container } from "@/components/common/Container";
import { Link } from "react-router";

// Stats Data
const stats = [
  { value: "500+", label: "Active Students" },
  { value: "92%", label: "Parent NPS Score" },
  { value: "3", label: "Live Programs" },
  { value: "25+", label: "MNC Mentors" },
];

// Programs Data
const programs = [
  {
    icon: "🏗️",
    title: "Engineering Excellence",
    subtitle: "JEE Advanced + Tech Careers",
    desc: "Weekly coding bootcamps, LeetCode mastery, system design foundations with FAANG mentors.",
  },
  {
    icon: "🏛️",
    title: "Civil Services Leadership",
    subtitle: "IAS / IPS / UPSC CSE",
    desc: "GS paper mastery, essay frameworks, personality test simulations with serving officers.",
  },
  {
    icon: "🏥",
    title: "Medical Foundations",
    subtitle: "NEET UG / AIIMS / JIPMER",
    desc: "NCERT mastery, clinical case analysis, diagnostic reasoning with AIIMS consultants.",
  },
];

export function AboutSection() {
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null);

  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" } as const;
  const mono = { fontFamily: "'Space Mono', 'JetBrains Mono', 'Courier New', monospace" } as const;

  return (
    <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 120 }}>
      {/* 🌊 Global Water Ripple Animation Style */}
      <style>{`
        @keyframes ripple-1 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
        @keyframes ripple-2 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        @keyframes ripple-3 {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
      `}</style>

      <Container>
        {/* ─── TOP: Label + Quote ─── */}
        <div className="text-center mb-20">
          <span
            className="inline-block uppercase tracking-[0.2em] text-black/30 mb-4"
            style={{ ...mono, fontSize: "0.7rem", letterSpacing: "0.25em" }}
          >
            About Junior Dream
          </span>
          <h2
            className="text-black font-light leading-tight m-0"
            style={{
              ...serif,
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            Learn From Achievers
            <br />
            To Become One
          </h2>
        </div>

        {/* ─── STATS ROW ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-[900px] mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span
                className="block text-black font-light leading-none mb-1"
                style={{
                  ...serif,
                  fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  fontStyle: "italic",
                }}
              >
                {stat.value}
              </span>
              <span
                className="block text-black/40 uppercase tracking-wider"
                style={{ ...sans, fontSize: "0.65rem", letterSpacing: "0.12em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ─── MAIN CONTENT: Image + Text ─── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 max-w-[1100px] mx-auto mb-24">
          {/* Left - Image */}
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1000&fit=crop&auto=format"
              alt="Students learning at Junior Dream"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* Right - Text */}
          <div className="flex flex-col justify-center gap-6">
            <span
              className="uppercase tracking-[0.2em] text-black/30"
              style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.25em" }}
            >
              Transforming Education Through Precision Mentorship
            </span>

            <div
              className="space-y-5 text-black/60 leading-relaxed"
              style={{ ...sans, fontSize: "0.9rem", lineHeight: 1.8 }}
            >
              <p>
                <strong className="text-black">Junior Dream Private Limited</strong> delivers
                executive-grade edtech solutions for students in Classes 6–12, bridging the gap
                between academic learning and professional excellence.
              </p>
              <p>
                Our proprietary <strong className="text-black">Mentor Precision Matching™</strong>{" "}
                connects students with domain experts from Amazon, Google, Microsoft, AIIMS, and
                civil services—professionals with 4+ years of experience who mentor from
                foundation to mastery.
              </p>
              <p>
                Founded in 2025, headquartered in Gurugram, we've already achieved: 15+ Olympiad
                qualifiers, 8 MNC internships secured, and 22 students in JEE/NEET top 1000 ranks.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <Link
                to="/about"
                style={{
                  ...sans,
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                  border: "1px solid #000000",
                  padding: "12px 28px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
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
                Read Our Story
              </Link>
              <Link
                to="/contact"
                style={{
                  ...sans,
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  color: "#000000",
                  border: "1px solid rgba(0,0,0,0.2)",
                  padding: "12px 28px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#000000";
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.borderColor = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#000000";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* ─── PROGRAMS CARDS ─── */}
        <div className="max-w-[1100px] mx-auto">
          <h3
            className="text-center text-black font-light mb-14"
            style={{
              ...serif,
              fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
              fontStyle: "italic",
            }}
          >
            Our Flagship Programs
          </h3>

          <div className="grid md:grid-cols-3 gap-5">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className="relative overflow-hidden cursor-pointer p-8 group"
                style={{
                  backgroundColor: "#FAFAFA",
                  border: "1px solid rgba(0,0,0,0.05)",
                  borderRadius: 2,
                  transition: "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform: hoveredProgram === i 
                    ? "translateY(-8px) scale(1.015)" 
                    : "translateY(0) scale(1)",
                  boxShadow: hoveredProgram === i
                    ? "0 30px 60px rgba(0,0,0,0.06), 0 10px 20px rgba(0,0,0,0.03)"
                    : "0 1px 2px rgba(0,0,0,0.02)",
                }}
                onMouseEnter={() => setHoveredProgram(i)}
                onMouseLeave={() => setHoveredProgram(null)}
              >
                {/* 🌊 Ripple Circles */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "100px",
                    height: "100px",
                    top: "50%",
                    left: "50%",
                    background: "rgba(0,0,0,0.03)",
                    animation: hoveredProgram === i ? "ripple-1 1.8s ease-out infinite" : "none",
                  }}
                />
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "100px",
                    height: "100px",
                    top: "50%",
                    left: "50%",
                    background: "rgba(0,0,0,0.02)",
                    animation: hoveredProgram === i ? "ripple-2 2.2s ease-out 0.3s infinite" : "none",
                  }}
                />
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "100px",
                    height: "100px",
                    top: "50%",
                    left: "50%",
                    background: "rgba(0,0,0,0.015)",
                    animation: hoveredProgram === i ? "ripple-3 2.6s ease-out 0.6s infinite" : "none",
                  }}
                />

                {/* ✨ Shimmer Line on Hover */}
                <div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{
                    opacity: hoveredProgram === i ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      width: "60%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)",
                      animation: hoveredProgram === i ? "shimmer 2s ease-in-out infinite" : "none",
                    }}
                  />
                </div>

                {/* Glass Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
                  style={{
                    background: hoveredProgram === i
                      ? "rgba(255,255,255,0.5)"
                      : "transparent",
                    backdropFilter: hoveredProgram === i ? "blur(1px)" : "blur(0px)",
                    WebkitBackdropFilter: hoveredProgram === i ? "blur(1px)" : "blur(0px)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <span
                    className="text-3xl block mb-5 inline-block transition-all duration-700"
                    style={{
                      transform: hoveredProgram === i 
                        ? "translateY(-6px) scale(1.15)" 
                        : "translateY(0) scale(1)",
                      filter: hoveredProgram === i 
                        ? "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" 
                        : "none",
                    }}
                  >
                    {program.icon}
                  </span>

                  {/* Title */}
                  <h4
                    className="font-light leading-tight mb-2 transition-all duration-700"
                    style={{
                      ...serif,
                      fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
                      fontStyle: "italic",
                      color: "#000000",
                      transform: hoveredProgram === i ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
                    {program.title}
                  </h4>

                  {/* Subtitle */}
                  <span
                    className="block uppercase tracking-wider mb-4 transition-all duration-700"
                    style={{
                      ...sans,
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "rgba(0,0,0,0.4)",
                      transform: hoveredProgram === i ? "translateY(-1px)" : "translateY(0)",
                    }}
                  >
                    {program.subtitle}
                  </span>

                  {/* Description */}
                  <p
                    className="leading-relaxed transition-all duration-700"
                    style={{
                      ...sans,
                      fontSize: "0.8rem",
                      color: "rgba(0,0,0,0.5)",
                      lineHeight: 1.7,
                      transform: hoveredProgram === i ? "translateY(-1px)" : "translateY(0)",
                    }}
                  >
                    {program.desc}
                  </p>

                  {/* Arrow */}
                  <span
                    className="absolute bottom-6 right-6 text-xl transition-all duration-700"
                    style={{
                      opacity: hoveredProgram === i ? 1 : 0,
                      transform: hoveredProgram === i 
                        ? "translateX(4px) translateY(-2px)" 
                        : "translateX(-16px) translateY(0)",
                      color: "#000000",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── DIFFERENTIATOR ─── */}
        <div
          className="mt-24 max-w-[800px] mx-auto text-center p-12"
          style={{ backgroundColor: "#FAFAFA", border: "1px solid rgba(0,0,0,0.05)" }}
        >
          <span
            className="block uppercase tracking-[0.2em] text-black/30 mb-4"
            style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.25em" }}
          >
            Mentor Precision Matching™
          </span>
          <p
            className="text-black/70 leading-relaxed m-0"
            style={{ ...serif, fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontStyle: "italic", lineHeight: 1.7 }}
          >
            No generic faculty. A Class 9 student targeting Google Software Engineering receives
            weekly mentorship from <strong className="text-black">Google Senior Engineers</strong>,
            not school teachers. This includes custom career roadmaps, live doubt resolution on
            enterprise tools, and direct referral networks.
          </p>
        </div>
      </Container>
    </section>
  );
}