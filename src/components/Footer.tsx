import { Link } from "react-router-dom";
import { SITE_CONFIG, sitePhoneTelHref } from "@/config/settings";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-deep-purple pb-[env(safe-area-inset-bottom,0px)] text-white">
      <div className="container mx-auto px-4 py-14 md:px-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-body text-2xl font-bold mb-4">
              Saathi<span className="text-primary">Snacks</span>
            </h3>
            <p className="text-white mb-4 font-body max-w-md">
              A project of {SITE_CONFIG.parentOrg}, revolutionising communities in Birmingham.
              Every order directly funds women's empowerment programmes.
            </p>
            <p className="font-label text-xs text-white">
              Collection only, Birmingham
            </p>
            <Link
              to="/admin"
              className="mt-5 inline-block font-label text-xs uppercase tracking-[0.18em] text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-purple rounded-sm sm:text-sm"
            >
              Admin login
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-label text-sm font-semibold mb-4 text-background">Quick Links</h4>
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
                    className="text-white hover:text-primary transition-colors font-body text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label text-sm font-semibold mb-4 text-background">Get in Touch</h4>
            <div className="space-y-3 text-sm font-body text-white">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-primary transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href={sitePhoneTelHref()} className="text-white hover:text-primary transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              {SITE_CONFIG.socials.instagram && (
                <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              )}
              {SITE_CONFIG.socials.facebook && (
                <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <p className="font-label text-xs text-white">
              © {new Date().getFullYear()} Saathi Snacks. All rights reserved.
            </p>
            <a
              href="https://www.saathihouse.org/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-label text-xs text-white hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
          </div>
          <a
            href="https://www.taylor-marriott.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-wrap items-center justify-center gap-2 text-white hover:text-primary transition-colors"
          >
            <span className="text-base">Website design by:</span>
            <img src="/logo-web.svg" alt="Taylor Marriott" className="h-9 w-auto sm:h-11" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
