import { Container } from "@/components/common/Container";

const stats = [
  { label: "Students Mentored", value: "500+" },
  { label: "Expert Mentors", value: "25+" },
  { label: "Success Stories", value: "150+" },
  { label: "Years of Excellence", value: "5+" },
];

export function StatsSection() {
  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  return (
    <section className="bg-black py-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-normal text-white" style={serif}>
                {stat.value}
              </div>
              <p className="text-xs text-white/50 mt-2 uppercase tracking-widest" style={sans}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}