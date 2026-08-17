import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { heroPanels } from "@/data/heroPanels";

// ✅ Motivational Lines for Typewriter
const motivationalLines = [
  "Invest in your child's creative future today.",
  "Where passion meets profession, dreams take flight.",
  "Nurturing the next generation of artists and innovators.",
  "Education is not preparation for life; education is life itself.",
  "Every masterpiece begins with a single stroke of courage.",
];

// ✅ Colors for "Junior" animation
const juniorColors = [
  "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B",
  "#C084FC", "#FB923C", "#34D399", "#F472B6", "#60A5FA",
];

export function HeroSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [_scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [juniorColorIndex, setJuniorColorIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const heroRef = useRef<HTMLDivElement>(null);

  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" } as const;

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ "Junior" Color Animation
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setJuniorColorIndex((prev) => (prev + 1) % juniorColors.length);
    }, 2000);
    return () => clearInterval(colorInterval);
  }, []);

  // ✅ Typewriter Effect
  useEffect(() => {
    const currentFullText = motivationalLines[currentLine];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentLine((prev) => (prev + 1) % motivationalLines.length);
          }
        }
      },
      isDeleting ? 35 : 55
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentLine]);

  // ✅ Scroll Effect (rAF-throttled)
  useEffect(() => {
    const rafRef = { current: null as number | null };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        setScrolled(scrollY > 30);

        const progress = Math.min(Math.max(scrollY / (heroHeight * 0.75), 0), 1);
        setScrollProgress(progress);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const sidebarWidth = 220 - (scrollProgress * scrollProgress * 160);
  const sidebarLogoSize = 190 - (scrollProgress * 100);
  const textTranslateY = scrollProgress * -200;
  const textOpacity = 1 - scrollProgress;
  const showSidebar = !isMobile && !isTablet;

  return (
    <>
      {/* HERO SECTION */}
      <section 
        ref={heroRef} 
        className="flex" 
        style={{ 
          height: isMobile ? "calc(100vh - 60px)" : "100vh",
          minHeight: isMobile ? 500 : 600,
          marginTop: isMobile ? 60 : 0,
        }}
      >
        {/* LEFT SIDEBAR - Only on desktop */}
        {showSidebar && (
          <div
            className="flex-col flex-shrink-0 hidden lg:flex relative overflow-hidden transition-all duration-700 ease-out"
            style={{
              width: `${sidebarWidth}px`,
              backgroundColor: "#F5F5F5",
              borderRight: sidebarWidth > 10 ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
              opacity: 1 - (scrollProgress * 0.3),
            }}
          >
            {/* Logo */}
            <div
              className="flex items-start justify-center flex-1 transition-all duration-700 ease-out"
              style={{
                paddingTop: 120,
                opacity: 1 - scrollProgress,
                transform: `scale(${1 - (scrollProgress * 0.3)})`,
              }}
            >
              <Link to="/" className="no-underline">
                <img
                  src="/assets/images/logos/logo.png"
                  alt="Creative Arts Academy"
                  style={{
                    width: sidebarLogoSize,
                    height: "auto",
                    maxWidth: 340,
                    transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </Link>
            </div>

            {/* Text */}
            <div
              className="flex items-center justify-center p-4 absolute left-0 right-0 transition-all duration-700 ease-out"
              style={{
                bottom: "15%",
                opacity: textOpacity,
                transform: `translateY(${textTranslateY}px)`,
              }}
            >
              <p
                className="select-none text-center m-0 leading-relaxed"
                style={{
                  fontFamily: "'Space Mono', 'JetBrains Mono', 'Courier New', monospace",
                  writingMode: "vertical-rl",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  color: `rgba(0, 0, 0, ${textOpacity * 0.99})`,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1), 0 0 8px rgba(0,0,0,0.05)",
                  whiteSpace: "nowrap",
                }}
              >
                Learn from achievers to become one
              </p>
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* ✅ HERO TITLE + TYPEWRITER */}
          <div
            className="bg-black flex-shrink-0 flex flex-col justify-center"
            style={{ 
              paddingTop: isMobile ? 15 : 70, 
              paddingBottom: isMobile ? 20 : 32,
              paddingLeft: isMobile ? 16 : (isTablet ? 24 : 48),
              paddingRight: isMobile ? 16 : (isTablet ? 24 : 48),
              minHeight: isMobile ? 180 : 150,
            }}
          >
            <h1
              className="text-white m-0 font-light"
              style={{
                ...sans,
                fontSize: isMobile ? "clamp(1.8rem, 7vw, 2.2rem)" : (isTablet ? "clamp(2rem, 4vw, 2.5rem)" : "clamp(2.5rem, 4vw, 3.5rem)"),
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              {/* ✅ "Junior" with changing color */}
              <span
                style={{
                  color: juniorColors[juniorColorIndex],
                  transition: "color 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Junior
              </span>{" "}
              Dream Private Limited
            </h1>

            {/* ✅ "Where Passion Meets Profession" */}
            <p
              className="text-white/70 m-0 font-light"
              style={{
                ...serif,
                fontSize: isMobile ? "clamp(0.9rem, 3.5vw, 1rem)" : (isTablet ? "clamp(0.95rem, 2vw, 1.1rem)" : "clamp(1rem, 1.5vw, 1.3rem)"),
                fontStyle: "italic",
                letterSpacing: "0.04em",
                marginBottom: isMobile ? 10 : 14,
              }}
            >
              Where Passion Meets Profession
            </p>

            {/* ✅ Typewriter Text with Cursor - INLINE FIX */}
            <div className="flex items-start" style={{ minHeight: isMobile ? 40 : 30 }}>
              <span
                className="text-white/90 font-light"
                style={{
                  ...serif,
                  fontSize: isMobile ? "clamp(0.8rem, 3vw, 0.9rem)" : (isTablet ? "clamp(0.85rem, 1.5vw, 1rem)" : "clamp(0.95rem, 1.4vw, 1.2rem)"),
                  fontStyle: "italic",
                  letterSpacing: "0.02em",
                  lineHeight: 1.4,
                }}
              >
                {displayText}
                {/* Cursor - Inline with text */}
                <span
                  className="inline-block"
                  style={{
                    width: 2,
                    height: "1.2em",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    animation: "blink 0.8s infinite",
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                    display: "inline-block",
                  }}
                />
              </span>
            </div>
          </div>

          {/* ✅ Image Grid - Stack on mobile, horizontal on desktop/tablet */}
          {isMobile ? (
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
              {heroPanels.map((panel) => (
                <div
                  key={panel.label}
                  className="relative overflow-hidden cursor-pointer"
                  style={{
                    flex: 1,
                    minHeight: 200,
                  }}
                >
                  <img
                    src={panel.img}
                    alt={panel.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Dark Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "rgba(0, 0, 0, 0.35)",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />

                  {/* Text */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 select-none">
                    <h2
                      className="text-white font-light m-0 leading-tight text-center"
                      style={{
                        ...serif,
                        fontSize: "clamp(1.2rem, 4.5vw, 1.5rem)",
                        fontStyle: "italic",
                        textShadow: "0 2px 16px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)",
                        whiteSpace: "pre-line",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {panel.label}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 min-h-0">
              {heroPanels.map((panel, i) => (
                <div
                  key={panel.label}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    flex: hoveredCard === i ? "1.5 1 0%" : "1 1 0%",
                    transition: "flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img
                    src={panel.img}
                    alt={panel.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transform: hoveredCard === i ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />

                  {/* Dark Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity"
                    style={{
                      background: "rgba(0, 0, 0, 0.25)",
                      opacity: hoveredCard === i ? 1 : 0.6,
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />

                  {/* Text */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-6 select-none"
                    style={{
                      transform: hoveredCard === i ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.4s ease",
                    }}
                  >
                    <h2
                      className="text-white font-light m-0 leading-tight text-center"
                      style={{
                        ...serif,
                        fontSize: isTablet ? "clamp(1.2rem, 2.5vw, 1.5rem)" : "clamp(1.4rem, 2vw, 1.8rem)",
                        fontStyle: "italic",
                        textShadow: "0 2px 16px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)",
                        whiteSpace: "pre-line",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {panel.label}
                    </h2>
                  </div>

                  {/* Vertical Divider */}
                  {i < heroPanels.length - 1 && (
                    <div
                      className="absolute top-0 right-0 h-full"
                      style={{ width: "1px", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ✅ Blink Animation */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @media (max-width: 768px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </>
  );
}

export default HeroSection;