import { INITIAL_BLOG_POSTS } from "@/data/content";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { BlogPost, ContentBlock, PillTheme } from "@/types/blog";
import type { EnquiryRecord } from "@/types/enquiry";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  pill_theme: string;
  date: string;
  hero_image_url: string | null;
  content_markdown: string | null;
  blocks: ContentBlock[] | null;
};

function rowToPost(row: BlogRow): BlogPost {
  const pt = row.pill_theme;
  const pillTheme: PillTheme =
    pt === "forest" || pt === "mustard" || pt === "coral" ? pt : "coral";
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    pillTheme,
    date: row.date,
    image: row.hero_image_url ?? undefined,
    content: row.content_markdown ?? undefined,
    blocks: row.blocks ?? undefined,
  };
}

function seedPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS.map((p) => ({
    ...p,
    pillTheme: p.pillTheme ?? "coral",
  }));
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return seedPosts();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false });
  if (error) {
    console.error(error);
    return seedPosts();
  }
  if (!data?.length) return [];
  return (data as BlogRow[]).map(rowToPost);
}

export async function saveBlogPost(
  post: BlogPost,
  opts: { isNew: boolean; originalSlug: string | null }
): Promise<{ error: Error | null }> {
  if (!isSupabaseConfigured) return { error: new Error("Supabase is not configured") };

  const payload = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    pill_theme: post.pillTheme,
    date: post.date,
    hero_image_url: post.image ?? null,
    content_markdown: post.content ?? null,
    blocks: post.blocks ?? null,
    updated_at: new Date().toISOString(),
  };

  if (!opts.isNew && opts.originalSlug && opts.originalSlug !== post.slug) {
    const { error: delErr } = await supabase.from("blog_posts").delete().eq("slug", opts.originalSlug);
    if (delErr) return { error: delErr };
    const { error } = await supabase.from("blog_posts").insert(payload);
    return { error: error ?? null };
  }

  if (!opts.isNew && post.id) {
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", post.id);
    return { error: error ?? null };
  }

  const { error } = await supabase.from("blog_posts").insert(payload);
  return { error: error ?? null };
}

export async function deleteBlogPostBySlug(slug: string): Promise<{ error: Error | null }> {
  if (!isSupabaseConfigured) return { error: new Error("Supabase is not configured") };
  const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
  return { error: error ?? null };
}

export async function fetchEnquiries(): Promise<EnquiryRecord[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  if (!data?.length) return [];
  return data.map((r: Record<string, string>) => ({
    id: r.id,
    submittedAt: r.created_at,
    name: r.name,
    email: r.email,
    phone: r.phone ?? "",
    enquiryType: r.enquiry_type,
    message: r.message,
  }));
}

export async function deleteEnquiryById(id: string): Promise<{ error: Error | null }> {
  if (!isSupabaseConfigured) return { error: new Error("Supabase is not configured") };
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  return { error: error ?? null };
}

export async function insertEnquiry(input: Omit<EnquiryRecord, "id" | "submittedAt">): Promise<{ error: Error | null }> {
  if (!isSupabaseConfigured) return { error: new Error("Supabase is not configured") };
  const { error } = await supabase.from("enquiries").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    enquiry_type: input.enquiryType,
    message: input.message,
  });
  return { error: error ?? null };
}
