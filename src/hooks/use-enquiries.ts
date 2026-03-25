import { useCallback, useEffect, useState } from "react";
import { fetchEnquiries } from "@/lib/supabase-api";
import type { EnquiryRecord } from "@/types/enquiry";

export function useEnquiries(): { rows: EnquiryRecord[]; loading: boolean; refresh: () => void } {
  const [rows, setRows] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchEnquiries()
      .then(setRows)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const on = () => refresh();
    window.addEventListener("saathi-enquiries-updated", on);
    return () => window.removeEventListener("saathi-enquiries-updated", on);
  }, [refresh]);

  return { rows, loading, refresh };
}
