import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { streams } from "@/data/streams";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

export function Programs() {
  return (
    <Container className="py-20">
      <SectionTitle
        label="Our Programs"
        title="Comprehensive Learning <em>Journey</em>"
        description="Choose a stream. Right now, Engineering is open for enrollment — Medical and Civil Services are launching soon."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {streams.map((stream) => {
          const cardInner = (
            <>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={stream.img}
                  alt={stream.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ filter: stream.active ? "none" : "grayscale(0.6)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: stream.active
                      ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)"
                      : "rgba(0,0,0,0.45)",
                  }}
                />
                {!stream.active && (
                  <span
                    className="absolute top-4 right-4 uppercase tracking-widest text-white"
                    style={{
                      ...sans,
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      padding: "6px 12px",
                    }}
                  >
                    Coming Soon
                  </span>
                )}
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="text-2xl block mb-1">{stream.icon}</span>
                  <h3 className="text-white" style={{ ...serif, fontSize: "1.3rem", fontStyle: "italic" }}>
                    {stream.title}
                  </h3>
                </div>
              </div>
              <div className="pt-4 pb-2">
                <p className="text-foreground/60 text-sm leading-relaxed" style={sans}>
                  {stream.description}
                </p>
                <span
                  className="inline-block mt-4 text-xs uppercase tracking-widest"
                  style={{
                    ...sans,
                    letterSpacing: "0.12em",
                    color: stream.active ? "#000" : "rgba(0,0,0,0.35)",
                  }}
                >
                  {stream.active ? "Explore Program →" : "Notify Me When Live"}
                </span>
              </div>
            </>
          );

          return (
            <Link
              key={stream.id}
              to={`/programs/${stream.id}`}
              className="group cursor-pointer block"
            >
              {cardInner}
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

export default Programs;
