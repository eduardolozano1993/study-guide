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
          description="Senior React interviews test state placement and boundaries more than library trivia. The hard part is deciding what kind of state you have, who owns it, and how updates propagate without turning the whole tree into shared mutable chaos."
        />

        <SectionHeader>Classify State Before Choosing a Tool</SectionHeader>
        <Paragraph>
          The first senior move is not naming Redux, Zustand, or Context. It is
          classifying the state: local UI state, URL state, shared client state,
          or server state. Different categories need different ownership and
          invalidation rules.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "owner", label: "Best owner" },
            { key: "notes", label: "What to watch for" },
          ]}
          rows={[
            {
              label: "Local UI state",
              values: {
                owner: "Nearest component or route boundary that coordinates the interaction.",
                notes: "Do not globalize modal, tab, or form-step state by habit.",
              },
            },
            {
              label: "URL state",
              values: {
                owner: "Router or search params.",
                notes: "If it should survive refresh or be shareable, the URL may be the right source of truth.",
              },
            },
            {
              label: "Shared client state",
              values: {
                owner: "Context or store with selectors and clear feature ownership.",
                notes: "Watch for provider churn, hidden coupling, and cross-feature sprawl.",
              },
            },
            {
              label: "Server state",
              values: {
                owner: "Query/cache layer or framework data APIs.",
                notes: "Caching, retries, and invalidation make this different from ordinary client state.",
              },
            },
          ]}
        />

        <SectionHeader>Context Helps Distribution, Not Granularity</SectionHeader>
        <Paragraph>
          Context solves prop drilling for values many descendants need, but it
          does not automatically solve performance. Every consumer reacts when
          the provided value identity changes.
        </Paragraph>
        <Paragraph>
          That is why high-frequency shared state often needs selectors, smaller
          providers, or a store designed to avoid whole-tree churn.
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
        <BulletList
          items={[
            "Context is excellent for stable injected dependencies such as theme, session, or service access.",
            "Large objects passed through one provider can make unrelated consumers re-render together.",
            "A shared service or store is not automatically better than prop drilling if ownership becomes less clear.",
          ]}
        />

        <SectionHeader>When a Store Is Worth It</SectionHeader>
        <Paragraph>
          Stores earn their keep when multiple features need coordinated updates,
          selectors, undo history, event tracing, optimistic mutations, or
          predictable governance over cross-page state.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "fit", label: "Good fit" },
            { key: "risk", label: "Common failure mode" },
          ]}
          rows={[
            {
              label: "Context plus reducers",
              values: {
                fit: "Bounded shared state with moderate update frequency and clear ownership.",
                risk: "One giant provider turns into an implicit app-wide store.",
              },
            },
            {
              label: "Zustand or similar selector-based store",
              values: {
                fit: "Focused shared client state with lightweight ergonomics.",
                risk: "Ad-hoc patterns and weak conventions make long-term governance harder.",
              },
            },
            {
              label: "Redux Toolkit",
              values: {
                fit: "Large teams that benefit from explicit events, middleware, and tracing.",
                risk: "Using it for data that should really stay in a server cache.",
              },
            },
          ]}
        />
        <Callout variant="tip">
          Before naming a store, ask whether the problem is really server cache,
          URL state, or a feature boundary that was modeled too broadly.
        </Callout>

        <SectionHeader>Growth, Migration, and Governance</SectionHeader>
        <BulletList
          items={[
            "Local state stops scaling when distant features must coordinate, derived selectors repeat everywhere, or updates need consistent orchestration.",
            "Introduce shared state at feature boundaries first instead of centralizing the entire app at once.",
            "Normalization matters when collections are edited from multiple places and identity consistency becomes painful.",
            "A senior design keeps server cache separate from client workflow state so invalidation does not infect everything.",
          ]}
        />

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "How do you decide whether state belongs in the component, the URL, a shared store, or a server cache?",
              "Why can Context become a performance problem even though it reduces prop drilling?",
              "When does a team truly outgrow local state?",
              "Why is putting fetched data into a global client store often the wrong first move?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactStateManagement;
