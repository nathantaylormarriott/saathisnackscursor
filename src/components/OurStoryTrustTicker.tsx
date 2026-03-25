import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

type Props = {
  items: readonly string[];
};

/**
 * Horizontal trust strip: rAF + inline transform (CSS marquee + var(--shift) is flaky with masks / Safari).
 */
export function OurStoryTrustTicker({ items }: Props) {
  const measureRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shiftRef = useRef(0);
  const posRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const durationSecRef = useRef(72);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [cyclePx, setCyclePx] = useState(0);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useLayoutEffect(() => {
    if (reduceMotion) return;
    const el = measureRef.current;
    if (!el) return;

    const sync = () => {
      const w = el.offsetWidth;
      shiftRef.current = w;
      setCyclePx(w);
      posRef.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = "translate3d(0,0,0)";
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items, reduceMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => {
      durationSecRef.current = mq.matches ? 55 : 72;
    };
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (reduceMotion || cyclePx <= 0) return;

    const tick = (now: number) => {
      if (document.visibilityState === "hidden") {
        lastTsRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const shift = shiftRef.current;
      if (shift <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const last = lastTsRef.current || now;
      const dt = Math.min((now - last) / 1000, 0.05);
      lastTsRef.current = now;

      const pxPerSec = shift / durationSecRef.current;
      posRef.current -= pxPerSec * dt;
      while (posRef.current <= -shift) {
        posRef.current += shift;
      }

      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${posRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    lastTsRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cyclePx, reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-4 text-center md:gap-x-12">
          {items.map((text) => (
            <span
              key={text}
              className="font-label text-sm text-deep-purple inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
            >
              <Heart size={14} className="shrink-0 text-mustard" fill="currentColor" aria-hidden />
              {text}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 bg-gradient-to-r from-background to-transparent md:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 bg-gradient-to-l from-background to-transparent md:w-16"
        aria-hidden
      />
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={measureRef} className="flex shrink-0 gap-10 pr-10 md:gap-14 md:pr-14">
          {items.map((text) => (
            <span
              key={`a-${text}`}
              className="font-label text-sm text-deep-purple inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
            >
              <Heart size={14} className="shrink-0 text-mustard" fill="currentColor" aria-hidden />
              {text}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 gap-10 md:gap-14" aria-hidden>
          {items.map((text) => (
            <span
              key={`b-${text}`}
              className="font-label text-sm text-deep-purple inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
            >
              <Heart size={14} className="shrink-0 text-mustard" fill="currentColor" aria-hidden />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
