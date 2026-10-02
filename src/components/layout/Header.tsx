import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, LockKeyhole, LogOut, MoreVertical } from "lucide-react";
import { navLinks } from "@/data/navLinks";
import { scrollToTop } from "./ScrollToTop";
import { useSiteTransition } from "./SiteTransitionProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { getTimeGreeting } from "@/lib/greeting";
import { resolveSiteMode } from "@/lib/siteMode";
import type { AccountProfile, EnrollmentRecord } from "@/lib/account";
import { PROFESSIONAL_APPLICATION_ROUTE, PROFESSIONAL_DASHBOARD_ROUTE, PROFESSIONAL_LOGIN_ROUTE } from "@/lib/professionalRoutes";

const professionalNavLinks = [
  { label: "Home", path: "/professional" },
  { label: "Programs", path: "/professional/programs" },
  { label: "Career", path: "/professional/career" },
  { label: "About", path: "/professional/about" },
  { label: "Mentors", path: "/professional/mentors" },
  { label: "FAQ", path: "/professional/faq" },
  { label: "Contact", path: "/professional/contact" },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isTransitioning, switchTo } = useSiteTransition();
  const { profile, enrollment, loading: authLoading, profileLoading, signOutUser } = useAuth();
  const currentMode = resolveSiteMode(location.pathname);
  const isHome = location.pathname === "/";
  const isProfessional = currentMode === "professional";
  const hasProfessionalAccess = profile?.platform === "professional";
  const activeNavLinks = isProfessional ? professionalNavLinks : navLinks;
  const modeSwitchTarget = isProfessional ? "/" : "/professional";
  const modeSwitchLabel = isProfessional ? "Academic Site" : "Professional Site";
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  const [scrollProgress, setScrollProgress] = useState(isHome ? 0 : 1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const rafRef = useRef<number | null>(null);

  const handleModeSwitch = () => {
    if (isTransitioning) return;
    setMenuOpen(false);
    switchTo(
      modeSwitchTarget,
      isProfessional ? "Switching to Academic Ecosystem" : "Switching to Professional Ecosystem"
    );
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
      if (window.innerWidth >= 1280) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome || isMobile) {
      setScrollProgress(isMobile ? 1 : (isHome ? 0 : 1));
      if (isMobile) {
        setScrollProgress(1);
      }
      return;
    }
    setScrollProgress(0);

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const heroHeight = window.innerHeight;
        const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.75), 0), 1);
        setScrollProgress(progress);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isHome, isMobile]);

  const sidebarWidth = isHome ? 220 - scrollProgress * scrollProgress * 160 : 60;
  const headerStripWidth = isMobile ? 60 : Math.max(sidebarWidth, 60);
  const logoOpacity = isMobile ? 1 : scrollProgress;
  const headerHeight = isMobile ? 60 : 76;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          backgroundColor: isProfessional ? "rgba(12, 12, 12, 0.88)" : "rgba(0, 0, 0, 0.95)",
          backdropFilter: isProfessional ? "blur(18px)" : undefined,
          borderBottom: isProfessional ? "1px solid rgba(255,255,255,0.08)" : undefined,
        }}
      >
        <div className="flex items-center" style={{
          height: headerHeight,
          paddingLeft: 0,
          paddingRight: isMobile ? 12 : 24,
        }}>
          <div
            className="relative flex flex-shrink-0 items-center justify-center transition-all duration-700 ease-out"
            style={{
              width: `${headerStripWidth}px`,
              minWidth: isMobile ? 60 : 60,
              height: headerHeight,
              backgroundColor: isProfessional || isMobile ? "transparent" : "#F5F5F5",
              borderRight: isProfessional ? "1px solid rgba(255,255,255,0.08)" : isMobile ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Link
              to={isProfessional ? "/professional" : "/"}
              onClick={(event) => {
                if (isHome) {
                  event.preventDefault();
                  scrollToTop();
                }
              }}
              className="no-underline transition-opacity duration-500 ease-out flex items-center justify-center"
              style={{
                opacity: logoOpacity,
                pointerEvents: logoOpacity > 0.4 ? "auto" : "none",
              }}
            >
              <img
                src="/assets/images/logos/logo.png"
                alt="Junior Dream"
                style={{
                  height: isProfessional ? (isMobile ? 42 : 50) : isMobile ? 40 : 62,
                  width: "auto",
                  maxWidth: isProfessional ? 50 : isMobile ? 56 : "none",
                }}
              />
            </Link>
          </div>

          {!isMobile && (
            <nav className="hidden items-center gap-4 pl-6 xl:flex">
              {activeNavLinks.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`no-underline transition-opacity duration-200 ${isProfessional ? "group relative py-2 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100" : ""} ${isProfessional && active ? "after:scale-x-100" : ""}`}
                    aria-current={active ? "page" : undefined}
                    style={{
                      ...sans,
                      fontSize: isProfessional ? "0.72rem" : "0.8rem",
                      letterSpacing: isProfessional ? "0.09em" : "0.12em",
                      textTransform: "uppercase",
                      fontWeight: active ? 600 : 400,
                      color: "#FFFFFF",
                      opacity: active ? 1 : 0.75,
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex-1" />

          {!isMobile && (
            <button
              type="button"
              onClick={handleModeSwitch}
              disabled={isTransitioning}
              className="mr-3 hidden items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-white transition hover:border-white/40 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50 sm:inline-flex"
            >
              {modeSwitchLabel}
            </button>
          )}

          {!isMobile && (
            authLoading || profileLoading ? <div className="w-24 flex-shrink-0" aria-hidden="true" /> : (isProfessional ? hasProfessionalAccess : profile) ? <UserAccountMenu profile={profile!} enrollment={enrollment} signOutUser={signOutUser} navigateHome={() => navigate(isProfessional ? "/professional" : "/")} isProfessional={isProfessional} /> : (
              <div className="flex items-center gap-3">
                <Link
                  to={isProfessional ? PROFESSIONAL_LOGIN_ROUTE : "/login"}
                  className="hidden sm:block no-underline flex-shrink-0"
                  style={{
                    ...sans,
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.45)",
                    padding: "9px 16px",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.color = "#000000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                >
                  Log In
                </Link>
                <Link
                  to={isProfessional ? PROFESSIONAL_APPLICATION_ROUTE : "/apply"}
                  className="hidden sm:block no-underline flex-shrink-0"
                  style={{
                    ...sans,
                    fontSize: "0.78rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "10px 20px",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    e.currentTarget.style.color = "#000000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                >
                  Apply Now
                </Link>
              </div>
            )
          )}

          {isMobile && (
            authLoading || profileLoading ? <div className="w-12 flex-shrink-0" aria-hidden="true" /> : (isProfessional ? hasProfessionalAccess : profile) ? <UserAccountMenu profile={profile!} enrollment={enrollment} signOutUser={signOutUser} navigateHome={() => navigate(isProfessional ? "/professional" : "/")} isProfessional={isProfessional} compact /> : (
              <div className="flex items-center gap-2">
                <Link
                  to={isProfessional ? PROFESSIONAL_LOGIN_ROUTE : "/login"}
                  className="no-underline flex-shrink-0"
                  style={{
                    ...sans,
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.45)",
                    padding: "7px 10px",
                    transition: "all 0.25s ease",
                  }}
                >
                  Login
                </Link>
                <Link
                  to={isProfessional ? PROFESSIONAL_APPLICATION_ROUTE : "/apply"}
                  className="no-underline flex-shrink-0"
                  style={{
                    ...sans,
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "8px 12px",
                    transition: "all 0.25s ease",
                  }}
                >
                  Apply
                </Link>
              </div>
            )
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-2 flex flex-shrink-0 flex-col items-center justify-center gap-[5px]"
              style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer" }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                style={{
                  width: 22,
                  height: 2,
                  backgroundColor: "#FFFFFF",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 2,
                  backgroundColor: "#FFFFFF",
                  transition: "opacity 0.2s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 2,
                  backgroundColor: "#FFFFFF",
                  transition: "transform 0.3s ease",
                  transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          )}
        </div>
      </header>

      {isMobile && (
        <div
          className="fixed inset-0 z-40"
          style={{
            backgroundColor: "#000000",
            paddingTop: 60,
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
        >
          <nav className="flex h-[calc(100%-60px)] flex-col items-center justify-center gap-8">
            {activeNavLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="no-underline"
                style={{
                  ...sans,
                  fontSize: "1.1rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={handleModeSwitch}
              disabled={isTransitioning}
              className="mt-2 no-underline disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                ...sans,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#000000",
                backgroundColor: "#FFFFFF",
                padding: "12px 24px",
              }}
            >
              {modeSwitchLabel}
            </button>
            <Link
              to={isProfessional ? PROFESSIONAL_LOGIN_ROUTE : "/login"}
              className="no-underline mt-2"
              style={{
                ...sans,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#000000",
                backgroundColor: "#FFFFFF",
                padding: "12px 24px",
              }}
            >
              Login
            </Link>
            <Link
              to={(isProfessional ? hasProfessionalAccess : profile) ? (isProfessional ? PROFESSIONAL_DASHBOARD_ROUTE : "/dashboard") : (isProfessional ? PROFESSIONAL_APPLICATION_ROUTE : "/apply")}
              className="no-underline mt-4"
              style={{
                ...sans,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#000000",
                backgroundColor: "#FFFFFF",
                padding: "12px 28px",
              }}
            >
              {(isProfessional ? hasProfessionalAccess : profile) ? "Dashboard" : "Apply Now"}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function UserAccountMenu({
  profile,
  enrollment,
  signOutUser,
  navigateHome,
  isProfessional,
  compact = false,
}: {
  profile: AccountProfile;
  enrollment: EnrollmentRecord | null;
  signOutUser: () => Promise<void>;
  navigateHome: () => void;
  isProfessional: boolean;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(getTimeGreeting());
  const menuRef = useRef<HTMLDivElement>(null);
  const enrolled = enrollment?.status?.toLowerCase() === "enrolled";

  useEffect(() => {
    const update = () => setGreeting(getTimeGreeting());
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const logout = async () => {
    setOpen(false);
    try {
      await signOutUser();
      navigateHome();
    } catch {
      setOpen(false);
    }
  };

  return (
    <div ref={menuRef} className="relative z-[60] flex flex-shrink-0 items-center gap-1 sm:gap-2">
      <Link to={isProfessional ? PROFESSIONAL_DASHBOARD_ROUTE : "/dashboard"} className={`flex min-w-0 flex-col justify-center text-white no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${compact ? "max-w-[118px]" : "max-w-[190px]"}`} aria-label={`${greeting}, ${profile.name}. Open dashboard`}>
        <span key={greeting} className={`account-greeting-line truncate text-right font-medium text-white/65 ${compact ? "text-[0.52rem] tracking-[0.04em]" : "text-[0.62rem] tracking-[0.08em]"}`}>{greeting}</span>
        <span className={`account-greeting-name truncate text-right font-medium text-white ${compact ? "max-w-[112px] text-[0.7rem]" : "text-sm"}`}>{profile.name}</span>
      </Link>
      <button type="button" aria-label="Open account menu" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className={`flex shrink-0 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${compact ? "h-9 w-8" : "h-10 w-10"}`}>
        <MoreVertical size={19} aria-hidden="true" />
      </button>
      {open && (
        <div role="menu" aria-label="Account menu" className="account-enter absolute right-0 top-[calc(100%+10px)] z-[70] w-64 overflow-hidden rounded-lg border border-black/10 bg-white py-2 text-black shadow-[0_16px_44px_rgba(0,0,0,0.2)]">
          <Link role="menuitem" to={isProfessional ? PROFESSIONAL_DASHBOARD_ROUTE : "/dashboard"} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 px-4 text-sm text-black/75 no-underline hover:bg-[#F5F5F2] hover:text-black focus-visible:bg-[#F5F5F2] focus-visible:outline-none"><LayoutDashboard size={16} aria-hidden="true" />Dashboard</Link>
          {!isProfessional && enrolled ? (
            <Link role="menuitem" to="/student-portal" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 px-4 text-sm text-black/75 no-underline hover:bg-[#F5F5F2] hover:text-black focus-visible:bg-[#F5F5F2] focus-visible:outline-none">Student Portal</Link>
          ) : !isProfessional ? (
            <button role="menuitem" type="button" disabled title="Student Portal will become available after you enroll in a course." className="flex min-h-11 w-full cursor-not-allowed items-center gap-3 px-4 text-left text-sm text-black/40" aria-describedby="portal-locked-help"><LockKeyhole size={16} aria-hidden="true" />Student Portal <span className="ml-auto text-[0.62rem] uppercase tracking-[0.1em]">Locked</span></button>
          ) : null}
          {!isProfessional && !enrolled && <p id="portal-locked-help" className="m-0 border-b border-black/10 px-4 pb-3 pl-11 text-[0.68rem] leading-5 text-black/45">Student Portal will become available after you enroll in a course.</p>}
          <button role="menuitem" type="button" onClick={logout} className="flex min-h-11 w-full items-center gap-3 border-t border-black/10 px-4 text-left text-sm text-black/70 hover:bg-[#F5F5F2] hover:text-black focus-visible:bg-[#F5F5F2] focus-visible:outline-none"><LogOut size={16} aria-hidden="true" />Log out</button>
        </div>
      )}
    </div>
  );
}