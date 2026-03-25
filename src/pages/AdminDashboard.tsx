import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import EnquiriesPanel from "@/components/admin/EnquiriesPanel";
import BlogManager from "@/components/admin/BlogManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession, onAuthStateChange, signInWithPassword, signOut } from "@/lib/supabase-auth";
import type { Session } from "@supabase/supabase-js";
import { BookOpen, Inbox, LogOut } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setReady(true);
    });
    const unsub = onAuthStateChange((s) => setSession(s));
    return unsub;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = await signInWithPassword(email, password);
    setSubmitting(false);
    if (err) {
      setError(err.message);
      setPassword("");
      return;
    }
    toast.success("Signed in");
    setPassword("");
  };

  if (!ready) {
    return (
      <div className="min-h-[calc(100dvh-var(--nav-height))] flex items-center justify-center bg-deep-purple px-4">
        <p className="font-body text-white/80">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[calc(100dvh-var(--nav-height))] flex flex-col items-center justify-center bg-deep-purple px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
          <h1 className="font-display text-2xl font-bold text-white mb-2 text-center">Admin</h1>
          <p className="font-body text-sm text-white/70 text-center mb-6">Sign in with your Supabase user email and password.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Email"
              autoComplete="email"
              autoFocus
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            {error ? <p className="text-sm text-primary font-body text-center">{error}</p> : null}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary py-3 font-label font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Layout hideFooter>
      <section className="section-padding bg-background min-h-[60vh]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-deep-purple">
              Site <span className="text-primary">admin</span>
            </h1>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                setSession(null);
                toast.success("Signed out");
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 font-label text-sm font-semibold text-deep-purple hover:bg-muted"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>

          <Tabs defaultValue="enquiries" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 h-auto p-1">
              <TabsTrigger value="enquiries" className="gap-2 py-3 data-[state=active]:text-deep-purple">
                <Inbox size={18} />
                Enquiries
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2 py-3 data-[state=active]:text-deep-purple">
                <BookOpen size={18} />
                Stories
              </TabsTrigger>
            </TabsList>
            <TabsContent value="enquiries" className="mt-0">
              <EnquiriesPanel />
            </TabsContent>
            <TabsContent value="blog" className="mt-0">
              <BlogManager />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
