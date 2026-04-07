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
import { reactFundamentalsLesson } from "./meta";

export function ReactFundamentals() {
  return (
    <TopicLessonPage
      title={reactFundamentalsLesson.title}
      summary={reactFundamentalsLesson.summary}
      eyebrow="Frontend / React"
      estimatedReadingTimeMinutes={reactFundamentalsLesson.estimatedReadingTimeMinutes}
      difficulty={reactFundamentalsLesson.difficulty}
      relatedTopics={[
        { label: "Hooks in Depth", href: "/topic/react-hooks-in-depth" },
        { label: "Rendering Behavior", href: "/topic/react-rendering-behavior" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="R"
          title="React Fundamentals"
          description="Senior candidates are expected to explain the model behind JSX, components, props, state, reconciliation, and keys instead of describing them as isolated APIs."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          React is a declarative UI runtime. You describe what the UI should
          look like for a given state, and React reconciles that description
          against the previous tree.
        </Paragraph>
        <Paragraph>
          At senior level, the important shift is to talk about state
          ownership, identity, preservation, and remounting. JSX, props, state,
          keys, Strict Mode, and batching all feed that model.
        </Paragraph>
        <Callout variant="tip">
          A strong answer ties every primitive back to one question: how does
          React decide what should be preserved, updated, or discarded between
          renders?
        </Callout>

        <SectionHeader>Props, State, and Ownership</SectionHeader>
        <Paragraph>
          JSX is syntax for creating React elements. Components are functions
          from props and state to UI. Props are inputs owned by a parent, while
          state is data owned by the component instance.
        </Paragraph>
        <BulletList
          items={[
            "Use props to pass data and callbacks downward.",
            "Use state for data that changes over time and affects rendering.",
            "Avoid mirroring props into state unless you can justify the synchronization boundary clearly.",
            "State should live at the narrowest point that still owns the coordination.",
          ]}
        />
        <CollapsibleSection title="Small but complete example" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`type ProductCardProps = {
  name: string;
  price: number;
  onAddToCart: () => void;
};

function ProductCard({ name, price, onAddToCart }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article>
      <h2>{name}</h2>
      <p>$${"{price.toFixed(2)}"}</p>
      <button type="button" onClick={() => setIsExpanded((value) => !value)}>
        {isExpanded ? "Hide details" : "Show details"}
      </button>
      {isExpanded ? <p>Ships in 2 business days.</p> : null}
      <button type="button" onClick={onAddToCart}>
        Add to cart
      </button>
    </article>
  );
}`}
          />
        </CollapsibleSection>

        <SectionHeader>Identity, Keys, and Remounting</SectionHeader>
        <Paragraph>
          React compares the old and new trees by type and position. Keys matter
          because they give elements stable identity so React knows which child
          state should be preserved and when something should remount.
        </Paragraph>
        <ComparisonTable
          columns={[
            { key: "good", label: "Stable identity" },
            { key: "bad", label: "Unstable identity" },
          ]}
          rows={[
            {
              label: "Keys",
              values: {
                good: "Use a database id or another stable value tied to the item itself.",
                bad: "Use array index in reorderable or filterable lists, which makes state drift to the wrong row.",
              },
            },
            {
              label: "State preservation",
              values: {
                good: "React preserves child state when the logical item stays the same.",
                bad: "React remounts or mismatches children, wiping local state or keeping it on the wrong element.",
              },
            },
          ]}
        />
        <BulletList
          items={[
            "Keys matter outside simple lists too, including form reset behavior, tab panels, and route transitions.",
            "Moving a component in the tree can change its identity even if its props look the same.",
            "Sometimes remounting is desirable because it intentionally resets local state for a new flow.",
          ]}
        />

        <SectionHeader>Strict Mode and Batching Context</SectionHeader>
        <Paragraph>
          Modern React fundamentals include understanding that development
          Strict Mode may re-run logic to expose unsafe patterns and that state
          updates are batched to avoid unnecessary work.
        </Paragraph>

        <CollapsibleSection title="Interview questions">
          <BulletList
            items={[
              "How does React decide whether state is preserved or reset between renders?",
              "Why are keys about identity, not just performance?",
              "What happens when you move a component to a different position in the tree?",
              "How do Strict Mode and batching change what you observe during development?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactFundamentals;
