import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router";
import { Container } from "@/components/common/Container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { engineeringCourseCatalog } from "@/data/engineeringCurriculum";

export function ClassDetail() {
  const { classSlug, batchSlug, batchId } = useParams<{ classSlug?: string; batchSlug?: string; batchId?: string }>();

  const resolvedBatch = useMemo(() => {
    const requestedClassNumber = classSlug ? Number(classSlug.replace(/^class-/, "")) : undefined;
    const requestedBatchId = batchSlug ?? batchId;

    if (Number.isFinite(requestedClassNumber) && requestedBatchId) {
      return engineeringCourseCatalog.find(
        (course) => course.classNumber === requestedClassNumber && course.id === requestedBatchId,
      );
    }

    if (requestedBatchId) {
      return engineeringCourseCatalog.find((course) => course.id === requestedBatchId);
    }

    return undefined;
  }, [batchId, batchSlug, classSlug]);

  if (!resolvedBatch) {
    return <Navigate to="/programs/engineering" replace />;
  }

  return (
    <Container className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-black/45">
          <Link to="/programs/engineering" className="inline-flex items-center gap-2 text-current no-underline">
            ← Back to Engineering
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.04)]">
              <div className="grid gap-0 lg:grid-cols-[1.02fr_1.18fr]">
                <div className="overflow-hidden">
                  <img
                    src={resolvedBatch.image}
                    alt={resolvedBatch.batchLevel}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-3 flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/45">
                    <span>Class {resolvedBatch.classNumber}</span>
                    <span>•</span>
                    <span>{resolvedBatch.customName}</span>
                  </div>

                  <h1 className="m-0 text-3xl font-light leading-tight text-black md:text-5xl">
                    {resolvedBatch.variantLabel}
                  </h1>

                  <p className="mt-5 text-base leading-7 text-black/65">{resolvedBatch.description}</p>

                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-ai-counsellor"))}
                    className="mt-5 inline-flex items-center rounded-full border border-black/15 px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white"
                  >
                    Ask AI about this batch
                  </button>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {resolvedBatch.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-black/10 bg-[#F9F9F9] px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-black/60"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-black/10 bg-[#F9F9F9] p-4">
                      <div className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-black/40">
                        Duration
                      </div>
                      <div className="mt-2 text-lg font-medium text-black">{resolvedBatch.duration}</div>
                    </div>
                    <div className="rounded-2xl border border-black/10 bg-[#F9F9F9] p-4">
                      <div className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-black/40">
                        Learning mode
                      </div>
                      <div className="mt-2 text-base text-black/75">{resolvedBatch.learningMode}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-10">
              <section id="about" className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  About this batch
                </div>
                <p className="m-0 text-base leading-7 text-black/65">{resolvedBatch.description}</p>
              </section>

              <section id="learning" className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  What students will learn
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {resolvedBatch.learningOutcomes.map((outcome) => (
                    <div key={outcome} className="rounded-2xl border border-black/10 bg-[#F9F9F9] p-4 text-sm leading-6 text-black/70">
                      <span className="mr-2 text-black/30">✓</span>
                      {outcome}
                    </div>
                  ))}
                </div>
              </section>

              <section id="curriculum" className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  Complete curriculum
                </div>

                <div className="space-y-4">
                  {resolvedBatch.curriculum.map((section) => (
                    <details key={section.title} className="group rounded-2xl border border-black/10 bg-[#F9F9F9] p-4" open>
                      <summary className="cursor-pointer list-none text-base font-medium text-black">
                        {section.title}
                      </summary>
                      <ul className="mt-4 space-y-2 pl-0 text-sm leading-6 text-black/65">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-1 text-black/40">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </section>

              <section id="roadmap" className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  Learning roadmap
                </div>

                <div className="space-y-5">
                  {resolvedBatch.roadmap.map((step, index) => (
                    <div key={step.phase} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[0.62rem] font-medium text-white">
                          {index + 1}
                        </div>
                        {index < resolvedBatch.roadmap.length - 1 && (
                          <div className="mt-2 h-full w-px bg-black/10" />
                        )}
                      </div>

                      <div className="flex-1 rounded-2xl border border-black/10 bg-[#F9F9F9] p-4">
                        <div className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-black/45">
                          {step.phase}
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-black">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-black/65">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="strategy" className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  Our teaching strategy
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {resolvedBatch.teachingStrategy.map((step) => (
                    <div key={step.title} className="rounded-2xl border border-black/10 bg-[#F9F9F9] p-5">
                      <div className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-black/45">
                        {step.title}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-black/65">{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="experience" className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  Learning experience
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {resolvedBatch.learningExperience.map((feature) => (
                    <div key={feature.title} className="rounded-2xl border border-black/10 bg-[#F9F9F9] p-4">
                      <div className="text-base font-medium text-black">{feature.title}</div>
                      <p className="mt-2 text-sm leading-6 text-black/65">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="faqs" className="rounded-[28px] border border-black/10 bg-white p-6 md:p-8">
                <div className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  FAQs
                </div>

                <Accordion type="single" collapsible className="w-full space-y-3">
                  {resolvedBatch.faqs.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="overflow-hidden rounded-2xl border border-black/10 bg-[#F9F9F9] px-4"
                    >
                      <AccordionTrigger className="py-4 text-left text-base font-medium text-black hover:no-underline [&>svg]:text-black/60">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pr-2 text-sm leading-6 text-black/65">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </div>

          <aside className="h-fit xl:sticky xl:top-6">
            <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white p-4 shadow-[0_14px_40px_rgba(0,0,0,0.04)]">
              <img
                src={resolvedBatch.image}
                alt={resolvedBatch.batchLevel}
                className="h-44 w-full rounded-[20px] object-cover"
              />

              <div className="mt-5 flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-[0.14em] text-black/45">
                <span>Class {resolvedBatch.classNumber}</span>
                <span>{resolvedBatch.duration}</span>
              </div>

              <h2 className="mt-3 text-2xl font-light text-black">{resolvedBatch.variantLabel}</h2>
              <p className="mt-2 text-sm leading-6 text-black/60">{resolvedBatch.shortDescription}</p>

              <div className="mt-5 space-y-3 border-t border-black/10 pt-5">
                {resolvedBatch.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2 text-sm text-black/70">
                    <span className="mt-1 text-black/30">•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[#F9F9F9] p-4">
                <div className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-black/40">
                  Batch fee
                </div>
                <div className="mt-2 text-2xl font-medium text-black">{resolvedBatch.fee}</div>
                {resolvedBatch.originalFee && (
                  <div className="mt-1 text-sm text-black/50 line-through">{resolvedBatch.originalFee}</div>
                )}
              </div>

              <Link
                to={`/apply?stream=engineering&batch=${encodeURIComponent(resolvedBatch.batchLevel)}&class=${resolvedBatch.classNumber}&tier=${encodeURIComponent(resolvedBatch.variantName)}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white no-underline transition-colors duration-200 hover:bg-black/90"
              >
                Enroll now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}

export default ClassDetail;
