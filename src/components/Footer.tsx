import { Link } from "react-router-dom";
import { SITE_CONFIG, sitePhoneTelHref } from "@/config/settings";
import { cn } from "@/lib/utils";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export type FooterVariant = "default" | "sand";

interface FooterProps {
  variant?: FooterVariant;
}

const Footer = ({ variant = "default" }: FooterProps) => {
  const sand = variant === "sand";

  return (
    <footer
      className={cn(
        "pb-[env(safe-area-inset-bottom,0px)]",
        sand ? "border-t border-border bg-background text-foreground" : "bg-deep-purple text-white",
      )}
    >
      <div className="container mx-auto px-4 py-14 md:px-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 min-w-0">
          {/* Brand */}
          <div className="md:col-span-2 min-w-0">
            <h3
              className={cn(
                "font-body text-2xl font-bold mb-4",
                sand ? "text-deep-purple" : undefined,
              )}
            >
              Saathi<span className="text-primary">Snacks</span>
            </h3>
            <p
              className={cn(
                "mb-4 font-body max-w-md",
                sand ? "text-foreground/90" : "text-white",
              )}
            >
              A project of {SITE_CONFIG.parentOrg}, revolutionising communities in Birmingham.
              Every order directly funds women's empowerment programmes.
            </p>
            <p
              className={cn(
                "font-label text-xs",
                sand ? "text-foreground/80" : "text-white",
              )}
            >
              Collection only, Birmingham
            </p>
            <Link
              to="/admin"
              className={cn(
                "mt-5 inline-block font-label text-xs uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 rounded-sm sm:text-sm",
                sand
                  ? "text-deep-purple hover:text-primary focus-visible:ring-offset-background"
                  : "text-white hover:text-primary focus-visible:ring-offset-deep-purple",
              )}
            >
              Admin login
            </Link>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h4
              className={cn(
                "font-label text-sm font-semibold mb-4",
                sand ? "text-deep-purple" : "text-background",
              )}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Our Menu", to: "/menu" },
                { label: "About Us", to: "/about" },
                { label: "Stories", to: "/blog" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={cn(
                      "transition-colors font-body text-sm",
                      sand ? "text-foreground hover:text-primary" : "text-white hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h4
              className={cn(
                "font-label text-sm font-semibold mb-4",
                sand ? "text-deep-purple" : "text-background",
              )}
            >
              Get in Touch
            </h4>
            <div
              className={cn(
                "space-y-3 text-sm font-body",
                sand ? "text-foreground" : "text-white",
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Mail size={16} className="shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className={cn(
                    "min-w-0 transition-colors break-words",
                    sand ? "text-foreground hover:text-primary" : "text-white hover:text-primary",
                  )}
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Phone size={16} className="shrink-0" />
                <a
                  href={sitePhoneTelHref()}
                  className={cn(
                    "min-w-0 transition-colors break-words",
                    sand ? "text-foreground hover:text-primary" : "text-white hover:text-primary",
                  )}
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span className="break-words">{SITE_CONFIG.address}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              {SITE_CONFIG.socials.instagram && (
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-colors",
                    sand ? "text-deep-purple hover:text-primary" : "text-background hover:text-primary",
                  )}
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {SITE_CONFIG.socials.facebook && (
                <a
                  href={SITE_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-colors",
                    sand ? "text-deep-purple hover:text-primary" : "text-background hover:text-primary",
                  )}
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 border-t",
            sand ? "border-border" : "border-white/20",
          )}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <p
              className={cn(
                "font-label text-xs",
                sand ? "text-muted-foreground" : "text-white",
              )}
            >
              © {new Date().getFullYear()} Saathi Snacks. All rights reserved.
            </p>
            <a
              href="https://www.saathihouse.org/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "font-label text-xs transition-colors",
                sand ? "text-foreground hover:text-primary" : "text-white hover:text-primary",
              )}
            >
              Privacy Policy
            </a>
          </div>
          <a
            href="https://www.taylor-marriott.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex flex-wrap items-center justify-center gap-2 transition-colors",
              sand ? "text-foreground hover:text-primary" : "text-white hover:text-primary",
            )}
          >
            <span className="text-base">Website design by:</span>
            <img
              src="/logo-web.svg"
              alt="Taylor Marriott"
              className={cn(
                "h-9 w-auto sm:h-11",
                /* Light mark for purple footer; solid dark on sand (menu page) */
                sand && "brightness-0",
              )}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
