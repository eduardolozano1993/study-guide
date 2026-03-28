import { AlertTriangle, Info, Lightbulb, Siren } from "lucide-react";
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
    icon: React.ReactNode;
  }
> = {
  tip: {
    border: "border-l-amber-400",
    bg: "bg-amber-50",
    icon: <Lightbulb className="h-4 w-4 text-amber-600" />,
  },
  warning: {
    border: "border-l-orange-500",
    bg: "bg-orange-50",
    icon: <AlertTriangle className="h-4 w-4 text-orange-600" />,
  },
  important: {
    border: "border-l-rose-500",
    bg: "bg-rose-50",
    icon: <Siren className="h-4 w-4 text-rose-600" />,
  },
  note: {
    border: "border-l-sky-500",
    bg: "bg-sky-50",
    icon: <Info className="h-4 w-4 text-sky-600" />,
  },
};

export function Callout({ variant, children, className }: CalloutProps) {
  const { border, bg, icon } = variantClasses[variant];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-2xl border border-border/60 border-l-4 p-5 shadow-sm",
        border,
        bg,
        className,
      )}
    >
      <span className="mt-1 shrink-0">{icon}</span>
      <div className="flex-1 text-[0.98rem] leading-7 text-foreground">
        {children}
      </div>
    </div>
  );
}
