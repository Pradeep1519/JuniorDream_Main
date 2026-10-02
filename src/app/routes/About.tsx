import { useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen, Brain, Compass, Lightbulb, MessageCircle, Users } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { engineeringBatches } from "@/data/engineeringCurriculum";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

const approachSteps = [
  { number: "01", title: "Understand", description: "Start with the learner’s class, current understanding, questions, and interests.", icon: Compass },
  { number: "02", title: "Build foundations", description: "Strengthen school concepts and the fundamentals needed for the next stage.", icon: BookOpen },
  { number: "03", title: "Explore", description: "Connect familiar subjects with age-appropriate technology and engineering ideas.", icon: Lightbulb },
  { number: "04", title: "Practice", description: "Use guided exercises, coding tasks, and projects where they are part of the selected batch.", icon: Brain },
  { number: "05", title: "Reflect and grow", description: "Notice what is becoming clearer and where a learner may need another explanation or attempt.", icon: Users },
];

const journeySteps = ["Discover", "Understand", "Learn", "Practice", "Build", "Reflect", "Grow"];

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-black/40">{children}</p>;
}

function openAICounsellor() {
  window.dispatchEvent(new CustomEvent("open-ai-counsellor"));
}

export function About() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");

    document.title = "About Junior Dream | Learning With Direction";
    description?.setAttribute(
      "content",
      "Learn how Junior Dream connects school foundations with age-appropriate engineering and technology learning for students in Classes 6 to 12.",
    );

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== null && previousDescription !== undefined) {
        description.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <div className="bg-white text-black">
      <section className="border-b border-black/10 bg-[#F5F5F2]">
        <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl">
            <Eyebrow>About Junior Dream</Eyebrow>
            <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl" style={serif}>
              Building the future, one student at a time.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8" style={sans}>
              Junior Dream brings academic learning and future-oriented exploration together. Our current Engineering program helps students in Classes 6 to 12 build foundations at a pace and level suited to their class.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/programs/engineering" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Explore engineering <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/mentorship" className="inline-flex min-h-11 items-center border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Our mentoring approach
              </Link>
            </div>
          </div>
          <div className="relative min-w-0 overflow-hidden border border-black/10 bg-white">
            <img
              src={engineeringBatches[0].image}
              alt="Students learning together"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-center justify-between gap-4 border-t border-black/10 px-4 py-3 text-xs text-black/55 sm:px-5">
              <span>Learning shaped around the student’s class</span>
              <span className="shrink-0 uppercase tracking-[0.12em]">Classes 6–12</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <Eyebrow>What is Junior Dream?</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight" style={serif}>A learning path that connects today’s lessons to tomorrow’s questions.</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-black/65 sm:text-base sm:leading-8" style={sans}>
            <p>Junior Dream is an online education and mentorship platform. Students work with school subjects while exploring additional ideas that help them understand how concepts can be used beyond a textbook.</p>
            <p>Engineering is the current open program. Its class-wise batches range from computer fundamentals and Scratch for younger learners to programming, web foundations, data structures, and broader technology topics in later classes.</p>
            <Link to="/programs" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline decoration-black/25 underline-offset-4 hover:decoration-black">
              See all programs <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-[#111111] py-14 text-white md:py-20">
        <Container className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <Eyebrow>Why this matters</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight" style={serif}>Learning should prepare students for more than the next exam.</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-white/65 sm:text-base sm:leading-8" style={sans}>
            <p>Strong academic foundations matter. So does the chance to ask why an idea works, where it might be useful, and what happens when a student tries it in practice.</p>
            <p>Junior Dream’s aim is to make those connections more visible, without asking students to leave their school learning behind. The additional pathway is organized by class, so exploration can grow with the learner.</p>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The Junior Dream approach</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl" style={serif}>From understanding a concept to using it with confidence.</h2>
            <p className="mt-4 text-sm leading-7 text-black/55 sm:text-base" style={sans}>The emphasis and activities differ by batch; this is the learning direction that connects them.</p>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {approachSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="border-t border-black/15 pt-4">
                  <div className="flex items-center justify-between text-black/35">
                    <span className="text-xs">{step.number}</span>
                    <Icon size={17} aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/55">{step.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#F5F5F2] py-14 md:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Eyebrow>Academics + future skills</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight sm:text-4xl" style={serif}>One learning journey, shaped for different stages.</h2>
            </div>
            <Link to="/programs/engineering" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline decoration-black/25 underline-offset-4 hover:decoration-black">
              Browse engineering courses <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {engineeringBatches.map((batch) => (
              <article key={batch.id} className="min-w-0 overflow-hidden border border-black/10 bg-white">
                <img src={batch.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <div className="p-5 sm:p-6">
                  <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-black/40">Classes {batch.classRange}</p>
                  <h3 className="mt-2 text-2xl font-light" style={serif}>{batch.batchLevel}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/60">{batch.shortDescription}</p>
                  <p className="mt-4 border-t border-black/10 pt-4 text-xs leading-5 text-black/55">
                    <span className="font-medium text-black/70">Technology focus: </span>{batch.techTopics.slice(0, 3).join(" · ")}
                  </p>
                  <Link to={`/programs/engineering/class-${batch.classes[0]}/${batch.classes[0]}-essential`} className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                    View a course <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Engineering starts with thinking</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl" style={serif}>Engineering doesn’t start in college.</h2>
            <p className="mt-5 text-sm leading-7 text-black/60 sm:text-base sm:leading-8" style={sans}>
              It can begin with noticing patterns, breaking a problem into steps, and learning how a computer follows instructions. Junior Dream introduces these ideas in stages: the Foundation batch lists computer fundamentals and Scratch; Explorer adds Python, Java, web basics, and introductory data structures; Achiever extends into advanced technology topics and JEE-relevant problem solving.
            </p>
            <Link to="/programs/engineering" className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline decoration-black/25 underline-offset-4 hover:decoration-black">
              Explore the engineering pathway <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Think clearly", "Practice logic, sequencing, and problem solving at a level suited to the batch."],
              ["Learn by trying", "Coding labs, guided tasks, and projects appear where listed in the selected curriculum."],
              ["Keep the foundations", "School subjects remain part of the course information alongside technology learning."],
              ["Move step by step", "Topics build from digital confidence toward programming and broader engineering ideas."],
            ].map(([title, description]) => (
              <div key={title} className="border border-black/10 p-5">
                <h3 className="text-base font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-[#F5F5F2] py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Every learner is different</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl" style={serif}>Understand the student before deciding how to guide them.</h2>
            <p className="mt-5 text-sm leading-7 text-black/60 sm:text-base sm:leading-8" style={sans}>
              Students bring different starting points, interests, strengths, and questions. The Junior Dream mentoring approach is designed to notice what a learner needs, connect ideas to practical context, and adapt the next step as they grow.
            </p>
            <Link to="/mentorship" className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline decoration-black/25 underline-offset-4 hover:decoration-black">
              Explore our mentors <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="border-l border-black/15 pl-6 sm:pl-8">
            <Eyebrow>Mentor-led perspective</Eyebrow>
            <p className="mt-4 text-xl font-light leading-8 text-black/75 sm:text-2xl sm:leading-9" style={serif}>
              “The aim is not only to finish a chapter. It is to help a student ask a better question, try an idea, and explain their reasoning.”
            </p>
            <p className="mt-4 text-xs leading-5 text-black/45">Junior Dream’s published mentoring approach. Individual mentor profiles are shared after verification.</p>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The learning journey</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl" style={serif}>Small steps make progress easier to see.</h2>
          </div>
          <ol className="mt-9 grid list-none gap-0 p-0 sm:grid-cols-2 lg:grid-cols-7">
            {journeySteps.map((step, index) => (
              <li key={step} className="relative border-l border-black/15 py-3 pl-5 sm:border-l-0 sm:border-t sm:pl-0 sm:pr-4 sm:pt-5">
                <span className="absolute -left-[5px] top-4 h-2 w-2 rounded-full bg-black sm:-top-[5px] sm:left-0" aria-hidden="true" />
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/35">0{index + 1}</span>
                <h3 className="mt-2 text-lg font-medium">{step}</h3>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-[#111111] py-14 text-white md:py-20">
        <Container className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <Eyebrow>For parents</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight" style={serif}>A clearer view of what a student is learning.</h2>
          </div>
          <div className="text-sm leading-7 text-white/65 sm:text-base sm:leading-8" style={sans}>
            <p>Parents are part of the learning journey. Published course plans list progress reports, assessments, and Parent Portal access in selected tiers; the exact features depend on the class and plan.</p>
            <p className="mt-4">The course pages show the current batch and plan details. For questions about a learner’s fit or enrollment, families can also contact the team directly.</p>
            <div className="mt-6 flex flex-wrap gap-5">
              <Link to="/programs/engineering" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">Compare course plans <ArrowRight size={14} aria-hidden="true" /></Link>
              <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">Contact Junior Dream <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <Eyebrow>Beyond marks</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight" style={serif}>Academic foundation. Deeper understanding. Room to explore.</h2>
          </div>
          <p className="m-0 text-sm leading-7 text-black/60 sm:text-base sm:leading-8" style={sans}>
            Academic progress remains important. Alongside it, students can develop curiosity, clearer reasoning, problem-solving habits, and practical confidence. These are not promises of a particular result; they are areas the course journey is designed to help learners explore and practise.
          </p>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-[#F5F5F2] py-14 md:py-20">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Our direction</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl" style={serif}>Help students meet the future with understanding and curiosity.</h2>
            <p className="mt-5 text-sm leading-7 text-black/60 sm:text-base sm:leading-8" style={sans}>
              Junior Dream’s long-term direction is to help learners build the foundations and confidence to explore engineering, technology, and the fields that interest them, with a clearer sense of how learning connects to the world around them.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-black py-14 text-white md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Continue exploring</Eyebrow>
            <h2 className="mt-4 text-3xl font-light sm:text-4xl" style={serif}>Ready to explore the Junior Dream journey?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base" style={sans}>Compare the courses, learn about mentorship, or ask Junior Dream AI for help finding a starting point.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/programs" className="inline-flex min-h-11 items-center gap-2 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:bg-white/85">Explore courses <ArrowRight size={14} aria-hidden="true" /></Link>
              <Link to="/mentorship" className="inline-flex min-h-11 items-center border border-white/30 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:border-white">Meet our mentors</Link>
              <Link to="/faq" className="inline-flex min-h-11 items-center border border-white/30 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:border-white">Visit FAQs</Link>
              <button type="button" onClick={openAICounsellor} className="inline-flex min-h-11 items-center gap-2 border border-white/30 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <MessageCircle size={14} aria-hidden="true" /> Talk to Junior Dream AI
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default About;