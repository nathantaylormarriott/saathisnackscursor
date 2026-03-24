import heroBg from "@/assets/snackshero.webp";

export const blogPosts = [
  {
    slug: "why-corporate-lunch-social-enterprise",
    title: "Why Your Next Business Lunch Should Come From a Social Enterprise",
    excerpt: "Discover how choosing a social enterprise caterer delivers not just incredible food, but tangible community impact that aligns with your organisation's CSR goals.",
    category: "Social Impact",
    date: "2026-02-28",
    image: heroBg,
    content: `
When your organisation books catering for an event, you're making a statement about your values. More and more businesses are recognising that procurement decisions carry weight beyond the bottom line.

At Saathi Snacks, every order placed directly funds community programmes supporting women, migrants, and marginalised communities in Birmingham. That means your team lunch doesn't just fuel productivity: it creates real social impact.

## The Business Case for Social Enterprise Catering

Corporate Social Responsibility (CSR) isn't just a tick-box exercise anymore. Employees, clients, and stakeholders increasingly expect organisations to demonstrate genuine commitment to social good.

By choosing Saathi Snacks for your next business lunch, team away day, or staff meeting, you're:

- **Supporting dignified employment** for women from diverse backgrounds
- **Funding community programmes** including debt advice, wellbeing workshops, and youth support
- **Getting incredible food** made with authentic recipes passed down through generations
- **Demonstrating values-aligned procurement** that resonates with stakeholders

## What Makes Our Food Different

Our recipes come from the lived experiences and culinary traditions of the women at the heart of Saathi House. Every dish carries a story of resilience, tradition, and community pride.

This isn't catering by numbers: it's food made with love, by people who care, for a cause that matters.
    `,
  },
  {
    slug: "behind-the-kitchen-women-of-saathi-snacks",
    title: "Behind the Kitchen: The Women of Saathi Snacks",
    excerpt: "Meet the inspiring women who bring their culinary heritage to every dish, building confidence and community along the way.",
    category: "Community News",
    date: "2026-02-15",
    image: heroBg,
    content: `
Step into the Saathi Snacks kitchen and you'll find something extraordinary: women from across Birmingham's diverse communities, sharing recipes, building friendships, and creating a thriving social enterprise.

## More Than a Kitchen

For many of the women involved with Saathi Snacks, the kitchen is a place of transformation. It's where traditional skills meet new opportunities, where isolation gives way to community, and where confidence grows one dish at a time.

## Culinary Heritage in Action

Each woman brings her own culinary traditions: recipes learned from mothers and grandmothers, flavours that carry the memory of home, techniques perfected over generations.

When you taste our biryani, you're tasting generations of knowledge. When you bite into a samosa, you're experiencing the care and precision that comes from years of practice.

## Building Skills, Building Futures

Through Saathi House, many of these women access employment training, English language support, and personal development programmes. Saathi Snacks gives them a platform to use their existing skills while building new ones.

The kitchen becomes a classroom, a community centre, and a launchpad, all at once.
    `,
  },
  {
    slug: "changing-lives-one-biryani",
    title: "How Saathi Snacks Is Changing Lives One Biryani at a Time",
    excerpt: "From employment training to youth programmes, discover how choosing Saathi Snacks creates a ripple effect of positive change across Birmingham.",
    category: "Behind the Scenes",
    date: "2026-01-30",
    image: heroBg,
    content: `
Every biryani has a story. At Saathi Snacks, that story extends far beyond the kitchen. It reaches into communities across Birmingham, creating opportunities and changing lives.

## The Ripple Effect

When you book catering with Saathi Snacks, here's what happens:

1. **Your money goes directly to Saathi House**, a women's empowerment charity in Aston, Birmingham
2. **Saathi House funds community programmes** including employment training, wellbeing workshops, debt advice, and youth support
3. **Women gain skills and confidence** through cooking, enterprise, and personal development
4. **Communities grow stronger** as people connect, support each other, and build resilience

## Impact in Numbers

Since launching, Saathi Snacks has:

- Provided employment experience for women who were previously excluded from the job market
- Funded youth programmes supporting the next generation
- Created a sustainable income stream for community services
- Built connections between Birmingham's diverse communities

## Your Role in This Story

Every business lunch, every team event, every snack box you book writes another chapter in this story. You're not just feeding your team: you're funding transformation.

Ready to make your next event meaningful? Browse our menu and send an enquiry. We’ll confirm availability and details with you directly.
    `,
  },
];

/** Solid category chips (palette + white text) — legacy fallback */
export const blogCategoryPillClass: Record<string, string> = {
  "Social Impact": "bg-primary text-primary-foreground",
  "Community News": "bg-secondary text-secondary-foreground",
  "Behind the Scenes": "bg-primary text-primary-foreground",
};

/**
 * Story card chips alternate by position in `blogPosts`: even = coral pink (Social Impact),
 * odd = forest green (Community News). Add new posts to the start or end of the array consistently
 * so the stripe stays predictable.
 */
export function blogStoryPillClasses(index: number): string {
  return index % 2 === 0
    ? "bg-primary text-primary-foreground"
    : "bg-secondary text-secondary-foreground";
}

export function blogPostStoryPillClass(slug: string): string {
  const i = blogPosts.findIndex((p) => p.slug === slug);
  if (i === -1) return "bg-muted text-muted-foreground";
  return blogStoryPillClasses(i);
}

export const testimonials = [
  {
    id: 1,
    quote: "We booked Saathi Snacks for our staff away day and it was a huge hit. The biryani was incredible, and knowing the money goes back into the community made it even better.",
    name: "Sarah M.",
    role: "Event Manager",
    rating: 5,
  },
  {
    id: 2,
    quote: "The snack boxes were perfect for our charity fundraiser. Great value, great food, and a great cause.",
    name: "Ahmed R.",
    role: "Community Organisation, Birmingham",
    rating: 5,
  },
  {
    id: 3,
    quote: "Ordered the meat snack boxes for a team lunch. Easy process, collected without any issues, pakoras were gone in minutes. Booking again.",
    name: "Priya K.",
    role: "Office Manager",
    rating: 5,
  },
];
