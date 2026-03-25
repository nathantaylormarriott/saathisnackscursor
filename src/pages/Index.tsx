import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChefHat, Users, Heart, Star, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { organizationJsonLd, SEO } from "@/lib/seo";
import { FadeUp } from "@/components/FadeUp";
import { ShinyCtaLink } from "@/components/ui/shiny-cta-link";
import MughalDivider from "@/components/MughalDivider";
import SpotlightCard from "@/components/SpotlightCard";
import { OurStoryTrustTicker } from "@/components/OurStoryTrustTicker";
import { SITE_IMAGES, menuPreview } from "@/lib/site-images";
import { testimonials } from "@/data/content";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { storyPillClassForPost } from "@/lib/blog-utils";
import { fadeUp, fadeUpEase } from "@/lib/motion";

const MENU_PREVIEW_ITEMS = [
  {
    image: menuPreview.samosas,
    imageAlt: "Samosas — meat and vegetable options",
    name: "Samosas",
    detail: "Meat and vegetable available",
    description: "Crispy pastry parcels with spiced fillings — perfect for parties, grazing tables, and events.",
    price: "",
    bullets: ["Hand-folded", "Chutney paired to order"],
    badges: [
      { label: "Vegetarian option", className: "bg-green-500/15 text-green-700" },
      { label: "Halal", className: "bg-primary/15 text-primary" },
    ],
  },
  {
    image: menuPreview.pakoras,
    imageAlt: "Vegetable pakoras",
    name: "Vegetable Pakoras",
    detail: "Crispy & fresh",
    description: "Seasonal vegetables in spiced gram flour batter, fried fresh for every order.",
    price: "",
    bullets: ["Great as a starter", "Works alongside any spread"],
    badges: [{ label: "Vegetarian", className: "bg-green-500/15 text-green-700" }],
  },
  {
    image: menuPreview.biryani,
    imageAlt: "Biryani — fragrant rice with spiced mains",
    name: "Biryani",
    detail: "Lunch spreads & larger gatherings",
    description: "Fragrant basmati layered with your choice of mains — ideal when you need to feed a crowd.",
    price: "",
    bullets: ["Choose mains & starters", "Salad, raita & water included"],
    badges: [{ label: "Halal", className: "bg-primary/15 text-primary" }],
  },
  {
    image: menuPreview.chickenKebabs,
    imageAlt: "Chicken kebabs",
    name: "Chicken Kebabs",
    detail: "Starters & sides",
    description: "Tender spiced chicken skewers — excellent as a starter or alongside biryani and sides.",
    price: "",
    bullets: ["Rich in flavour", "Made fresh"],
    badges: [{ label: "Halal", className: "bg-primary/15 text-primary" }],
  },
  {
    image: menuPreview.saladsRaita,
    imageAlt: "Fresh salad and raita",
    name: "Fresh Salads & Raita",
    detail: "Balance every spread",
    description: "Fresh salad, cooling raita, and chutneys to round out your catering order.",
    price: "",
    bullets: ["Included on larger packages", "Ask when you enquire"],
    badges: [{ label: "Vegetarian", className: "bg-green-500/15 text-green-700" }],
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
  const { posts: blogPosts, loading: blogLoading } = useBlogPosts();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Layout>
      <SeoHead title={SEO.home.title} description={SEO.home.description} jsonLd={organizationJsonLd()} />
      {/* Hero - soft sand scrims; copy uses same container + horizontal padding as Navbar for logo alignment */}
      <section className="relative flex flex-col overflow-hidden bg-background">
        <div className="relative flex min-h-[calc(100dvh-var(--nav-height))] w-full items-center">
          {/* inset-0 only — no negative top / tall % height, or imagery bleeds below this block and sits behind the Our Story ticker */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
            <img
              src={SITE_IMAGES.homeHero}
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
                  <motion.p
                    className="font-body text-xs font-semibold uppercase tracking-widest mb-3 block text-foreground/90 sm:text-sm"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: fadeUpEase }}
                  >
                    Birmingham&apos;s social enterprise caterer
                  </motion.p>
                  <motion.h1
                    className="font-display text-5xl leading-[1.08] md:text-6xl lg:text-7xl font-bold text-deep-purple mb-5 sm:mb-6 sm:leading-tight"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: fadeUpEase }}
                  >
                    Catering That
                    <br />
                    <span className="text-primary">Does More</span>
                  </motion.h1>
                  <motion.p
                    className="hero-lead font-body text-base leading-relaxed sm:text-lg mb-7 max-w-lg text-foreground/90 sm:mb-8"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.42, ease: fadeUpEase }}
                  >
                    Fresh, authentic South Asian food for your group events, team lunches, and community gatherings, collected from Birmingham, made with heart. Every order supports women building brighter futures.
                  </motion.p>
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.52, ease: fadeUpEase }}
                    className="inline-block w-full max-w-[min(100%,18rem)] sm:max-w-none sm:w-auto"
                  >
                    <Link
                      to="/menu"
                      className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-label font-semibold text-primary-foreground shadow-[var(--shadow-pink)] transition-[transform,colors,box-shadow] duration-300 hover:scale-[1.02] hover:bg-mustard hover:text-white active:scale-[0.98] sm:min-h-[44px] sm:w-auto sm:rounded-2xl sm:px-6 sm:py-3 sm:text-base"
                    >
                      View Our Menu
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - warm cream (trust strip is first here only — not in hero; hero image is clipped above) */}
      <section
        id="our-story"
        className="relative z-[2] isolate bg-background overflow-hidden px-0 pb-16 md:pb-28 lg:pb-32 border-t border-border/50"
      >
        <div
          className="relative z-[2] w-full shrink-0 bg-background py-6 md:py-7 mb-12 md:mb-16 overflow-hidden"
          role="region"
          aria-label="Social impact highlights"
        >
          <OurStoryTrustTicker items={TRUST_TICKER_ITEMS} />
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-14 items-stretch">
            <FadeUp className="our-story-copy-shadow md:flex-1 order-2 md:order-1 flex flex-col justify-center">
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
            </FadeUp>
            <FadeUp className="md:flex-1 order-1 md:order-2 flex items-center justify-center" delay={0.12}>
              <div className="aspect-square w-full max-w-md md:max-w-lg">
                <div className="midcentury-photo-frame h-full w-full transition-transform duration-300 ease-out md:hover:shadow-[8px_8px_0_#4D4846] md:hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:shadow-[6px_6px_0_#4D4846]">
                  <div className="midcentury-photo-frame-inner">
                    <img
                      src={SITE_IMAGES.ourStory}
                      alt="Cooking together at Saathi Snacks"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Menu preview — same vertical rhythm as “Why People choose us” (section-padding + header / divider / mt-8) */}
      <section className="section-padding relative scroll-mt-[var(--nav-sticky-offset)] bg-deep-purple">
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
          <div className="relative mx-auto max-w-6xl">
            <FadeUp className="text-center mb-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-2 drop-shadow-sm">
                <span className="text-white">A Taste of Our</span>{" "}
                <span className="text-primary">Menu</span>
              </h2>
              <p className="font-body text-lg md:text-xl text-white/85 max-w-2xl mx-auto drop-shadow-sm">
                Fresh, authentic South Asian food, made by our community, for yours.
              </p>
              <p className="font-body text-base md:text-lg text-white/80 max-w-3xl mx-auto mt-5 leading-relaxed drop-shadow-sm">
                We offer flexible catering packages for small and large groups, and we are happy to discuss bespoke menu
                options to suit your event.
              </p>
            </FadeUp>
            <FadeUp className="flex justify-center" delay={0.08}>
              <MughalDivider className="pb-6" />
            </FadeUp>
            <div className="mt-8 space-y-6 sm:space-y-8 md:space-y-10">
            {MENU_PREVIEW_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                className="w-full min-w-0"
                initial={prefersReducedMotion ? false : fadeUp.initial}
                whileInView={prefersReducedMotion ? undefined : fadeUp.whileInView}
                viewport={fadeUp.viewport}
                transition={{
                  ...fadeUp.transition,
                  delay: i * 0.08,
                }}
              >
                <Link
                  to="/menu"
                  className="group card-midcentury flex h-full min-h-0 flex-col overflow-hidden transition-transform duration-300 ease-out md:hover:-translate-y-1 md:hover:shadow-[8px_8px_0_#4D4846] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep-purple motion-reduce:transition-none motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:shadow-[6px_6px_0_#4D4846] md:flex-row"
                >
                    <div className="relative h-[200px] w-full shrink-0 overflow-hidden md:h-auto md:min-h-[260px] md:w-[min(42%,280px)]">
                      <div className="relative h-full min-h-[200px] w-full md:min-h-[260px]">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out md:group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-transparent md:bg-gradient-to-r"
                          aria-hidden
                        />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-5 text-left sm:p-6 md:py-7 md:pl-8 md:pr-7">
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">{item.name}</h3>
                          {item.price ? (
                            <p className="shrink-0 font-display text-lg font-bold text-primary sm:text-xl">
                              {item.price}
                            </p>
                          ) : null}
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
                            className="shrink-0 text-[#EBB035] transition-transform duration-300 md:group-hover:translate-x-1"
                            aria-hidden
                          />
                        </div>
                      </div>
                    </div>
                </Link>
              </motion.div>
            ))}
            </div>
            <FadeUp className="mt-10 w-full text-center md:mt-12" delay={0.15}>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-label font-semibold text-sm tracking-wide text-deep-purple shadow-md transition-[transform,colors,box-shadow] duration-300 hover:scale-[1.02] hover:bg-mustard hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep-purple"
              >
                View our menu and packages
                <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Why People Choose Us - soft sand + per-card coral / apricot / pink */}
      <section className="section-padding bg-[#FDEBD3]">
        <div className="container mx-auto px-4 md:px-8">
          <FadeUp className="text-center mb-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              <span className="text-[#2C7B65]">Why People</span>{" "}
              <span className="text-[#EF727F]">choose us</span>
            </h2>
          </FadeUp>
          <FadeUp className="flex justify-center" delay={0.08}>
            <MughalDivider />
          </FadeUp>
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
                iconWrap: "bg-[#EF727F] text-white shadow-[0_4px_14px_-4px_rgba(77,72,70,0.32)]",
              },
              {
                icon: Heart,
                title: "Your Order Creates Real Impact",
                desc: "Every pound spent directly funds employment training, wellbeing workshops, and youth programmes in Birmingham.",
                iconWrap: "bg-[#EF727F] text-white shadow-[0_4px_14px_-4px_rgba(77,72,70,0.32)]",
              },
            ].map((item, i) => (
              <FadeUp key={item.title} className="h-full min-w-0" delay={0.12 + i * 0.1}>
                <div className="card-midcentury-on-sand text-center h-full min-w-0 p-6 md:p-7 transition-transform duration-300 ease-out md:hover:-translate-y-0.5 md:hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:shadow-[6px_6px_0_#4D4846]">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${item.iconWrap}`}
                  >
                    <item.icon size={28} strokeWidth={2} fill="white" stroke="white" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#2C7B65] mb-3 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[#4D4846] leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
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
          <FadeUp className="text-center mb-4">
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
          </FadeUp>
          <div className="relative mx-auto max-w-3xl mt-8 space-y-6 sm:space-y-8 md:space-y-10">
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
            ).map((item, i) => (
              <FadeUp key={item.step} className="w-full min-w-0" delay={i * 0.1}>
                <div className="card-midcentury group relative overflow-hidden p-5 text-left transition-transform duration-300 ease-out sm:p-6 md:p-7 md:hover:-translate-y-0.5 md:hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:shadow-[6px_6px_0_#4D4846]">
                  <div className="w-full">
                    <div className="mb-3 flex flex-wrap items-center gap-2.5">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mustard font-display text-base font-bold tabular-nums text-white shadow-[0_4px_14px_-4px_rgba(77,72,70,0.28)] sm:h-11 sm:w-11 sm:text-lg"
                        aria-hidden
                      >
                        {item.step}
                      </div>
                      <h3 className="font-display min-w-0 text-lg font-bold leading-snug text-primary sm:text-xl md:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm leading-relaxed text-[#4D4846] sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background text-foreground">
        <div className="container mx-auto min-w-0">
          <FadeUp className="text-center mb-8 text-deep-purple md:mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeUp key={t.id} delay={0.08 + i * 0.1}>
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
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-deep-purple py-7 text-white md:py-8">
        <FadeUp className="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 text-center">
          <Users className="h-7 w-7 shrink-0 text-mustard md:h-8 md:w-8" strokeWidth={2} aria-hidden />
          <p className="max-w-xl font-display text-base font-semibold leading-snug text-white md:max-w-none md:text-lg lg:text-xl">
            Trusted by charities, businesses, and community organisations across Birmingham
          </p>
        </FadeUp>
      </section>

      {/* Kitchen - dedicated section (above hire CTA strip) */}
      <section
        className="section-padding bg-muted/40 border-y border-border/50"
        aria-labelledby="kitchen-heading"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
            <FadeUp>
              <div className="relative aspect-[4/3] w-full lg:aspect-[5/4]">
                <div className="midcentury-photo-frame absolute inset-0 transition-transform duration-300 ease-out md:hover:shadow-[8px_8px_0_#4D4846] md:hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:shadow-[6px_6px_0_#4D4846]">
                  <div className="midcentury-photo-frame-inner">
                    <img
                      src={SITE_IMAGES.kitchen}
                      alt="Saathi Snacks community kitchen at Saathi House: bright, modern prep space where meals are made fresh."
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
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
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Kitchen hire - purple strip; pink on CTA only */}
      <section className="py-12 px-4 bg-deep-purple">
        <FadeUp className="max-w-2xl mx-auto text-center">
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
        </FadeUp>
      </section>

      {/* Stories */}
      <section className="section-padding bg-muted/60">
        <div className="container mx-auto min-w-0">
          <FadeUp className="text-center mb-8 md:mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-deep-purple">
              Community <span className="text-primary">stories</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogLoading ? (
              <p className="col-span-full text-center font-body text-muted-foreground">Loading stories…</p>
            ) : null}
            {!blogLoading &&
              blogPosts.map((post, i) => (
              <FadeUp key={post.slug} className="h-full min-w-0" delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <SpotlightCard
                    onSand
                    spotlightColor="rgba(82, 18, 108, 0.08)"
                    className="h-full transition-transform duration-300 ease-out md:group-hover:-translate-y-1 md:group-hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:md:group-hover:translate-y-0 motion-reduce:md:group-hover:shadow-[6px_6px_0_#4D4846]"
                  >
                    {post.image && (
                      <div className="h-48 rounded-xl overflow-hidden mb-4 -mx-2 -mt-2">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-label text-xs font-semibold ${storyPillClassForPost(post, i)}`}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-deep-purple mt-2 mb-2 md:group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                    <span className="font-label text-xs text-muted-foreground">{post.date}</span>
                  </SpotlightCard>
                </Link>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="text-center mt-10" delay={0.12}>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-label font-semibold px-6 py-3 rounded-2xl shadow-[var(--shadow-pink)] transition-[transform,colors,box-shadow] duration-300 hover:scale-[1.02] hover:bg-mustard hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
            >
              View all our stories
              <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
            </Link>
          </FadeUp>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
