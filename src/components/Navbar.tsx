import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ShinyCtaLink } from "@/components/ui/shiny-cta-link";

const navLinks = [
  { label: "Our Menu", to: "/menu" },
  { label: "Kitchen Hire", to: "/contact?type=kitchen-hire" },
  { label: "About Us", to: "/about" },
  { label: "Stories", to: "/blog" },
];

function isNavLinkActive(to: string, pathname: string, search: string) {
  const type = new URLSearchParams(search).get("type");
  if (to === "/contact?type=kitchen-hire") {
    return pathname === "/contact" && type === "kitchen-hire";
  }
  return pathname === to;
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  return (
    <nav
      id="site-navbar"
      className="fixed top-0 left-0 right-0 z-[100] frosted-glass border-b border-border pt-[env(safe-area-inset-top,0px)]"
    >
      <div className="relative z-[2] container mx-auto flex h-16 min-h-[4rem] min-w-0 items-center justify-between gap-2">
        <Link
          to="/"
          aria-label="Saathi Snacks home"
          className="flex min-h-[44px] min-w-0 items-center py-2 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
        >
          <span className="font-navLogo text-[1.65rem] leading-none tracking-[0.045em] [text-shadow:none] sm:text-[2.05rem]">
            <span className="text-deep-purple">Saathi</span>
            <span className="text-primary">Snacks</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`font-label text-sm font-medium transition-colors hover:text-primary ${
                isNavLinkActive(link.to, location.pathname, location.search) ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ShinyCtaLink to="/contact" className="text-sm">
            Enquire Now
          </ShinyCtaLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden -mr-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-foreground touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile menu is portaled to body so fixed layers are not trapped by nav backdrop-blur (frosted-glass). z < nav z-[100] so bar stays on top. */}
      {mobileOpen
        ? createPortal(
            <>
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-[90] bg-black/50 md:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <div
                className="fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-[91] flex flex-col items-stretch justify-start overflow-y-auto overscroll-contain px-4 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-6 md:hidden pointer-events-none"
              >
                <div
                  id="mobile-nav-panel"
                  data-lenis-prevent
                  data-lenis-prevent-touch
                  className="pointer-events-auto mx-auto flex w-full max-w-md flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-[0_12px_48px_rgba(0,0,0,0.22)] touch-manipulation"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex min-h-[48px] w-full items-center justify-center rounded-xl px-4 py-3 font-display text-lg font-semibold transition-colors active:bg-muted sm:text-xl ${
                        isNavLinkActive(link.to, location.pathname, location.search) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border/60 p-2 pt-3">
                    <ShinyCtaLink
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="min-h-[48px] w-full justify-center py-3 text-sm sm:text-base"
                    >
                      Enquire Now
                    </ShinyCtaLink>
                  </div>
                </div>
              </div>
            </>,
            document.body
          )
        : null}
    </nav>
  );
};

export default Navbar;
