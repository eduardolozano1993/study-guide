import { cn } from "@/lib/utils";

type CalloutVariant = "tip" | "warning" | "important" | "note";

interface CalloutProps {
  variant: CalloutVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<
  CalloutVariant,
  {
    border: string;
    bg: string;
    icon: string;
  }
> = {
  tip: {
    border: "border-l-accent",
    bg: "bg-accent/5",
    icon: "💡",
  },
  warning: {
    border: "border-l-yellow-500",
    bg: "bg-yellow-500/5",
    icon: "⚠️",
  },
  important: {
    border: "border-l-destructive",
    bg: "bg-destructive/5",
    icon: "🔴",
  },
  note: {
    border: "border-l-primary",
    bg: "bg-primary/5",
    icon: "📝",
  },
};

export function Callout({ variant, children, className }: CalloutProps) {
  const { border, bg, icon } = variantClasses[variant];

  return (
    <div
      className={cn(
        "flex gap-3 rounded-r-md border-l-4 p-4",
        border,
        bg,
        className,
      )}
    >
      <span className="text-lg leading-none shrink-0">{icon}</span>
      <div className="flex-1 text-sm text-foreground">{children}</div>
    </div>
  );
}
