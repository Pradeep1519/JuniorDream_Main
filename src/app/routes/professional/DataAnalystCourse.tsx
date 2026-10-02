import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { getProfessionalCourseBySlug } from "@/data/professionalCourses";
import { PROFESSIONAL_APPLICATION_ROUTE } from "@/lib/professionalRoutes";
import { ProfessionalMentorMeetModal } from "@/components/forms/ProfessionalMentorMeetForm";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;

function extractTotalWeeks(duration?: string): number | null {
  if (!duration) return null;
  const numbers = duration.match(/\d+/g);
  if (!numbers || numbers.length === 0) return null;
  return Number(numbers[numbers.length - 1]);
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

const whoForIcons = [Compass, Briefcase, Users];

interface DataAnalystCourseProps {
  courseSlug: string;
}

export function DataAnalystCourse({ courseSlug }: DataAnalystCourseProps) {
  const course = getProfessionalCourseBySlug(courseSlug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [stickyApplySuppressed, setStickyApplySuppressed] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);

  useEffect(() => {
    const applyCard = document.querySelector("[data-course-apply-card]");
    const mentorSection = document.getElementById("mentor-consultation");
    const targets = [applyCard, mentorSection].filter((target): target is Element => target !== null);
    if (targets.length === 0) return;

    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const shouldSuppress = entry.target === applyCard
          ? entry.intersectionRatio >= 0.65
          : entry.isIntersecting;
        if (shouldSuppress) visibleTargets.add(entry.target);
        else visibleTargets.delete(entry.target);
      });
      setStickyApplySuppressed(visibleTargets.size > 0);
    }, { threshold: [0, 0.65] });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  if (!course) return null;

  const applyHref = `${PROFESSIONAL_APPLICATION_ROUTE}?course=${course.slug}`;
  const totalWeeks = extractTotalWeeks(course.phases?.[course.phases.length - 1]?.duration);
  const projectCount = course.projectsDetailed?.length ?? course.projects.length;

  const faqItems = [
    { q: "Who is this course for?", a: course.whoFor.length > 0 ? `This track is built for ${course.whoFor[0].toLowerCase()} and learners who want a more structured path into ${course.title.toLowerCase()}.` : "This track is built for learners who want a more structured path into the field." },
    { q: "Do I need prior coding experience?", a: course.prerequisites ? course.prerequisites : "Basic digital familiarity is enough. The program covers the required skills from the ground up." },
    { q: "What will I learn?", a: course.roadmap.length > 0 ? `A structured learning path covering ${course.roadmap.join(", ").toLowerCase()} and a final capstone outcome.` : "A structured learning path with project-based practice and mentor support." },
    { q: "How long is the course?", a: `${course.duration}, structured across ${totalWeeks ? `${totalWeeks} weeks and ` : ""}clear learning phases.` },
    { q: "What projects will I build?", a: course.projectsDetailed?.length ? `Projects include ${course.projectsDetailed.map((project) => project.title.toLowerCase()).join(", ")}.` : `Projects include ${course.projects.join(", ")}.` },
    { q: "Will I get mentor support?", a: "Yes — mentor support is built into the program for doubts, project feedback, and career-direction conversations." },
    { q: "Can I speak with a mentor before applying?", a: "Yes. You can schedule a focused 20-minute mentor conversation before deciding — it helps you compare the track with your goals and readiness." },
    { q: "What is the course fee?", a: course.fee ? `${course.fee.display} total. ${course.emiOptions?.map((e) => `${e.label}: ${e.perMonthDisplay} × ${e.months} months`).join(". ")}. ${course.emiRule ?? ""}` : "Ask your mentor for the current fee breakdown." },
    { q: "How do I apply?", a: "Use the Apply Now button on this page to start the Professional Application Form." },
    { q: "Is a certificate provided?", a: "Certificate details for this track are still being finalized — ask your mentor for the latest update." },
    { q: "Does Junior Dream guarantee placement?", a: "Junior Dream supports placement for enrolled learners and also runs open interview drives and hiring webinars for everyone, enrollment not required. Course completion does not guarantee a specific job or placement outcome." },
  ];

  return (
    <div className="bg-[#F7F7F5] text-black">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/10 bg-white">
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: course.accent }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-20 lg:px-20 xl:px-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Junior Dream · Professional Courses</p>
              <h1 className="mt-5 text-4xl font-light leading-[1.05] text-black sm:text-5xl lg:text-[3.4rem]" style={serif}>{course.title}</h1>
              <p className="mt-4 max-w-xl text-xl font-light leading-snug text-black/75" style={serif}>{course.shortDescription}</p>
              <p className="mt-5 max-w-xl text-base leading-8 text-black/65">{course.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={applyHref} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-black/85">
                  Apply now
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMentorModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#F8F8F6] px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-black transition hover:border-black/30"
                >
                  Talk to a mentor
                </button>
              </div>
            </div>

            {/* Premium Apply Course Card */}
            <div data-course-apply-card className="lg:sticky lg:top-24">
              <div className="rounded-[30px] border border-black/10 bg-[#121212] p-7 text-white shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]">
                <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/45">{course.title}</p>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <div>
                    <p className="m-0 flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/40"><Clock size={12} aria-hidden="true" /> Duration</p>
                    <p className="mt-1 text-base font-medium">{course.duration}</p>
                  </div>
                  <div>
                    <p className="m-0 flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/40"><Wallet size={12} aria-hidden="true" /> Course fee</p>
                    <p className="mt-1 text-base font-medium">{course.fee?.display ?? "Ask your mentor"}</p>
                  </div>
                </div>

                {course.emiOptions && course.emiOptions.length > 0 && (
                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="m-0 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-white/40">EMI available</p>
                    <div className="mt-3 space-y-3">
                      {course.emiOptions.map((emi) => (
                        <div key={emi.label} className="flex items-center justify-between rounded-[14px] border border-white/10 bg-white/5 px-4 py-3">
                          <span className="text-xs font-medium uppercase tracking-[0.06em] text-white/60">{emi.label}</span>
                          <span className="text-sm font-medium">{emi.perMonthDisplay}</span>
                        </div>
                      ))}
                    </div>
                    {course.emiRule && <p className="mt-3 text-xs leading-5 text-white/40">{course.emiRule}</p>}
                  </div>
                )}

                <Link to={applyHref} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-black transition hover:bg-white/90">
                  Apply now
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>

                <div className="mt-5 border-t border-white/10 pt-4 text-center">
                  <p className="m-0 text-xs text-white/50">Not sure if this course is right for you?</p>
                  <button
                    type="button"
                    onClick={() => setMentorModalOpen(true)}
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-white underline underline-offset-4"
                  >
                    Schedule a 20-Minute Mentor Meet <ArrowRight size={12} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="On this page" className="sticky top-[60px] z-30 border-b border-black/10 bg-[#F7F7F5]/95 backdrop-blur sm:top-[82px]">
        <div className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-4 py-3 text-xs text-black/55 sm:px-6 lg:px-20 xl:px-28">
          {[
            ["Overview", "course-overview"],
            ["Curriculum", "curriculum"],
            ["Projects", "projects"],
            ["Mentor meet", "mentor-consultation"],
            ["Investment", "course-investment"],
            ["FAQs", "course-faq"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} className="shrink-0 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">{label}</a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-18 lg:px-20 xl:px-28">

        {/* Why this track works */}
        <Reveal className="mt-10">
          <section id="course-overview" className="scroll-mt-32 rounded-[30px] border border-black/10 bg-white p-7 md:p-9">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Why this track works</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { title: "Career-aligned learning", text: "The curriculum is shaped around the types of analytical and decision-making work employers actually value." },
                { title: "Real project practice", text: "Students work through business cases, dashboards, experimentation, and forecasting instead of only theory." },
                { title: "Structured confidence", text: "Each phase builds practical reasoning, technical skills, and portfolio-ready work so the learner moves with clarity." },
              ].map((item) => (
                <div key={item.title} className="rounded-[20px] border border-black/10 bg-[#F8F8F6] p-5">
                  <p className="m-0 text-base font-medium text-black">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-black/60">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Course name", value: course.title },
                { label: "Duration", value: course.duration },
                { label: "Total weeks", value: totalWeeks ? `${totalWeeks} weeks` : "—" },
                { label: "Total fee", value: course.fee?.display ?? "Ask your mentor" },
                { label: "Learning mode", value: "Mentor-led, project-based" },
                { label: "Mentor support", value: "Included throughout" },
                { label: "Projects", value: `${projectCount} real projects` },
                { label: "Skill level", value: "Beginner-friendly" },
              ].map((item) => (
                <div key={item.label} className="rounded-[18px] border border-black/10 bg-[#F8F8F6] p-4">
                  <p className="m-0 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">{item.label}</p>
                  <p className="mt-1.5 text-sm font-medium text-black/80">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Learning timeline */}
        {course.phases && (
          <Reveal className="mt-10">
            <section className="rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Your learning timeline</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-light leading-tight text-black sm:text-3xl" style={serif}>A clear, four-phase path from fundamentals to a deployed outcome.</h2>
              <div className="relative mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-black/10 lg:block" aria-hidden="true" />
                {course.phases.map((phase, index) => (
                  <div key={phase.title} className="relative">
                    <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-black/70" style={{ backgroundColor: course.accent }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-base font-medium text-black">{phase.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-black/40">{phase.duration}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* Curriculum accordion */}
        {course.phases && (
          <Reveal className="mt-10">
            <section id="curriculum" className="scroll-mt-32 rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
              <p className="m-0 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40"><BookOpen size={13} aria-hidden="true" /> Curriculum</p>
              <h2 className="mt-3 text-2xl font-light leading-tight text-black sm:text-3xl" style={serif}>What You'll Learn</h2>
              <div className="mt-6 space-y-3">
                {course.phases.map((phase, index) => {
                  const isOpen = openFaq === -(index + 1);
                  return (
                    <div key={phase.title} className="rounded-[20px] border border-black/10 bg-[#F8F8F6]">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : -(index + 1))}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span>
                          <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/40">Module {String(index + 1).padStart(2, "0")} · {phase.duration}</span>
                          <span className="mt-1 block text-lg font-medium text-black">{phase.title}</span>
                        </span>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-transform ${isOpen ? "rotate-180" : ""}`}>
                          <ChevronDown size={14} aria-hidden="true" />
                        </span>
                      </button>
                      {isOpen && (
                        <ul className="space-y-2.5 px-5 pb-5 text-sm leading-6 text-black/65">
                          {phase.topics.map((topic) => (
                            <li key={topic} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" aria-hidden="true" />{topic}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </Reveal>
        )}

        {/* Skills */}
        <Reveal className="mt-10">
          <section className="rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Skills you'll build</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[...course.skills, ...course.technologies].map((item) => (
                <span key={item} className="rounded-full border border-black/10 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.06em] text-black/70" style={{ backgroundColor: course.accent }}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Projects */}
        {course.projectsDetailed && (
          <Reveal className="mt-10">
            <section id="projects" className="scroll-mt-32 rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Learn by building</p>
              <h2 className="mt-3 text-2xl font-light leading-tight text-black sm:text-3xl" style={serif}>Learn → Practice → Build → Analyze → Present</h2>
              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                {course.projectsDetailed.map((project, index) => {
                  const isCapstone = index === course.projectsDetailed!.length - 1;
                  return (
                    <div key={project.title} className="rounded-[22px] border border-black/10 bg-[#F8F8F6] p-5">
                      <span className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-black/50">
                        {isCapstone ? "Capstone project" : "Practice project"}
                      </span>
                      <h3 className="mt-4 text-base font-medium text-black">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/60">{project.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </Reveal>
        )}

        {/* Learning journey */}
        <Reveal className="mt-10">
          <section className="rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Learning journey</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {["Build the fundamentals", "Develop technical skills", "Work with real datasets", "Build projects", "Get mentor feedback", "Build your professional portfolio"].map((step, index) => (
                <div key={step} className="rounded-[20px] border border-black/10 bg-[#F8F8F6] p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">{index + 1}</span>
                  <p className="mt-3 text-sm font-medium text-black/80">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Mentor support */}
        <Reveal className="mt-10">
          <section className="rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Mentor support</p>
            <h2 className="mt-3 text-2xl font-light leading-tight text-black sm:text-3xl" style={serif}>Your Mentor. Your Questions. Your Direction.</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-black/65 sm:grid-cols-2 lg:grid-cols-3">
              {["Doubt support", "Project guidance", "Career discussions", "Learning roadmap", "Industry perspective", "Project feedback", "Skill-gap discussion"].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-[14px] border border-black/10 bg-[#F8F8F6] px-4 py-3"><Users size={14} className="shrink-0 text-black/50" aria-hidden="true" />{item}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setMentorModalOpen(true)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-black/85"
            >
              Schedule 20-Minute Mentor Meet
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </section>
        </Reveal>

        {/* Who is this course for + Prerequisites */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <section className="h-full rounded-[30px] border border-black/10 bg-white p-7 md:p-9">
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Who is this course for?</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {course.whoFor.map((item, index) => {
                  const Icon = whoForIcons[index % whoForIcons.length];
                  return (
                    <div key={item} className="rounded-[18px] border border-black/10 bg-[#F8F8F6] p-4">
                      <Icon size={18} className="text-black/60" aria-hidden="true" />
                      <p className="mt-3 text-sm leading-6 text-black/70">{item}</p>
                    </div>
                  );
                })}
                <div className="rounded-[18px] border border-black/10 bg-[#F8F8F6] p-4">
                  <Compass size={18} className="text-black/60" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-6 text-black/70">Career explorers trying to understand whether data is the right career direction — the mentor conversation above is built for exactly this.</p>
                </div>
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section className="h-full rounded-[30px] border border-black/10 bg-white p-7 md:p-9">
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Who can join?</p>
              <h3 className="mt-3 text-lg font-medium text-black">Prerequisites</h3>
              <p className="mt-2 text-sm leading-7 text-black/65">{course.prerequisites}</p>
              <h3 className="mt-5 text-lg font-medium text-black">Recommended background</h3>
              <p className="mt-2 text-sm leading-7 text-black/65">Comfort using a computer and basic school-level math is enough — the program teaches Python and SQL from first principles in Phase 1.</p>
            </section>
          </Reveal>
        </div>

        {/* Course duration + fee */}
        <Reveal className="mt-10">
          <section id="course-investment" className="scroll-mt-32 rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
            <p className="m-0 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40"><Wallet size={13} aria-hidden="true" /> Course investment</p>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="m-0 text-2xl font-medium text-black">{course.fee?.display ?? "Ask your mentor"}</p>
                <p className="mt-1 text-sm text-black/50">{course.duration}{totalWeeks ? ` · ${totalWeeks} weeks` : ""}</p>
              </div>
              <Link to={applyHref} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-black/85">
                Apply now
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {course.emiOptions && course.emiOptions.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {course.emiOptions.map((emi) => (
                  <div key={emi.label} className="rounded-[18px] border border-black/10 bg-[#F8F8F6] p-4">
                    <p className="m-0 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-black/40">{emi.label}</p>
                    <p className="mt-1.5 text-base font-medium text-black/80">{emi.perMonthDisplay} × {emi.months} months</p>
                  </div>
                ))}
              </div>
            )}
            {course.emiRule && <p className="mt-4 text-xs leading-5 text-black/45">{course.emiRule}</p>}

            <ul className="mt-6 grid gap-2 text-sm leading-6 text-black/65 sm:grid-cols-2">
              {["Mentor support throughout the program", "Full course access for the program duration", "All three projects and capstone review", "Learning resources and project feedback"].map((item) => (
                <li key={item} className="flex items-start gap-2"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-black/50" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Why Junior Dream */}
        <Reveal className="mt-10">
          <section className="relative overflow-hidden rounded-[30px] border border-black/10 bg-[#121212] p-7 text-white md:p-10">
            <div className="pointer-events-none absolute -left-16 -bottom-24 h-80 w-80 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: course.accent }} aria-hidden="true" />
            <div className="relative">
              <p className="m-0 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/50"><ShieldCheck size={13} aria-hidden="true" /> Why learn with Junior Dream</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {["Industry-oriented curriculum", "Mentor guidance throughout", "Project-based learning", "Structured, career-focused path"].map((item) => (
                  <div key={item} className="rounded-[18px] border border-white/15 bg-white/5 p-4 text-sm leading-6 text-white/75">{item}</div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Career direction */}
        <Reveal className="mt-10">
          <section id="course-faq" className="scroll-mt-32 rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
            <p className="m-0 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40"><TrendingUp size={13} aria-hidden="true" /> Career direction</p>
            <h2 className="mt-3 text-2xl font-light leading-tight text-black sm:text-3xl" style={serif}>Where Can This Track Take You?</h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {course.targetRoles?.map((role) => (
                <span key={role} className="rounded-full border border-black/10 bg-[#F8F8F6] px-4 py-2 text-sm font-medium text-black/75">{role}</span>
              ))}
            </div>
            <p className="mt-5 max-w-xl text-xs leading-6 text-black/45">Career outcomes depend on the learner's skills, projects, experience and individual hiring conditions — these are possible directions, not guaranteed outcomes.</p>
            <button
              type="button"
              onClick={() => setMentorModalOpen(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#F8F8F6] px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-black transition hover:border-black/30"
            >
              Discuss your career path with a mentor
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </section>
        </Reveal>

        {/* FAQ */}
        <Reveal className="mt-10">
          <section className="rounded-[30px] border border-black/10 bg-white p-7 md:p-10">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">FAQ</p>
            <h2 className="mt-3 text-2xl font-light leading-tight text-black sm:text-3xl" style={serif}>Frequently asked questions.</h2>
            <div className="mt-6 space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.q} className="rounded-[20px] border border-black/10 bg-[#F8F8F6]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-medium text-black">{item.q}</span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown size={14} aria-hidden="true" />
                      </span>
                    </button>
                    {isOpen && <p className="px-5 pb-5 text-sm leading-7 text-black/65">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Closing CTA */}
        <Reveal className="mt-10">
          <section className="rounded-[30px] border border-black/10 bg-[#F8F8F6] p-7 text-center md:p-10">
            <h2 className="mx-auto max-w-xl text-2xl font-light leading-tight text-black sm:text-3xl" style={serif}>{`Ready to Start Your ${course.title} Journey?`}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/60">Build practical skills, work on projects and learn with professional guidance.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to={applyHref} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-black/85">
                Apply now
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setMentorModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-black transition hover:border-black/30"
              >
                Talk to a mentor
              </button>
            </div>
          </section>
        </Reveal>
      </div>

      {/* Sticky apply bar */}
      <div className={`${stickyApplySuppressed ? "hidden" : "fixed"} inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 pr-[112px] backdrop-blur sm:hidden`}>
        <Link to={applyHref} className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white">
          Apply now
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
      <div className={`${stickyApplySuppressed ? "hidden" : "fixed hidden sm:flex"} bottom-6 left-6 z-40 max-w-xs items-center gap-4 rounded-full border border-black/10 bg-white/95 py-2 pl-5 pr-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur`}>
        <div className="text-xs leading-tight">
          <p className="m-0 font-medium text-black">{course.title}</p>
          <p className="m-0 text-black/45">{course.duration} · {course.fee?.display ?? "Ask your mentor"}</p>
        </div>
        <Link to={applyHref} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-black px-4 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white">
          Apply now
          <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>

      <ProfessionalMentorMeetModal
        courseName={course.title}
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />

      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  );
}

export default DataAnalystCourse;
