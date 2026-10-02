import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle, Search, X } from "lucide-react";
import { Link } from "react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqCategoryLabels, faqData } from "@/data/faq";

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchesTerm(term: string, words: string[]) {
  const root = (word: string) => word.replace(/ies$/, "y").replace(/es$/, "e").replace(/s$/, "");
  const normalizedTerm = root(term);

  return words.some((word) => {
    const normalizedWord = root(word);
    return word.includes(term) || term.includes(word) || normalizedWord === normalizedTerm;
  });
}

function openAICounsellor() {
  window.dispatchEvent(new CustomEvent("open-ai-counsellor"));
}

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const queryTerms = useMemo(() => normalizeText(searchQuery).split(/\s+/).filter(Boolean), [searchQuery]);
  const categories = useMemo(
    () => [...new Set(faqData.map((item) => item.category))],
    [],
  );
  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (queryTerms.length === 0) return true;

      const searchableText = normalizeText([
        item.question,
        item.answer,
        item.category,
        faqCategoryLabels[item.category],
        ...item.keywords,
        item.course,
        item.classLevel,
        item.batchId,
      ].filter(Boolean).join(" "));
      const searchableWords = searchableText.split(" ");
      return queryTerms.every((term) => matchesTerm(term, searchableWords));
    });
  }, [queryTerms, selectedCategory]);
  const groups = useMemo(() => {
    const categoryIds = selectedCategory === "all"
      ? categories
      : [selectedCategory];

    return categoryIds
      .map((category) => ({
        category,
        questions: filteredFAQs.filter((item) => item.category === category),
      }))
      .filter((group) => group.questions.length > 0);
  }, [categories, filteredFAQs, selectedCategory]);
  const popularQuestions = useMemo(() => faqData.filter((item) => item.featured).slice(0, 8), []);

  const jumpToQuestion = (id: string) => {
    setSearchQuery("");
    setSelectedCategory("all");
    setOpenItems([id]);
    window.requestAnimationFrame(() => {
      document.getElementById(`faq-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <section aria-labelledby="popular-questions-heading">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Start here</p>
            <h2 id="popular-questions-heading" className="mt-2 text-2xl font-light text-black">Popular questions</h2>
          </div>
          <span className="hidden text-xs text-black/45 sm:block">Quick answers for families and learners</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {popularQuestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => jumpToQuestion(item.id)}
              className="group flex min-h-16 items-center justify-between gap-3 border border-black/10 bg-white px-4 py-3 text-left text-sm text-black/75 transition-colors hover:border-black/30 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <span>{item.question}</span>
              <ArrowRight size={15} className="shrink-0 text-black/35 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="all-questions-heading">
        <div className="mb-5">
          <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Browse the knowledge center</p>
          <h2 id="all-questions-heading" className="mt-2 text-2xl font-light text-black">Find your answer</h2>
        </div>

        <label htmlFor="faq-search" className="sr-only">Search questions, answers, and topics</label>
        <div className="flex h-14 items-center gap-3 border border-black/15 bg-white px-4 focus-within:border-black/50">
          <Search size={18} className="shrink-0 text-black/45" aria-hidden="true" />
          <input
            id="faq-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search courses, fees, classes, curriculum, mentorship..."
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm text-black outline-none placeholder:text-black/40"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="flex h-9 w-9 shrink-0 items-center justify-center text-black/50 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <nav aria-label="Filter FAQs by category" className="mt-5 -mx-1 overflow-x-auto px-1 pb-2">
          <div className="flex w-max min-w-full gap-2">
            {[{ id: "all", label: "All" }, ...categories.map((id) => ({ id, label: faqCategoryLabels[id] ?? id }))].map((category) => {
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap border px-4 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${active ? "border-black bg-black text-white" : "border-black/15 bg-white text-black/65 hover:border-black/40 hover:text-black"}`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </nav>

        <p className="mb-4 mt-4 text-xs text-black/50" aria-live="polite" aria-atomic="true">
          <strong className="font-medium text-black/75">{filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"} found</strong>
          {searchQuery.trim() && <> for “{searchQuery.trim()}”</>}
        </p>

        {filteredFAQs.length > 0 ? (
          <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="w-full">
            {groups.map((group) => (
              <div key={group.category} className="mb-8 last:mb-0">
                <h3 className="mb-2 border-b border-black/10 pb-3 text-xs font-medium uppercase tracking-[0.16em] text-black/45">
                  {faqCategoryLabels[group.category] ?? group.category}
                </h3>
                {group.questions.map((item) => (
                  <AccordionItem key={item.id} id={`faq-${item.id}`} value={item.id} className="border-black/10">
                    <AccordionTrigger className="py-5 text-base font-medium leading-6 text-black hover:no-underline focus-visible:ring-2 focus-visible:ring-black/60 sm:text-[1.05rem]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-black/65 sm:text-[0.95rem]">
                      <p className="m-0 whitespace-pre-line">{item.answer}</p>
                      {item.links && item.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {item.links.map((link) => (
                            <Link key={link.to} to={link.to} className="inline-flex items-center gap-1.5 text-xs font-medium text-black underline decoration-black/25 underline-offset-4 transition hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                              {link.label}<ArrowRight size={13} aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            ))}
          </Accordion>
        ) : (
          <div className="border border-dashed border-black/20 bg-white px-6 py-10 text-center sm:px-10">
            <h3 className="m-0 text-xl font-light text-black">Can’t find what you’re looking for?</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-black/55">Try a different search term or ask Junior Dream AI to help you explore courses, batches, and learning paths.</p>
            <button
              type="button"
              onClick={openAICounsellor}
              className="mt-5 inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <MessageCircle size={15} aria-hidden="true" /> Ask Junior Dream AI
            </button>
          </div>
        )}
      </section>
    </div>
  );
}