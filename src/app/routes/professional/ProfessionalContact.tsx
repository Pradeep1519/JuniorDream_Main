import { Link } from "react-router";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export function ProfessionalContact() {
  return (
    <div className="bg-[#F7F7F5] text-black">
      <section className="border-b border-black/10 bg-[#F0F0EC]">
        <Container className="py-14 md:py-18">
          <p className="m-0 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-black/40">Professional contact</p>
          <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Let’s map the right learning path.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">Talk to the Junior Dream team about the professional pathways, technical direction, mentorship, or course fit that best matches your goals.</p>
        </Container>
      </section>

      <Container className="grid gap-8 py-10 md:py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
        <aside className="space-y-8">
          <section>
            <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Reach the team</p>
            <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
              <a href="mailto:info@juniordream.com" className="flex items-start gap-4 py-5 text-black no-underline hover:bg-black/[0.025]">
                <Mail size={18} className="mt-0.5 shrink-0 text-black/50" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-[0.12em] text-black/45">Email us</span><span className="mt-1 block text-sm">info@juniordream.com</span></span>
              </a>
              <a href="tel:+918448777696" className="flex items-start gap-4 py-5 text-black no-underline hover:bg-black/[0.025]">
                <Phone size={18} className="mt-0.5 shrink-0 text-black/50" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-[0.12em] text-black/45">Call us</span><span className="mt-1 block text-sm">+91 84487 77696</span></span>
              </a>
            </div>
          </section>
          <section className="border-t border-black/10 pt-6">
            <p className="m-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-black/40">Need direction?</p>
            <p className="mt-3 text-sm leading-6 text-black/55">Explore the programs and choose the path that best fits the kind of work you want to build toward.</p>
            <Link to="/professional/programs" className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-black underline decoration-black/20 underline-offset-4">Explore programs <ArrowRight size={14} aria-hidden="true" /></Link>
          </section>
          <section className="border-t border-black/10 pt-6">
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-ai-counsellor"))} className="inline-flex min-h-11 items-center gap-2 border border-black/20 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-black transition-colors hover:border-black hover:bg-black hover:text-white">
              <MessageCircle size={15} aria-hidden="true" /> Talk to Junior Dream AI
            </button>
          </section>
        </aside>

        <ContactForm />
      </Container>
    </div>
  );
}

export default ProfessionalContact;
