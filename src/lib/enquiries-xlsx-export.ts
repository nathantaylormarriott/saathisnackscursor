import type { EnquiryRecord } from "@/types/enquiry";

/** Loads SheetJS only when the user exports — keeps xlsx out of the main bundle. */
export async function exportEnquiriesToXlsxBlob(rows: EnquiryRecord[]): Promise<Blob> {
  const XLSX = await import("xlsx");
  const header = ["Submitted", "Name", "Email", "Phone", "Enquiry type", "Message"] as const;
  const aoa: string[][] = [
    [...header],
    ...rows.map((r) => [r.submittedAt, r.name, r.email, r.phone, r.enquiryType, r.message]),
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
