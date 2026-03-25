import { blogStoryPillClasses } from "@/data/content";
import type { BlogPost, PillTheme } from "@/types/blog";

export function pillThemeToClass(theme: PillTheme): string {
  switch (theme) {
    case "coral":
      return "bg-primary text-primary-foreground";
    case "forest":
      return "bg-secondary text-secondary-foreground";
    case "mustard":
      return "bg-mustard text-deep-purple";
    default:
      return "bg-primary text-primary-foreground";
  }
}

/** Pill class for a post on cards / header — uses stored theme or list position fallback */
export function storyPillClassForPost(post: BlogPost, index: number): string {
  if (post.pillTheme) return pillThemeToClass(post.pillTheme);
  return blogStoryPillClasses(index);
}

/** Pill class when you already have the post (e.g. from useBlogPosts). */
export function pillClassForBlogPost(post: BlogPost | undefined, indexFallback: number): string {
  if (post?.pillTheme) return pillThemeToClass(post.pillTheme);
  if (!post) return "bg-muted text-muted-foreground";
  return blogStoryPillClasses(indexFallback);
}
