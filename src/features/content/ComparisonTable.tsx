import { cn } from "@/lib/utils";

interface ComparisonTableColumn {
  key: string;
  label: string;
  className?: string;
}

interface ComparisonTableRow {
  label: string;
  values: Record<string, string>;
}

interface ComparisonTableProps {
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
  className?: string;
}

export function ComparisonTable({
  columns,
  rows,
  className,
}: ComparisonTableProps) {
  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-[28px] border border-border/80 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b border-border/70 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Dimension
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "border-b border-border/70 px-5 py-4 text-sm font-semibold text-foreground",
                    column.className,
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.label}
                className={cn(
                  rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                )}
              >
                <th className="w-52 border-b border-border/60 px-5 py-4 align-top text-sm font-semibold text-foreground">
                  {row.label}
                </th>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="min-w-56 border-b border-border/60 px-5 py-4 align-top text-sm leading-7 text-muted-foreground"
                  >
                    {row.values[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
