import { useState } from "react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { engineeringBatches } from "@/data/engineeringCurriculum";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;
const mono = { fontFamily: "'Space Mono', 'JetBrains Mono', 'Courier New', monospace" } as const;

export function EngineeringProgram() {
  const [expanded, setExpanded] = useState<string | null>(engineeringBatches[0].id);

  return (
    <Container className="py-20">
      <div className="text-center mb-14">
        <span
          className="inline-block uppercase tracking-[0.2em] text-black/30 mb-4"
          style={{ ...mono, fontSize: "0.7rem", letterSpacing: "0.25em" }}
        >
          Engineering Excellence
        </span>
        <h1
          className="text-black font-light leading-tight m-0"
          style={{ ...serif, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontStyle: "italic" }}
        >
          Choose Your Class
        </h1>
        <p className="text-black/50 max-w-[560px] mx-auto mt-4" style={{ ...sans, fontSize: "0.9rem", lineHeight: 1.6 }}>
          Pick your batch, then select your exact class to see the full course —
          curriculum, technologies, certificates, and monthly fee.
        </p>
      </div>

      <div className="max-w-[820px] mx-auto space-y-4">
        {engineeringBatches.map((batch) => {
          const isOpen = expanded === batch.id;
          return (
            <div
              key={batch.id}
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                backgroundColor: isOpen ? "#FAFAFA" : "#FFFFFF",
                transition: "background-color 0.3s ease",
              }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : batch.id)}
                className="w-full flex items-center justify-between text-left"
                style={{ padding: "22px 28px", background: "none", border: "none", cursor: "pointer" }}
              >
                <div>
                  <h3
                    className="m-0 text-black"
                    style={{ ...serif, fontSize: "1.35rem", fontStyle: "italic" }}
                  >
                    {batch.batchLevel}
                  </h3>
                  <span
                    className="block uppercase tracking-widest text-black/40 mt-1"
                    style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.15em" }}
                  >
                    Class {batch.classRange} &middot; {batch.customName}
                  </span>
                </div>
                <span
                  style={{
                    ...sans,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {isOpen ? "Close" : "Select Class"}
                  <span
                    style={{
                      display: "inline-block",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    ▾
                  </span>
                </span>
              </button>

              {isOpen && (
                <div
                  className="grid sm:grid-cols-3 gap-3"
                  style={{ padding: "0 28px 28px 28px" }}
                >
                  {batch.classes.map((cls) => (
                    <Link
                      key={cls}
                      to={`/programs/engineering/class-${cls}`}
                      className="no-underline"
                      style={{
                        ...sans,
                        display: "block",
                        textAlign: "center",
                        padding: "18px 12px",
                        backgroundColor: "#000000",
                        color: "#FFFFFF",
                        fontSize: "0.85rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      Class {cls}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default EngineeringProgram;
