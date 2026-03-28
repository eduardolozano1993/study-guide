import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold text-foreground leading-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function SectionHeader({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-xl font-semibold text-foreground mt-8 mb-4",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SubHeader({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-base font-semibold text-foreground mt-6 mb-2",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm leading-[1.7] text-foreground my-3", className)}>
      {children}
    </p>
  );
}
