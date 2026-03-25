import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChefHat, Users, Heart, Star, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { ShinyCtaLink } from "@/components/ui/shiny-cta-link";
import MughalDivider from "@/components/MughalDivider";
import SpotlightCard from "@/components/SpotlightCard";
import heroBgLight from "@/assets/saathisnacksherolight.webp";
import snacksHeroPlaceholder from "@/assets/snackshero.webp";
import biryaniImg from "@/assets/biryani.webp";
import ourStoryImg from "@/assets/ourstorysection.webp";
import saladImg from "@/assets/salad.webp";
import kitchenImg from "@/assets/kitchen.webp";
import { testimonials, blogPosts, blogStoryPillClasses } from "@/data/content";

const MENU_PREVIEW_ITEMS = [
  {
    image: snacksHeroPlaceholder,
    imageAlt: "Vegetable samosas, crispy pastry with spiced vegetables",
    name: "Vegetable Samosas",
    detail: "Party boxes & grazing tables",
    description: "Crispy pastry parcels filled with spiced seasonal vegetables.",
    price: "From £6/box",
    bullets: ["Hand-folded pastry", "Chutney paired to order"],
    badges: [
      { label: "Vegetarian", className: "bg-green-500/15 text-green-700" },
      { label: "Halal", className: "bg-primary/15 text-primary" },
    ],
  },
  {
    image: biryaniImg,
    imageAlt: "Chicken biryani, fragrant rice with spiced chicken",
    name: "Chicken Biryani",
    detail: "Lunch spreads for teams & events",
    description: "Fragrant basmati rice layered with tender spiced chicken.",
    price: "From £375/25 people",
    bullets: ["Choose mains & starters", "Salad, raita & water included"],
    badges: [{ label: "Halal", className: "bg-primary/15 text-primary" }],
  },
  {
    image: saladImg,
    imageAlt: "Snack box selection: samosas, pakoras, salad and chutney",
    name: "Snack Box",
    detail: "Per-person boxes for smaller groups",
    description: "A curated selection of samosas, pakoras, salad and chutney.",
    price: "From £6/person",
    bullets: ["Ideal under 25 guests", "Mix of veg & halal options"],
    badges: [
      { label: "Vegetarian option", className: "bg-green-500/15 text-green-700" },
      { label: "Halal", className: "bg-primary/15 text-primary" },
    ],
  },
] as const;

const TRUST_TICKER_ITEMS = [
  "Empowering Women in Birmingham",
  "100% Community-Owned",
  "Every Order Funds Local Programmes",
  "Halal Certified",
  "Made Fresh for Every Order",
  "Based at Saathi House, Birmingham",
] as const;

