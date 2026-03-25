import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SeoHead from "@/components/SeoHead";
import { SEO } from "@/lib/seo";
import MughalDivider from "@/components/MughalDivider";
import SpotlightCard from "@/components/SpotlightCard";
import { SITE_IMAGES } from "@/lib/site-images";
import { Heart, Briefcase, BookOpen, Shield, Users, Sparkles } from "lucide-react";

const programmes = [
  { icon: Briefcase, title: "Employment Training", desc: "Equipping women with skills for the workplace.", color: "rgba(255, 184, 26, 0.2)" },
  { icon: Heart, title: "Wellbeing Workshops", desc: "Mental health and holistic support sessions.", color: "rgba(253, 58, 125, 0.2)" },
  { icon: Users, title: "Youth Programmes", desc: "Investing in the next generation of leaders.", color: "rgba(60, 188, 214, 0.2)" },
  { icon: Shield, title: "Debt Advice", desc: "Free financial guidance for those in need.", color: "rgba(88, 186, 74, 0.2)" },
  { icon: Sparkles, title: "Women's Leadership", desc: "Building confident community leaders.", color: "rgba(253, 58, 125, 0.15)" },
  { icon: BookOpen, title: "Language Support", desc: "English language classes and integration.", color: "rgba(255, 184, 26, 0.15)" },
];

const AboutPage = () => {
  return (
    <Layout>
      <SeoHead title={SEO.about.title} description={SEO.about.description} />
      {/* Hero */}
      <section className="page-hero-band">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Our <span className="text-primary">Story</span>
          </h1>
          <p className="font-body text-lg text-white max-w-2xl mx-auto leading-relaxed">
            Authentic food. Dignified work. Real community impact.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-14 items-stretch">
            <div className="order-2 md:order-1 md:flex-1 min-w-0 flex flex-col justify-center">
              <h2 className="font-display text-3xl font-bold text-deep-purple mb-6">
                Who <span className="text-primary">We Are</span>
              </h2>
              <p className="font-body text-foreground leading-relaxed">
                Saathi Snacks is a social enterprise that supports women to turn their passion for food into
                business opportunities. Through training, mentoring and practical experience, women develop the
                skills needed to run small catering businesses while contributing to their community.
              </p>
              <MughalDivider className="py-8 md:py-10" />
              <div className="space-y-4">
                <p className="font-body text-foreground/70 leading-relaxed">
                  The initiative is based at Saathi House, a women&apos;s community organisation dedicated to
                  supporting women through programmes that focus on leadership, wellbeing, skills development and
                  financial resilience. Saathi House provides a safe and supportive environment where women can build
                  confidence, learn new skills and create opportunities for themselves and their families.
                </p>
                <p className="font-body text-foreground/70 leading-relaxed">
                  Our snacks are freshly prepared, inspired by traditional home cooking and made with care. From
                  community events to meetings and celebrations, Saathi Snacks provides affordable, high-quality
                  catering while creating pathways for women to build financial independence.
                </p>
                <p className="font-body text-foreground/70 leading-relaxed">
                  Behind Saathi Snacks is a group of talented women who bring their skills, culture and creativity
                  into every dish they prepare, using food as a way to celebrate community while building a
                  brighter future.
                </p>
                <p className="font-body text-foreground/70 leading-relaxed">
                  Every order supports women to gain skills, confidence and opportunities, helping them take
                  meaningful steps towards financial independence.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 md:flex-1 flex items-start justify-center md:justify-end shrink-0">
              <div className="aspect-[4/5] w-full max-w-md md:max-w-lg">
                <div className="midcentury-photo-frame h-full w-full transition-transform duration-300 ease-out md:hover:shadow-[8px_8px_0_#4D4846] md:hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:md:hover:translate-y-0 motion-reduce:md:hover:shadow-[6px_6px_0_#4D4846]">
                  <div className="midcentury-photo-frame-inner">
                    <img
                      src={SITE_IMAGES.aboutUsPage}
                      alt="Saathi Snacks team at Saathi House"
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

      {/* What Your Order Funds */}
      <section className="section-padding bg-[#FDEBD3]">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-purple text-center mb-12">
            What Your <span className="text-primary">Order Funds</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {programmes.map((prog) => (
              <div key={prog.title}>
                <SpotlightCard onSand spotlightColor={prog.color} className="flex items-start gap-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <prog.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-deep-purple mb-1">{prog.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{prog.desc}</p>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Organisation */}
      <section className="section-padding bg-deep-purple text-deep-purple-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-4">A Project of Saathi House</h2>
            <p className="font-body text-white mb-6 leading-relaxed">
              Saathi Snacks is part of the wider work at Saathi House in Aston, Birmingham. Visit their website
              to explore programmes, access support, or find out how to get involved.
            </p>
            <a
              href="https://www.saathihouse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-pill"
            >
              Visit Saathi House
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-purple mb-4">
            Ready to Make Your Next Event Meaningful?
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            Every order from Saathi Snacks directly funds community programmes in Birmingham.
          </p>
          <Link to="/menu" className="btn-primary-pill">
            View Our Menu
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
