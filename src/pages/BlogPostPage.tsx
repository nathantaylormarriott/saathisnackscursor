import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { PostBody } from "@/components/blog/PostBody";
import SpotlightCard from "@/components/SpotlightCard";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { pillThemeToClass } from "@/lib/blog-utils";
import { ArrowLeft } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams();
  const { posts: blogPosts, loading } = useBlogPosts();
  const post = blogPosts.find((p) => p.slug === slug);

  if (loading) {
    return (
      <Layout>
        <div className="section-padding text-center font-body text-muted-foreground">Loading story…</div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="font-display text-3xl font-bold text-deep-purple mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary font-label hover:underline">
            ← Back to stories
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-deep-purple text-deep-purple-foreground">
        <div className="container mx-auto max-w-3xl">
          <Link to="/blog" className="font-label text-sm text-white hover:text-primary inline-flex items-center gap-1 mb-6">
            <ArrowLeft size={16} /> Back to stories
          </Link>
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 font-label text-xs font-semibold ${pillThemeToClass(post.pillTheme)}`}
            >
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">{post.title}</h1>
            <p className="font-label text-sm text-white">{post.date}</p>
          </div>
        </div>
      </section>

      {post.image && (
        <div className="container mx-auto max-w-3xl px-4 -mt-8">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
            <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
          </div>
        </div>
      )}

      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none font-body">
            <PostBody blocks={post.blocks} content={post.content} />
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-display text-xl font-bold text-deep-purple mb-6">
              More <span className="text-primary">stories</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((related, i) => (
                  <Link key={related.slug} to={`/blog/${related.slug}`} className="group block h-full">
                    <SpotlightCard
                      onSand
                      spotlightColor={i === 0 ? "rgba(253, 58, 125, 0.15)" : "rgba(60, 188, 214, 0.15)"}
                      className="h-full transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:shadow-[6px_6px_0_#4D4846]"
                    >
                      <span
                        className={`inline-block rounded-full px-3 py-1 font-label text-xs font-semibold ${pillThemeToClass(related.pillTheme)}`}
                      >
                        {related.category}
                      </span>
                      <h4 className="font-display text-base font-semibold text-deep-purple mt-1 group-hover:text-primary transition-colors">
                        {related.title}
                      </h4>
                    </SpotlightCard>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPostPage;
