import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SpotlightCard from "@/components/SpotlightCard";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { storyPillClassForPost } from "@/lib/blog-utils";

const spotlightColors = [
  "rgba(253, 58, 125, 0.15)",
  "rgba(255, 184, 26, 0.15)",
  "rgba(60, 188, 214, 0.15)",
];

const BlogPage = () => {
  const { posts: blogPosts, loading } = useBlogPosts();

  return (
    <Layout>
      <section className="section-padding bg-deep-purple text-deep-purple-foreground">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Community <span className="text-primary">stories</span>
          </h1>
          <p className="font-body text-lg text-white max-w-2xl mx-auto">
            Stories, recipes, and updates from the Saathi Snacks community.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="col-span-full text-center font-body text-muted-foreground py-12">Loading stories…</p>
            ) : (
              blogPosts.map((post, i) => (
              <div key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <SpotlightCard
                    onSand
                    spotlightColor={spotlightColors[i % spotlightColors.length]}
                    className="h-full transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#4D4846] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:shadow-[6px_6px_0_#4D4846]"
                  >
                    {post.image && (
                      <div className="h-40 rounded-xl overflow-hidden mb-4 -mx-2 -mt-2">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-label text-xs font-semibold ${storyPillClassForPost(post, i)}`}
                    >
                      {post.category}
                    </span>
                    <h2 className="font-display text-lg font-semibold text-deep-purple mt-2 mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>
                    <span className="font-label text-xs text-muted-foreground">{post.date}</span>
                  </SpotlightCard>
                </Link>
              </div>
            ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
