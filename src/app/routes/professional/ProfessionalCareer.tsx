import { ArrowRight, BriefcaseBusiness, BrainCircuit, Building2, CheckCircle2, Cpu, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { JobOpportunityCard } from "@/components/common/JobOpportunityCard";
import { professionalCourses } from "@/data/professionalCourses";
import { jobOpportunities } from "@/data/jobOpportunities";
import { PROFESSIONAL_APPLICATION_ROUTE } from "@/lib/professionalRoutes";

const categoryOrder = ["Data & AI", "Software Development", "Cloud & Security"] as const;

const categoryBlurb: Record<(typeof categoryOrder)[number], string> = {
  "Data & AI": "Where most of the next decade's technology roles are headed — from data analysis to machine learning and generative AI.",
  "Software Development": "The engineering backbone behind every product, platform, and AI-powered system.",
  "Cloud & Security": "The infrastructure and trust layer that every AI and software system depends on.",
};

const careerStats = [
  { value: "3", label: "High-growth career clusters" },
  { value: "15", label: "Learner cap per batch" },
  { value: "1:1", label: "Mentor guidance model" },
  { value: "100%", label: "Project-driven learning" },
];

const careerAdvantages = [
  { icon: BrainCircuit, title: "AI-first career direction", text: "Every track is built around real roles, future demand, and smart skill stacking." },
  { icon: Users, title: "Top mentor access", text: "Learn from professionals with real-world product, data, and engineering exposure." },
  { icon: Building2, title: "Career-relevant execution", text: "Go beyond theory with portfolio projects, practical applications, and role-specific work." },
  { icon: ShieldCheck, title: "Trust + clarity", text: "A premium learning path that gives students a serious roadmap instead of vague tech advice." },
];

export function ProfessionalCareer() {
  const groupedCourses = categoryOrder.map((category) => ({
    category,
    courses: professionalCourses.filter((course) => course.category === category),
  }));

  return (
    <div className="bg-[#F6F6F3] text-black">
      <section className="border-b border-black/10 bg-[#F9F8F4]">
        <Container className="py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Careers built for the AI era</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-light leading-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                AI is changing every career. We help you build the right edge.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/65">
                The future belongs to people who can combine technical fluency, problem-solving, and the confidence to adapt.
                Junior Dream&apos;s professional tracks are designed around the actual roles shaping tomorrow — practical,
                career-focused, and built to make learners more employable, not just more informed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/professional/programs" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white no-underline transition-colors hover:bg-black/80">
                  Explore programs <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link to="/professional/apply" className="inline-flex min-h-11 items-center border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-black no-underline transition-colors hover:border-black">
                  Apply now
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-black/10 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.05)] sm:p-7">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/40">Why this matters</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-[20px] border border-black/10 bg-[#F8F8F6] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EADF] text-black">
                      <TrendingUp size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/50">Career direction</p>
                      <p className="mt-1 text-lg font-light text-black">Learn what actually matters</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[20px] border border-black/10 bg-[#F8F8F6] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EADF] text-black">
                      <BriefcaseBusiness size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/50">Career readiness</p>
                      <p className="mt-1 text-lg font-light text-black">Skills closer to real roles</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[20px] border border-black/10 bg-[#F8F8F6] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EADF] text-black">
                      <Sparkles size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/50">Premium experience</p>
                      <p className="mt-1 text-lg font-light text-black">Focused, premium, outcome-led</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-3 px-4 py-5 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-20 xl:px-28">
          {careerStats.map((stat) => (
            <div key={stat.label} className="rounded-[20px] border border-black/10 bg-[#F8F8F6] px-4 py-5 text-center">
              <p className="text-2xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{stat.value}</p>
              <p className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">What makes the difference</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            A premium learning experience built around career clarity, execution, and confidence.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {careerAdvantages.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[26px] border border-black/10 bg-[#F8F8F6] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <Icon size={18} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-black">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-black/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Career pathways</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Choose the track that matches your next move.
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-black/60">
            <Cpu size={14} aria-hidden="true" /> Future-ready programs
          </div>
        </div>

        <div className="mt-12 space-y-10">
          {groupedCourses.map(({ category, courses }) => (
            <div key={category} className="rounded-[30px] border border-black/10 bg-[#F8F8F6] p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">{category}</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-black/60">{categoryBlurb[category]}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/professional/programs/${course.slug}`}
                    className="block rounded-[22px] border border-black/10 bg-white p-5 no-underline transition duration-200 hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)]"
                  >
                    <h3 className="text-lg font-medium text-black">{course.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/60">{course.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black">
                      View program <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[30px] border border-black/10 bg-black p-6 text-white sm:p-8">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/40">Hiring &amp; interview drives</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-light leading-tight sm:text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Junior Dream places its own learners — and opens hiring opportunities for everyone else too.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            In addition to premium structured learning, we also run hiring webinars and interview-drive opportunities for
            students, freshers, and career switchers looking for real-world exposure and direct pathways into teams.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobOpportunities.map((job) => (
              <JobOpportunityCard key={job.id} job={job} applyTo={PROFESSIONAL_APPLICATION_ROUTE} variant="dark" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[30px] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.03)] sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Next step</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Build the skills that make your next move feel intentional.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/professional/programs" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-black/80">
                Explore all programs <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/professional/apply" className="inline-flex min-h-11 items-center gap-2 border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:border-black">
                Apply now <CheckCircle2 size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfessionalCareer;
