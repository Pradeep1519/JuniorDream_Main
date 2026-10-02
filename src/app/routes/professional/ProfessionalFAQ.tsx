import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown, CircleHelp } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { professionalCourses } from "@/data/professionalCourses";

type FAQItem = { id: string; question: string; answer: ReactNode };
type FAQGroup = { title: string; description: string; items: FAQItem[] };

const coursePriceRows = professionalCourses.map((course) => ({
  name: course.title,
  duration: course.duration ?? "See course page",
  fee: course.fee?.display ?? "Contact us for current fees",
  emi: course.emiOptions?.map((option) => option.perMonthDisplay).join(" or ") ?? "See course page",
}));

const groups: FAQGroup[] = [
  {
    title: "Choosing your program",
    description: "Start with your current skills, interests, and the work you want to learn to do.",
    items: [
      {
        id: "who-it-is-for",
        question: "Who are the professional programs designed for?",
        answer: <>They are designed primarily for college students and early-career learners who want structured, practical technology learning. Some tracks are also suitable for career switchers. Entry expectations vary by course, so check its prerequisites before applying.</>,
      },
      {
        id: "available-programs",
        question: "Which programs can I choose from?",
        answer: <><p className="m-0">The current catalog covers data and AI, software development, cloud engineering, .NET and Azure, software engineering, and QA automation.</p><Link to="/professional/programs" className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black underline underline-offset-4">View all programs <ArrowRight size={13} aria-hidden="true" /></Link></>,
      },
      {
        id: "choose-course",
        question: "How do I know which course is right for me?",
        answer: <>Compare the course outcomes, prerequisite notes, tools, and syllabus with your current experience and goals. If you are unsure, contact the team before applying and ask them to explain the differences between the relevant tracks.</>,
      },
      {
        id: "prerequisites",
        question: "Do I need previous coding or technology experience?",
        answer: <>There is no single prerequisite for every program. For example, the Full Stack Web Development page says no advanced coding experience is required, while AI &amp; Machine Learning recommends Python basics. Each course page lists its own expectations; choose based on those details, not on a general promise that every course starts at the same level.</>,
      },
      {
        id: "duration-curriculum",
        question: "How long are the programs, and what will I study?",
        answer: <>Listed program durations currently range from 4 to 8 months. Each course page contains its phase-by-phase curriculum, technologies, and project outlines. Review the individual syllabus for the exact topics and pacing before you enroll.</>,
      },
      {
        id: "projects",
        question: "Will I work on practical projects?",
        answer: <>The course catalog includes project briefs and capstone ideas for each track, such as analytics dashboards, web applications, AI workflows, cloud deployments, and QA test suites. The project scope and feedback format depend on the program; ask the team what is included in your specific cohort.</>,
      },
    ],
  },
  {
    title: "Fees & enrollment",
    description: "Review the listed costs and confirm the terms that apply to your selected cohort before paying.",
    items: [
      {
        id: "course-fees",
        question: "What are the current listed course fees?",
        answer: <><p className="m-0">These are the fees currently shown in the course catalog. Confirm the amount and any applicable terms with the team before making a payment.</p><div className="mt-4 divide-y divide-black/10 border-y border-black/10">{coursePriceRows.map((course) => <div key={course.name} className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="text-sm font-medium text-black">{course.name}</div><div className="mt-1 text-xs text-black/50">{course.duration}</div></div><div className="text-left sm:text-right"><div className="text-sm font-medium text-black">{course.fee}</div><div className="mt-1 text-xs text-black/50">{course.emi}</div></div></div>)}</div><p className="mb-0 mt-3 text-xs leading-5 text-black/50">Monthly installment options are shown only where they are listed for that course. Final payment terms should be confirmed before enrollment.</p></>,
      },
      {
        id: "emi",
        question: "Are installment or EMI options available?",
        answer: <>Several course pages list full-payment and installment options. The catalog states that the listed EMI plan closes two months before the program ends, leaving the final two months EMI-free. Check the selected course page and confirm the exact schedule and total payable amount with the team before choosing a plan.</>,
      },
      {
        id: "application-process",
        question: "How do I apply, and when is my place confirmed?",
        answer: <>Choose a program and start its application. The form collects contact details, education, experience, goals, and a payment-plan selection for review. Submitting an application is not by itself confirmation of enrollment; follow the instructions shown after submission and wait for confirmation from the team.</>,
      },
      {
        id: "refunds",
        question: "What is the cancellation or refund policy?",
        answer: <>A detailed cancellation and refund policy is not published in the course catalog. Please request the current written policy, including any deadlines or deductions, and read it before paying. We do not want you to rely on assumptions about refunds.</>,
      },
      {
        id: "mentor-meeting",
        question: "Can I speak with someone before applying?",
        answer: <>Yes. You can request a course-fit conversation through the course page. The form asks for your preferred contact window and topics; submitting it is a request, not a confirmed appointment. The team will contact you to coordinate a time.</>,
      },
    ],
  },
  {
    title: "Career support & placement",
    description: "Structured preparation, company connections, and continued applications are part of the placement journey.",
    items: [
      {
        id: "mentorship",
        question: "What does mentor support include?",
        answer: <>The professional site describes guidance around course fit, learning direction, project thinking, and career orientation. A fixed meeting cadence, one-to-one mentor assignment, and response-time commitment are not specified for every course. Ask the team to confirm the support available in your chosen program before enrolling.</>,
      },
      {
        id: "schedule-format",
        question: "Are classes live, recorded, online, or in person?",
        answer: <>The public course catalog describes curriculum and duration but does not consistently specify delivery format, weekly timetable, or recording access. Please get the format, cohort start date, weekly time commitment, and attendance expectations confirmed for your selected batch.</>,
      },
      {
        id: "job-outcomes",
        question: "How does Junior Dream support students with job placement?",
        answer: <>Placement support is part of Junior Dream’s student journey. We connect students with hiring opportunities through company HR contacts and Junior Dream references, then support them as they apply and prepare for interviews. The employer makes the final selection and offer; no specific company, role, or hiring timeline can be promised.</>,
      },
      {
        id: "mock-interviews",
        question: "What interview preparation do students receive?",
        answer: <>Before company interviews, students take part in multiple mock interviews designed around industry expectations. These practice rounds help students improve how they explain their skills, projects, and problem-solving approach before meeting an employer.</>,
      },
      {
        id: "employer-interviews",
        question: "Who conducts the actual company interviews?",
        answer: <>Employer interviews are conducted by the hiring company’s team, including MNC HR professionals and managers, depending on the role and hiring process. Junior Dream helps connect and prepare students; the employer controls its interview stages and hiring decision.</>,
      },
      {
        id: "placement-portal",
        question: "Can I keep applying for jobs through the portal if I have not been placed yet?",
        answer: <>Yes. Students can continue applying to suitable interview opportunities through their Junior Dream portal while they are seeking a role, and keep doing so until they secure a job. Keep your profile, resume, and application details up to date so the team can support your ongoing search.</>,
      },
      {
        id: "certificate",
        question: "Will I receive a certificate, and is it accredited?",
        answer: <>Certificate details and accreditation status are not specified in the published professional course information. Before enrolling, ask who issues the certificate, what completion criteria apply, and whether any external recognition is formally documented. Do not assume accreditation unless it is confirmed in writing.</>,
      },
      {
        id: "tools-costs",
        question: "Are software, cloud, or other tool costs included in the fee?",
        answer: <>The catalog lists technologies used in the curriculum but does not say that paid software subscriptions, cloud usage, or exam fees are included. Ask for a written list of any required third-party tools and additional costs before you commit.</>,
      },
    ],
  },
];

