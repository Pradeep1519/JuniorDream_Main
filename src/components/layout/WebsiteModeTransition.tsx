import { useEffect, useRef } from "react";

export type SwitchStage = "idle" | "cover" | "reveal";

const MAX_BLUR_PX = 20;
const MAX_TINT_ALPHA = 0.34;

type ParticleGroup = "vertical" | "diagonal" | "horizontal" | "depth" | "float";

interface Particle {
  baseX: number;
  baseY: number;
  group: ParticleGroup;
  phase: number;
  speed: number;
  ampX: number;
  ampY: number;
  scaleAmp: number;
  edgeJitter: number;
  radius: number;
  hue: number;
}

// Weighted so most particles drift mostly-vertically, with diagonal/horizontal/depth/float mixed in.
function pickGroup(seed: number): ParticleGroup {
  if (seed < 0.4) return "vertical";
  if (seed < 0.65) return "diagonal";
  if (seed < 0.8) return "horizontal";
  if (seed < 0.92) return "depth";
  return "float";
}

function buildParticles(width: number, height: number, spacing: number): Particle[] {
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const particles: Particle[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const seed = (Math.sin(row * 12.9898 + col * 78.233) * 43758.5453) % 1;
      const rand = Math.abs(seed);
      const group = pickGroup(rand);
      const baseX = col * spacing + ((row % 2) * spacing) / 2 + (rand - 0.5) * spacing * 0.4;
      const baseY = row * spacing + (rand - 0.5) * spacing * 0.4;

      particles.push({
        baseX,
        baseY,
        group,
        phase: rand * Math.PI * 2,
        speed: 0.11 + rand * 0.27,
        ampX: group === "horizontal" ? 10 + rand * 14 : group === "diagonal" ? 5 + rand * 9 : group === "float" ? 2 + rand * 4 : 0.8,
        ampY: group === "vertical" ? 7 + rand * 13 : group === "diagonal" ? 7 + rand * 12 : group === "depth" ? 2 + rand * 3 : group === "float" ? 2 + rand * 4 : 3,
        scaleAmp: group === "depth" ? 0.45 + rand * 0.5 : 0.12,
        edgeJitter: (rand - 0.5) * 2,
        radius: 1 + rand * 1.1,
        hue: 195 + rand * 30,
      });
    }
  }

  return particles;
}

export function WebsiteModeTransition({
  stage,
  durationMs,
  label,
}: {
  stage: SwitchStage;
  durationMs: number;
  label?: string;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const stageRef = useRef<SwitchStage>(stage);
  const startRef = useRef(0);
  const durationRef = useRef(durationMs);
  const metricsRef = useRef({ width: 0, height: 0, bandHeight: 130 });
  const particlesRef = useRef<Particle[]>([]);

  // Resize the canvas backing store and rebuild the particle field for the new viewport.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 480 ? 30 : width < 640 ? 25 : width < 1024 ? 19 : 15;
      metricsRef.current = { width, height, bandHeight: Math.max(height * 0.22, 120) };
      particlesRef.current = buildParticles(width, height, spacing);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Drive the wave + blur amount for the active stage; idle cancels the loop and clears the canvas.
  useEffect(() => {
    stageRef.current = stage;
    durationRef.current = durationMs;
    startRef.current = performance.now();

    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (stage === "idle") {
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (overlay) {
        overlay.style.backdropFilter = "none";
        (overlay.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = "none";
        overlay.style.backgroundColor = "transparent";
      }
      return;
    }

    if (!ctx || !canvas || !overlay) return;

    const render = (now: number) => {
      const currentStage = stageRef.current;
      const { width, height, bandHeight } = metricsRef.current;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / durationRef.current, 1);
      // Smooth ease-in-out: slow to start, slow to settle, matching a cinematic feel.
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      const waveY = eased * (height + bandHeight) - bandHeight / 2;
      const blurPx = currentStage === "cover" ? eased * MAX_BLUR_PX : (1 - eased) * MAX_BLUR_PX;
      const blurRatio = blurPx / MAX_BLUR_PX;
      const tint = blurRatio * MAX_TINT_ALPHA;

      overlay.style.backdropFilter = `blur(${blurPx.toFixed(2)}px) saturate(${(1 + blurRatio * 0.22).toFixed(2)}) brightness(${(1 - blurRatio * 0.2).toFixed(2)}) contrast(${(1 + blurRatio * 0.08).toFixed(2)})`;
      (overlay.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter = overlay.style.backdropFilter;
      overlay.style.backgroundColor = `rgba(5, 8, 15, ${tint.toFixed(3)})`;

      ctx.clearRect(0, 0, width, height);

      const t = now * 0.00045;
      const slowT = now * 0.00012;

      for (const p of particlesRef.current) {
        // Soft undulating wave line (not a hard rectangular edge) plus per-particle scatter.
        const edgeOffset =
          Math.sin(p.baseX * 0.006 + slowT) * bandHeight * 0.35 +
          Math.sin(p.baseX * 0.017 + slowT * 1.7 + 2.1) * bandHeight * 0.15 +
          p.edgeJitter * bandHeight * 0.25;
        const effectiveWaveY = waveY + edgeOffset;
        const distance = p.baseY - effectiveWaveY;

        let alpha = 0;
        if (currentStage === "cover") {
          if (distance <= 0) {
            const edge = Math.max(0, 1 - Math.abs(distance) / bandHeight);
            alpha = 0.16 + edge * 0.62;
          }
        } else if (distance > -bandHeight) {
          const edge = Math.max(0, 1 - Math.abs(distance) / bandHeight);
          alpha = distance > 0 ? 0.16 + edge * 0.46 : edge * 0.78;
        }

        if (alpha <= 0.01) continue;

        const angle = t * p.speed * Math.PI * 2 + p.phase;
        const dx = p.group === "float" || p.group === "horizontal" || p.group === "diagonal" ? Math.sin(angle) * p.ampX : Math.sin(angle) * p.ampX * 0.2;
        const dy = Math.cos(angle * 0.85 + p.phase * 0.6) * p.ampY;
        const breathe = 0.78 + 0.22 * Math.sin(angle * 1.1 + p.phase);
        const scalePulse = p.group === "depth" ? 1 + Math.sin(angle * 0.7 + p.phase) * p.scaleAmp : 1;

        const x = p.baseX + dx;
        const y = p.baseY + dy;
        const radius = Math.max(0.4, p.radius * scalePulse);
        const dotAlpha = Math.min(1, alpha * breathe * (p.group === "depth" ? scalePulse : 1));

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue.toFixed(0)}, 90%, 78%, ${dotAlpha.toFixed(3)})`;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [stage, durationMs]);

  return (
    <div
      ref={overlayRef}
      className={`jd-switch-overlay ${stage !== "idle" ? "jd-switch-overlay--active" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={label ?? "Switching website experience"}
    >
      <canvas ref={canvasRef} className="jd-switch-canvas" />
      <div className={`jd-switch-label ${stage !== "idle" ? "jd-switch-label--visible" : ""}`}>{label}</div>
    </div>
  );
}



