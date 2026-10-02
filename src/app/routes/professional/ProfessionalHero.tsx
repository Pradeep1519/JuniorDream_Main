import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown, GraduationCap, ShieldCheck, Users, Layers } from "lucide-react";
import { professionalCourses } from "@/data/professionalCourses";

const headlineLines = ["The Future Is AI.", "Build The Skills To Lead It."];

// Genuine, verifiable facts only — no invented stats, testimonials, or placement numbers.
const trustPoints = [
  { icon: Layers, label: "Professional tracks" },
  { icon: Users, label: "Mentor-guided" },
  { icon: GraduationCap, label: "Project-led" },
  { icon: ShieldCheck, label: "Portfolio-ready" },
];

// AI & data tracks lead the rotation first, since AI is the primary focus going forward.
const categoryPriority: Record<string, number> = { "Data & AI": 0, "Software Development": 1, "Cloud & Security": 2 };

const SPOTLIGHT_INTERVAL_MS = 2000;

function scrollToHighlights() {
  document.getElementById("professional-highlights")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ProfessionalHero() {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [spotlightPaused, setSpotlightPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Stable AI-first ordering used for both the spotlight rotation and the track strip.
  const displayCourses = useMemo(
    () => [...professionalCourses].sort((a, b) => categoryPriority[a.category] - categoryPriority[b.category]),
    []
  );

  const spotlightCourse = displayCourses[spotlightIndex];

  // Trigger the entrance sequence one frame after mount so the pre-reveal state actually paints first.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  // Auto-rotate the featured course so real course content, not filler copy, carries the inspiration.
  useEffect(() => {
    if (reduceMotion || spotlightPaused) return;
    const id = window.setInterval(() => {
      setSpotlightIndex((index) => (index + 1) % displayCourses.length);
    }, SPOTLIGHT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, spotlightPaused, displayCourses.length]);

  // Subtle scroll-linked parallax/fade, skipped entirely under reduced motion.
  useEffect(() => {
    if (reduceMotion) return;
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const heroHeight = sectionRef.current?.offsetHeight ?? window.innerHeight;
        const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.85), 0), 1);
        setScrollProgress(progress);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  // Returns props for a staggered reveal: visible once `mounted`, each step offset by `delay`ms.
  const reveal = (delay: number) => ({
    className: `jd-pro-reveal ${mounted ? "is-in" : ""}`,
    style: { transitionDelay: reduceMotion ? "0ms" : `${delay}ms` },
  });

  return (
    <section
      ref={sectionRef}
      className="jd-pro-hero"
      aria-labelledby="professional-hero-title"
    >
      <div
        className={`jd-pro-hero__bg ${mounted ? "is-visible" : ""}`}
        style={reduceMotion ? undefined : { transform: `translate3d(0, ${scrollProgress * 36}px, 0)` }}
        aria-hidden="true"
      >
        <div className="jd-pro-hero__grid" />
        <div className="jd-pro-hero__glow" />
        <div className="jd-pro-hero__aurora" aria-hidden="true">
          <span className="jd-pro-hero__aurora-blob jd-pro-hero__aurora-blob--one" />
          <span className="jd-pro-hero__aurora-blob jd-pro-hero__aurora-blob--two" />
          <span className="jd-pro-hero__aurora-blob jd-pro-hero__aurora-blob--three" />
        </div>
        <div className="jd-pro-hero__sheen" aria-hidden="true" />
      </div>
      <div className="jd-pro-hero__overlay" aria-hidden="true" />

      <div className="jd-pro-hero__main">
        <div
          className="jd-pro-hero__content"
          style={reduceMotion ? undefined : { opacity: 1 - scrollProgress * 0.65, transform: `translate3d(0, ${scrollProgress * -24}px, 0)` }}
        >
          <p {...reveal(150)} className={`jd-pro-hero__eyebrow ${reveal(150).className}`}>
            <span className="jd-pro-hero__eyebrow-dot" aria-hidden="true" />
            Junior Dream &middot; AI-First Professional Courses
          </p>

          <h1 id="professional-hero-title" className="jd-pro-hero__headline">
            {headlineLines.map((line, index) => (
              <span key={line} className="jd-pro-hero__line-mask">
                <span {...reveal(280 + index * 160)} className={`jd-pro-hero__line ${reveal(280 + index * 160).className}`}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p {...reveal(640)} className={`jd-pro-hero__sub ${reveal(640).className}`}>
            From machine learning to generative AI and data systems — learn to build, train, and apply real AI and
            technology skills through live mentorship and real projects, not just lectures.
          </p>

          <div {...reveal(800)} className={`jd-pro-hero__ctas ${reveal(800).className}`}>
            <Link to="/professional/programs" className="jd-pro-hero__cta-primary">
              Explore Professional Courses
              <ArrowRight size={16} aria-hidden="true" className="jd-pro-hero__cta-arrow" />
            </Link>
            <button type="button" onClick={scrollToHighlights} className="jd-pro-hero__cta-secondary">
              View Courses
            </button>
          </div>
        </div>

        <aside
          {...reveal(620)}
          className={`jd-pro-hero__trust ${reveal(620).className}`}
          aria-label="Featured professional program"
          onMouseEnter={() => setSpotlightPaused(true)}
          onMouseLeave={() => setSpotlightPaused(false)}
          onFocus={() => setSpotlightPaused(true)}
          onBlur={() => setSpotlightPaused(false)}
        >
          <p className="jd-pro-hero__trust-eyebrow">Featured program</p>

          <div key={spotlightCourse.id} className="jd-pro-hero__spotlight">
            <h2 className="jd-pro-hero__spotlight-title">{spotlightCourse.title}</h2>
            <p className="jd-pro-hero__spotlight-desc">{spotlightCourse.shortDescription}</p>
            <ul className="jd-pro-hero__spotlight-chips">
              {spotlightCourse.technologies.slice(0, 4).map((tech) => (
                <li key={tech} className="jd-pro-hero__spotlight-chip">{tech}</li>
              ))}
            </ul>
            <Link
              to={`/professional/programs/${spotlightCourse.slug}`}
              className="jd-pro-hero__spotlight-link"
            >
              View program
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="jd-pro-hero__spotlight-dots" role="tablist" aria-label="Choose a featured program">
            {displayCourses.map((course, index) => (
              <button
                key={course.id}
                type="button"
                role="tab"
                aria-selected={index === spotlightIndex}
                aria-label={course.title}
                className={`jd-pro-hero__spotlight-dot ${index === spotlightIndex ? "is-active" : ""}`}
                onClick={() => setSpotlightIndex(index)}
              />
            ))}
          </div>

          <ul className="jd-pro-hero__trust-mini">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="jd-pro-hero__trust-mini-item">
                <Icon size={14} strokeWidth={2} aria-hidden="true" />
                <span>{label === "Professional tracks" ? `${professionalCourses.length} ${label}` : label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div {...reveal(1000)} className={`jd-pro-hero__strip ${reveal(1000).className}`}>
        <span className="jd-pro-hero__strip-label">Explore every track</span>
        <div className="jd-pro-hero__strip-track">
          <div className="jd-pro-hero__strip-row">
            {[...displayCourses, ...displayCourses].map((course, index) => (
              <Link
                key={`${course.id}-${index}`}
                to={`/professional/programs/${course.slug}`}
                tabIndex={index < displayCourses.length ? 0 : -1}
                aria-hidden={index >= displayCourses.length}
                className="jd-pro-hero__strip-item"
              >
                {course.title}
              </Link>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollToHighlights}
          className="jd-pro-hero__scroll-indicator"
          aria-label="Scroll to professional course highlights"
        >
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default ProfessionalHero;
