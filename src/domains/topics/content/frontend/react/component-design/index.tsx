import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { reactComponentDesignLesson } from "./meta";

export function ReactComponentDesign() {
  return (
    <TopicLessonPage
      title={reactComponentDesignLesson.title}
      summary={reactComponentDesignLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactComponentDesignLesson.estimatedReadingTimeMinutes}
      difficulty={reactComponentDesignLesson.difficulty}
      relatedTopics={[
        { label: "State Management", href: "/topic/react-state-management" },
        { label: "Forms", href: "/topic/react-forms" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="C"
          title="Component Design"
          description="Good React design is about APIs and boundaries. Senior engineers are expected to design components that scale in flexibility without becoming impossible to reason about, test, or use accessibly."
        />

        <SectionHeader>Composition Over Inheritance</SectionHeader>
        <Paragraph>
          React favors composition because UI variation usually comes from
          combining smaller parts rather than extending a class hierarchy.
          Reuse usually comes from props, children, slots, hooks, or headless
          behavior layers.
        </Paragraph>
        <CollapsibleSection title="Composition through children and slots" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`type PanelProps = {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

function Panel({ title, actions, children }: PanelProps) {
  return (
    <section aria-label={title}>
      <header>
        <h2>{title}</h2>
        {actions}
      </header>
      <div>{children}</div>
    </section>
  );
}`}
          />
        </CollapsibleSection>

        <SectionHeader>Controlled, Uncontrolled, and Headless Tradeoffs</SectionHeader>
        <ComparisonTable
          columns={[
            { key: "fit", label: "Best fit" },
            { key: "watch", label: "What to watch" },
          ]}
          rows={[
            {
              label: "Controlled API",
              values: {
                fit: "Validation, synchronized UI, analytics, multi-step flows, and parent-owned state.",
                watch: "Can get verbose if the state does not truly need to live outside the component.",
              },
            },
            {
              label: "Uncontrolled API",
              values: {
                fit: "Simple fields, file inputs, and integrations that work naturally with refs or native form behavior.",
                watch: "Harder to coordinate when several parts of the UI need the current value.",
              },
            },
            {
              label: "Headless component",
              values: {
                fit: "Reusable interaction and accessibility behavior with custom visual design.",
                watch: "The component still owns keyboard and ARIA responsibilities even if it does not own styling.",
              },
            },
          ]}
        />

        <SectionHeader>API Design Failure Modes</SectionHeader>
        <BulletList
          items={[
            "Too many boolean flags create invalid combinations and make the public API harder to reason about.",
            "One component trying to cover unrelated use cases with escape-hatch props usually means the abstraction boundary is wrong.",
            "A reusable dialog, listbox, or combobox is not reusable unless it owns the accessibility behavior users actually depend on.",
            "Prop explosions, unclear loading ownership, and ambiguous validation responsibility are signs the component is not truly abstracting anything.",
          ]}
        />
        <Callout variant="warning">
          A component is not good because it is flexible. It is good when it
          makes the common path obvious, keeps invalid states hard to represent,
          and preserves clear ownership.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When should a component expose a controlled API instead of owning its own state?",
              "What accessibility behavior must a reusable dialog or listbox component own?",
              "How do you know a component API has become over-generalized?",
              "When are escape hatches healthy, and when do they mean the abstraction is failing?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactComponentDesign;
