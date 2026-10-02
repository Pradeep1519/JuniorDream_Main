import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useLayoutEffect(() => {
    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}