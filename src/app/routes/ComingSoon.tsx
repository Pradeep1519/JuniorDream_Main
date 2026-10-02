import { useParams, Link, Navigate } from "react-router";
import { Container } from "@/components/common/Container";
import { streams } from "@/data/streams";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;
const mono = { fontFamily: "'Space Mono', 'JetBrains Mono', 'Courier New', monospace" } as const;

export function ComingSoon() {
  const { streamId } = useParams<{ streamId: string }>();
  const stream = streams.find((s) => s.id === streamId);

  if (!stream) {
    return <Navigate to="/programs" replace />;
  }

  return (
    <Container className="py-24">
      <div className="max-w-[640px] mx-auto text-center">
        <span className="text-4xl block mb-6">{stream.icon}</span>
        <span
          className="inline-block uppercase tracking-[0.25em] mb-4"
          style={{ ...mono, fontSize: "0.7rem", color: "rgba(0,0,0,0.35)" }}
        >
          Coming Soon
        </span>
        <h1
          className="text-black font-light leading-tight m-0"
          style={{ ...serif, fontSize: "clamp(2rem, 4vw, 2.8rem)", fontStyle: "italic" }}
        >
          {stream.title}
        </h1>
        <p className="text-black/55 mt-5 mb-2" style={{ ...sans, fontSize: "0.95rem", lineHeight: 1.7 }}>
          {stream.description}
        </p>
        <p className="text-black/40 mt-6 mb-10" style={{ ...sans, fontSize: "0.85rem", lineHeight: 1.7 }}>
          We're currently focused on launching Engineering first. {stream.title} is next on our
          roadmap — register your interest below and we'll reach out the moment enrollment opens,
          with early-access pricing for founding families.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/apply?stream=${stream.id}`}
            className="no-underline"
            style={{
              ...sans,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: "14px 32px",
              backgroundColor: "#000000",
              color: "#FFFFFF",
            }}
          >
            Register Interest
          </Link>
          <Link
            to="/programs/engineering"
            className="no-underline"
            style={{
              ...sans,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: "14px 32px",
              border: "1px solid rgba(0,0,0,0.2)",
              color: "#000000",
            }}
          >
            Explore Engineering
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default ComingSoon;
