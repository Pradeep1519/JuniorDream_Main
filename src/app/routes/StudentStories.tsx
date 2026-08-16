import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { TestimonialCard } from "@/components/sections/TestimonialsSection/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export function StudentStories() {
  return (
    <Container className="py-20">
      <SectionTitle
        label="Student Stories"
        title="Real Stories of <em>Success</em>"
        description="Hear from students who have transformed their lives through our programs."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </Container>
  );
}