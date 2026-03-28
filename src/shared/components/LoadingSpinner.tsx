interface LoadingSpinnerProps {
  label?: string;
  className?: string;
}

export function LoadingSpinner({
  label = "Loading...",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground ${className ?? ""}`.trim()}
    >
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
