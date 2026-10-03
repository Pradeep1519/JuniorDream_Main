import { useState } from "react";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, MessageSquareQuote, ShieldCheck, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { MentorProfileModal } from "@/components/mentors/MentorProfileModal";
import { professionalMentors, type ProfessionalMentorProfile } from "@/data/professionalMentors";

const mentorFocus = [
  { title: "Product & engineering mentors", description: "Guidance for learners building practical systems and thinking in product-oriented ways." },
  { title: "AI & data mentors", description: "Support around model thinking, analytics, and applied problem solving in data-driven projects." },
  { title: "Cloud & platform mentors", description: "Direction for learners exploring reliability, architecture, and modern deployment patterns." },
  { title: "Career growth mentors", description: "Advice that helps learners make better learning choices and build a stronger future path." },
];

const mentorshipBenefits = [
  { icon: MessageSquareQuote, title: "Clarify doubts quickly", text: "Resolve confusion before it slows momentum and keeps learning structured." },
  { icon: BrainCircuit, title: "Improve execution", text: "Get feedback on projects, logic, workflow choices, and application quality." },
  { icon: Target, title: "Choose the right path", text: "Understand what kind of role, skill stack, and direction is the better fit for you." },
  { icon: TrendingUp, title: "Keep moving forward", text: "Stay accountable with a clear system that supports steady, measurable progress." },
];

const supportModel = [
  "One-to-one guidance for learning clarity",
  "Project feedback and review discussions",
  "Career and role orientation conversations",
  "Support for technical decision-making and next steps",
];

export function ProfessionalMentors() {
  const [selectedMentor, setSelectedMentor] = useState<ProfessionalMentorProfile | null>(null);

  return (
    <div className="bg-[#F6F6F3] text-black">
      <section className="border-b border-black/10 bg-[#F9F8F4]">
        <Container className="py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Mentorship</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-light leading-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Learn with guidance from people who understand how real industry work actually happens.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/65">
                Our mentoring model is designed to help learners move beyond passive study. It supports better decision-making,
                stronger project thinking, and more structured career clarity through real-world, practical guidance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/professional/programs" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white no-underline transition-colors hover:bg-black/80">
                  Explore programs <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link to="/professional/apply" className="inline-flex min-h-11 items-center border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-black no-underline transition-colors hover:border-black">
                  Talk to a mentor
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-black/10 bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.05)] sm:p-7">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/40">A more complete learning experience</p>
              <div className="mt-6 space-y-4">
                {[
                  { icon: Users, label: "Guidance", value: "Practical learning support" },
                  { icon: BriefcaseBusiness, label: "Career clarity", value: "Role and roadmap awareness" },
                  { icon: ShieldCheck, label: "Trust", value: "Professional direction, not guesswork" },
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
          <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Mentor support</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            More than concept teaching — a system that helps learners apply, understand, and advance.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {mentorshipBenefits.map(({ icon: Icon, title, text }) => (
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
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Focus areas</p>
            <h2 className="mt-3 text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Expertise across the technologies and roles that matter most today.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {mentorFocus.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-black/10 bg-[#F8F8F6] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.03)]">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/40">Mentor track</p>
                <h3 className="mt-3 text-2xl font-light text-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Mentor network</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Learn from people building real-world careers across data, AI, product, and technology.
            </h2>
          </div>
          <div className="text-sm text-black/55">4 specialist mentors guiding learners across core skills and career paths.</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {professionalMentors.map((mentor) => (
            <button
              key={mentor.id}
              type="button"
              onClick={() => setSelectedMentor(mentor)}
              className="group overflow-hidden rounded-[28px] border border-black/10 bg-white text-left shadow-[0_18px_40px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F1F0EC]">
                <div className="absolute inset-0 grid place-items-center text-5xl font-light text-black/25" aria-hidden="true">{mentor.name.trim().charAt(0).toUpperCase()}</div>
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  loading="lazy"
                  onError={(event) => { event.currentTarget.style.display = "none"; }}
                  className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/45">{mentor.courseFocus}</div>
                <h3 className="mt-2 text-xl font-medium text-black">{mentor.name}</h3>
                <p className="mt-2 text-sm text-black/65">{mentor.currentRole}</p>
                <p className="mt-1 text-sm text-black/55">{mentor.company}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.specialization.slice(0, 3).map((item) => (
                    <span key={item} className="rounded-full bg-[#F4F3EE] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.08em] text-black/60">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-black/45">{mentor.experience}</span>
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black">
                    View profile <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[30px] border border-black/10 bg-[#121212] p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,0.14)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/40">How it works</p>
              <h2 className="mt-3 max-w-xl text-3xl font-light text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                A support system that helps students stay clear, consistent, and confident.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportModel.map((item) => (
                <div key={item} className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="rounded-[30px] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.03)] sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Start your path</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-light text-black sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Whether you are starting or switching, the right guidance can change your direction.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/professional/programs" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-black/80">
                Explore courses <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/professional/apply" className="inline-flex min-h-11 items-center gap-2 border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:border-black">
                Apply now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MentorProfileModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
    </div>
  );
}

export default ProfessionalMentors;
