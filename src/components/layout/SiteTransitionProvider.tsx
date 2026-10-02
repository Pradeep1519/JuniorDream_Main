import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { WebsiteModeTransition, type SwitchStage } from "./WebsiteModeTransition";

interface SiteTransitionContextValue {
  isTransitioning: boolean;
  switchTo: (path: string, label?: string) => void;
}

const SiteTransitionContext = createContext<SiteTransitionContextValue | null>(null);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// One continuous digital wipe: the particle field + blur sweep down to cover the current
// page ("cover"), the route switches at peak blur/particle density, then the field sweeps
// down again to reveal the destination page while the blur lifts ("reveal").
// Slow and cinematic on purpose - the animation itself (not an artificial delay) fills the time.
const COVER_MS = 1900;
const REVEAL_MS = 1300;
const CLEANUP_MS = 320;

export function SiteTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<SwitchStage>("idle");
  const [stageDuration, setStageDuration] = useState(COVER_MS);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const runningRef = useRef(false);

  const switchTo = useCallback(
    (path: string, nextLabel?: string) => {
      if (runningRef.current) return;
      runningRef.current = true;
      setIsTransitioning(true);
      setLabel(nextLabel);

      const reduced = prefersReducedMotion();
      const coverMs = reduced ? 260 : COVER_MS;
      const revealMs = reduced ? 220 : REVEAL_MS;
      const cleanupMs = reduced ? 120 : CLEANUP_MS;

      setStageDuration(coverMs);
      setStage("cover");

      window.setTimeout(() => {
        navigate(path);
        setStageDuration(revealMs);
        setStage("reveal");

        window.setTimeout(() => {
          setStage("idle");

          window.setTimeout(() => {
            setIsTransitioning(false);
            runningRef.current = false;
          }, cleanupMs);
        }, revealMs);
      }, coverMs);
    },
    [navigate]
  );

  return (
    <SiteTransitionContext.Provider value={{ isTransitioning, switchTo }}>
      {children}
      <WebsiteModeTransition stage={stage} durationMs={stageDuration} label={label} />
    </SiteTransitionContext.Provider>
  );
}

export function useSiteTransition() {
  const ctx = useContext(SiteTransitionContext);
  if (!ctx) {
    throw new Error("useSiteTransition must be used within a SiteTransitionProvider");
  }
  return ctx;
}

