import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { engineeringCourseCatalog } from "@/data/engineeringCurriculum";

const classTabs = ["All", 6, 7, 8, 9, 10, 11, 12] as const;

export function EngineeringProgram() {
  const [activeClass, setActiveClass] = useState<(typeof classTabs)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBatches = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return engineeringCourseCatalog.filter((batch) => {
      const matchesClass = activeClass === "All" || batch.classNumber === Number(activeClass);
      const searchableText = [
        batch.batchLevel,
        batch.customName,
        batch.variantName,
        batch.classRange,
        batch.shortDescription,
        ...batch.highlights,
        ...batch.learningOutcomes,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      return matchesClass && matchesSearch;
    });
  }, [activeClass, searchTerm]);

  return (
    <Container className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="mb-4 inline-block text-[0.68rem] font-medium uppercase tracking-[0.28em] text-black/40">
              Engineering Excellence
            </span>
            <h1 className="m-0 text-4xl font-light leading-tight text-black md:text-5xl">
              Engineering courses built for the next generation.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/60 md:text-base">
              Junior Dream helps students from Classes 6 to 12 build strong foundations in coding,
              analytical thinking, and future-focused engineering pathways.
            </p>

            <div className="mt-6 flex max-w-md items-center rounded-full border border-black/10 bg-white px-4 py-3 shadow-sm">
              <span className="mr-3 text-black/40">⌕</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by batch, class, or topic"
                className="w-full border-0 bg-transparent text-sm text-black placeholder:text-black/35 focus:outline-none"
                aria-label="Search engineering batches"
              />
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-ai-counsellor"))}
              className="mt-4 inline-flex items-center rounded-full border border-black/15 px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white"
            >
              Find the right course
            </button>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Engineering students learning together"
              className="h-[280px] w-full object-cover md:h-[340px]"
            />
          </div>
        </div>

        <div className="mt-12">
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max items-center gap-2 rounded-full border border-black/10 bg-white p-2 shadow-sm">
              {classTabs.map((tab) => {
                const isActive = activeClass === tab;
                const label = typeof tab === "number" ? `Class ${tab}` : tab;

                return (
                  <button
                    key={String(tab)}
                    type="button"
                    onClick={() => setActiveClass(tab)}
                    className="whitespace-nowrap rounded-full px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-all duration-200"
                    style={{
                      background: isActive ? "#111111" : "transparent",
                      color: isActive ? "#FFFFFF" : "rgba(0,0,0,0.62)",
                      border: isActive ? "1px solid #111111" : "1px solid transparent",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {filteredBatches.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBatches.map((batch) => (
              <article
                key={batch.id}
                className="group min-w-0 overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={batch.image}
                    alt={batch.batchLevel}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-[0.15em] text-black/50">
                    <span>Class {batch.classNumber}</span>
                    <span>{batch.batchLevel}</span>
                  </div>

                  <h3 className="m-0 text-2xl font-light text-black">{batch.variantLabel}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-black/35">
                    {batch.customName}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-black/65">{batch.shortDescription}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {batch.highlights.slice(0, 3).map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-black/10 bg-[#F7F7F7] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.08em] text-black/60"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs text-black/55">
                    <span>Duration</span>
                    <span>{batch.duration}</span>
                  </div>

                  <Link
                    to={`/programs/engineering/class-${batch.classNumber}/${batch.id}`}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-black/90"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[24px] border border-dashed border-black/15 bg-white p-10 text-center text-black/55">
            No batches match your current search or class filter.
          </div>
        )}
      </div>
    </Container>
  );
}

export default EngineeringProgram;
