// TODO: Update these values before launch

export const SITE_CONFIG = {
  name: "Saathi Snacks",
  tagline: "Authentic South Asian Catering for Birmingham Businesses",
  parentOrg: "Saathi House",
  parentOrgUrl: "https://saathihouse.org",

  email: "snacks@saathihouse.org",
  /** Saathi Snacks - display format; use `sitePhoneTelHref()` for `tel:` links */
  phone: "07709 167426",

  address: "Saathi House, 49 Bevington Road, Aston, Birmingham B6 6HR",
  
  // TODO: Update with real collection point before launch
  collectionNote:
    "Collection point and timing are agreed after we reply to your enquiry. Advance notice required. We don’t take payments on the website.",
  
  socials: {
    instagram: "https://www.instagram.com/saathihouse",
    facebook: "https://www.facebook.com/saathihouse",
    twitter: "",
  },
};

/** Dial URL for phone links (strips spaces from `SITE_CONFIG.phone`) */
export function sitePhoneTelHref(): string {
  return `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`;
}

export const MENU_ITEMS = {
  lunchPackage: {
    name: "Lunch Catering Package",
    price: 375,
    serves: "25–30 people",
    description: "A full spread ideal for business lunches, team events, and away days.",
    mains: ["Vegetable Biryani", "Chicken Biryani"],
    starters: ["Vegetable Samosa", "Pakoras", "Meat Samosa", "Chicken Kebabs"],
    included: ["Fresh Salad", "Raita", "Bottled Water"],
    dietary: ["Halal", "Vegetarian option available"],
    bentoItems: {
      veg: [
        { name: "Vegetable Biryani", imageKey: "vegetarian-biriyani" },
        { name: "Vegetable Samosa", imageKey: "samosas" },
        { name: "Pakoras", imageKey: "pakoras" },
        { name: "Fresh Salad", imageKey: "salad" },
        { name: "Raita", imageKey: null },
        { name: "Bottled Water", imageKey: null },
      ],
      meat: [
        { name: "Chicken Biryani", imageKey: "meat-biriyani" },
        { name: "Vegetable Samosa", imageKey: "samosas" },
        { name: "Pakoras", imageKey: "pakoras" },
        { name: "Meat Samosa", imageKey: "samosas" },
        { name: "Chicken Kebabs", imageKey: "pakoras" },
        { name: "Fresh Salad", imageKey: "salad" },
        { name: "Raita", imageKey: null },
        { name: "Bottled Water", imageKey: null },
      ],
    },
  },
  vegSnackBox: {
    name: "Vegetarian Snack Box",
    pricePerPerson: 6,
    items: ["Vegetable Pakoras", "Vegetable Samosas", "Fresh Salad", "Chutney", "Bottled Water"],
    dietary: ["Vegetarian", "Halal"],
    note: "Available for groups under 25 people",
  },
  meatSnackBox: {
    name: "Meat Snack Box",
    pricePerPerson: 7.5,
    items: ["Meat Samosa", "Chicken Kebabs", "Pakoras", "Fresh Salad", "Chutney", "Bottled Water"],
    dietary: ["Halal"],
    note: "Available for groups under 25 people",
  },
};
