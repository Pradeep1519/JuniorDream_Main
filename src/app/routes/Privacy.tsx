import { Container } from "@/components/common/Container";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-black mb-3" style={{ ...serif, fontSize: "1.3rem", fontStyle: "italic" }}>
        {title}
      </h2>
      <div className="text-black/65" style={{ ...sans, fontSize: "0.92rem", lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <Container className="py-20">
      <div className="max-w-[760px] mx-auto">
        <span
          className="block uppercase tracking-widest text-black/35 mb-3"
          style={{ ...sans, fontSize: "0.7rem", letterSpacing: "0.15em" }}
        >
          Legal
        </span>
        <h1
          className="text-black font-light mb-2"
          style={{ ...serif, fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontStyle: "italic" }}
        >
          Privacy Policy
        </h1>
        <p className="text-black/40 mb-12" style={{ ...sans, fontSize: "0.8rem" }}>
          Last updated: August 2026 &nbsp;·&nbsp; Junior Dream Private Limited
        </p>

        <Section title="1. Who We Are">
          <p>
            Junior Dream Private Limited ("Junior Dream", "we", "us") operates an online
            tutoring and mentorship platform for students in Class 6–12, currently focused on
            our Engineering program, with Medical and Civil Services programs launching soon.
            This policy explains what information we collect through our website and application
            forms, and how we use it.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>When a parent or student submits an application through our website, we collect:</p>
          <ul className="mt-3 space-y-1.5 pl-5" style={{ listStyle: "disc" }}>
            <li>Student details: name, date of birth, gender, class applying for, previous school</li>
            <li>Parent/guardian details: father's and mother's name</li>
            <li>Contact information: mobile number, alternate number, email address, residential address</li>
            <li>Optional details: how you heard about us, referral code</li>
          </ul>
          <p className="mt-3">
            We do not knowingly collect any information from children beyond what a parent or
            guardian submits on their behalf through our application form.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information collected to:</p>
          <ul className="mt-3 space-y-1.5 pl-5" style={{ listStyle: "disc" }}>
            <li>Process enrollment applications and contact you regarding admission</li>
            <li>Assign students to the correct batch and class-level curriculum</li>
            <li>Share progress updates with parents through our Parent Portal</li>
            <li>Send important updates about classes, schedules, and mentorship sessions</li>
            <li>Improve our programs based on aggregate, anonymized usage patterns</li>
          </ul>
        </Section>

        <Section title="4. Data Storage & Security">
          <p>
            Application data is stored securely using Google Firebase infrastructure. Access to
            student and parent records is restricted to authorized Junior Dream staff through a
            password-protected admin system. We do not sell, rent, or trade your personal
            information to third parties for marketing purposes.
          </p>
        </Section>

        <Section title="5. Mentorship Sessions">
          <p>
            Our free industry-mentor sessions are conducted by professionals from partner
            organizations. Mentors are given access only to the information needed to guide your
            child's learning (name, class, and relevant progress notes) — never your full contact
            or address details.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p>
            You may request to review, correct, or delete the information we hold about your
            child at any time by contacting us at{" "}
            <a href="mailto:info@juniordream.com" style={{ color: "#000", fontWeight: 500 }}>
              info@juniordream.com
            </a>
            . We will respond within a reasonable timeframe.
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time as our programs grow — including
            when our Medical and Civil Services streams launch. Any changes will be posted on
            this page with an updated "Last updated" date.
          </p>
        </Section>

        <Section title="8. Contact Us">
          <p>
            For any privacy-related questions, reach out at{" "}
            <a href="mailto:info@juniordream.com" style={{ color: "#000", fontWeight: 500 }}>
              info@juniordream.com
            </a>{" "}
            or +91 8448777696.
          </p>
        </Section>
      </div>
    </Container>
  );
}

export default Privacy;
