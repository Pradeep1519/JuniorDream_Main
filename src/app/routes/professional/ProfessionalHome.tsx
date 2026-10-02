import { Link } from "react-router";
import { ArrowRight, BookOpenText, BriefcaseBusiness, Building2, CheckCircle2, Cpu, GraduationCap, Quote, ShieldCheck, Sparkles, Star, Target, TrendingUp, Users } from "lucide-react";
import { professionalCourses } from "@/data/professionalCourses";
import { ProfessionalHero } from "./ProfessionalHero";

const highlights = [
  { title: "Career-focused learning", text: "Built for college students and professionals who want practical technology skills with clarity and momentum." },
  { title: "Project-led growth", text: "Learn through real workflows, portfolio thinking, and guided technical application." },
  { title: "Mentor support", text: "Get guidance from experienced mentors who understand technical growth and decision-making." },
];

const trustStats = [
  { value: "3+", label: "Core professional categories" },
  { value: "7", label: "Career-driven tracks" },
  { value: "100%", label: "Project-based structure" },
  { value: "1:1", label: "Mentor guidance available" },
];

const trustReasons = [
  { icon: Target, title: "Clear direction", text: "Every course is designed for specific career outcomes, not generic theory." },
  { icon: BookOpenText, title: "Deep learning model", text: "Hands-on curriculum, structured phases, and practical skill progression." },
  { icon: BriefcaseBusiness, title: "Career thinking", text: "We connect technical capability with skills employers and teams actually value." },
  { icon: ShieldCheck, title: "Mentor-backed", text: "Learners get support to navigate confusion, projects, and next steps with confidence." },
];

const learningJourney = [
  "Understand the right track for your goals",
  "Build foundations with clear, guided learning",
  "Practice on real projects and portfolio tasks",
  "Get mentor feedback that improves quality and confidence",
  "Move toward a stronger career-ready profile",
];

const learnerGroups = [
  "College students exploring tech careers",
  "Career switchers looking for direction",
  "Freshers building a practical portfolio",
  "Working professionals upskilling with real outcomes",
];

const successSignals = [
  { icon: TrendingUp, title: "Career-ready learning", text: "Every track is designed to help learners build confidence, skill, and direction." },
  { icon: Users, title: "Mentor-led support", text: "Structured feedback and guidance help students make better decisions faster." },
  { icon: Star, title: "Premium experience", text: "A clean, elevated learning journey that feels serious, high-quality, and future-facing." },
];

const differentiationFeatures = [
  { title: "Top industry mentors", text: "Learn from professionals from top MNCs, product teams, and real-world hiring environments." },
  { title: "Small batch learning", text: "Cohorts stay intentionally limited so each learner gets more attention, feedback, and momentum." },
  { title: "Live assessment system", text: "Weekly tests, skill checks, and evaluation loops keep the learning measurable and sharp." },
  { title: "Project execution support", text: "Go beyond learning theory with guided execution, reviews, and portfolio-quality implementation." },
  { title: "Practice sheets & worksheets", text: "Targeted practice material reinforces concepts and improves retention across every module." },
  { title: "Interview and problem-solving readiness", text: "Industry-style questions and case-based challenge sessions build real confidence for hiring." },
  { title: "Doubt resolution engine", text: "Get timely clarity on concepts, coding logic, and project blockers through structured support." },
  { title: "Portfolio-focused delivery", text: "Every learner is pushed toward work that looks credible, practical, and job-ready." },
];

const testimonials = [
  { quote: "The structure gave me clarity on where to begin and how to keep improving. It felt focused, not overwhelming.", name: "Riya S.", role: "Data Analyst Learner" },
  { quote: "I wanted a roadmap that matched my goal. The guidance and course flow made the whole process far more practical.", name: "Aman K.", role: "Career Switcher" },
  { quote: "The learning experience felt premium and serious. It helped me build confidence before interviews and projects.", name: "Neha P.", role: "Student" },
];

