import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-4xl font-semibold tracking-[-0.05em] text-foreground leading-[0.95] md:text-5xl lg:text-6xl",
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
        "mt-14 text-2xl font-semibold tracking-[-0.035em] text-foreground md:text-3xl",
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
        "mt-8 text-lg font-semibold tracking-[-0.025em] text-foreground md:text-xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "my-4 text-base leading-8 text-muted-foreground md:text-[1.05rem]",
        className,
      )}
    >
      {children}
    </p>
  );
}
