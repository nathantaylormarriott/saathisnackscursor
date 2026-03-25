/**
 * Same fade-up preset as the-big-green-tent-main (Framer Motion + scroll reveal).
 */
export const fadeUpEase = [0.25, 0.1, 0.25, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: fadeUpEase },
} as const;