export function ProfessionalHome() {
  return (
    <div className="bg-[#F6F6F3] text-black">
      <ProfessionalHero />

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-3 px-4 py-5 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-20 xl:px-28">
          {trustStats.map((stat) => (
            <div key={stat.label} className="rounded-[20px] border border-black/10 bg-[#F8F8F6] px-4 py-5 text-center">
              <p className="text-2xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{stat.value}</p>
              <p className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="professional-highlights" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Why learners choose us</p>
            <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>A professional learning experience built for momentum.</h2>
          </div>
          <Link to="/professional/programs" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline underline-offset-4">Explore all programs <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {highlights.map(({ title, text }) => (
            <div key={title} className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F2F2EE] text-black">
                <Building2 size={18} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-light text-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#121212] py-16 text-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/40">Why it feels trustworthy</p>
              <h2 className="mt-3 text-3xl font-light text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>A structure designed to reduce confusion and build confidence.</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/68">
                We don’t just list courses — we help learners understand where they are, what they need to learn next, and how each skill connects to a real future path.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Clear learning direction",
                "Career-aware guidance",
                "Real project exposure",
                "Mentor support for decisions",
              ].map((item) => (
                <div key={item} className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/72">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">What makes us different</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Built around outcome, clarity, and practical growth.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trustReasons.map(({ icon: Icon, title, text }) => (
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
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">How the journey works</p>
            <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>A simple path from confusion to clarity.</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            {learningJourney.map((step, index) => (
              <div key={step} className="rounded-[24px] border border-black/10 bg-[#F8F8F6] p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-medium text-white">{index + 1}</div>
                <p className="text-sm leading-7 text-black/70">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[32px] border border-black/10 bg-[#F8F8F6] px-6 py-8 sm:px-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Built for serious learners</p>
              <h2 className="mt-3 max-w-xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>The right kind of learning environment for ambitious students and professionals.</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-black/68">
                We believe premium education is not about noise. It is about clarity, trust, and a learning structure that helps people move with intention. Our programs are designed to feel focused, practical, and genuinely useful.
              </p>
            </div>

            <div className="grid gap-4">
              {successSignals.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F0EA] text-black">
                    <Icon size={17} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-medium text-black">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-black/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[32px] border border-black/10 bg-[#121212] p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,0.14)] sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/40">Built like a premium platform</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-light text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>An ecosystem designed to go beyond basic course delivery.</h2>
            </div>
            <div className="flex flex-wrap gap-3 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-white/65">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">Only 15 learners per batch</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">Industry mentor access</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {differentiationFeatures.map(({ title, text }) => (
              <div key={title} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E8D4B5] text-xs font-semibold text-black">✓</div>
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/68">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">What learners are saying</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>A more confident path forward.</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <div key={name} className="rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F1EA] text-black">
                <Quote size={18} aria-hidden="true" />
              </div>
              <p className="text-base leading-8 text-black/68">“{quote}”</p>
              <div className="mt-6 border-t border-black/10 pt-4">
                <p className="text-sm font-medium text-black">{name}</p>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-black/45">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Who this is for</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Learning built for where you are today.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {learnerGroups.map((group) => (
            <div key={group} className="rounded-[24px] border border-black/10 bg-[#F8F8F6] p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                <GraduationCap size={18} aria-hidden="true" />
              </div>
              <p className="text-sm leading-7 text-black/70">{group}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Professional programs</p>
              <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Choose your path.</h2>
            </div>
            <Link to="/professional/programs" className="hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black underline underline-offset-4 sm:inline-flex">View all programs <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {professionalCourses.slice(0, 6).map((course) => (
              <Link key={course.id} to={`/professional/programs/${course.slug}`} className="group rounded-[28px] border border-black/10 bg-[#F8F8F6] p-5 text-left no-underline transition hover:-translate-y-1 hover:border-black/20 hover:bg-white">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-black/10" style={{ backgroundColor: course.accent }}>
                  <Cpu size={18} aria-hidden="true" />
                </div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.15em] text-black/45">{course.category}</p>
                <h3 className="mt-3 text-2xl font-light text-black">{course.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/60">{course.shortDescription}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black">
                  View details <ArrowRight size={14} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[32px] border border-black/10 bg-[#121212] p-8 text-white shadow-[0_30px_70px_rgba(0,0,0,0.15)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/40">Confidence starts here</p>
              <h2 className="mt-3 text-3xl font-light text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Not just courses. A path to better decisions and stronger outcomes.</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/70">
                Whether you are exploring your first technical path or trying to make a career move, Junior Dream Professional is designed to help you learn with clarity and move with confidence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/professional/programs" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-black">
                  Explore programs <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link to="/professional/mentorship" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white">
                  Talk to a mentor
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                "Mentor guidance for better choices",
                "Career-aware learning structure",
                "Portfolio strength and practical thinking",
                "A premium learning experience with trust at the center",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/75">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#E8D4B5]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8">
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Built for real-world progress</p>
          <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Learning that feels structured, credible, and motivating.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Premium feel", text: "A high-trust experience that looks and feels future-ready." },
            { icon: Target, title: "Clear objectives", text: "Every step is tied to outcomes, projects, and direction." },
            { icon: BriefcaseBusiness, title: "Practical value", text: "The emphasis stays on real-world problem-solving and career readiness." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[28px] border border-black/10 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F1EA] text-black">
                <Icon size={18} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-light text-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProfessionalHome;
