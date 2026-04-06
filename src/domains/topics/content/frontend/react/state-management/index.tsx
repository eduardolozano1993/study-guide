import {
  CodeBlock,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { reactStateManagementLesson } from "./meta";

export function ReactStateManagement() {
  return (
    <TopicLessonPage
      title={reactStateManagementLesson.title}
      summary={reactStateManagementLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactStateManagementLesson.estimatedReadingTimeMinutes}
      difficulty={reactStateManagementLesson.difficulty}
      relatedTopics={[
        { label: "Hooks in Depth", href: "/topic/react-hooks-in-depth" },
        { label: "Component Design", href: "/topic/react-component-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="S"
          title="State Management"
          description="Senior React interviews usually test state placement and boundaries more than library trivia. The hard part is choosing where state lives and how updates propagate."
        />

        <SectionHeader>Local vs Global State</SectionHeader>
        <Paragraph>
          The default should be local state, placed as low as possible while
          still serving all consumers that need it. Global state is justified
          when distant parts of the app need coordinated access or the concern
          truly crosses feature boundaries.
        </Paragraph>
        <Paragraph>
          Strong candidates also separate client state from server state. Fetched
          data often has a different lifecycle from UI state and should not
          automatically be pushed into the same store.
        </Paragraph>
        <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
          <li>Local UI state: modal visibility, active tab, expanded accordion.</li>
          <li>Shared client state: session, theme, coordinated drafts.</li>
          <li>Server state: fetched resources that need caching and invalidation.</li>
        </ul>

        <SectionHeader>Lifting State, Reducers, and Context Limits</SectionHeader>
        <Paragraph>
          Lifting state up solves duplicated sources of truth by moving
          ownership to the nearest common parent. Context can reduce prop
          drilling, but it does not solve update granularity on its own.
        </Paragraph>
        <Paragraph>
          Every consumer re-renders when the provided context value identity
          changes. That is acceptable for stable, low-frequency values, but it
          becomes a poor fit for large fast-changing objects.
        </Paragraph>
        <CollapsibleSection title="Lift state only to the boundary that owns coordination" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      <Filters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductResults selectedCategory={selectedCategory} />
    </>
  );
}`}
          />
        </CollapsibleSection>

        <SectionHeader>Zustand, Redux, and Choosing the Right Tool</SectionHeader>
        <Paragraph>
          Redux is valuable when you need explicit event history, middleware,
          predictable global updates, and a strict architecture for large teams.
          Zustand is attractive when you want a lighter store with selectors and
          less ceremony.
        </Paragraph>
        <Paragraph>
          A senior answer explains tradeoffs in debugging, team size, update
          frequency, and whether the problem is really client state or server
          cache management.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "zustand", label: "Zustand" },
            { key: "redux", label: "Redux Toolkit" },
          ]}
          rows={[
            {
              label: "Ergonomics",
              values: {
                zustand: "Lower ceremony, fast to adopt, good for focused client state.",
                redux: "More structure, better conventions, clearer patterns in large teams.",
              },
            },
            {
              label: "Debugging",
              values: {
                zustand: "Depends more on project discipline and tooling choices.",
                redux: "Action-driven tracing and debugging are stronger by default.",
              },
            },
            {
              label: "Best use case",
              values: {
                zustand: "Small to medium apps or bounded cross-page client state.",
                redux: "Larger applications that benefit from standardized workflows.",
              },
            },
          ]}
        />
        <CollapsibleSection title="State management interview heuristic">
          <Paragraph>
            Before naming a library, classify the state. If the data comes from
            the server and needs invalidation, background refetching, and
            optimistic updates, TanStack Query is often a better first answer
            than Redux or Zustand.
          </Paragraph>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactStateManagement;
