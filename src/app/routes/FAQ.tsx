import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";

export function FAQ() {
  return (
    <Container className="py-20">
      <SectionTitle
        label="FAQ"
        title="Frequently Asked <em>Questions</em>"
        description="Find answers to common questions about our programs, mentorship, and application process."
      />
      
      <div className="max-w-3xl mx-auto mt-12">
        <FAQSection />
      </div>
    </Container>
  );
}