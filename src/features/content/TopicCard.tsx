import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  title: string;
  description?: string;
  icon?: string;
  href?: string;
  className?: string;
}

export function TopicCard({
  title,
  description,
  icon,
  href,
  className,
}: TopicCardProps) {
  const content = (
    <Card
      className={cn(
        "overflow-hidden border border-border/80 bg-white/90 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_45px_rgba(15,23,42,0.1)]",
        className,
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-6 md:p-7">
          {icon && (
            <span className="mt-0.5 shrink-0 text-3xl leading-none">{icon}</span>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground md:text-xl">
                {title}
              </h3>
              {href && (
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </div>
            {description && (
              <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
