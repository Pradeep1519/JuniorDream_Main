import { useState } from "react";
import { ArrowDown, ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";
import { MentorProfileModal } from "@/components/mentors/MentorProfileModal";
import { mentorSpecializations, mentors, MentorProfile } from "@/data/mentors";

const mentoringLoop = [
  ["01", "Understand the student", "Start with the learner’s current level, confidence and questions."],
  ["02", "Identify the learning gap", "Notice where a concept, habit or reasoning step needs support."],
  ["03", "Shape the approach", "Match explanations, examples and practice to the learner’s stage."],
  ["04", "Guide with perspective", "Bring practical engineering thinking into age-appropriate learning."],
  ["05", "Observe progress", "Look at the reasoning behind an answer, not only the answer itself."],
  ["06", "Adapt the next step", "Use what the student has shown to decide what comes next."],
  ["07", "Build engineering thinking", "Help curiosity become clearer questions and more independent problem solving."],
];

const mentorActions = [
  ["Understand", "Meet the student at their current level."],
  ["Guide", "Explain concepts with context and patience."],
  ["Challenge", "Offer problems that develop thinking, not memorisation."],
  ["Connect", "Link ideas to how engineers approach real problems."],
  ["Observe", "Notice confidence, habits and sticking points."],
  ["Adapt", "Adjust the learning approach as the student grows."],
  ["Encourage", "Make progress feel visible and achievable."],
  ["Build", "Gradually strengthen an engineering mindset."],
];

const transformation = ["I don’t understand this.", "Wait... I think I get it.", "Can I try this myself?", "Why does this algorithm work?", "I think I can solve this.", "I want to build something."];

function openAI() {
  window.dispatchEvent(new CustomEvent("open-ai-counsellor"));
}

export function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);

  return (
    <div className="mentor-page bg-[#F8F8F6] text-black">
      <section className="mentor-hero overflow-hidden border-b border-black/10 bg-[#111111] text-white">
        <Container className="relative py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/45">Industry mentorship</div>
              <h1 className="max-w-3xl text-5xl font-light leading-[1.03] md:text-7xl">Learn from people who actually build with technology.</h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">Students do not just learn engineering concepts from textbooks. They learn with guidance shaped by people who understand how those concepts are used in the real world.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#mentors" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black no-underline">Meet our mentors <ArrowRight size={15} /></a>
                <a href="#loop" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white no-underline">How it works</a>
              </div>
            </div>
            <div className="mentor-hero-visual relative min-h-[360px] rounded-[30px] border border-white/10 bg-white/[0.06] p-5">
              <div className="absolute left-6 top-7 text-[0.62rem] uppercase tracking-[0.2em] text-white/40">Industry → mentor → student</div>
              <div className="absolute inset-x-8 bottom-8 top-20 grid grid-cols-3 items-center gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur"><div className="text-3xl">⌘</div><div className="mt-3 text-xs text-white/65">Real engineering</div></div>
                <div className="flex justify-center text-white/45"><ArrowRight /></div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur"><div className="text-3xl">✦</div><div className="mt-3 text-xs text-white/65">Student growth</div></div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-white px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black">Junior Dream mentor layer</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><div className="eyebrow">The difference</div><h2 className="mt-4 max-w-xl text-4xl font-light leading-tight md:text-6xl">Not just teachers. Industry mentors.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-black/60">We believe children should not only learn what engineering is. They should gradually understand how engineers think. That starts by understanding what each learner needs, then shaping the mentoring approach around that requirement.</p>
          </div>
          <div className="mt-16 flex flex-wrap gap-2">
            {mentorSpecializations.map((specialization) => <span key={specialization} className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black/60">{specialization}</span>)}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[26px] border border-black/10 bg-white p-7"><div className="eyebrow">Traditional model</div><div className="mt-6 space-y-4 text-lg text-black/55"><div>School syllabus</div><ArrowDown size={17} /><div>Teacher teaches</div><ArrowDown size={17} /><div>Student memorises</div><ArrowDown size={17} /><div>Exam</div></div></div>
            <div className="rounded-[26px] bg-black p-7 text-white"><div className="eyebrow text-white/45">Junior Dream model</div><div className="mt-6 grid gap-3 sm:grid-cols-2">{["Student requirement", "Learning need", "Mentor perspective", "Practical context", "Better questions", "Engineering thinking"].map((item, index) => <div key={item} className="rounded-xl border border-white/15 bg-white/[0.07] p-4 text-sm text-white/75"><span className="mr-2 text-white/35">0{index + 1}</span>{item}</div>)}</div></div>
          </div>
        </Container>
      </section>

      <section id="loop" className="border-y border-black/10 bg-white py-24 md:py-32">
        <Container>
          <div className="max-w-2xl"><div className="eyebrow">The mentoring loop</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">Learning gets better when someone is paying attention.</h2></div>
          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{mentoringLoop.map(([number, title, description]) => <div key={number} className="mentor-loop-card rounded-[22px] border border-black/10 bg-[#F8F8F6] p-5"><div className="text-3xl font-light text-black/25">{number}</div><h3 className="mt-9 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-black/60">{description}</p></div>)}</div>
        </Container>
      </section>

      <section className="py-24 md:py-32"><Container><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><div className="eyebrow">The learner comes first</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">Every child has a different starting point.</h2><p className="mt-6 text-base leading-8 text-black/60">One student may understand concepts quickly but struggle with logic. Another may be academically strong but lack confidence. Mentors adapt the learning journey to the learner in front of them.</p></div><div className="grid gap-3 sm:grid-cols-2">{["Concept clarity", "Confidence", "Logical thinking", "Practical application", "Curiosity", "Independent problem solving"].map((item) => <div key={item} className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-black/70"><Check size={16} className="mb-7 text-black/35" />{item}</div>)}</div></div></Container></section>

      <section className="bg-[#111111] py-24 text-white md:py-32"><Container><div className="max-w-2xl"><div className="eyebrow text-white/45">The quiet transformation</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">And then something changes.</h2><p className="mt-6 text-base leading-8 text-white/60">The objective is not simply to finish a chapter. It is to reach the moment when a student starts asking better questions.</p></div><div className="mt-14 grid gap-3 md:grid-cols-3">{transformation.map((line, index) => <div key={line} className="flex items-start gap-4 border-t border-white/15 py-5"><span className="text-xs text-white/35">0{index + 1}</span><span className="text-xl font-light text-white/85">{line}</span></div>)}</div></Container></section>

      <section id="mentors" className="py-24 md:py-32"><Container><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="eyebrow">The network</div><h2 className="mt-4 text-4xl font-light md:text-6xl">Meet the people behind the mentorship.</h2></div><p className="max-w-sm text-sm leading-6 text-black/55">Verified mentor profiles will be published as the network grows. We would rather show an honest placeholder than invent a credential.</p></div><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{mentors.map((mentor) => <article key={mentor.id} className="group overflow-hidden rounded-[22px] border border-black/10 bg-white"><div className="aspect-[1.1] overflow-hidden"><img src={mentor.image} alt="Mentor network placeholder" loading="lazy" className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /></div><div className="p-5"><div className="text-[0.62rem] uppercase tracking-[0.16em] text-black/40">{mentor.currentRole}</div><h3 className="mt-2 text-lg font-medium">{mentor.name}</h3><div className="mt-3 flex flex-wrap gap-1.5">{mentor.specialization.map((item) => <span key={item} className="rounded-full bg-[#F5F5F3] px-2 py-1 text-[0.6rem] text-black/55">{item}</span>)}</div><button type="button" onClick={() => setSelectedMentor(mentor)} className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black/60 transition hover:text-black">View profile <ArrowRight size={13} /></button></div></article>)}</div><div className="mt-10 rounded-[24px] border border-dashed border-black/15 bg-white p-7 text-center"><Sparkles size={18} className="mx-auto text-black/35" /><h3 className="mt-4 text-2xl font-light">More industry mentors coming soon.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/55">Junior Dream is building a thoughtful network across engineering and technology. New profiles will appear after their information is verified.</p></div></Container></section>

      <section className="border-y border-black/10 bg-white py-24 md:py-32"><Container><div className="max-w-2xl"><div className="eyebrow">The mentor’s role</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">So, what does an industry mentor actually do?</h2></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{mentorActions.map(([title, description]) => <div key={title} className="rounded-2xl border border-black/10 p-5"><div className="text-lg font-medium">{title}</div><p className="mt-3 text-sm leading-6 text-black/55">{description}</p></div>)}</div></Container></section>

      <section className="py-24 md:py-32"><Container><div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><div className="eyebrow">Beyond marks</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">We do not measure a child only by marks.</h2><p className="mt-6 text-base leading-8 text-black/60">Engineering development also lives in the questions a student asks, the way they break a problem down, and how willing they are to learn from a mistake.</p></div><div className="grid grid-cols-2 gap-3">{["Asking questions", "Understanding concepts", "Breaking problems down", "Applying knowledge", "Building things", "Explaining reasoning", "Learning from mistakes", "Becoming independent"].map((item) => <div key={item} className="rounded-xl bg-white p-4 text-sm text-black/65 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">{item}</div>)}</div></div></Container></section>

      <section className="bg-[#EDEDE8] py-24 md:py-32"><Container><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="eyebrow">Progress visibility</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">Parents aren’t left guessing.</h2></div><p className="max-w-md text-sm leading-7 text-black/60">Our planned mentoring model includes regular progress reviews that look beyond homework completion and surface the next useful learning focus.</p></div><div className="mt-14 grid gap-6 lg:grid-cols-[1fr_0.8fr]"><div className="rounded-[26px] border border-black/10 bg-white p-6 md:p-8"><div className="flex items-center justify-between border-b border-black/10 pb-5"><div><div className="eyebrow">Demo interface</div><h3 className="mt-2 text-2xl font-light">Weekly mentor review</h3></div><span className="rounded-full bg-[#F1F1ED] px-3 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-black/50">Sample</span></div><div className="mt-7 grid gap-4 sm:grid-cols-2">{["Concept understanding", "Problem solving", "Logical thinking", "Coding confidence"].map((item, index) => <div key={item}><div className="mb-2 flex justify-between text-xs text-black/55"><span>{item}</span><span>{[82, 64, 72, 51][index]}%</span></div><div className="h-2 rounded-full bg-[#EEEEEB]"><div className="h-full rounded-full bg-black" style={{ width: `${[82, 64, 72, 51][index]}%` }} /></div></div>)}</div><div className="mt-8 grid gap-3 text-sm text-black/65 sm:grid-cols-2"><div><div className="eyebrow">This week</div><p className="mt-3">✓ Understood a new algorithm<br />✓ Completed a practical task<br />✓ Explained reasoning with more clarity</p></div><div><div className="eyebrow">Next focus</div><p className="mt-3">→ Logic building<br />→ Problem decomposition<br />→ Independent attempts</p></div></div></div><div className="rounded-[26px] bg-black p-6 text-white md:p-8"><div className="eyebrow text-white/45">A broader view</div><h3 className="mt-4 text-3xl font-light">Every week, we look beyond marks.</h3><div className="mt-9 space-y-5 text-sm text-white/65">{["Student learning", "Mentor observes progress", "Progress recorded", "Weekly review", "Parent conversation", "Next learning focus"].map((item, index) => <div key={item} className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[0.65rem] text-white/50">{index + 1}</span>{item}</div>)}</div></div></div></Container></section>

      <section className="py-24 md:py-32"><Container><div className="max-w-2xl"><div className="eyebrow">Why it feels different</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">A more considered way to learn.</h2></div><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{[["Industry exposure", "Learning guided by people connected to real engineering thinking."], ["Student-specific guidance", "The approach starts with the learner’s current needs."], ["Practical thinking", "Concepts connect to reasoning, application and reflection."], ["Continuous observation", "Progress is noticed across the learning journey, not one exam."], ["Parent visibility", "Parents can understand what is improving and what comes next."], ["Long-term mindset", "The aim goes beyond finishing chapters." ]].map(([title, description]) => <div key={title} className="rounded-[22px] border border-black/10 bg-white p-6"><h3 className="text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-black/55">{description}</p></div>)}</div></Container></section>

      <section className="bg-black py-24 text-white md:py-32"><Container><div className="mx-auto max-w-3xl text-center"><div className="eyebrow text-white/45">The next step</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">Give your child more than a classroom.</h2><p className="mt-6 text-base leading-8 text-white/60">Give them access to people who understand where engineering is going — and the patience to help them grow into it.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href="/programs/engineering" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black no-underline">Explore engineering courses <ArrowRight size={15} /></a><button type="button" onClick={openAI} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white"><MessageCircle size={15} /> Talk to Junior Dream AI</button></div></div></Container></section>
      <MentorProfileModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
    </div>
  );
}