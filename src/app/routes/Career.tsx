import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { JobOpportunityCard } from "@/components/common/JobOpportunityCard";
import { engineeringBatches } from "@/data/engineeringCurriculum";
import { jobOpportunities, type JobOpportunity } from "@/data/jobOpportunities";
import { db } from "@/lib/firebase";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="m-0 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-black/40">{children}</p>;
}

export function Career() {
  const [displayJobs, setDisplayJobs] = useState<JobOpportunity[]>(jobOpportunities);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const mapped = snapshot.docs
          .filter((docItem) => {
            const job = docItem.data();
            return job.isActive !== false;
          })
          .map((docItem) => {
            const job = docItem.data();
            const title = job.title || "Open opportunity";
            const track = job.department || "Technology";
            const summary = job.description || `${title} opportunity for aspiring learners.`;
            const details = [
              job.location ? `Location: ${job.location}` : "",
              job.experience ? `Experience: ${job.experience}` : "",
              job.salary ? `Compensation: ${job.salary}` : "",
              job.applyLink ? "Apply through Junior Dream portal" : "",
            ].filter(Boolean);

            return {
              id: job.id || docItem.id,
              title,
              track,
              format: job.employmentType || "Hiring Webinar",
              timeline: `${job.location || "Hybrid"} • ${job.experience || "Flexible"}`,
              summary,
              details: details.length ? details : ["Open opportunity for interested learners."],
            } satisfies JobOpportunity;
          });

        if (isMounted) {
          setDisplayJobs(mapped.length > 0 ? mapped : jobOpportunities);
        }
      } catch (error) {
        if (isMounted) {
          setDisplayJobs(jobOpportunities);
        }
      }
    }

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white text-black">
      <section className="border-b border-black/10 bg-[#F5F5F2]">
        <Container className="py-14 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow>Career Readiness</Eyebrow>
            <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl" style={serif}>
              The careers of tomorrow are being shaped by AI today.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8" style={sans}>
              Technology, data, and artificial intelligence are becoming part of almost every future career. Junior
              Dream&apos;s Engineering program helps students in Classes 6 to 12 build the early comfort with
              computing and problem-solving that this future will expect.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/programs/engineering" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Explore the engineering program <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/mentorship" className="inline-flex min-h-11 items-center border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Our mentoring approach
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <Eyebrow>Why this matters</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight" style={serif}>
              Building comfort with technology early, one class at a time.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-black/65 sm:text-base sm:leading-8" style={sans}>
            <p>
              Students don&apos;t need to decide on a career today. What helps most is becoming comfortable with how
              computers, logic, and data work — so that when the time comes to choose a direction, technology and AI
              feel familiar rather than unfamiliar.
            </p>
            <p>
              That is why the Engineering program is organized by class: younger learners start with computer
              fundamentals and visual programming, while older students move into programming, web foundations, data
              structures, and broader technology topics that connect to real-world fields, including AI.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-[#111111] py-14 text-white md:py-20">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Where early exposure leads</Eyebrow>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl" style={serif}>
              A learning path that grows with the student, class by class.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {engineeringBatches.map((batch) => (
              <div key={batch.id} className="border border-white/15 bg-white/[0.03] p-6">
                <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/40">
                  Classes {batch.classRange}
                </p>
                <h3 className="mt-2 text-2xl font-light" style={serif}>{batch.batchLevel}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{batch.shortDescription}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-white/55">
                  <span className="font-medium text-white/75">Technology focus: </span>
                  {batch.techTopics.slice(0, 3).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#F5F5F2] py-14 md:py-20">
        <Container>
          <Eyebrow>Hiring &amp; interview drives</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight sm:text-4xl" style={serif}>
            A look at the hiring webinars Junior Dream runs — for students and non-students alike.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8" style={sans}>
            Junior Dream places its own course students, and also runs open interview drives and hiring webinars for
            anyone interested — course enrollment is not required to attend or register.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayJobs.map((job) => (
              <JobOpportunityCard key={job.id} job={job} applyTo="/apply" />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight sm:text-4xl" style={serif}>
              Curiosity today. Confidence for whatever comes next.
            </h2>
          </div>
          <Link to="/programs" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline decoration-black/25 underline-offset-4 hover:decoration-black">
            Browse all programs <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </div>
  );
}

export default Career;
