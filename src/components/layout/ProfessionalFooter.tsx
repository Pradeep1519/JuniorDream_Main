import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router";

const professionalLinks = [
  { label: "Home", path: "/professional" },
  { label: "Programs", path: "/professional/programs" },
  { label: "About", path: "/professional/about" },
  { label: "Mentors", path: "/professional/mentors" },
  { label: "FAQ", path: "/professional/faq" },
  { label: "Contact", path: "/professional/contact" },
];

export function ProfessionalFooter() {
  const location = useLocation();
  const isActive = (path: string) => path === "/professional" ? location.pathname === "/professional" : location.pathname.startsWith(path);

  return (
    <footer className="border-t border-black/10 bg-[#0E0E0E] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 md:px-8 lg:px-20 xl:px-28">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="m-0 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/40">Build what comes next</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-light leading-tight sm:text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              A clearer path into your next chapter.
            </h2>
          </div>
          <Link to="/professional/programs" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start border border-white/25 px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white no-underline transition-colors hover:border-white hover:bg-white hover:text-black md:self-auto">
            Explore programs <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link to="/professional" aria-label="Junior Dream Professional home" className="mb-5 inline-flex items-center gap-3 no-underline">
              <img src="/assets/images/logos/logo.png" alt="" className="h-14 w-14 rounded-full object-contain" />
              <span>
                <span className="block text-sm font-medium uppercase tracking-[0.2em] text-white">Junior Dream</span>
                <span className="mt-1 block text-[0.6rem] font-medium uppercase tracking-[0.24em] text-white/45">Professional learning</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-white/60">
              Professional learning for college students and career-focused learners building practical, future-ready skills.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/40">Navigate</p>
            <ul className="space-y-3 text-sm text-white/70">
              {professionalLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} aria-current={isActive(item.path) ? "page" : undefined} className={`transition-colors hover:text-white ${isActive(item.path) ? "text-white" : "text-white/65"}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/40">Explore</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/professional/programs" className="hover:text-white">Professional programs</Link></li>
              <li><Link to="/professional/about" className="hover:text-white">Learning philosophy</Link></li>
              <li><Link to="/professional/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/professional/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/40">Connect</p>
            <a href="mailto:info@juniordream.com" className="inline-flex items-center gap-2 text-sm text-white/70 no-underline transition-colors hover:text-white">
              <Mail size={15} aria-hidden="true" /> info@juniordream.com
            </a>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-ai-counsellor"))} className="mt-5 inline-flex min-h-10 items-center gap-2 border border-white/15 px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white transition hover:border-white hover:bg-white hover:text-black">
              <MessageCircle size={14} aria-hidden="true" /> Ask Junior Dream AI
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Junior Dream Private Limited.</span>
          <div className="flex items-center gap-2">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <span>•</span>
            <Link to="/professional" className="hover:text-white">Professional</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
