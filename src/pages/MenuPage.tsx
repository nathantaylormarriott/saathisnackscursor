import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { MENU_ITEMS, SITE_CONFIG } from "@/config/settings";
import { AlertTriangle } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import LunchPackageCarousel from "@/components/LunchPackageCarousel";
import { SEO } from "@/lib/seo";
import { SITE_IMAGES } from "@/lib/site-images";

/** Display-only chips (same look as former choice pills; not interactive on the web menu). */
const MENU_OPTION_PILL =
  "inline-flex font-body text-sm px-4 py-2 rounded-full border-2 border-input bg-muted text-foreground cursor-default select-none";

const MenuPage = () => {
  return (
    <Layout footerVariant="sand">
      <SeoHead title={SEO.menu.title} description={SEO.menu.description} />
      {/* Sand title band — reads on soft sand; body copy uses charcoal/foreground */}
      <section className="relative scroll-mt-[var(--nav-sticky-offset)] border-b border-border/50 bg-background px-4 md:px-8 py-12 md:py-14 lg:py-16">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-deep-purple">
            Our <span className="text-primary">Menu</span>
          </h1>
          <p className="font-body text-lg text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Authentic South Asian catering packages for events, team lunches, and celebrations.
            Collection from Birmingham.
          </p>
        </div>
      </section>

      {/* Forest green + dot grid — matches Index “A Taste of Our Menu” */}
      <div className="relative bg-deep-purple text-deep-purple-foreground">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(34 91% 91% / 0.45) 1.2px, transparent 0)",
              backgroundSize: "10px 10px",
            }}
          />
        </div>

        <div className="relative z-10">
      {/* Lunch Package - Hero Card */}
      <section className="px-4 md:px-8 pt-14 md:pt-28 pb-8 md:pb-10">
        <div className="container mx-auto">
          <div className="card-saathi p-5 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge-halal">Most Popular</span>
                  <span className="font-label text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    Ideal for {MENU_ITEMS.lunchPackage.serves}
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-purple mb-4">
                  {MENU_ITEMS.lunchPackage.name}
                </h2>
                <p className="font-body text-muted-foreground mb-6">{MENU_ITEMS.lunchPackage.description}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-label text-sm font-semibold text-deep-purple mb-2">Choose One Main</h4>
                    <div className="flex flex-wrap gap-2">
                      {MENU_ITEMS.lunchPackage.mains.map((m) => (
                        <span key={m} className={MENU_OPTION_PILL}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-label text-sm font-semibold text-deep-purple mb-2">Choose Two Starters</h4>
                    <div className="flex flex-wrap gap-2">
                      {MENU_ITEMS.lunchPackage.starters.map((s) => (
                        <span key={s} className={MENU_OPTION_PILL}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-label text-sm font-semibold text-deep-purple mb-2">Always Included</h4>
                    <div className="flex flex-wrap gap-2">
                      {MENU_ITEMS.lunchPackage.included.map((inc) => (
                        <span key={inc} className="font-body text-sm bg-success/10 text-success px-3 py-1 rounded-full">{inc}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {MENU_ITEMS.lunchPackage.dietary.map((d) => (
                    <span key={d} className={d.includes("Vegetarian") ? "badge-vegetarian" : "badge-halal"}>{d}</span>
                  ))}
                </div>

                <div className="flex items-end gap-4 mb-4">
                  <span className="font-display text-4xl font-bold text-primary">£{MENU_ITEMS.lunchPackage.price}</span>
                </div>

                <p className="font-body text-xs text-muted-foreground mb-6 flex items-start gap-2">
                  <AlertTriangle size={14} className="text-accent mt-0.5 shrink-0" />
                  {SITE_CONFIG.collectionNote}
                </p>

                <Link to="/contact" className="btn-primary-pill">
                  Enquire about this package
                </Link>
              </div>
              <div className="flex justify-center lg:justify-end w-full min-w-0">
                <LunchPackageCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snack Boxes */}
      <section className="px-4 md:px-8 pt-2 md:pt-4 pb-14 md:pb-28">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-white drop-shadow-sm">
            Snack Box Options
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 max-w-6xl mx-auto">
            {/* Veg Snack Box */}
            <div>
              <div className="card-saathi flex h-full flex-col p-8 sm:p-9 md:p-10">
                <div className="h-56 sm:h-60 md:h-72 shrink-0 rounded-xl overflow-hidden mb-5">
                  <img
                    src={SITE_IMAGES.samosa}
                    alt="Vegetarian snack box"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mb-4 flex min-h-[2rem] flex-wrap items-center gap-2">
                  <span className="badge-vegetarian">Vegetarian</span>
                  <span className="badge-halal">Halal</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-deep-purple mb-2">{MENU_ITEMS.vegSnackBox.name}</h3>
                <p className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
                  £{MENU_ITEMS.vegSnackBox.pricePerPerson}<span className="text-sm md:text-base font-normal text-muted-foreground">/person</span>
                </p>
                <ul className="font-body text-base text-muted-foreground mb-6 space-y-1.5">
                  {MENU_ITEMS.vegSnackBox.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary-pill-block mt-auto shrink-0">
                  Enquire Now
                </Link>
              </div>
            </div>

            {/* Meat Snack Box */}
            <div>
              <div className="card-saathi flex h-full flex-col p-8 sm:p-9 md:p-10">
                <div className="h-56 sm:h-60 md:h-72 shrink-0 rounded-xl overflow-hidden mb-5">
                  <img
                    src={SITE_IMAGES.chickenKebab}
                    alt="Meat snack box"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mb-4 flex min-h-[2rem] flex-wrap items-center gap-2">
                  <span className="badge-halal">Halal</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-deep-purple mb-2">{MENU_ITEMS.meatSnackBox.name}</h3>
                <p className="font-display text-2xl md:text-3xl font-bold text-primary mb-4">
                  £{MENU_ITEMS.meatSnackBox.pricePerPerson}<span className="text-sm md:text-base font-normal text-muted-foreground">/person</span>
                </p>
                <ul className="font-body text-base text-muted-foreground mb-6 space-y-1.5">
                  {MENU_ITEMS.meatSnackBox.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary-pill-block mt-auto shrink-0">
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Allergen Info */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-center mb-8 text-white drop-shadow-sm">
            Allergen & Dietary Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Halal", emoji: "🌙" },
              { label: "Vegetarian Option", emoji: "🥬" },
              { label: "Contains Gluten", emoji: "🌾" },
              { label: "Contains Dairy (Raita)", emoji: "🥛" },
            ].map((item) => (
              <div key={item.label} className="card-saathi text-center !p-4">
                <span className="text-2xl mb-2 block">{item.emoji}</span>
                <span className="font-label text-xs font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-sm text-white/85 text-center">
            For specific allergen queries please{" "}
            <Link to="/contact" className="text-primary font-semibold hover:text-mustard hover:underline">
              contact us
            </Link>{" "}
            when you enquire so we can advise.
          </p>
        </div>
      </section>

      {/* Kitchen Hire */}
      <section className="border-t border-white/15 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-white/90">
            Need a kitchen space? We offer kitchen hire in Birmingham.{" "}
            <Link
              to="/contact?type=kitchen-hire"
              className="text-primary font-semibold hover:text-mustard hover:underline transition-colors"
            >
              enquire via our contact page
            </Link>
            .
          </p>
        </div>
      </section>
        </div>
      </div>
    </Layout>
  );
};

export default MenuPage;
