import { type FormEvent, type ReactNode, useState } from "react";

const STORAGE_KEY = "saathi_site_unlock_v1";
const PASSWORD = "ipod";

type SitePasswordGateProps = {
  children: ReactNode;
};

/**
 * Client-side gate only — not suitable for secret content; deters casual visitors.
 */
export function SitePasswordGate({ children }: SitePasswordGateProps) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = value.trim().toLowerCase() === PASSWORD;
    if (ok) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setValue("");
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex min-h-dvh flex-col items-center justify-center bg-black px-6 text-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-gate-heading"
    >
      <h1 id="site-gate-heading" className="sr-only">
        Site password required
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
        autoComplete="off"
      >
        <label htmlFor="site-password" className="font-body text-sm text-white/70">
          Password
        </label>
        <input
          id="site-password"
          name="site-password"
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-body text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/40 focus:ring-2 focus:ring-white/20"
          placeholder="Enter password"
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {error ? (
          <p className="font-body text-sm text-primary" role="alert">
            Incorrect password.
          </p>
        ) : null}
        <button
          type="submit"
          className="rounded-lg bg-white px-4 py-3 font-label text-sm font-semibold tracking-wide text-black transition-opacity hover:opacity-90"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
