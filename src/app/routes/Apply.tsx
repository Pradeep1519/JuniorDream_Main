import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export function Apply() {
  return (
    <Container className="py-20">
      <SectionTitle
        label="Apply Now"
        title="Start Your <em>Journey</em>"
        description="Take the first step towards a successful future. Apply to our programs today."
      />

      <div className="max-w-2xl mx-auto mt-12">
        <ApplicationForm />
      </div>
    </Container>
  );
}