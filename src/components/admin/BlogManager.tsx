import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useMemo, useState } from "react";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { blocksToMarkdown, slugifyTitle } from "@/lib/blog-serialize";
import { deleteBlogPostBySlug, saveBlogPost } from "@/lib/supabase-api";
import { storyPillClassForPost } from "@/lib/blog-utils";
import type { BlogPost, ContentBlock, PillTheme } from "@/types/blog";
import { ArrowLeft, GripVertical, ImagePlus, Plus, Save, Trash2, Type } from "lucide-react";
import { toast } from "sonner";

const pillOptions: { value: PillTheme; label: string }[] = [
  { value: "coral", label: "Coral (primary)" },
  { value: "forest", label: "Forest (green)" },
  { value: "mustard", label: "Mustard (gold)" },
];

function newIds(n: number): string[] {
  return Array.from({ length: n }, () => crypto.randomUUID());
}

function altTextFromFileName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").trim();
  return base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

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

type SortableBlockProps = {
  id: string;
  index: number;
  block: ContentBlock;
  updateBlock: (index: number, block: ContentBlock) => void;
  removeBlock: (index: number) => void;
  readFileToBlock: (index: number, file: File) => Promise<void>;
};

function SortableBlockRow({
  id,
  index,
  block,
  updateBlock,
  removeBlock,
  readFileToBlock,
}: SortableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card-midcentury-on-sand p-4 space-y-2 rounded-xl border ${isDragging ? "border-primary/40 shadow-md opacity-95" : "border-transparent"}`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 shrink-0 touch-none rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-deep-purple cursor-grab active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={20} aria-hidden />
        </button>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-label text-xs uppercase tracking-wide text-muted-foreground">{block.type}</span>
            <button
              type="button"
              className="p-1.5 rounded hover:bg-destructive/10 text-destructive shrink-0"
              onClick={() => removeBlock(index)}
              aria-label="Remove block"
            >
              <Trash2 size={16} />
            </button>
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
            <div
              className="space-y-2 rounded-lg border border-dashed border-border/80 bg-background/50 p-3"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "copy";
              }}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f?.type.startsWith("image/")) {
                  readFileToBlock(index, f).catch(() => toast.error("Could not read image"));
                }
              }}
            >
              {block.src ? (
                <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                  <img src={block.src} alt="" className="max-h-40 w-full object-contain" />
                </div>
              ) : null}
              <label className="font-label text-xs text-muted-foreground block">
                Image URL {block.src.startsWith("data:") ? "(embedded in post)" : ""}
              </label>
              <input
                type="url"
                value={block.src.startsWith("data:") ? "" : block.src}
                onChange={(e) => updateBlock(index, { ...block, src: e.target.value })}
                placeholder="https://… or upload / drop a file below"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                disabled={block.src.startsWith("data:")}
              />
              {block.src.startsWith("data:") ? (
                <p className="font-body text-xs text-muted-foreground">
                  This image is embedded from a file upload. Replace it by choosing another file or clear the block and add a new image.
                </p>
              ) : null}
              <label className="font-label text-xs text-muted-foreground block pt-1">
                Alt text — optional; describe for screen readers, or leave empty if decorative
              </label>
              <input
                type="text"
                value={block.alt}
                onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                placeholder="e.g. Platter of samosas at a community event"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f)
                    readFileToBlock(index, f).catch(() => {
                      toast.error("Could not read image");
                    });
                }}
              />
              <p className="font-body text-xs text-muted-foreground">You can also drag an image file onto this box.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const BlogManager = () => {
  const { posts, loading } = useBlogPosts();
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [draft, setDraft] = useState<BlogPost>(emptyDraft);
  const [isNew, setIsNew] = useState(true);
  /** Stable ids for dnd-kit — parallel to draft.blocks */
  const [blockIds, setBlockIds] = useState<string[]>(() => newIds(1));
  /** Slug at the moment Edit was opened — used when saving or changing slug */
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const startNew = () => {
    setDraft(emptyDraft());
    setBlockIds(newIds(1));
    setIsNew(true);
    setOriginalSlug(null);
    setMode("edit");
  };

  const startEdit = (post: BlogPost) => {
    setOriginalSlug(post.slug);
    const blocks =
      post.blocks && post.blocks.length > 0
        ? [...post.blocks]
        : [{ type: "paragraph" as const, text: post.content ?? "" }];
    setDraft({ ...post, blocks });
    setBlockIds(newIds(blocks.length));
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
    setBlockIds((ids) => [...ids, crypto.randomUUID()]);
  };

  const removeBlock = (index: number) => {
    setDraft((d) => {
      const blocks = [...(d.blocks ?? [])];
      blocks.splice(index, 1);
      return { ...d, blocks: blocks.length ? blocks : [{ type: "paragraph", text: "" }] };
    });
    setBlockIds((ids) => {
      const next = [...ids];
      next.splice(index, 1);
      return next.length ? next : [crypto.randomUUID()];
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blockIds.indexOf(String(active.id));
    const newIndex = blockIds.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    setBlockIds((ids) => arrayMove(ids, oldIndex, newIndex));
    setDraft((d) => ({
      ...d,
      blocks: arrayMove([...(d.blocks ?? [])], oldIndex, newIndex),
    }));
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

  const readFileToBlock = useCallback(async (index: number, file: File) => {
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
      const suggested = altTextFromFileName(file.name);
      const alt =
        b?.type === "image" && b.alt.trim().length > 0 ? b.alt : suggested.length > 0 ? suggested : "";
      blocks[index] = { type: "image", src: url, alt };
      return { ...d, blocks };
    });
    toast.success("Image attached — URL is embedded; edit alt text if needed.");
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

  const blocks = draft.blocks ?? [];
  const idsAligned = blockIds.length === blocks.length;

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
              {draft.image?.startsWith("data:") ? (
                <p className="font-body text-xs text-muted-foreground">Hero image embedded from upload (saved with the post).</p>
              ) : null}
              {draft.image && !draft.image.startsWith("data:") ? (
                <div className="max-w-xs overflow-hidden rounded-lg border border-border">
                  <img src={draft.image} alt="" className="h-32 w-full object-cover" />
                </div>
              ) : null}
              {draft.image?.startsWith("data:") ? (
                <div className="max-w-xs overflow-hidden rounded-lg border border-border">
                  <img src={draft.image} alt="" className="h-32 w-full object-cover" />
                </div>
              ) : null}
              <input type="file" accept="image/*" className="text-sm" onChange={(e) => readHeroImage(e.target.files?.[0] ?? null)} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-label text-sm font-semibold text-deep-purple">Body</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  Drag blocks by the handle to reorder. Add paragraphs, subheadings, and images below.
                </p>
              </div>
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

            {idsAligned ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {blocks.map((block, index) => (
                      <SortableBlockRow
                        key={blockIds[index]}
                        id={blockIds[index]}
                        index={index}
                        block={block}
                        updateBlock={updateBlock}
                        removeBlock={removeBlock}
                        readFileToBlock={readFileToBlock}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <p className="font-body text-sm text-muted-foreground">Syncing blocks…</p>
            )}
          </div>

          <button type="button" onClick={publish} className="btn-primary-pill inline-flex items-center gap-2">
            <Save size={18} />
            Publish to site
          </button>
        </div>
      </div>
    );
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
        {loading ? <li className="font-body text-sm text-muted-foreground">Loading…</li> : null}
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
                <button
                  type="button"
                  onClick={() => removePost(post.slug)}
                  className="rounded-xl border border-destructive/40 px-4 py-2 font-label text-xs font-semibold text-destructive hover:bg-destructive/10"
                >
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
