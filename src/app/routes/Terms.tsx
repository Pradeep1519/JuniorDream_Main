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

export function Terms() {
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
          Terms of Service
        </h1>
        <p className="text-black/40 mb-12" style={{ ...sans, fontSize: "0.8rem" }}>
          Last updated: August 2026 &nbsp;·&nbsp; Junior Dream Private Limited
        </p>

        <Section title="1. Acceptance of Terms">
          <p>
            By applying to or enrolling in any Junior Dream program, you (the parent/guardian
            submitting the application on behalf of a student) agree to these Terms of Service.
          </p>
        </Section>

        <Section title="2. Enrollment & Batches">
          <p>
            Students are placed into one of three batches based on their class: Dream Foundation
            (Class 6–8), Dream Explorer (Class 9–10), or Dream Achiever (Class 11–12). Batches run
            on an academic cycle from September through February. Enrollment is confirmed only
            after the first month's fee is received.
          </p>
        </Section>

        <Section title="3. Fees & Payment">
          <p>
            Fees are billed monthly for the duration of the batch cycle, as shown on the relevant
            class page at the time of application. Fees must be paid by the 5th of each month to
            maintain uninterrupted access to classes. We do not require any lump-sum or annual
            payment upfront.
          </p>
        </Section>

        <Section title="4. Refunds & Cancellations">
          <p>
            You may cancel your enrollment at any time by notifying us in writing at{" "}
            <a href="mailto:info@juniordream.com" style={{ color: "#000", fontWeight: 500 }}>
              info@juniordream.com
            </a>
            . Since fees are billed monthly rather than upfront, no refund is owed for future
            months once cancelled — you simply won't be billed going forward. Fees already paid
            for the current month are non-refundable, as classes for that month are already
            scheduled.
          </p>
        </Section>

        <Section title="5. Free Mentorship Program">
          <p>
            Weekly mentorship sessions with industry professionals are offered at no additional
            cost as part of the Advantage and Elite plans. Mentorship is a value-added benefit and
            not a guarantee of specific career or academic outcomes.
          </p>
        </Section>

        <Section title="6. Conduct">
          <p>
            Students and parents are expected to engage respectfully with teachers, mentors, and
            fellow students during live classes and mentorship sessions. Junior Dream reserves the
            right to suspend access for conduct that disrupts the learning environment of others.
          </p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            All course material, recorded lectures, notes, and practice sheets provided by Junior
            Dream are for the personal use of the enrolled student only and may not be
            redistributed, resold, or shared outside the family without written permission.
          </p>
        </Section>

        <Section title="8. Changes to Programs">
          <p>
            Junior Dream is actively growing — including the upcoming launch of our Medical and
            Civil Services programs. We may update curriculum, faculty, mentors, or scheduling
            with reasonable advance notice to enrolled families.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            Questions about these terms can be directed to{" "}
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

export default Terms;
