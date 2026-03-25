import { useEnquiries } from "@/hooks/use-enquiries";
import { deleteEnquiryById, exportEnquiriesToXlsxBlob } from "@/lib/supabase-api";
import { Download, Inbox, Trash2 } from "lucide-react";
import { toast } from "sonner";

const EnquiriesPanel = () => {
  const { rows: enquiries, loading, refresh } = useEnquiries();

  const downloadBlob = (filename: string, blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Download started");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-body text-sm text-muted-foreground max-w-xl">
          Contact form submissions are stored in Supabase. Download as an Excel file anytime.
        </p>
        <button
          type="button"
          onClick={() => downloadBlob(`enquiries-${Date.now()}.xlsx`, exportEnquiriesToXlsxBlob(enquiries))}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 font-label text-sm font-semibold text-deep-purple hover:bg-muted"
        >
          <Download size={16} />
          Download Excel
        </button>
      </div>

      {loading ? (
        <p className="font-body text-sm text-muted-foreground">Loading enquiries…</p>
      ) : enquiries.length === 0 ? (
        <div className="card-midcentury-on-sand flex flex-col items-center justify-center gap-3 py-16 text-center">
          <Inbox className="h-12 w-12 text-muted-foreground/50" aria-hidden />
          <p className="font-body text-muted-foreground">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <article key={e.id} className="card-midcentury-on-sand p-5 text-left">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-3 mb-3">
                <div>
                  <p className="font-display text-lg font-semibold text-deep-purple">{e.name}</p>
                  <p className="font-label text-xs text-muted-foreground">
                    {new Date(e.submittedAt).toLocaleString()} · {e.enquiryType}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const { error } = await deleteEnquiryById(e.id);
                    if (error) {
                      toast.error(error.message);
                      return;
                    }
                    refresh();
                    toast.success("Removed");
                  }}
                  className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Delete enquiry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="space-y-2 font-body text-sm">
                <p>
                  <span className="font-label font-semibold text-deep-purple">Email: </span>
                  <a href={`mailto:${e.email}`} className="text-primary hover:underline">
                    {e.email}
                  </a>
                </p>
                {e.phone ? (
                  <p>
                    <span className="font-label font-semibold text-deep-purple">Phone: </span>
                    {e.phone}
                  </p>
                ) : null}
                <p className="text-foreground/90 whitespace-pre-wrap pt-2">{e.message}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnquiriesPanel;
