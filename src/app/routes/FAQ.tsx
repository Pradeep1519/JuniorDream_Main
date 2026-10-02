import { useEffect } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { FAQSection } from "@/components/sections/FAQSection/FAQSection";
import { faqData } from "@/data/faq";

function openAICounsellor() {
  window.dispatchEvent(new CustomEvent("open-ai-counsellor"));
}

export function FAQ() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    const schema = document.createElement("script");

    document.title = "FAQ Knowledge Center | Junior Dream";
    if (description) {
      description.setAttribute(
        "content",
        "Find clear answers about Junior Dream courses, engineering batches, curriculum, mentorship, fees, and admissions.",
      );
    }
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
    document.head.append(schema);

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== null && previousDescription !== undefined) {
        description.setAttribute("content", previousDescription);
      }
      schema.remove();
    };
  }, []);

  return (
    <div className="bg-[#FAFAF8]">
      <section className="border-b border-black/10 bg-[#F5F5F2]">
        <Container className="py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="m-0 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-black/45">Junior Dream Knowledge Center</p>
            <h1 className="mt-4 text-4xl font-light leading-tight text-black sm:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Everything you want to know about Junior Dream
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Have a question? You’ll probably find the answer here. Explore courses, classes, curriculum, engineering, mentorship, batches, fees, admissions, and student support.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-14">
        <Container>
          <FAQSection />
        </Container>
      </section>

      <section className="border-y border-black/10 bg-[#EFEFEC] py-12 md:py-16">
        <Container>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Still have a question?</p>
              <h2 className="mt-2 text-3xl font-light text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Let’s find the right next step.</h2>
              <p className="mt-3 text-sm leading-6 text-black/60">Talk to Junior Dream AI about courses and batches, or explore the available learning paths.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/programs" className="inline-flex min-h-11 items-center gap-2 border border-black/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black no-underline transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Explore courses <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <button type="button" onClick={openAICounsellor} className="inline-flex min-h-11 items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                <MessageCircle size={15} aria-hidden="true" /> Talk to Junior Dream AI
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}