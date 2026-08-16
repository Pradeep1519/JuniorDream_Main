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

export function Accessibility() {
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
          Accessibility
        </h1>
        <p className="text-black/40 mb-12" style={{ ...sans, fontSize: "0.8rem" }}>
          Last updated: August 2026 &nbsp;·&nbsp; Junior Dream Private Limited
        </p>

        <Section title="Our Commitment">
          <p>
            Junior Dream is committed to making our website and learning platform usable by as
            many people as possible, including students and parents who use assistive
            technologies such as screen readers, keyboard navigation, or magnification tools.
          </p>
        </Section>

        <Section title="What We're Doing">
          <ul className="space-y-1.5 pl-5" style={{ listStyle: "disc" }}>
            <li>Using clear, high-contrast text throughout the site</li>
            <li>Structuring pages with proper headings so screen readers can navigate easily</li>
            <li>Ensuring all interactive elements (buttons, forms, links) are keyboard-accessible</li>
            <li>Providing descriptive labels on all application form fields</li>
          </ul>
        </Section>

        <Section title="Ongoing Improvement">
          <p>
            Accessibility is an ongoing effort. As we grow — including launching our Medical and
            Civil Services programs — we will continue reviewing new pages and features against
            accessibility best practices.
          </p>
        </Section>

        <Section title="Need Help?">
          <p>
            If you experience any difficulty accessing content on our website, or need
            application materials in an alternate format, please contact us at{" "}
            <a href="mailto:info@juniordream.com" style={{ color: "#000", fontWeight: 500 }}>
              info@juniordream.com
            </a>{" "}
            or +91 8448777696, and we'll do our best to help promptly.
          </p>
        </Section>
      </div>
    </Container>
  );
}

export default Accessibility;
