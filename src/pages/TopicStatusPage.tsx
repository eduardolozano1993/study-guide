import { useEffect, useRef } from "react";
import { Archive, ArrowLeft, Clock3, FileQuestion, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { Callout, ContentContainer, PageTitle, Paragraph } from "@/features/content";
import type { TopicStatus } from "@/features/topics/topicRegistry";

type TopicStateKind = TopicStatus | "not-found";

interface TopicStatusPageProps {
  title: string;
  kind: TopicStateKind;
  description?: string;
}

const stateConfig: Record<
  TopicStateKind,
  {
    eyebrow: string;
    body: string;
    icon: ReactNode;
    accent: string;
  }
> = {
  ready: {
    eyebrow: "Ready",
    body: "Open it from the sidebar to start reading the full lesson.",
    icon: <Sparkles className="h-5 w-5" />,
    accent: "from-emerald-500/15 via-transparent to-transparent",
  },
  "coming-soon": {
    eyebrow: "Coming soon",
    body: "The page is reserved and the lesson content is still being written.",
    icon: <Clock3 className="h-5 w-5" />,
    accent: "from-amber-500/15 via-transparent to-transparent",
  },
  draft: {
    eyebrow: "Draft",
    body: "This topic is still being edited and is intentionally not ready yet.",
    icon: <FileQuestion className="h-5 w-5" />,
    accent: "from-sky-500/15 via-transparent to-transparent",
  },
  archived: {
    eyebrow: "Archived",
    body: "This topic is preserved for reference but is no longer being expanded.",
    icon: <Archive className="h-5 w-5" />,
    accent: "from-slate-500/15 via-transparent to-transparent",
  },
  "not-found": {
    eyebrow: "Not found",
    body: "The link may be outdated, or the topic may not have been published yet.",
    icon: <FileQuestion className="h-5 w-5" />,
    accent: "from-rose-500/15 via-transparent to-transparent",
  },
};

const statusLabels: Record<TopicStatus, string> = {
  draft: "Draft",
  ready: "Ready",
  "coming-soon": "Coming soon",
  archived: "Archived",
};

export function TopicStatusPage({
  title,
  kind,
  description,
}: TopicStatusPageProps) {
  const config = stateConfig[kind];
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [title, kind]);

  return (
    <ContentContainer>
      <div className="grid gap-10 xl:grid-cols-[minmax(0,72rem)]">
        <section className="min-w-0">
          <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-card/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
            <div
              className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-br ${config.accent}`}
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {config.icon}
                  <span>{config.eyebrow}</span>
                </div>
                <PageTitle
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-5 max-w-xl focus:outline-none"
                >
                  {title}
                </PageTitle>
                <Paragraph className="mt-4 max-w-2xl text-base leading-8">
                  {description ?? config.body}
                </Paragraph>
              </div>

              <div className="grid min-w-[15rem] gap-3 rounded-3xl border border-border/70 bg-background/90 p-4 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Status
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {kind === "not-found" ? "Unavailable" : statusLabels[kind]}
                </div>
                <div className="text-sm leading-6 text-muted-foreground">
                  {kind === "coming-soon"
                    ? "Visible in the sidebar, but the lesson itself is still under construction."
                    : kind === "draft"
                      ? "Kept out of the main learning flow until it is reviewed."
                      : kind === "archived"
                        ? "Kept for reference, but no longer actively updated."
                        : "The requested topic could not be resolved from the registry."}
                </div>
              </div>
            </div>

            <div className="relative mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
                <div className="text-sm font-semibold text-foreground">
                  What to expect
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Clean explanations, examples, and structured study notes once
                  this topic is ready.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
                <div className="text-sm font-semibold text-foreground">
                  Current state
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {kind === "coming-soon"
                    ? "The shell exists and the page is reserved."
                    : kind === "draft"
                      ? "The content is private to editors."
                      : kind === "archived"
                        ? "The lesson is retained for historical context."
                        : "The requested lesson is not registered yet."}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
                <div className="text-sm font-semibold text-foreground">
                  Next step
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Return to the sidebar and open another topic while this one is
                  still being prepared.
                </p>
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to topics
                </Link>
              </Button>
              <Callout variant="note" className="my-0 flex-1">
                {kind === "coming-soon"
                  ? "This topic is intentionally published early so navigation stays stable while the lesson is being written."
                  : kind === "draft"
                    ? "Draft topics are hidden from the main learning flow until they are reviewed."
                    : kind === "archived"
                      ? "Archived topics are preserved but no longer expanded with new material."
                      : "This path is not registered yet, so the shared status page is used as a fallback."}
              </Callout>
            </div>
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}
