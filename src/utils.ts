const fmt = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export const humanTime = (secs: number): string => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  return `${fmt(h)}:${fmt(m)}:${fmt(s)}`;
};

export function download(filename: string, text: string): void {
  const blob = new Blob([text], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export function toCSV(rows: Record<string, unknown>[]): string {
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.map(escape).join(",")];
  for (const r of rows) lines.push(headers.map((h) => escape(r[h])).join(","));
  return lines.join("\n");
}