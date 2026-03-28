import { Link } from "react-router-dom";
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
        "hover:bg-muted/50 transition-colors cursor-pointer",
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {icon && (
            <span className="text-2xl leading-none shrink-0">{icon}</span>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
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
