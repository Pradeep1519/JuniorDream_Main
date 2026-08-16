import { Link, useLocation } from "react-router";
import { MapPin, Mail, Instagram, Linkedin } from "lucide-react";
import { footerLinks } from "@/data/footerLinks";

export function Footer() {
  const location = useLocation();
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Col 1 - Identity */}
          <div className="lg:col-span-1">
            <div className="text-xs tracking-[0.25em] uppercase font-semibold text-black mb-5" style={sans}>
              Junior Dream
            </div>
            <div className="flex items-start gap-2 text-sm text-foreground/50 mb-1" style={sans}>
              <MapPin size={13} className="mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
                123 Education Hub<br />
                New Delhi, India
              </span>
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 mb-6" style={sans}>
              Quick Links
            </div>
            <ul className="space-y-3">
              {footerLinks.quick.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.label}>
                    <Link 
                      to={item.path} 
                      className="no-underline"
                      style={{
                        ...sans,
                        fontSize: "0.875rem",
                        color: active ? "#000000" : "rgba(0,0,0,0.5)",
                        fontWeight: active ? 600 : 400,
                        transition: "color 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = active ? "#000000" : "rgba(0,0,0,0.5)";
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3 - Programs */}
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 mb-6" style={sans}>
              Programs
            </div>
            <ul className="space-y-3">
              {footerLinks.programs.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.label}>
                    <Link 
                      to={item.path} 
                      className="no-underline"
                      style={{
                        ...sans,
                        fontSize: "0.875rem",
                        color: active ? "#000000" : "rgba(0,0,0,0.5)",
                        fontWeight: active ? 600 : 400,
                        transition: "color 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = active ? "#000000" : "rgba(0,0,0,0.5)";
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4 - Connect */}
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 mb-6" style={sans}>
              Connect
            </div>
            <ul className="space-y-3 mb-8">
              {footerLinks.legal.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.label}>
                    <Link 
                      to={item.path} 
                      className="no-underline"
                      style={{
                        ...sans,
                        fontSize: "0.875rem",
                        color: active ? "#000000" : "rgba(0,0,0,0.5)",
                        fontWeight: active ? 600 : 400,
                        transition: "color 0.2s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#000000";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = active ? "#000000" : "rgba(0,0,0,0.5)";
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-foreground/40 hover:text-foreground transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-foreground/40 hover:text-foreground transition-colors">
                <Linkedin size={15} />
              </a>
              <a href="mailto:info@juniordream.com" aria-label="Email" className="text-foreground/40 hover:text-foreground transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[11px] text-foreground/30 tracking-wide" style={sans}>
            © 2026 Junior Dream Private Limited. All rights reserved.
          </span>
          <span className="text-[11px] text-foreground/20 tracking-wide" style={sans}>
            Empowering Young Minds
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;