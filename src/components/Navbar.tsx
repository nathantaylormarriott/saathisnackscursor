import { useState } from "react";
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

  return (
    <nav
      id="site-navbar"
      className="fixed top-0 left-0 right-0 z-50 frosted-glass border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-deep-purple">
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
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <div className="fixed inset-0 top-16 bg-background z-40 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`font-display text-2xl font-semibold transition-colors hover:text-primary ${
                isNavLinkActive(link.to, location.pathname, location.search) ? "text-primary" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ShinyCtaLink to="/contact" onClick={() => setMobileOpen(false)} className="text-lg mt-4">
            Enquire Now
          </ShinyCtaLink>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
