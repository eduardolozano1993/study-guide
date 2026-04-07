import type { ReactNode } from "react";
import { Link2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PageTitle, Paragraph } from "./typography";

interface TopicLessonMetaBadge {
  label: string;
  value: string;
}

interface TopicLessonLink {
  label: string;
  href: string;
}

interface TopicLessonPageProps {
  title: string;
  summary: string;
  children: ReactNode;
  eyebrow?: string;
  estimatedReadingTimeMinutes?: number;
  difficulty?: "intro" | "intermediate" | "advanced";
  relatedTopics?: TopicLessonLink[];
  className?: string;
}

const difficultyLabels: Record<
  NonNullable<TopicLessonPageProps["difficulty"]>,
  string
> = {
  intro: "Intro",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function TopicLessonPage({
  title,
  summary,
  children,
  eyebrow = "Lesson",
  estimatedReadingTimeMinutes,
  difficulty,
  relatedTopics,
  className,
}: TopicLessonPageProps) {
  const metaBadges: TopicLessonMetaBadge[] = [];

  if (estimatedReadingTimeMinutes) {
    metaBadges.push({
      label: "Read time",
      value: `${estimatedReadingTimeMinutes} min`,
    });
  }

  if (difficulty) {
    metaBadges.push({
      label: "Level",
      value: difficultyLabels[difficulty],
    });
  }

  return (
    <div className={cn("space-y-8", className)}>
      <header className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
        <div
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-sky-500/15 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>{eyebrow}</span>
            </div>
            <PageTitle className="mt-5 max-w-xl">{title}</PageTitle>
            <Paragraph className="mt-4 max-w-2xl text-base leading-8">
              {summary}
            </Paragraph>
          </div>
        </div>

        {(metaBadges.length > 0 || relatedTopics?.length) && (
          <div className="relative flex flex-wrap gap-3">
            {metaBadges.map((badge) => (
              <div
                key={badge.label}
                className="grid min-w-[9rem] gap-1 rounded-2xl border border-border/70 bg-background/90 px-4 py-3 shadow-sm"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {badge.label}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {badge.value}
                </div>
              </div>
            ))}
            {relatedTopics?.length ? (
              <div className="grid min-w-[18rem] gap-3 rounded-3xl border border-border/70 bg-background/90 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  <Link2 className="h-4 w-4" />
                  Related topics
                </div>
                <ul className="space-y-2">
                  {relatedTopics.map((topic) => (
                    <li key={topic.href}>
                      <Link
                        to={topic.href}
                        className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {topic.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </header>

      <section className="space-y-8">{children}</section>
    </div>
  );
}
