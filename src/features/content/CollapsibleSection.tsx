import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  className,
}: CollapsibleSectionProps) {
  return (
    <details className={cn("group mt-4", className)} open={defaultOpen}>
      <summary className="flex items-center gap-2 cursor-pointer list-none font-medium text-base text-foreground">
        <span className="transition-transform group-data-[open]:rotate-90">
          ▶
        </span>
        <span>{title}</span>
      </summary>
      <div className="px-1 pt-2">{children}</div>
    </details>
  );
}
