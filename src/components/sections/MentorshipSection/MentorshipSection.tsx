import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { MentorCard } from "./MentorCard";
import { mentors } from "@/data/mentors";

export function MentorshipSection() {
  return (
    <section className="bg-secondary py-28 lg:py-36">
      <Container>
        <SectionTitle
          label="Mentorship"
          title="Learn From <em>Achievers</em>"
          description="Our mentors are industry professionals and achievers who guide students towards their goals."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} {...mentor} />
          ))}
        </div>
      </Container>
    </section>
  );
}