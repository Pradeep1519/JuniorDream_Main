import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;
const mono = { fontFamily: "'Space Mono', 'JetBrains Mono', 'Courier New', monospace" } as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block uppercase tracking-[0.2em] text-black/30 mb-4"
      style={{ ...mono, fontSize: "0.7rem", letterSpacing: "0.22em" }}
    >
      {children}
    </span>
  );
}

export function About() {
  return (
    <div>
      {/* Hero */}
      <Container className="pt-20 pb-16">
        <div className="max-w-[720px]">
          <Eyebrow>About Junior Dream</Eyebrow>
          <h1
            className="text-black font-light leading-tight m-0"
            style={{ ...serif, fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontStyle: "italic" }}
          >
            Learn From Achievers,<br />to Become One.
          </h1>
          <p className="text-black/60 mt-6" style={{ ...sans, fontSize: "1rem", lineHeight: 1.8 }}>
            Junior Dream Private Limited is an online tutoring and mentorship platform for
            students in Class 6–12. We connect students with experienced teachers for their
            regular curriculum, and — completely free — with real industry professionals from
            companies like TCS and American Express, who mentor students every week and help them
            see exactly where their subjects lead in the real world.
          </p>
        </div>
      </Container>

      {/* Why change is needed */}
      <div style={{ backgroundColor: "#FAFAFA" }}>
        <Container className="py-20">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow>Why We Started</Eyebrow>
              <h2 className="text-black font-light m-0" style={{ ...serif, fontSize: "1.9rem", fontStyle: "italic" }}>
                The traditional system teaches persistence — but not direction.
              </h2>
            </div>
            <p className="text-black/60" style={{ ...sans, fontSize: "0.95rem", lineHeight: 1.85 }}>
              Most students today work hard, but without a clear sense of where that work leads.
              School rewards memorization and marks, but rarely shows a child what a real day in
              engineering, medicine, or public service actually looks like. Parents feel just as
              lost — unsure whether their child is on track, or what to focus on next. We started
              Junior Dream because we believe every child can achieve something meaningful, if they're
              given clarity and the right guidance early enough to act on it.
            </p>
          </div>
        </Container>
      </div>

      {/* Vision & Mission */}
      <Container className="py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <Eyebrow>Our Vision</Eyebrow>
            <p className="text-black/70" style={{ ...sans, fontSize: "0.95rem", lineHeight: 1.85 }}>
              To redefine education by taking learning beyond exams — connecting students with
              real achievers who inspire, guide, and equip them with the skills to turn ambitions
              into reality. We want every Junior Dream student to finish school not just with good
              grades, but with genuine clarity about who they want to become.
            </p>
          </div>
          <div>
            <Eyebrow>Our Mission</Eyebrow>
            <p className="text-black/70" style={{ ...sans, fontSize: "0.95rem", lineHeight: 1.85 }}>
              To pair every student with qualified teachers for their academic curriculum and, at
              no extra cost, with a working professional in their field of interest — so that
              classroom learning and real-world direction grow side by side, not separately.
            </p>
          </div>
        </div>
      </Container>

      {/* How we teach */}
      <div style={{ backgroundColor: "#0A0A0A" }}>
        <Container className="py-20">
          <Eyebrow>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>How We Teach</span>
          </Eyebrow>
          <h2 className="text-white font-light mb-12" style={{ ...serif, fontSize: "2rem", fontStyle: "italic" }}>
            Two teachers, one student.
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 24 }}>
              <span className="block text-white mb-2" style={{ ...sans, fontSize: "1rem", fontWeight: 500 }}>
                01 — Subject Teachers
              </span>
              <p className="text-white/55" style={{ ...sans, fontSize: "0.88rem", lineHeight: 1.8 }}>
                Experienced faculty teach the regular school syllabus (Maths, Science, English and
                more, aligned to CBSE, UP Board & HBSE) alongside our specialization curriculum —
                so board exam performance never takes a back seat.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 24 }}>
              <span className="block text-white mb-2" style={{ ...sans, fontSize: "1rem", fontWeight: 500 }}>
                02 — Industry Mentors (Free)
              </span>
              <p className="text-white/55" style={{ ...sans, fontSize: "0.88rem", lineHeight: 1.8 }}>
                Every week, professionals from companies like TCS and American Express meet
                students online — sharing what their work actually looks like, explaining current
                technology in simple terms, and talking directly with parents about where a child
                is strong and where to focus next.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 24 }}>
              <span className="block text-white mb-2" style={{ ...sans, fontSize: "1rem", fontWeight: 500 }}>
                03 — Small, Class-Wise Batches
              </span>
              <p className="text-white/55" style={{ ...sans, fontSize: "0.88rem", lineHeight: 1.8 }}>
                Curriculum is never one-size-fits-all. A Class 6 student and a Class 11 student sit
                in entirely different batches, with content, pace, and technology matched to their
                exact level.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 24 }}>
              <span className="block text-white mb-2" style={{ ...sans, fontSize: "1rem", fontWeight: 500 }}>
                04 — Parents Stay Informed
              </span>
              <p className="text-white/55" style={{ ...sans, fontSize: "0.88rem", lineHeight: 1.8 }}>
                Through our Parent Portal, parents can track attendance, test scores, and
                mentor feedback — and receive direct notifications, instead of waiting for a
                report card.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Solution / streams */}
      <Container className="py-20">
        <Eyebrow>The Junior Dream Solution</Eyebrow>
        <h2 className="text-black font-light mb-4" style={{ ...serif, fontSize: "1.9rem", fontStyle: "italic" }}>
          One student. One clear path.
        </h2>
        <p className="text-black/60 max-w-[700px] mb-12" style={{ ...sans, fontSize: "0.95rem", lineHeight: 1.8 }}>
          We're building toward three specialized streams — Engineering, Medical, and Civil
          Services — each pairing academics with mentorship from real professionals in that field.
          Engineering is live today for Class 6–12; Medical and Civil Services are launching soon.
        </p>
      </Container>

      {/* Leadership */}
      <div style={{ backgroundColor: "#FAFAFA" }}>
        <Container className="py-20">
          <Eyebrow>The Leaders Behind the Dream</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-10 max-w-[600px] mt-6">
            <div>
              <div
                className="mb-4"
                style={{ width: 96, height: 96, overflow: "hidden", backgroundColor: "#EAEAEA" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format"
                  alt="Sahil Singh"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="block text-black" style={{ ...sans, fontWeight: 600, fontSize: "0.95rem" }}>
                Sahil Singh
              </span>
              <span className="text-black/45" style={{ ...sans, fontSize: "0.8rem" }}>Director</span>
            </div>
            <div>
              <div
                className="mb-4"
                style={{ width: 96, height: 96, overflow: "hidden", backgroundColor: "#EAEAEA" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format"
                  alt="Pradeep Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="block text-black" style={{ ...sans, fontWeight: 600, fontSize: "0.95rem" }}>
                Pradeep Kumar
              </span>
              <span className="text-black/45" style={{ ...sans, fontSize: "0.8rem" }}>Director</span>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA */}
      <Container className="py-20 text-center">
        <h2 className="text-black font-light mb-4" style={{ ...serif, fontSize: "2rem", fontStyle: "italic" }}>
          Be the reason a child dares to dream big.
        </h2>
        <p className="text-black/55 max-w-[540px] mx-auto mb-8" style={{ ...sans, fontSize: "0.92rem", lineHeight: 1.8 }}>
          Join us in reimagining education — where teaching is not just a profession, but a
          legacy. Together, let's nurture the achievers of tomorrow.
        </p>
        <Button href="/apply">Apply Now</Button>
      </Container>
    </div>
  );
}

export default About;
