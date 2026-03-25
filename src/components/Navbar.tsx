import { useState, useEffect } from "react";
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
      className="fixed top-0 left-0 right-0 z-50 frosted-glass border-b border-border pt-[env(safe-area-inset-top,0px)]"
    >
      <div className="container mx-auto flex h-16 min-h-[4rem] items-center justify-between">
        <Link to="/" className="flex min-h-[44px] min-w-0 items-center gap-2 py-2 pr-2">
          <span className="font-display text-xl font-bold tracking-tight text-deep-purple sm:text-2xl">
            Saathi<span className="text-primary">Snacks</span>
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

      {/* Mobile overlay */}
      {mobileOpen ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-40 flex flex-col items-center gap-2 overflow-y-auto overscroll-contain bg-background px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom,0px))] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-xl px-4 py-3 font-display text-xl font-semibold transition-colors active:bg-muted ${
                isNavLinkActive(link.to, location.pathname, location.search) ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 w-full max-w-sm">
            <ShinyCtaLink
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="min-h-[48px] w-full justify-center py-3 text-base"
            >
              Enquire Now
            </ShinyCtaLink>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
