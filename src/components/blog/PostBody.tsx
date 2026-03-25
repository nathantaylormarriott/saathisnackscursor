import type { ContentBlock } from "@/types/blog";

function RenderBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "paragraph") {
          return (
            <p key={i} className="text-foreground/80 leading-relaxed mb-4 break-words">
              {b.text}
            </p>
          );
        }
        if (b.type === "subheading") {
          return (
            <h2 key={i} className="font-display text-2xl font-bold text-deep-purple mt-8 mb-4 break-words">
              {b.text}
            </h2>
          );
        }
        if (b.type === "image") {
          return (
            <figure key={i} className="my-8">
              <img
                src={b.src}
                alt={b.alt || ""}
                className="h-auto w-full max-w-full max-h-[min(520px,80vh)] rounded-2xl object-cover"
                loading="lazy"
              />
            </figure>
          );
        }
        return null;
      })}
    </>
  );
}

/** Legacy markdown-style content (seed posts): paragraphs, ## headings, lists, `![alt](url)` images */
function LegacyMarkdown({ content }: { content: string }) {
  const paragraphs = content.split(/\n\n+/);

  return (
    <>
      {paragraphs.map((paragraph, i) => {
        const t = paragraph.trim();
        const imgMd = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(t);
        if (imgMd) {
          return (
            <figure key={i} className="my-8">
              <img
                src={imgMd[2]}
                alt={imgMd[1]}
                className="w-full max-h-[520px] rounded-2xl object-cover"
                loading="lazy"
              />
            </figure>
          );
        }
        if (t.startsWith("## ")) {
          return (
            <h2 key={i} className="font-display text-2xl font-bold text-deep-purple mt-8 mb-4">
              {t.replace("## ", "")}
            </h2>
          );
        }
        if (t.startsWith("- ")) {
          const items = paragraph.split("\n").filter((l) => l.trim().startsWith("- "));
          return (
            <ul key={i} className="space-y-2 my-4">
              {items.map((item, j) => (
                <li key={j} className="text-foreground/80 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        }
        if (/^\d+\.\s/.test(t)) {
          const items = paragraph.split("\n").filter((l) => /^\d+\./.test(l.trim()));
          return (
            <ol key={i} className="space-y-2 my-4 list-decimal list-inside">
              {items.map((item, j) => (
                <li key={j} className="text-foreground/80">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                </li>
              ))}
            </ol>
          );
        }
        if (t) {
          return (
            <p key={i} className="text-foreground/80 leading-relaxed mb-4">
              {t}
            </p>
          );
        }
        return null;
      })}
    </>
  );
}

type PostBodyProps = {
  blocks?: ContentBlock[];
  content?: string;
};

export function PostBody({ blocks, content }: PostBodyProps) {
  if (blocks && blocks.length > 0) {
    return <RenderBlocks blocks={blocks} />;
  }
  return <LegacyMarkdown content={content ?? ""} />;
}
