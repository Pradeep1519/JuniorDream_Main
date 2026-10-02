import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";
import { StoryDetailModal } from "@/components/stories/StoryDetailModal";
import { journeySteps, storyCategories, StudentStory, studentStories } from "@/data/studentStories";

function openAI() {
  window.dispatchEvent(new CustomEvent("open-ai-counsellor"));
}

export function StudentStories() {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [selectedStory, setSelectedStory] = useState<StudentStory | null>(null);
  const filteredStories = useMemo(
    () => activeCategory === "All Stories" ? studentStories : studentStories.filter((story) => story.category === activeCategory),
    [activeCategory],
  );
  const featuredStory = studentStories.find((story) => story.featured) ?? studentStories[0];

  return (
    <div className="stories-page bg-[#F8F8F6] text-black">
      <section className="stories-hero overflow-hidden border-b border-black/10 bg-[#111111] text-white">
        <Container className="relative py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="relative z-10">
              <div className="stories-eyebrow text-white/45">Student stories</div>
              <h1 className="mt-5 max-w-3xl text-5xl font-light leading-[1.03] md:text-7xl">Every student has a story worth telling.</h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">From a first question to a first project, every step matters. Junior Dream gives students space to explore, learn, experiment and discover where their curiosity can lead.</p>
              <a href="#stories" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black no-underline">Explore their journeys <ArrowDown size={15} /></a>
            </div>
              <div className="stories-hero-visual relative min-h-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] p-5">
                <div className="absolute left-6 top-7 text-[0.62rem] uppercase tracking-[0.2em] text-white/40">A student story</div>
                <div className="stories-orbit-ring stories-orbit-ring-wide" aria-hidden="true" />
                <div className="stories-orbit-ring stories-orbit-ring-tight" aria-hidden="true" />
                <div className="stories-story-core">
                  <div className="stories-core-mark">✦</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/80">Student story</div>
                  <div className="mt-2 text-[0.68rem] text-white/45">It starts with a question.</div>
                </div>
                <div className="stories-orbit-element stories-orbit-curiosity"><span className="stories-orbit-symbol">?</span><span>Curiosity</span><small>What if I could?</small></div>
                <div className="stories-orbit-element stories-orbit-ideas"><span className="stories-orbit-symbol">✧</span><span>Ideas</span><small>Discovering what’s possible</small></div>
                <div className="stories-orbit-element stories-orbit-create"><span className="stories-orbit-symbol">⌘</span><span>Create</span><small>Turning ideas into something real</small></div>
                <div className="stories-orbit-element stories-orbit-confidence"><span className="stories-orbit-symbol">↗</span><span>Confidence</span><small>I can build this.</small></div>
                <div className="stories-orbit-finale">One idea can become something real.</div>
              </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32"><Container><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><div className="stories-eyebrow">More than a testimonial</div><h2 className="mt-4 max-w-xl text-4xl font-light leading-tight md:text-6xl">A journey does not happen in one step.</h2></div><p className="max-w-2xl text-lg leading-8 text-black/60">A student may begin with a question, find a new interest, try something practical, and slowly become more confident. These stories are meant to show that movement, not promise one fixed outcome.</p></div><div className="mt-16 grid gap-3 md:grid-cols-5">{journeySteps.map(([number, title, description]) => <div key={number} className="stories-step rounded-[22px] border border-black/10 bg-white p-5"><div className="text-3xl font-light text-black/25">{number}</div><h3 className="mt-8 text-lg font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-black/55">{description}</p></div>)}</div></Container></section>

      <section className="border-y border-black/10 bg-white py-24 md:py-32"><Container><div className="stories-eyebrow">Featured journey</div><div className="mt-5 grid overflow-hidden rounded-[28px] border border-black/10 bg-[#F8F8F6] lg:grid-cols-[0.9fr_1.1fr]"><img src={featuredStory.image} alt="Featured student story placeholder" loading="lazy" className="h-full min-h-[320px] w-full object-cover grayscale" /><div className="p-7 md:p-12"><div className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-black/50">Profile coming soon</div><h2 className="mt-6 text-4xl font-light leading-tight md:text-5xl">The next story starts with curiosity.</h2><p className="mt-6 max-w-xl text-base leading-8 text-black/60">Real student stories will appear here when verified information is available. We will share the starting point, the work, the questions and the growth without inventing achievements or outcomes.</p><div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-white p-4"><div className="stories-eyebrow">Starting point</div><p className="mt-2 text-sm text-black/55">{featuredStory.journey}</p></div><div className="rounded-2xl bg-white p-4"><div className="stories-eyebrow">What comes next</div><p className="mt-2 text-sm text-black/55">{featuredStory.currentFocus}</p></div></div><button type="button" onClick={() => setSelectedStory(featuredStory)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.13em] text-white">View story profile <ArrowRight size={15} /></button></div></div></Container></section>

      <section id="stories" className="py-24 md:py-32"><Container><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><div className="stories-eyebrow">Explore journeys</div><h2 className="mt-4 text-4xl font-light md:text-6xl">Small steps. Meaningful growth.</h2></div><p className="max-w-sm text-sm leading-7 text-black/55">As verified stories are added, explore the different ways students learn, build and grow.</p></div><div className="mt-10 flex gap-2 overflow-x-auto pb-2">{storyCategories.map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs transition ${activeCategory === category ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/60 hover:border-black/30"}`}>{category}</button>)}</div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredStories.map((story) => <article key={story.id} className="stories-card group overflow-hidden rounded-[24px] border border-black/10 bg-white"><div className="aspect-[1.25] overflow-hidden"><img src={story.image} alt="Student story placeholder" loading="lazy" className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /></div><div className="p-5"><div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.14em] text-black/40"><span>{story.classLabel}</span><span>{story.category}</span></div><h3 className="mt-4 text-2xl font-light">{story.name}</h3><p className="mt-3 text-sm leading-6 text-black/60">{story.journey}</p><div className="mt-5 flex flex-wrap gap-1.5">{story.skills.map((skill) => <span key={skill} className="rounded-full bg-[#F5F5F2] px-2.5 py-1 text-[0.62rem] text-black/55">{skill}</span>)}</div><button type="button" onClick={() => setSelectedStory(story)} className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black/60 transition hover:text-black">View story <ArrowRight size={14} /></button></div></article>)}</div><div className="mt-10 rounded-[24px] border border-dashed border-black/15 bg-white p-7 text-center"><Sparkles size={18} className="mx-auto text-black/35" /><h3 className="mt-4 text-2xl font-light">Real student journeys coming soon.</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-black/55">This page is ready for verified stories, projects and reflections. Until then, it stays honest about what is and is not available.</p></div></Container></section>

      <section className="bg-[#111111] py-24 text-white md:py-32"><Container><div className="max-w-2xl"><div className="stories-eyebrow text-white/45">Where guidance becomes growth</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">The ecosystem around a student matters.</h2><p className="mt-6 text-base leading-8 text-white/60">Industry perspective becomes useful when it reaches a learner through the right explanation, practical attempt and thoughtful feedback.</p></div><div className="mt-14 grid gap-3 md:grid-cols-5">{[["Industry", "Perspective"], ["Mentor", "Guidance"], ["Student", "Attempt"], ["Project", "Practice"], ["Growth", "Reflection"]].map(([title, subtitle], index) => <div key={title} className="stories-connection rounded-2xl border border-white/15 bg-white/[0.06] p-5"><div className="text-xs text-white/35">0{index + 1}</div><div className="mt-8 text-xl font-light">{title}</div><div className="mt-2 text-sm text-white/50">{subtitle}</div></div>)}</div></Container></section>

      <section className="py-24 md:py-32"><Container><div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div><div className="stories-eyebrow">What growth can look like</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">A student is more than a result.</h2><p className="mt-6 text-base leading-8 text-black/60">As real stories are collected, this space will highlight the things that matter along the way: questions asked, ideas explored, problems broken down, projects attempted and confidence earned through practice.</p></div><div className="grid grid-cols-2 gap-3">{["Asking questions", "Understanding concepts", "Trying practical work", "Explaining reasoning", "Learning from mistakes", "Becoming independent"].map((item) => <div key={item} className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-black/65"><Check size={16} className="mb-8 text-black/35" />{item}</div>)}</div></div></Container></section>

      <section className="border-y border-black/10 bg-[#EDEDE8] py-24 md:py-32"><Container><div className="mx-auto max-w-3xl text-center"><div className="stories-eyebrow">The next chapter</div><h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">Your story could be the next one.</h2><p className="mt-6 text-base leading-8 text-black/60">Every journey starts with curiosity. Explore Junior Dream and discover where learning can take you.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href="/programs" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white no-underline">Explore programs <ArrowRight size={15} /></a><button type="button" onClick={openAI} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black"><MessageCircle size={15} /> Find your path</button></div></div></Container></section>
      <StoryDetailModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
}