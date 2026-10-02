import { useEffect } from "react";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export function Contact() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");

    document.title = "Contact Junior Dream | Get in Touch";
    description?.setAttribute(
      "content",
      "Contact Junior Dream with questions about engineering courses, admissions, mentorship, or your student's learning journey.",
    );

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== null && previousDescription !== undefined) {
        description.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <div className="bg-[#FAFAF8] text-black">
      <section className="border-b border-black/10 bg-[#F5F5F2]">
        <Container className="py-14 md:py-18">
          <p className="m-0 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-black/40">Contact Junior Dream</p>
          <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Let’s start a conversation.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">Have a question about courses, admissions, mentorship, or the learning journey? Send us a note or contact us directly using the details below.</p>
        </Container>
      </section>

      <Container className="grid gap-8 py-10 md:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
        <aside className="space-y-8">
          <section aria-labelledby="contact-methods-heading">
            <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Reach the team</p>
            <h2 id="contact-methods-heading" className="mt-2 text-2xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Contact information</h2>
            <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
              <a href="mailto:info@juniordream.com" className="flex items-start gap-4 py-5 text-black no-underline hover:bg-black/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
                <Mail size={18} className="mt-0.5 shrink-0 text-black/50" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-[0.12em] text-black/45">Email us</span><span className="mt-1 block text-sm">info@juniordream.com</span></span>
              </a>
              <a href="tel:+918448777696" className="flex items-start gap-4 py-5 text-black no-underline hover:bg-black/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">
                <Phone size={18} className="mt-0.5 shrink-0 text-black/50" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-[0.12em] text-black/45">Call us</span><span className="mt-1 block text-sm">+91 84487 77696</span></span>
              </a>
            </div>
          </section>

          <section className="border-t border-black/10 pt-6" aria-labelledby="faq-link-heading">
            <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Looking for a quick answer?</p>
            <h2 id="faq-link-heading" className="mt-2 text-xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Start with the FAQ center.</h2>
            <p className="mt-2 text-sm leading-6 text-black/55">Browse answers about courses, batches, curriculum, and admissions.</p>
            <Link to="/faq" className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black underline decoration-black/25 underline-offset-4 hover:decoration-black">Visit FAQs <ArrowRight size={14} aria-hidden="true" /></Link>
          </section>

          <section className="border-t border-black/10 pt-6" aria-labelledby="contact-ai-heading">
            <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Need help choosing?</p>
            <h2 id="contact-ai-heading" className="mt-2 text-xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Explore a learning path with Junior Dream AI.</h2>
            <p className="mt-2 text-sm leading-6 text-black/55">Ask about courses, classes, and available batches.</p>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-ai-counsellor"))} className="mt-4 inline-flex min-h-11 items-center gap-2 border border-black/20 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              <MessageCircle size={15} aria-hidden="true" /> Talk to Junior Dream AI
            </button>
          </section>

          <Link to="/programs" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black/65 underline decoration-black/20 underline-offset-4 hover:text-black hover:decoration-black">Explore courses <ArrowRight size={14} aria-hidden="true" /></Link>
        </aside>

        <ContactForm />
      </Container>
    </div>
  );
}