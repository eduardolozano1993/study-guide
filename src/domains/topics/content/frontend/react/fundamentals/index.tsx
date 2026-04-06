import {
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
          At senior level, the important shift is to stop talking about
          components as template files and start talking about state ownership,
          identity, data flow, and rendering cost. JSX, props, state, and keys
          all feed that model.
        </Paragraph>
        <Callout variant="tip">
          A strong interview answer ties every primitive back to one question:
          how does React decide what should be preserved, updated, or discarded
          between renders?
        </Callout>

        <SectionHeader>JSX, Components, Props, and State</SectionHeader>
        <Paragraph>
          JSX is syntax for creating React elements. It is not HTML and it is
          not a browser template language. It compiles into JavaScript that
          describes a tree React can compare over time.
        </Paragraph>
        <Paragraph>
          Components are functions from props and state to UI. Props are inputs
          owned by a parent, while state is data owned by the component
          instance. Many React bugs come from putting state in the wrong place,
          so ownership is a core interview topic.
        </Paragraph>
        <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
          <li>Use props to pass data and callbacks downward.</li>
          <li>Use state for data that changes over time and affects rendering.</li>
          <li>Avoid mirroring props into state unless you can justify the synchronization strategy.</li>
        </ul>
        <CollapsibleSection title="Small but complete example" collapsible={false}>
          <Paragraph>
            This example shows how JSX defines a component boundary, how props
            flow down, and how local state stays owned by the component that
            updates it.
          </Paragraph>
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

        <SectionHeader>Render, Reconciliation, and Keys</SectionHeader>
        <Paragraph>
          In modern React, it is clearer to talk about render and commit than
          old class lifecycle names. Render computes the next tree. Commit
          applies DOM updates and runs effects.
        </Paragraph>
        <Paragraph>
          Reconciliation is React&apos;s diffing strategy. React compares the old
          and new trees by type and position. Keys matter because they give list
          items stable identity across renders so React knows which child state
          should be preserved.
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
                good: "React can preserve child state when the logical item stays the same.",
                bad: "React remounts or mismatches children, wiping local state or keeping it on the wrong element.",
              },
            },
          ]}
        />
        <CollapsibleSection title="Why index keys break interactive lists" collapsible={false}>
          <Paragraph>
            When order changes, index keys tell React that position is identity.
            That makes input state stick to a slot instead of the underlying
            todo item.
          </Paragraph>
          <CodeBlock
            language="tsx"
            code={`function TodoList({ todos }: { todos: { id: string; text: string }[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoRow key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls">
          <ul className="my-4 list-disc space-y-3 pl-6 text-base leading-8 text-muted-foreground">
            <li>Saying keys are only for performance instead of identity.</li>
            <li>Using only outdated lifecycle terminology without explaining render and commit.</li>
            <li>Treating JSX as HTML instead of a UI description.</li>
          </ul>
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default ReactFundamentals;
