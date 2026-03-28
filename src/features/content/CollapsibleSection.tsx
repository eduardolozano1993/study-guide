import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  collapsible?: boolean;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  className,
  collapsible = true,
}: CollapsibleSectionProps) {
  if (!collapsible) {
    return (
      <section
        className={cn(
          "mt-10 space-y-4 border-t border-border/70 pt-8 first:mt-0 first:border-t-0 first:pt-0",
          className,
        )}
      >
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-foreground">
          {title}
        </h2>
        <div>{children}</div>
      </section>
    );
  }

  return (
    <details
      className={cn(
        "group mt-6 rounded-2xl border border-border/70 bg-white/85 p-5 shadow-sm",
        className,
      )}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 text-lg font-semibold tracking-[-0.03em] text-foreground marker:hidden">
        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-90" />
        <span>{title}</span>
      </summary>
      <div className="pl-7 pt-4">{children}</div>
    </details>
  );
}
