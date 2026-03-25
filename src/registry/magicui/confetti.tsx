import type { Options as ConfettiOptions } from "canvas-confetti";
import confetti from "canvas-confetti";
import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

/** Brand confetti palette */
const CELEBRATION_COLORS = ["#fd3a7d", "#ffb81a", "#3cbcd6", "#58ba4a", "#52126c"];

/**
 * Big Green Tent–style celebration: three bursts from the lower band (centre + left + right).
 * Matches the-big-green-tent-main Newsletter subscribe behaviour; colours are Saathi brand.
 */
export function fireSubscribeStyleConfetti() {
  try {
    const opts = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: CELEBRATION_COLORS,
    };
    confetti(opts);
    confetti({ ...opts, angle: 60, origin: { x: 0, y: 0.6 } });
    confetti({ ...opts, angle: 120, origin: { x: 1, y: 0.6 } });
  } catch (error) {
    console.error("Confetti error:", error);
  }
}

/** Fire confetti from the center of an element (e.g. submit button). Falls back to screen center. */
export function fireConfettiFromElement(el: HTMLElement | null, options?: ConfettiOptions) {
  try {
    if (!el) {
      void confetti({ ...options, origin: { x: 0.5, y: 0.5 } });
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    void confetti({
      ...options,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  } catch (error) {
    console.error("Confetti error:", error);
  }
}

export interface ConfettiButtonProps extends ButtonProps {
  options?: ConfettiOptions;
}

/**
 * Magic UI–style button: fires canvas-confetti from the click position.
 * @see https://magicui.design/docs/components/confetti
 */
export function ConfettiButton({
  options,
  children,
  onClick,
  className,
  type = "button",
  ...props
}: ConfettiButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    fireConfettiFromElement(event.currentTarget, options);
  };

  return (
    <Button type={type} className={className} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