const Index = () => {
  const menuPreviewRef = useRef<HTMLDivElement>(null);
  const [menuPreviewVisible, setMenuPreviewVisible] = useState(false);

  useEffect(() => {
    const el = menuPreviewRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMenuPreviewVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero - soft sand scrims; copy uses same container + horizontal padding as Navbar for logo alignment */}
      <section className="relative flex flex-col overflow-hidden bg-background">
        <div className="relative flex min-h-[calc(100dvh-var(--nav-height))] w-full items-center">
          <div
            className="pointer-events-none absolute inset-x-0 top-[-12%] z-0 h-[124%] w-full"
            aria-hidden
          >
            <img
              src={heroBgLight}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          {/* Sand wash: left emphasis + light base fade (uses page sand token, not white) */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/78 via-[44%] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background/45 via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative z-10 w-full py-12 sm:py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8">
              <div className="relative isolate max-w-2xl">
                <div className="home-hero-blur-feather" aria-hidden />
                <div className="relative z-[1] home-hero-copy">
                  <p className="text-mustard text-xs font-semibold uppercase tracking-widest mb-3 block sm:text-sm">
                    Birmingham&apos;s social enterprise caterer
                  </p>
                  <h1 className="font-display text-[2.25rem] leading-[1.12] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-deep-purple mb-5 sm:mb-6 sm:leading-tight">
                    Catering That
                    <br />
                    <span className="text-primary">Does More</span>
                  </h1>
                  <p className="hero-lead font-body text-base leading-relaxed sm:text-lg mb-7 max-w-lg text-foreground/90 sm:mb-8">
                    Fresh, authentic South Asian food for your group events, team lunches, and community gatherings, collected from Birmingham, made with heart. Every order supports women building brighter futures.
                  </p>
                  <div>
                    <Link
                      to="/menu"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-label font-semibold text-primary-foreground shadow-[var(--shadow-pink)] transition-[transform,colors,box-shadow] duration-300 hover:scale-[1.02] hover:bg-mustard hover:text-white active:scale-[0.98] sm:w-auto"
                    >
                      View Our Menu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - warm cream (same as hero) */}
      <section className="bg-background overflow-hidden px-0 pb-16 md:pb-28 lg:pb-32">
        <div
          className="relative z-10 w-full shrink-0 py-6 md:py-7 mb-12 md:mb-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          role="region"
          aria-label="Social impact highlights"
        >
          <div className="trust-ticker-track flex w-max gap-10 md:gap-14">
            {[...TRUST_TICKER_ITEMS, ...TRUST_TICKER_ITEMS].map((text, i) => (
                <span
                  key={`${text}-${i}`}
                  className="font-label text-sm text-deep-purple inline-flex shrink-0 items-center gap-2 whitespace-nowrap"
                >
                  <Heart size={14} className="shrink-0 text-mustard" fill="currentColor" aria-hidden />
                  {text}
                </span>
              ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-14 items-stretch">
            <div className="our-story-copy-shadow md:flex-1 order-2 md:order-1 flex flex-col justify-center">
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-left opacity-100">
                <span className="text-deep-purple">Our</span>{" "}
                <span className="text-primary">story</span>
              </h2>
              <div className="w-full text-left">
                <div className="flex justify-start opacity-90 mb-6">
                  <MughalDivider />
                </div>
                <h3 className="font-body text-lg md:text-xl text-deep-purple leading-snug mb-6">
                  Every order you place supports a woman building her future.
                </h3>
                <div className="space-y-6 font-body text-foreground/90 leading-relaxed">
                  <p>
                    Saathi Snacks is a social enterprise helping women turn a passion for food into real business skills.
                    Through training, mentoring and hands-on experience, women develop the confidence and capability to run
                    their own catering businesses, while giving back to their community.
                  </p>
                  <p>
                    We&apos;re based at Saathi House, a women&apos;s community organisation in Birmingham focused on leadership,
                    wellbeing and financial resilience.
                  </p>
                </div>
                <div className="flex justify-start mt-8">
                  <ShinyCtaLink to="/about" shimmer={false} subtleShadow>
                    Learn more
                  </ShinyCtaLink>
                </div>
              </div>
            </div>
            <div className="md:flex-1 order-1 md:order-2 flex items-center justify-center">
              <div className="aspect-square w-full max-w-md md:max-w-lg">
                <div className="midcentury-photo-frame h-full w-full transition-transform duration-300 ease-out hover:shadow-[8px_8px_0_#4D4846] hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[6px_6px_0_#4D4846]">
                  <div className="midcentury-photo-frame-inner">
                    <img
                      src={ourStoryImg}
                      alt="Cooking together at Saathi Snacks"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu preview — title scrolls in normal flow; cards stack under navbar only */}
      <section className="relative scroll-mt-[var(--nav-sticky-offset)] bg-deep-purple pt-0 pb-20 md:pb-28">
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
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div ref={menuPreviewRef} className="relative mx-auto max-w-6xl">
            <div className="pb-6 pt-12 text-center md:pt-14">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-2 drop-shadow-sm">
                <span className="text-white">A Taste of Our</span>{" "}
                <span className="text-primary">Menu</span>
              </h2>
              <p className="font-body text-lg md:text-xl text-white/85 mb-6 max-w-2xl mx-auto drop-shadow-sm">
                Fresh, authentic South Asian food, made by our community, for yours.
              </p>
              <MughalDivider />
            </div>
            {MENU_PREVIEW_ITEMS.map((item, i) => (
              <div key={item.name} className="mb-6 sm:mb-8 md:mb-10">
                <div
                  className={
                    menuPreviewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }
                  style={{
                    transition: "opacity 700ms ease-out, transform 700ms ease-out",
                    transitionDelay: menuPreviewVisible ? `${i * 100}ms` : "0ms",
                  }}
                >
                  <Link
                    to="/menu"
                    className="group card-midcentury flex h-full min-h-0 flex-col overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[8px_8px_0_#4D4846] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep-purple motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[6px_6px_0_#4D4846] md:flex-row"
                  >
                    <div className="relative h-[200px] w-full shrink-0 overflow-hidden md:h-auto md:min-h-[260px] md:w-[min(42%,280px)]">
                      <div className="relative h-full min-h-[200px] w-full md:min-h-[260px]">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-transparent md:bg-gradient-to-r"
                          aria-hidden
                        />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-5 text-left sm:p-6 md:py-7 md:pl-8 md:pr-7">
                      <div className="flex gap-4 sm:gap-5">
                        <span
                          className="font-display text-4xl font-bold tabular-nums leading-none text-[#EBB035] sm:text-5xl"
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                            <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                              {item.name}
                            </h3>
                            <p className="shrink-0 font-display text-lg font-bold text-primary sm:text-xl">
                              {item.price}
                            </p>
                          </div>
                          <p className="font-label text-xs font-semibold uppercase tracking-wide text-deep-purple/70">
                            {item.detail}
                          </p>
                          <p className="mt-2 font-body text-sm leading-relaxed text-foreground/90 sm:text-base">
                            {item.description}
                          </p>
                          <ul className="mt-3 space-y-1.5 border-l-2 border-[#EBB035]/50 pl-3 font-body text-xs text-[#4D4846]/90 sm:text-sm">
                            {item.bullets.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.badges.map((b) => (
                              <span
                                key={b.label}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${b.className}`}
                              >
                                {b.label}
                              </span>
                            ))}
                          </div>
                          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                            <span className="font-label text-xs font-semibold uppercase tracking-wide text-deep-purple/75">
                              View packages & pricing
                            </span>
                            <ArrowRight
                              size={20}
                              strokeWidth={2.25}
                              className="shrink-0 text-[#EBB035] transition-transform duration-300 group-hover:translate-x-1"
                              aria-hidden
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
            <div className="h-20 sm:h-28 md:h-36" aria-hidden />
            <div className="mt-10 text-center">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-label font-semibold text-sm tracking-wide text-deep-purple shadow-md transition-[transform,colors,box-shadow] duration-300 hover:scale-[1.02] hover:bg-mustard hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep-purple"
              >
                View our menu and packages
                <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why People Choose Us - soft sand + per-card coral / apricot / pink */}
      <section className="section-padding bg-[#FDEBD3]">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-[#2C7B65]">Why People</span>{" "}
            <span className="text-[#EF727F]">choose us</span>
          </h2>
          <MughalDivider />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto">
            {[
              {
                icon: ChefHat,
                title: "Authentic & Freshly Made",
                desc: "Traditional recipes prepared fresh for every order, using quality ingredients and time-honoured techniques.",
                iconWrap: "bg-[#EF727F] text-white shadow-[0_4px_14px_-4px_rgba(77,72,70,0.32)]",
              },
              {
                icon: Users,
                title: "Flexible Packages for Any Group Size",
                desc: "From intimate team meetings to large events, we have a package that fits your needs and budget.",
                iconWrap: "bg-[#F8C697] text-white shadow-[0_4px_14px_-4px_rgba(77,72,70,0.32)]",
              },
              {
                icon: Heart,
                title: "Your Order Creates Real Impact",
                desc: "Every pound spent directly funds employment training, wellbeing workshops, and youth programmes in Birmingham.",
                iconWrap: "bg-[#EF727F] text-white shadow-[0_4px_14px_-4px_rgba(77,72,70,0.32)]",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-midcentury-on-sand text-center h-full min-w-0 p-6 md:p-7 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[6px_6px_0_#4D4846]"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${item.iconWrap}`}
                >
                  <item.icon size={28} strokeWidth={2} fill="white" stroke="white" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#2C7B65] mb-3 leading-tight tracking-tight xl:whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[#4D4846] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - mid-century retro (soft sand cards, hard shadow, forest + grain) */}
      <section
        className="section-padding relative scroll-mt-[var(--nav-sticky-offset)] bg-[#2C7B65]"
        aria-labelledby="how-it-works-heading"
      >
        {/* Clip decor only — avoid overflow-hidden on the section itself */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <svg className="absolute inset-0 h-full w-full opacity-[0.14]">
            <defs>
              <filter id="how-it-works-grain" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="white" filter="url(#how-it-works-grain)" />
          </svg>
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(34 91% 91% / 0.45) 1.2px, transparent 0)",
              backgroundSize: "10px 10px",
            }}
          />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-8 text-center">
            <h2
              id="how-it-works-heading"
              className="font-display text-4xl font-bold text-[#FDEBD3] md:text-5xl mb-4 drop-shadow-sm"
            >
              How It Works
            </h2>
            <p className="font-body text-[#FDEBD3]/90 max-w-2xl mx-auto text-sm md:text-base drop-shadow-sm">
              From browse to collection: three simple steps. We&apos;re here to help you plan snacks
              that work for your crowd.
            </p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            {(
              [
                {
                  step: "1",
                  title: "Explore our menu",
                  desc: "Browse packages and prices to find what suits your event or team.",
                },
                {
                  step: "2",
                  title: "Send an enquiry",
                  desc: "Use our contact form to tell us dates, numbers, and dietary needs. We don't take payments or orders on this website; it's enquiries only.",
                },
                {
                  step: "3",
                  title: "We confirm & arrange pickup",
                  desc: "We'll check availability and agree collection in Birmingham with you before anything is confirmed, so there are no clashes or surprises.",
                },
              ] as const
            ).map((item) => (
              <div key={item.step} className="mb-6 sm:mb-8 md:mb-10">
                <div className="card-midcentury group relative overflow-hidden p-5 text-left transition-transform duration-300 ease-out sm:p-6 md:p-7 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[6px_6px_0_#4D4846]">
                  <div className="max-w-[95%]">
                    <div className="mb-3 flex flex-wrap items-center gap-2.5">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary font-display text-base font-bold tabular-nums text-primary-foreground shadow-[0_4px_14px_-4px_rgba(77,72,70,0.28)] sm:h-11 sm:w-11 sm:text-lg"
                        aria-hidden
                      >
                        {item.step}
                      </div>
                      <h3 className="font-display min-w-0 text-lg font-bold leading-snug text-[#2C7B65] sm:text-xl md:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm leading-relaxed text-[#4D4846] sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="h-20 sm:h-28 md:h-36" aria-hidden />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background text-foreground">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-center mb-8 text-deep-purple md:mb-12">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id}>
                <div className="card-midcentury-on-sand h-full p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} className="fill-mustard text-mustard" />
                    ))}
                  </div>
                  <p className="mb-4 font-body italic leading-relaxed text-foreground">
                    {t.quote}
                  </p>
                  <div className="border-t border-[#4D4846]/20 pt-4 mt-4">
                    <p className="font-label text-sm font-semibold text-deep-purple">{t.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-deep-purple py-7 text-white md:py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 text-center">
          <Users className="h-7 w-7 shrink-0 text-mustard md:h-8 md:w-8" strokeWidth={2} aria-hidden />
          <p className="max-w-xl font-display text-base font-semibold leading-snug text-white md:max-w-none md:text-lg lg:text-xl">
            Trusted by charities, businesses, and community organisations across Birmingham
          </p>
        </div>
      </section>

      {/* Kitchen - dedicated section (above hire CTA strip) */}
      <section
        className="section-padding bg-muted/40 border-y border-border/50"
        aria-labelledby="kitchen-heading"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
            <div>
              <div className="relative aspect-[4/3] w-full lg:aspect-[5/4]">
                <div className="midcentury-photo-frame absolute inset-0 transition-transform duration-300 ease-out hover:shadow-[8px_8px_0_#4D4846] hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[6px_6px_0_#4D4846]">
                  <div className="midcentury-photo-frame-inner">
                    <img
                      src={kitchenImg}
                      alt="Saathi Snacks community kitchen at Saathi House: bright, modern prep space where meals are made fresh."
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-label text-sm font-semibold uppercase tracking-widest text-deep-purple/75 mb-3">
                The heart of Saathi Snacks
              </p>
              <h2
                id="kitchen-heading"
                className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-deep-purple leading-tight mb-6"
              >
                Our <span className="text-primary">kitchen</span>
              </h2>
              <div className="flex justify-start mb-6">
                <MughalDivider className="justify-start pt-0 pb-4 max-w-[min(100%,18rem)]" />
              </div>
              <p className="font-body text-lg text-foreground/90 leading-relaxed mb-4">
                This is where it all comes together. A bright, modern community kitchen at Saathi House where food is
                prepared fresh for every order. It&apos;s a space built for collaboration: mentoring, training, and
                hands-on craft side by side.
              </p>
              <p className="font-body text-lg text-foreground/90 leading-relaxed">
                From spices and prep to packing and handover, everything passes through here, so you can taste the care
                in every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen hire - purple strip; pink on CTA only */}
      <section className="py-12 px-4 bg-deep-purple">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white font-display text-2xl md:text-3xl font-bold mb-2">
            Need a kitchen space?
          </h2>
          <p className="text-white/90 font-body mb-6">
            We offer flexible kitchen hire at Saathi House, Birmingham.
          </p>
          <Link
            to="/contact?type=kitchen-hire"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-label font-semibold px-6 py-3 rounded-2xl shadow-[var(--shadow-pink)] transition-[transform,colors,box-shadow] duration-300 hover:scale-[1.02] hover:bg-mustard hover:text-white active:scale-[0.98]"
          >
            Get in touch →
          </Link>
        </div>
      </section>

      {/* Stories */}
      <section className="section-padding bg-muted/60">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-deep-purple text-center mb-8 md:mb-12">
            Community <span className="text-primary">stories</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <div key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <SpotlightCard
                    onSand
                    spotlightColor="rgba(82, 18, 108, 0.08)"
                    className="h-full transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:shadow-[6px_6px_0_#4D4846]"
                  >
                    {post.image && (
                      <div className="h-48 rounded-xl overflow-hidden mb-4 -mx-2 -mt-2">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-label text-xs font-semibold ${blogStoryPillClasses(i)}`}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-deep-purple mt-2 mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                    <span className="font-label text-xs text-muted-foreground">{post.date}</span>
                  </SpotlightCard>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-label font-semibold px-6 py-3 rounded-2xl shadow-[var(--shadow-pink)] transition-[transform,colors,box-shadow] duration-300 hover:scale-[1.02] hover:bg-mustard hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
            >
              View all our stories
              <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
