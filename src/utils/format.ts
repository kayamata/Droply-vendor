/** ₦12,500 — Nigerian naira with thousands separators. */
export function formatNaira(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  return `${sign}₦${Math.abs(amount).toLocaleString("en-NG")}`;
}

/** ₦4,500 with an explicit sign prefix for transaction ledgers (+/-). */
export function formatSignedNaira(amount: number): string {
  return `${amount >= 0 ? "+" : "-"}₦${Math.abs(amount).toLocaleString("en-NG")}`;
}

/** "12:42 PM" */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/** "Today", "Yesterday", or "Sep 19" */
export function formatDayLabel(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diffDays = Math.round(
    (startOfDay(now) - startOfDay(date)) / 86_400_000
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
