import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import MughalDivider from "@/components/MughalDivider";
import { MENU_ITEMS, SITE_CONFIG } from "@/config/settings";
import { AlertTriangle } from "lucide-react";
import heroBg from "@/assets/snackshero.webp";
import biryaniImg from "@/assets/biryani.webp";

const MenuPage = () => {
  const [selectedMain, setSelectedMain] = useState<string>("");

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-deep-purple text-deep-purple-foreground">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Menu</span>
          </h1>
          <p className="font-body text-lg text-white max-w-2xl mx-auto">
            Authentic South Asian catering packages for events, team lunches, and celebrations.
            Collection from Birmingham.
          </p>
        </div>
      </section>

      {/* Lunch Package - Hero Card */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="card-saathi-on-sand p-5 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
                    <h4 className="font-label text-sm font-semibold text-deep-purple mb-2">Main (Choose One)</h4>
                    <div className="flex flex-wrap gap-2">
                      {MENU_ITEMS.lunchPackage.mains.map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMain(m)}
                          className={`font-body text-sm px-4 py-2 rounded-full border-2 transition-all ${
                            selectedMain === m
                              ? "border-primary bg-primary/10 text-primary font-semibold"
                              : "border-input bg-muted text-foreground hover:border-primary/50"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-label text-sm font-semibold text-deep-purple mb-2">Starters (Choose Two)</h4>
                    <div className="flex flex-wrap gap-2">
                      {MENU_ITEMS.lunchPackage.starters.map((s) => (
                        <span key={s} className="font-body text-sm bg-muted px-3 py-1 rounded-full">{s}</span>
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
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_12px_40px_-12px_hsl(20_5%_29%_/0.2)] ring-1 ring-deep-purple/10">
                  <img
                    src={biryaniImg}
                    alt="Chicken biryani catering package"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MughalDivider />

      {/* Snack Boxes */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-purple text-center mb-12">
            Snack Box Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Veg Snack Box */}
            <div>
              <div className="card-saathi-on-sand h-full">
                <div className="h-48 rounded-xl overflow-hidden mb-4">
                  <img src={heroBg} alt="Vegetarian snack box" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="badge-vegetarian">Vegetarian ✓</span>
                  <span className="badge-halal">Halal</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-deep-purple mb-1">{MENU_ITEMS.vegSnackBox.name}</h3>
                <p className="font-display text-3xl font-bold text-primary mb-3">
                  £{MENU_ITEMS.vegSnackBox.pricePerPerson}<span className="text-base font-normal text-muted-foreground">/person</span>
                </p>
                <ul className="font-body text-sm text-muted-foreground mb-4 space-y-1">
                  {MENU_ITEMS.vegSnackBox.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <p className="font-label text-xs text-muted-foreground mb-4">{MENU_ITEMS.vegSnackBox.note}</p>
                <Link to="/contact" className="btn-primary-pill flex w-full justify-center text-sm">
                  Enquire Now
                </Link>
              </div>
            </div>

            {/* Meat Snack Box */}
            <div>
              <div className="card-saathi-on-sand h-full">
                <div className="h-48 rounded-xl overflow-hidden mb-4">
                  <img src={heroBg} alt="Meat snack box" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="badge-halal">Halal</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-deep-purple mb-1">{MENU_ITEMS.meatSnackBox.name}</h3>
                <p className="font-display text-3xl font-bold text-primary mb-3">
                  £{MENU_ITEMS.meatSnackBox.pricePerPerson}<span className="text-base font-normal text-muted-foreground">/person</span>
                </p>
                <ul className="font-body text-sm text-muted-foreground mb-4 space-y-1">
                  {MENU_ITEMS.meatSnackBox.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <p className="font-label text-xs text-muted-foreground mb-4">{MENU_ITEMS.meatSnackBox.note}</p>
                <Link to="/contact" className="btn-primary-pill flex w-full justify-center text-sm">
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
          <h2 className="font-display text-2xl font-bold text-deep-purple text-center mb-8">
            Allergen & Dietary Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Halal", emoji: "🌙" },
              { label: "Vegetarian Option", emoji: "🥬" },
              { label: "Contains Gluten", emoji: "🌾" },
              { label: "Contains Dairy (Raita)", emoji: "🥛" },
            ].map((item) => (
              <div key={item.label} className="card-saathi-on-sand text-center p-4">
                <span className="text-2xl mb-2 block">{item.emoji}</span>
                <span className="font-label text-xs font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground text-center">
            For specific allergen queries please{" "}
            <Link to="/contact" className="text-primary font-semibold hover:underline">contact us</Link> when you enquire so we can advise.
          </p>
        </div>
      </section>

      {/* Kitchen Hire */}
      <section className="py-12 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-foreground">
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
    </Layout>
  );
};

export default MenuPage;
