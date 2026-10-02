import { ArrowRight, BookOpenText, BrainCircuit, CheckCircle2, Lightbulb, MessageSquareQuote, ShieldCheck, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";

const missionPoints = [
  "Practical skills instead of only theory",
  "Industry-relevant learning roadmaps",
  "Hands-on projects and guided execution",
  "Mentor feedback and career direction",
];

const approachSteps = [
  { icon: BookOpenText, title: "Learn", text: "Understand the concepts, fundamentals, and workflows behind modern tools and systems." },
  { icon: Lightbulb, title: "Practice", text: "Work through exercises, assignments, and dataset-driven tasks that build real skill confidence." },
  { icon: BrainCircuit, title: "Build", text: "Create project-based work inspired by real-world use cases and professional requirements." },
  { icon: Users, title: "Get Guidance", text: "Receive feedback, mentorship, and career-oriented discussions that make the learning more meaningful." },
];

const technologies = ["Python", "SQL", "Data Analytics", "AI", "Machine Learning", "Generative AI", "Full Stack", "Cloud", "DevOps", "Cybersecurity"];

const courseOverview = [
  { title: "Data Analyst / Data Science & Analytics", text: "Data-driven decision making, dashboards, analytics workflows, and business intelligence foundations." },
  { title: "AI & Machine Learning", text: "Core concepts, model thinking, practical ML workflows, and AI application design." },
  { title: "Generative AI & Agents", text: "Prompting strategies, AI workflows, agent logic, and applied generative AI use cases." },
  { title: "Data Engineering", text: "Data pipelines, processing patterns, and real-world data systems for modern products and teams." },
  { title: "Full Stack Web Development", text: "Frontend, backend, APIs, databases, and end-to-end product thinking for modern digital products." },
  { title: "Cloud Engineering", text: "Cloud architecture, deployed systems, infrastructure awareness, and modern platform thinking." },
  { title: "DevOps", text: "Automation, deployment workflows, reliability, monitoring, and operational efficiency." },
  { title: "Cybersecurity", text: "Security fundamentals, risk awareness, and digital defense concepts across real systems." },
];

const studentBenefits = [
  "Structured curriculum with clear learning progression",
  "Technical skill development through real-world concepts",
  "Practical assignments and guided project execution",
  "Mentor guidance for questions, direction, and feedback",
  "Career discussions that connect learning to real opportunities",
  "Learning resources and course support throughout the journey",
];

const promises = [
  { title: "Clear course information", text: "Students know what they are signing up for, what is included, and how the course is structured." },
  { title: "Transparent fee structure", text: "Fees, payment options, and EMI terms are explained clearly so decisions are informed and practical." },
  { title: "Honest learning outcomes", text: "Our focus is on real capability building, practical skill growth, and guided execution — not misleading claims." },
  { title: "Simple application flow", text: "The process is clear, direct, and easy to understand before enrolling in a program." },
];

const reasons = [
  { icon: Target, title: "Practical Learning", text: "Concepts are connected to real tasks, projects, and professional workflows." },
  { icon: BrainCircuit, title: "Industry Perspective", text: "Learners understand how skills are relevant beyond the classroom and inside real teams." },
  { icon: Users, title: "Mentor Guidance", text: "Questions, feedback, and project direction become part of the learning process." },
  { icon: TrendingUp, title: "Structured Roadmap", text: "Each stage builds logically, making progress clearer and more achievable." },
  { icon: ShieldCheck, title: "Career Awareness", text: "Students start understanding roles, skill requirements, and the kind of work they want to do." },
];

const journeySteps = [
  "Explore a course",
  "Talk to a mentor",
  "Apply",
  "Learn the fundamentals",
  "Build projects",
  "Develop a portfolio",
  "Prepare for professional opportunities",
];

const faqs = [
  { question: "What is Junior Dream?", answer: "Junior Dream is a professional learning platform focused on helping students and early-career professionals build practical, career-relevant skills through structured learning, projects, and mentorship." },
  { question: "Who are the professional courses for?", answer: "These courses are designed for students, freshers, career switchers, and working professionals who want structured learning in technologies and business-critical skills." },
  { question: "Are the courses beginner-friendly?", answer: "The learning path is designed to support progression. Some courses may assume a basic foundation depending on the track, but each program is structured to help learners build step by step." },
  { question: "How does mentorship work?", answer: "Mentors guide learners through questions, project discussions, feedback, and learning direction so the process feels more practical and less isolated." },
  { question: "How do I choose the right course?", answer: "Students can review the course focus, skill outcomes, and content fit before applying. Speaking with a mentor before enrolling is also recommended for clarity." },
  { question: "Can I speak to a mentor before applying?", answer: "Yes. The platform is designed to help learners understand their direction through mentor conversations before making a final decision." },
  { question: "How are fees structured?", answer: "Fees and payment terms are communicated clearly, with EMI or flexible options depending on the program and the current structure in place." },
  { question: "How do I apply?", answer: "Students can explore a program, review the curriculum, and complete the application process through the platform to begin their learning journey." },
];

export function ProfessionalAbout() {
  return (
    <div className="bg-[#F6F6F3] text-black">
      <section className="border-b border-black/10 bg-[#F9F8F4]">
        <Container className="py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Why Junior Dream exists</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-light leading-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Building Skills for the Careers of Tomorrow.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/65">
                Junior Dream is a professional learning platform focused on helping students and aspiring professionals develop practical,
                industry-relevant skills through structured learning, hands-on projects, and mentor guidance.
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
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/40">Professional learning built differently</p>
              <div className="mt-6 space-y-4">
                {[
                  { icon: TrendingUp, label: "Structured learning", value: "Career-aligned roadmaps" },
                  { icon: BrainCircuit, label: "Real application", value: "Hands-on projects" },
                  { icon: Users, label: "Mentor support", value: "Guidance & direction" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-[20px] border border-black/10 bg-[#F8F8F6] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EADF] text-black">
                        <Icon size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-black/50">{label}</p>
                        <p className="mt-1 text-lg font-light text-black">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Our mission</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            We help learners move beyond theoretical knowledge into practical, career-relevant capability.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {missionPoints.map((point) => (
            <div key={point} className="rounded-[26px] border border-black/10 bg-[#F8F8F6] p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <CheckCircle2 size={18} aria-hidden="true" />
              </div>
              <p className="text-base leading-7 text-black/70">{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
          <div className="mb-8">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Our approach</p>
            <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Learn. Practice. Build. Get guidance.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {approachSteps.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[26px] border border-black/10 bg-[#F8F8F6] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/45">{title}</p>
                <h3 className="mt-3 text-xl font-light text-black">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-black/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Industry-relevant learning</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Our professional courses are designed around practical skills and workflows relevant to today&apos;s technology and business environment.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-black/10 bg-white px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-black/70">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[30px] border border-black/10 bg-[#121212] p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,0.14)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/40">Mentorship</p>
              <h2 className="mt-3 max-w-xl text-3xl font-light text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Learn with guidance from industry experience.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/70">
                Learning becomes more meaningful when students can ask questions, discuss projects, and understand how skills are applied beyond the classroom.
                Our mentor-led approach is designed to connect structured learning with practical industry perspectives.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="space-y-4">
                {[
                  "Feedback on projects and problem solving",
                  "Career discussion and learning direction",
                  "Guidance on concept clarity and execution",
                  "A more personal and practical learning experience",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/75">
                    <MessageSquareQuote size={16} className="mt-0.5 shrink-0 text-[#E8D4B5]" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Professional courses</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            A career-focused catalog built for real-world relevance.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {courseOverview.map(({ title, text }) => (
            <div key={title} className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/40">Career track</p>
              <h3 className="mt-3 text-2xl font-light text-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
          <div className="mb-8">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">What students actually get</p>
            <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Inside a Junior Dream Professional Course.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {studentBenefits.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[20px] border border-black/10 bg-[#F8F8F6] p-4">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-black" aria-hidden="true" />
                <p className="text-sm leading-7 text-black/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Transparency & trust</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            We believe students should know exactly what they are signing up for.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {promises.map(({ title, text }) => (
            <div key={title} className="rounded-[28px] border border-black/10 bg-[#F8F8F6] p-6">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/45">Transparency</p>
              <h3 className="mt-3 text-2xl font-light text-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Why students choose Junior Dream</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Built around the learner, not just the syllabus.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {reasons.map(({ icon: Icon, title, text }) => (
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

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
          <div className="mb-8">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Student journey</p>
            <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              From exploration to professional readiness.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
            {journeySteps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-[20px] border border-black/10 bg-[#F8F8F6] p-4 text-sm leading-6 text-black/70">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[0.62rem] font-medium text-white">{index + 1}</div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">FAQ</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Questions students often ask before they begin.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group rounded-[24px] border border-black/10 bg-white p-5 text-black">
              <summary className="cursor-pointer list-none text-base font-medium text-black">
                <span className="flex items-center justify-between gap-4">
                  {question}
                  <ArrowRight className="transition-transform group-open:rotate-90" size={16} aria-hidden="true" />
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-black/65">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[30px] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.03)] sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Your career journey starts here</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Your Career Journey Starts With the Right Skills.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/professional/programs" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-black/80">
                Explore professional courses <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/professional/apply" className="inline-flex min-h-11 items-center gap-2 border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:border-black">
                Apply now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfessionalAbout;
