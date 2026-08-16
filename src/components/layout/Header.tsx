import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { navLinks } from "@/data/navLinks";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  const [scrollProgress, setScrollProgress] = useState(isHome ? 0 : 1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
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
        setScrollProgress(1); // Always show logo on mobile
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
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
      >
        <div className="flex items-center" style={{ 
          height: headerHeight, 
          paddingLeft: 0, 
          paddingRight: isMobile ? 12 : 24 
        }}>
          {/* White strip + logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center relative transition-all duration-700 ease-out"
            style={{
              width: `${headerStripWidth}px`,
              minWidth: isMobile ? 60 : 60,
              height: headerHeight,
              backgroundColor: isMobile ? "transparent" : "#F5F5F5",
              borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Link
              to="/"
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
                  height: isMobile ? 40 : 62, 
                  width: "auto",
                  maxWidth: isMobile ? 56 : "none"
                }} 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden lg:flex items-center gap-6 ml-6">
              {navLinks.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="no-underline transition-opacity duration-200"
                    style={{
                      ...sans,
                      fontSize: "0.8rem",
                      letterSpacing: "0.12em",
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

          {/* Apply Now Button */}
          {!isMobile && (
            <Link
              to="/apply"
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
          )}

          {/* Mobile Apply Button */}
          {isMobile && (
            <Link
              to="/apply"
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
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex-shrink-0 flex flex-col justify-center items-center gap-[5px] ml-2"
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

      {/* Mobile menu overlay */}
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
          <nav className="flex flex-col items-center justify-center gap-8" style={{ height: "calc(100% - 60px)" }}>
            {navLinks.map((item) => (
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
            <Link
              to="/apply"
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
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}