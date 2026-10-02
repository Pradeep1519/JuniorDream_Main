import { useEffect, useState } from "react";

const SEEN_KEY = "jd_intro_seen";
const ANIMATION_DURATION_MS = 2400;

export function Splash() {
  // Skip entirely (no flash of white) if this tab has already seen the intro this session.
  const [shouldRender, setShouldRender] = useState(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const [visible, setVisible] = useState(shouldRender);

  useEffect(() => {
    if (!shouldRender) return;

    try {
      sessionStorage.setItem(SEEN_KEY, "true");
    } catch {
      /* sessionStorage unavailable — animation still plays once per load */
    }

    const timer = setTimeout(() => setVisible(false), ANIMATION_DURATION_MS);
    return () => clearTimeout(timer);
  }, [shouldRender]);

  // Fully remove from the DOM once done, so it costs nothing after the intro.
  useEffect(() => {
    if (!visible && shouldRender) {
      const cleanup = setTimeout(() => setShouldRender(false), 50);
      return () => clearTimeout(cleanup);
    }
  }, [visible, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className="jd-splash-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden="true"
    >
      <img
        src="/assets/images/logos/logo.png"
        alt=""
        className="jd-splash-logo"
        style={{ width: 96, height: "auto" }}
      />
    </div>
  );
}
