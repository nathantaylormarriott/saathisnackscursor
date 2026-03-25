/**
 * Single source of truth for raster images under `src/assets/`.
 */
import homeHero from "@/assets/saathisnacksherolight.webp";
import ourStory from "@/assets/ourstorysection.webp";
import aboutUsPage from "@/assets/about-us-page.webp";
import kitchen from "@/assets/kitchen.webp";
import biryani from "@/assets/biryani.webp";
import lunchCateringSpread from "@/assets/lunch-catering-package-spread.webp";
import samosa from "@/assets/samosa.webp";
import chickenKebab from "@/assets/chicken-kebab.webp";
import pakora from "@/assets/pakora.webp";
import raitaSalad from "@/assets/raita-salad.webp";

export const SITE_IMAGES = {
  homeHero,
  ourStory,
  aboutUsPage,
  kitchen,
  biryani,
  lunchCateringSpread,
  samosa,
  chickenKebab,
  pakora,
  raitaSalad,
} as const;

/** Lunch catering package hero carousel (menu page) — opens on full spread, then samosa, pakoras, kebabs, biryani, salad & sides */
export const LUNCH_PACKAGE_CAROUSEL_SLIDES = [
  { src: lunchCateringSpread, alt: "Lunch catering package spread", label: "Package spread" },
  { src: samosa, alt: "Vegetable samosas", label: "Samosas" },
  { src: pakora, alt: "Vegetable pakoras", label: "Pakoras" },
  { src: chickenKebab, alt: "Chicken kebabs", label: "Kebabs" },
  { src: biryani, alt: "Biryani", label: "Biryani" },
  { src: raitaSalad, alt: "Fresh salad, raita and accompaniments", label: "Salad & sides" },
] as const;

/** “A Taste of Our Menu” home page cards */
export const menuPreview = {
  samosas: samosa,
  pakoras: pakora,
  biryani: biryani,
  chickenKebabs: chickenKebab,
  saladsRaita: raitaSalad,
} as const;

/** Blog seed covers — one distinct image per post */
export const blogCover = {
  corporateLunch: lunchCateringSpread,
  behindKitchen: ourStory,
  biryaniImpact: biryani,
} as const;
