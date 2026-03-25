import type { ContentBlock } from "@/types/blog";

export function blocksToMarkdown(blocks: ContentBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === "paragraph") return b.text.trim();
      if (b.type === "subheading") return `## ${b.text.trim()}`;
      if (b.type === "image") {
        const alt = b.alt.replaceAll("[", "").replaceAll("]", "");
        return `![${alt}](${b.src})`;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

export function slugifyTitle(title: string): string {
  const s = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || `post-${Date.now()}`;
}