export function ProfessionalFAQ() {
  const [openId, setOpenId] = useState<string | null>(groups[0]?.items[0]?.id ?? null);

  return (
    <div className="bg-[#F6F6F3] text-black">
      <section className="border-b border-black/10 bg-[#F9F8F4]">
        <Container className="py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Professional FAQ</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-light leading-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Clear answers. Confident decisions.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-black/60">
                Explore the programs, understand the process, and know what to confirm before you commit. We keep published details distinct from policies that still need confirmation.
              </p>
            </div>
            <div className="border-t border-black/15 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <CircleHelp size={18} className="text-black/45" aria-hidden="true" />
              <p className="mt-4 text-sm leading-6 text-black/60">Need an answer specific to your background or course choice?</p>
              <Link to="/professional/contact" className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black underline underline-offset-4">
                Contact the team <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-14">
          {groups.map((group) => (
            <section key={group.title} aria-labelledby={`faq-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              <div className="mb-5 border-b border-black/10 pb-4">
                <h2 id={`faq-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="text-2xl font-light sm:text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{group.title}</h2>
                <p className="mb-0 mt-2 text-sm leading-6 text-black/55">{group.description}</p>
              </div>
              <div className="divide-y divide-black/10 border-y border-black/10">
                {group.items.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div key={item.id} className="py-1">
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left"
                        aria-expanded={isOpen}
                        aria-controls={`answer-${item.id}`}
                      >
                        <span className="text-base font-medium leading-6 text-black sm:text-lg">{item.question}</span>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                          <ChevronDown size={14} aria-hidden="true" />
                        </span>
                      </button>
                      {isOpen && <div id={`answer-${item.id}`} className="pb-5 pr-2 text-sm leading-7 text-black/65 sm:pr-12">{item.answer}</div>}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Container>

      <section className="border-t border-black/10 bg-white">
        <Container className="py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">Next step</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Take the time to choose well.</h2>
              <p className="mb-0 mt-3 max-w-xl text-sm leading-6 text-black/55">Compare the syllabi and ask the team to confirm any details that matter to your decision.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/professional/programs" className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition-colors hover:bg-black/80">
                Explore programs <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link to="/professional/contact" className="inline-flex min-h-11 items-center border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:border-black">
                Ask a question
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ProfessionalFAQ;
