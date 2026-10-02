import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, BrainCircuit, CheckCircle2, Cloud, Code2, Compass, FolderGit2, Layers, Sparkles } from "lucide-react";
import { professionalCourses } from "@/data/professionalCourses";
import { PROFESSIONAL_APPLICATION_ROUTE } from "@/lib/professionalRoutes";

type Category = "Data & AI" | "Software Development" | "Cloud & Security";

const categoryMeta: Record<Category, { icon: typeof BrainCircuit; blurb: string }> = {
  "Data & AI": { icon: BrainCircuit, blurb: "The fastest-growing, most in-demand tracks — build the AI skills the future runs on." },
  "Software Development": { icon: Code2, blurb: "Ship real products end to end, from interface to deployment." },
  "Cloud & Security": { icon: Cloud, blurb: "Keep modern systems running, reliable, and safe." },
};

const categories: Category[] = ["Data & AI", "Software Development", "Cloud & Security"];

const filterIcons: Record<Category | "All", typeof Sparkles> = {
  All: Sparkles,
  "Data & AI": BrainCircuit,
  "Software Development": Code2,
  "Cloud & Security": Cloud,
};

export function ProfessionalPrograms() {
  const [activeFilter, setActiveFilter] = useState<Category | "All">("All");

  const visibleCategories = useMemo(
    () => (activeFilter === "All" ? categories : [activeFilter]),
    [activeFilter]
  );

  return (
    <div className="relative mx-auto max-w-[1440px] overflow-hidden px-4 py-14 sm:px-6 md:px-8 lg:px-20 xl:px-28">
      {/* Soft decorative background glow, CSS-only, matching the course accent palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full opacity-60 blur-[90px]"
        style={{ background: "radial-gradient(circle, #D9EAF5, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-32 h-[360px] w-[360px] rounded-full opacity-50 blur-[90px]"
        style={{ background: "radial-gradient(circle, #E5D9F5, transparent 70%)" }}
      />

      <header className="relative mb-10">
        <p className="m-0 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/40">
          <Sparkles size={12} aria-hidden="true" /> Professional programs
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-light leading-[1.1] text-black sm:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Technology programs built for{" "}
          <span className="bg-gradient-to-r from-[#E05A2B] to-[#b23f1c] bg-clip-text text-transparent">
            real career momentum.
          </span>
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-black/65">
          Explore structured pathways designed for college students and career-focused learners who want to grow in data, software, cloud, security, and AI-driven technology work. The future runs on AI — our Data &amp; AI tracks are built for exactly that shift.
        </p>

        <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: Layers, value: professionalCourses.length, label: "Professional tracks" },
            { icon: Compass, value: categories.length, label: "Specialization areas" },
            {
              icon: FolderGit2,
              value: professionalCourses.reduce((sum, course) => sum + course.projects.length, 0),
              label: "Portfolio projects total",
            },
          ].map(({ icon: StatIcon, value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_32px_rgba(0,0,0,0.07)]"
            >
              <StatIcon size={16} aria-hidden="true" className="text-black/35" />
              <p className="m-0 mt-2 text-2xl font-light text-black">{value}</p>
              <p className="m-0 mt-0.5 text-[0.64rem] uppercase tracking-[0.1em] text-black/45">{label}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {[
          { label: "Career-focused", text: "Built around real opportunities and practical skill growth." },
          { label: "Mentor-led", text: "Guidance for doubts, projects, and career decisions." },
          { label: "Portfolio ready", text: "Every track is designed around outcomes students can showcase." },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm">
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-black/45">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-black/65">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="relative mb-10 flex flex-wrap gap-2 pt-8" role="tablist" aria-label="Filter programs by category">
        {(["All", ...categories] as const).map((filter) => {
          const FilterIcon = filterIcons[filter];
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-all duration-300 ${
                isActive
                  ? "border-black bg-gradient-to-br from-black to-black/80 text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                  : "border-black/15 bg-white text-black/60 hover:border-black/40 hover:text-black"
              }`}
            >
              <FilterIcon size={13} aria-hidden="true" />
              {filter}
            </button>
          );
        })}
      </div>

      <div className="relative space-y-14">
        {visibleCategories.map((categoryName) => {
          const CategoryIcon = categoryMeta[categoryName].icon;
          const coursesInGroup = professionalCourses.filter((course) => course.category === categoryName);

          return (
            <section key={categoryName}>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-black to-black/75 text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                    <CategoryIcon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="m-0 text-2xl font-light text-black">{categoryName}</h2>
                    <p className="m-0 text-sm text-black/50">{categoryMeta[categoryName].blurb}</p>
                  </div>
                </div>
                {categoryName === "Data & AI" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#E05A2B] to-[#b23f1c] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_8px_20px_rgba(224,90,43,0.3)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Highest AI demand
                  </span>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {coursesInGroup.map((course, index) => (
                  <Link
                    key={course.id}
                    to={`/professional/programs/${course.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white p-5 text-left no-underline shadow-[0_18px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-black/15 hover:shadow-[0_28px_60px_rgba(0,0,0,0.1)]"
                  >
                    {/* Accent top bar, unique per course */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${course.accent}, transparent)` }}
                    />
                    <span aria-hidden="true" className="absolute right-5 top-5 text-[0.65rem] font-medium tabular-nums text-black/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border ring-4 transition group-hover:scale-105"
                      style={{ backgroundColor: course.accent, borderColor: "rgba(0,0,0,0.08)", boxShadow: `0 0 0 0 ${course.accent}` }}
                    >
                      <CategoryIcon size={18} aria-hidden="true" className="text-black/70" />
                    </div>

                    <p className="text-[0.62rem] font-medium uppercase tracking-[0.15em] text-black/45">{course.category}</p>
                    <h3 className="mt-3 text-2xl font-light text-black">{course.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-black/60">{course.shortDescription}</p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {course.technologies.slice(0, 4).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-[0.68rem] text-black/65 transition group-hover:border-black/20"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {course.outcomes[0] && (
                      <div className="mt-4 flex items-start gap-2 rounded-xl bg-black/[0.03] px-3 py-2.5 text-[0.76rem] leading-5 text-black/65">
                        <CheckCircle2 size={14} aria-hidden="true" className="mt-0.5 flex-none text-black/40" />
                        <span>{course.outcomes[0]}</span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4 text-[0.68rem] text-black/45">
                      <span className="inline-flex items-center gap-1">
                        <FolderGit2 size={12} aria-hidden="true" /> {course.projects.length} projects
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{course.roadmap.length}-step roadmap</span>
                    </div>

                    <div className="mt-auto pt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-black">
                      View details
                      <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="relative mt-16 flex flex-col items-start gap-4 overflow-hidden rounded-[32px] border border-black/10 bg-gradient-to-br from-black to-[#1a1a1a] px-7 py-9 text-white sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-25 blur-[80px]"
          style={{ background: "radial-gradient(circle, #E05A2B, transparent 70%)" }}
        />
        <div className="relative">
          <p className="m-0 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/50">
            <Compass size={12} aria-hidden="true" /> Not sure where to start?
          </p>
          <h2 className="mt-2 text-2xl font-light sm:text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Talk to a mentor before you choose a track.
          </h2>
        </div>
        <div className="relative flex flex-none flex-wrap gap-3">
          <Link
            to="/professional/mentors"
            className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-white no-underline transition hover:border-white/50"
          >
            Meet mentors
          </Link>
          <Link
            to={PROFESSIONAL_APPLICATION_ROUTE}
            className="rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition hover:bg-white/90"
          >
            Apply now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProfessionalPrograms;
