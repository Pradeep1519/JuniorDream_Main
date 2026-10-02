import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export function CTASection() {
  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  return (
    <section className="bg-secondary py-28 lg:py-36 border-t border-border">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-normal leading-tight text-black" style={serif}>
            Ready to Start Your <em>Journey?</em>
          </h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto" style={sans}>
            Join thousands of students who have transformed their lives through our mentorship
            and education programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button href="/apply" size="lg">
              Apply Now
            </Button>
            <Button href="/programs" variant="outline" size="lg">
              Explore Programs
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}