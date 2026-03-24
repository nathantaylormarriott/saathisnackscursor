import * as React from "react";
import { Link, type LinkProps } from "react-router-dom";

import { cn } from "@/lib/utils";

const shinyCtaBaseClass =
  "relative inline-flex items-center justify-center overflow-hidden rounded-2xl border-0 px-5 py-2 font-label font-semibold text-sm tracking-wide text-primary-foreground transition-[box-shadow,transform] duration-300 bg-gradient-to-br from-[#EF727F] to-[#E86278] hover:scale-[1.02] active:scale-[0.98]";

const shinyCtaShadowDefault =
  "[box-shadow:0_2px_6px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.16)] hover:[box-shadow:0_3px_8px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.22)]";

const shinyCtaShadowSubtle =
  "[box-shadow:0_1px_3px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.12)] hover:[box-shadow:0_2px_5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.18)]";

export interface ShinyCtaLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  /** When false, no shimmer sweep (e.g. Learn more on Our story) */
  shimmer?: boolean;
  /** Lighter drop + inset highlight (e.g. Learn more on Our story) */
  subtleShadow?: boolean;
}

export const ShinyCtaLink = React.forwardRef<HTMLAnchorElement, ShinyCtaLinkProps>(
  ({ className, children, shimmer = true, subtleShadow = false, ...linkProps }, ref) => {
    const mergedClass = cn(
      shinyCtaBaseClass,
      subtleShadow ? shinyCtaShadowSubtle : shinyCtaShadowDefault,
      className
    );

    return (
      <Link ref={ref} {...linkProps} className={mergedClass}>
        <span className="relative z-[1] block w-full text-center">{children}</span>
        {shimmer ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
          >
            <span className="nav-cta-shimmer-ray absolute inset-y-0 left-0 w-[48%]" />
          </span>
        ) : null}
      </Link>
    );
  }
);

ShinyCtaLink.displayName = "ShinyCtaLink";
