import {
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
          description="Good React design is about APIs and boundaries. Senior engineers are expected to design components that scale in flexibility without becoming impossible to reason about."
        />

        <SectionHeader>Composition Over Inheritance</SectionHeader>
        <Paragraph>
          React favors composition because UI variation usually comes from
          combining smaller parts rather than extending a class hierarchy.
          Composition keeps data flow explicit and aligns with React&apos;s tree
          model.
        </Paragraph>
        <Paragraph>
          In interviews, explain inheritance as a poor fit because React
          components are already compositional functions. Reuse usually comes
          from props, children, render props, hooks, or slots.
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

        <SectionHeader>Controlled, Uncontrolled, and Headless Patterns</SectionHeader>
        <Paragraph>
          Controlled components receive their current value and change handler
          from a parent. Uncontrolled components let the DOM or internal state
          hold the value. Controlled APIs are easier when validation,
          synchronization, or derived UI matters.
        </Paragraph>
        <Paragraph>
          Headless components expose behavior and accessibility logic without
          prescribing markup or visual styles. They are useful when teams need
          design freedom with consistent interaction behavior.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "controlled", label: "Controlled" },
            { key: "uncontrolled", label: "Uncontrolled" },
          ]}
          rows={[
            {
              label: "State owner",
              values: {
                controlled: "Parent or form manager owns the current value.",
                uncontrolled: "DOM or internal component state owns the current value.",
              },
            },
            {
              label: "Best fit",
              values: {
                controlled: "Validation, analytics, multi-step flows, synchronized UI.",
                uncontrolled: "Simple fields, file inputs, or ref-driven libraries.",
              },
            },
          ]}
        />

        <SectionHeader>Reusable APIs</SectionHeader>
        <Paragraph>
          A reusable component API should expose the smallest useful set of
          decisions. If every internal implementation detail leaks into props,
          the component is not really an abstraction.
        </Paragraph>
        <CollapsibleSection title="Signals of a weak component API">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Too many booleans that create invalid combinations.</li>
            <li>One component trying to cover unrelated use cases with flags.</li>
            <li>No clear ownership of validation, loading, or accessibility responsibilities.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactComponentDesign;
