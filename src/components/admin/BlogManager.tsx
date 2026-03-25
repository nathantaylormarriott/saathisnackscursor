import { useCallback, useMemo, useState } from "react";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { blocksToMarkdown, slugifyTitle } from "@/lib/blog-serialize";
import { deleteBlogPostBySlug, saveBlogPost } from "@/lib/supabase-api";
import { storyPillClassForPost } from "@/lib/blog-utils";
import type { BlogPost, ContentBlock, PillTheme } from "@/types/blog";
import { ArrowLeft, ChevronDown, ChevronUp, ImagePlus, Plus, Save, Trash2, Type } from "lucide-react";
import { toast } from "sonner";

const pillOptions: { value: PillTheme; label: string }[] = [
  { value: "coral", label: "Coral (primary)" },
  { value: "forest", label: "Forest (green)" },
  { value: "mustard", label: "Mustard (gold)" },
];

function emptyDraft(): BlogPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    category: "",
    pillTheme: "coral",
    date: new Date().toISOString().slice(0, 10),
    image: "",
    blocks: [{ type: "paragraph", text: "" }],
  };
}

const BlogManager = () => {
  const { posts, loading } = useBlogPosts();
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [draft, setDraft] = useState<BlogPost>(emptyDraft);
  const [isNew, setIsNew] = useState(true);
  /** Slug at the moment Edit was opened — used when saving or changing slug */
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);

  const startNew = () => {
    setDraft(emptyDraft());
    setIsNew(true);
    setOriginalSlug(null);
    setMode("edit");
  };

  const startEdit = (post: BlogPost) => {
    setOriginalSlug(post.slug);
    setDraft({
      ...post,
      blocks:
        post.blocks && post.blocks.length > 0
          ? [...post.blocks]
          : [{ type: "paragraph", text: post.content ?? "" }],
    });
    setIsNew(false);
    setMode("edit");
  };

  const updateBlock = (index: number, block: ContentBlock) => {
    setDraft((d) => {
      const blocks = [...(d.blocks ?? [])];
      blocks[index] = block;
      return { ...d, blocks };
    });
  };

  const addBlock = (type: ContentBlock["type"]) => {
    const next: ContentBlock =
      type === "paragraph"
        ? { type: "paragraph", text: "" }
        : type === "subheading"
          ? { type: "subheading", text: "" }
          : { type: "image", src: "", alt: "" };
    setDraft((d) => ({ ...d, blocks: [...(d.blocks ?? []), next] }));
  };

  const removeBlock = (index: number) => {
    setDraft((d) => {
      const blocks = [...(d.blocks ?? [])];
      blocks.splice(index, 1);
      return { ...d, blocks: blocks.length ? blocks : [{ type: "paragraph", text: "" }] };
    });
  };

  const moveBlock = (index: number, dir: -1 | 1) => {
    setDraft((d) => {
      const blocks = [...(d.blocks ?? [])];
      const j = index + dir;
      if (j < 0 || j >= blocks.length) return d;
      [blocks[index], blocks[j]] = [blocks[j], blocks[index]];
      return { ...d, blocks };
    });
  };

  const readHeroImage = useCallback(async (file: File | null) => {
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      toast.error("Image too large (max ~2.5MB). Use a smaller file or an image URL.");
      return;
    }
    const url = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    setDraft((d) => ({ ...d, image: url }));
    toast.success("Hero image attached");
  }, []);

  const publish = async () => {
    const title = draft.title.trim();
    if (!title) {
      toast.error("Title is required");
      return;
    }
    let slug = (draft.slug || slugifyTitle(title)).trim();
    if (!slug) slug = slugifyTitle(title);

    const taken = posts.some((p) => p.slug === slug && (isNew || p.slug !== originalSlug));
    if (taken) {
      toast.error("That slug is already in use. Change the slug.");
      return;
    }

    const blocks = (draft.blocks ?? []).filter((b) => {
      if (b.type === "paragraph") return b.text.trim().length > 0;
      if (b.type === "subheading") return b.text.trim().length > 0;
      if (b.type === "image") return b.src.trim().length > 0;
      return false;
    });
    if (blocks.length === 0) {
      toast.error("Add at least one body block with content.");
      return;
    }

    const content = blocksToMarkdown(blocks);
    const slugUnchanged = Boolean(originalSlug && originalSlug === slug);
    const nextPost: BlogPost = {
      ...(!isNew && slugUnchanged && draft.id ? { id: draft.id } : {}),
      slug,
      title: title,
      excerpt: draft.excerpt.trim() || title,
      category: draft.category.trim() || "Stories",
      pillTheme: draft.pillTheme,
      date: draft.date,
      image: draft.image?.trim() || undefined,
      blocks,
      content,
    };

    const { error } = await saveBlogPost(nextPost, { isNew, originalSlug });
    if (error) {
      toast.error(error.message);
      return;
    }
    window.dispatchEvent(new Event("saathi-blog-updated"));
    toast.success("Published.");
    setMode("list");
  };

  const removePost = async (slug: string) => {
    if (!confirm("Delete this story from the site?")) return;
    const { error } = await deleteBlogPostBySlug(slug);
    if (error) {
      toast.error(error.message);
      return;
    }
    window.dispatchEvent(new Event("saathi-blog-updated"));
    toast.success("Removed");
  };

  const sortedList = useMemo(() => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)), [posts]);

  if (mode === "edit") {
    return (
      <div className="space-y-8 max-w-3xl">
        <button
          type="button"
          onClick={() => setMode("list")}
          className="inline-flex items-center gap-2 font-label text-sm font-semibold text-deep-purple hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to stories
        </button>

        <div className="border border-border rounded-2xl bg-card p-6 space-y-6">
          <h2 className="font-display text-xl font-bold text-deep-purple">{isNew ? "New story" : "Edit story"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label text-sm font-medium text-deep-purple block mb-1">Title *</label>
              <input
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="font-label text-sm font-medium text-deep-purple block mb-1">URL slug</label>
              <input
                value={draft.slug}
                onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                placeholder={slugifyTitle(draft.title || "post")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono"
              />
            </div>
            <div>
              <label className="font-label text-sm font-medium text-deep-purple block mb-1">Date</label>
              <input
                type="date"
                value={draft.date}
                onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="font-label text-sm font-medium text-deep-purple block mb-1">Category label</label>
              <input
                value={draft.category}
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                placeholder="e.g. Community News"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-label text-sm font-medium text-deep-purple block mb-1">Theme (pill / button)</label>
              <select
                value={draft.pillTheme}
                onChange={(e) => setDraft((d) => ({ ...d, pillTheme: e.target.value as PillTheme }))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              >
                {pillOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="font-label text-sm font-medium text-deep-purple block mb-1">Excerpt (card preview)</label>
              <textarea
                value={draft.excerpt}
                onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))}
                rows={2}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="font-label text-sm font-medium text-deep-purple block">Hero image</label>
              <input
                type="url"
                value={draft.image?.startsWith("data:") ? "" : draft.image ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
                placeholder="https://… or upload below"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                onChange={(e) => readHeroImage(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-label text-sm font-semibold text-deep-purple">Body</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => addBlock("paragraph")} className="btn-outline-pill text-xs py-1.5 px-3">
                  <Plus size={14} className="inline mr-1" /> Paragraph
                </button>
                <button type="button" onClick={() => addBlock("subheading")} className="btn-outline-pill text-xs py-1.5 px-3">
                  <Type size={14} className="inline mr-1" /> Subheading
                </button>
                <button type="button" onClick={() => addBlock("image")} className="btn-outline-pill text-xs py-1.5 px-3">
                  <ImagePlus size={14} className="inline mr-1" /> Image
                </button>
              </div>
            </div>

            {(draft.blocks ?? []).map((block, index) => (
              <div key={index} className="card-midcentury-on-sand p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label text-xs uppercase tracking-wide text-muted-foreground">{block.type}</span>
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-1.5 rounded hover:bg-muted" aria-label="Move up" onClick={() => moveBlock(index, -1)}>
                      <ChevronUp size={18} />
                    </button>
                    <button type="button" className="p-1.5 rounded hover:bg-muted" aria-label="Move down" onClick={() => moveBlock(index, 1)}>
                      <ChevronDown size={18} />
                    </button>
                    <button type="button" className="p-1.5 rounded hover:bg-destructive/10 text-destructive" onClick={() => removeBlock(index)} aria-label="Remove block">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {block.type === "paragraph" ? (
                  <textarea
                    value={block.text}
                    onChange={(e) => updateBlock(index, { type: "paragraph", text: e.target.value })}
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Paragraph text…"
                  />
                ) : null}
                {block.type === "subheading" ? (
                  <input
                    value={block.text}
                    onChange={(e) => updateBlock(index, { type: "subheading", text: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-display font-semibold"
                    placeholder="Subheading"
                  />
                ) : null}
                {block.type === "image" ? (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={block.src.startsWith("data:") ? "" : block.src}
                      onChange={(e) => updateBlock(index, { ...block, src: e.target.value })}
                      placeholder="Image URL"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={block.alt}
                      onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                      placeholder="Alt text"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f)
                          readFileToBlock(index, f).catch(() => {
                            toast.error("Could not read image");
                          });
                      }}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <button type="button" onClick={publish} className="btn-primary-pill inline-flex items-center gap-2">
            <Save size={18} />
            Publish to site
          </button>
        </div>
      </div>
    );
  }

  async function readFileToBlock(index: number, file: File) {
    if (file.size > 2.5 * 1024 * 1024) {
      toast.error("Image too large.");
      return;
    }
    const url = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    setDraft((d) => {
      const blocks = [...(d.blocks ?? [])];
      const b = blocks[index];
      const alt = b?.type === "image" ? b.alt : "Image";
      blocks[index] = { type: "image", src: url, alt };
      return { ...d, blocks };
    });
    toast.success("Image attached");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-body text-sm text-muted-foreground max-w-xl">
          Stories are stored in Supabase and appear on the live site for all visitors after you publish.
        </p>
        <button type="button" onClick={startNew} className="btn-primary-pill">
          New story
        </button>
      </div>

      <ul className="space-y-3">
        {loading ? (
          <li className="font-body text-sm text-muted-foreground">Loading…</li>
        ) : null}
        {!loading &&
          sortedList.map((post, i) => (
          <li key={post.slug} className="card-midcentury-on-sand flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <span className={`inline-block rounded-full px-2 py-0.5 font-label text-xs font-semibold ${storyPillClassForPost(post, i)}`}>
                {post.category}
              </span>
              <p className="font-display font-semibold text-deep-purple mt-1">{post.title}</p>
              <p className="font-label text-xs text-muted-foreground">{post.date}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => startEdit(post)} className="btn-outline-pill text-xs py-2 px-4">
                Edit
              </button>
              <button type="button" onClick={() => removePost(post.slug)} className="rounded-xl border border-destructive/40 px-4 py-2 font-label text-xs font-semibold text-destructive hover:bg-destructive/10">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogManager;
