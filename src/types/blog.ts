/** Category chip / story card button theme */
export type PillTheme = "coral" | "forest" | "mustard";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "image"; src: string; alt: string };

export type BlogPost = {
  /** Supabase row id (set when loaded from DB) */
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Controls the category pill / button styling on cards and post header */
  pillTheme: PillTheme;
  date: string;
  /** Hero image (URL or data URL) */
  image?: string;
  /** Legacy markdown body (seed posts + backwards compat) */
  content?: string;
  /** Structured body (preferred when set) */
  blocks?: ContentBlock[];
};
