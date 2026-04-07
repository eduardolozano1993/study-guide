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
import { typeScriptFunctionsLesson } from "./meta";

export function TypeScriptFunctions() {
  return (
    <TopicLessonPage
      title={typeScriptFunctionsLesson.title}
      summary={typeScriptFunctionsLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={typeScriptFunctionsLesson.estimatedReadingTimeMinutes}
      difficulty={typeScriptFunctionsLesson.difficulty}
      relatedTopics={[
        { label: "Async Typing", href: "/topic/typescript-async-typing" },
        { label: "API Type Design", href: "/topic/typescript-api-type-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Functions in TypeScript"
          description="Function types are where API design and type safety meet. Good signatures guide callers toward valid usage instead of forcing them to guess and cast."
        />

        <SectionHeader>Design Signatures, Not Just Implementations</SectionHeader>
        <Paragraph>
          Interviewers care less about syntax memorization and more about
          whether the function signature communicates the contract clearly:
          inputs, output, callback expectations, and how invalid usage is
          prevented.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`type Formatter = (value: number) => string;

function formatPrices(values: number[], formatter: Formatter) {
  return values.map(formatter);
}`}
        />

        <SectionHeader>Overloads vs Unions</SectionHeader>
        <CollapsibleSection title="Overload example" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`function getLabel(value: number): string;
function getLabel(value: string): string;
function getLabel(value: number | string) {
  return typeof value === "number" ? \`#\${value}\` : value.trim();
}`}
          />
        </CollapsibleSection>
        <ComparisonTable
          columns={[
            { key: "good", label: "Good fit" },
            { key: "bad", label: "Poor fit" },
          ]}
          rows={[
            {
              label: "Overloads",
              values: {
                good: "Different call signatures or return relationships really matter to callers.",
                bad: "A simple union plus narrowing already expresses the contract clearly.",
              },
            },
            {
              label: "Union parameters",
              values: {
                good: "One implementation and one return shape cover the cases naturally.",
                bad: "Distinct caller experiences become hidden behind one vague signature.",
              },
            },
          ]}
        />

        <SectionHeader>Callbacks, this, and Widening Risks</SectionHeader>
        <CodeBlock
          language="typescript"
          code={`type Button = { disabled: boolean };

function handleClick(this: Button, event: MouseEvent) {
  if (this.disabled) {
    event.preventDefault();
  }
}`}
        />
        <BulletList
          items={[
            "Callback types should be specific enough that callers know what they receive and what they may return.",
            "Arrow functions and regular functions treat `this` differently, which matters in framework callbacks and library APIs.",
            "One helper that silently returns `any` or broadly typed `unknown` can poison the rest of the call chain.",
            "Generic inference should usually make the common path obvious. If callers constantly annotate type parameters, the API may be poorly designed.",
          ]}
        />
        <Callout variant="warning">
          The senior question is not `can you type a function`. It is `can you
          make the signature itself prevent mistakes and teach correct usage`.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When are overloads better than a union parameter?",
              "How do you type callbacks so callers are guided toward valid usage?",
              "Where does `this` typing still matter in modern TypeScript?",
              "How can one poorly typed helper function weaken an entire module?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default TypeScriptFunctions;
