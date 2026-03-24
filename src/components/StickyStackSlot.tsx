import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StickyStackSlotProps = {
  index: number;
  children: ReactNode;
  /** Tailwind `top-*` class; default pins under the fixed navbar only. */
  stickyTopClassName?: string;
};

/**
 * Sticky stack: default `top` matches the fixed nav. Pass `stickyTopClassName` when cards should pin below a sticky header (e.g. menu preview).
 */
export function StickyStackSlot({ index, children, stickyTopClassName }: StickyStackSlotProps) {
  return (
    <div
      className={cn(
        "sticky mb-6 sm:mb-8 md:mb-10",
        stickyTopClassName ?? "top-[var(--nav-sticky-offset)]"
      )}
      style={{ zIndex: index + 1 }}
    >
      {children}
    </div>
  );
}
