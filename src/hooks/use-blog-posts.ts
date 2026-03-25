import { useCallback, useEffect, useState } from "react";
import { fetchBlogPosts } from "@/lib/supabase-api";
import type { BlogPost } from "@/types/blog";

export function useBlogPosts(): { posts: BlogPost[]; loading: boolean } {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const on = () => refresh();
    window.addEventListener("saathi-blog-updated", on);
    return () => window.removeEventListener("saathi-blog-updated", on);
  }, [refresh]);

  return { posts, loading };
}
