import {
  BulletList,
  CodeBlock,
  CollapsibleSection,
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
          description="Function types are where API design and type safety usually meet. Good signatures make misuse hard."
        />

        <SectionHeader>Function Signatures</SectionHeader>
        <Paragraph>
          Interviewers usually care less about syntax memorization and more
          about whether your function signature communicates the contract
          clearly.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`type Formatter = (value: number) => string;

function formatPrices(values: number[], formatter: Formatter) {
  return values.map(formatter);
}`}
        />

        <CollapsibleSection title="Overloads vs union parameters">
          <CodeBlock
            language="typescript"
            code={`function getLabel(value: number): string;
function getLabel(value: string): string;
function getLabel(value: number | string) {
  return typeof value === "number" ? \`#\${value}\` : value.trim();
}`}
          />
          <Paragraph>
            Use overloads when different inputs justify different call
            signatures or return types. Otherwise, unions plus narrowing are
            often simpler.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Typing this">
          <CodeBlock
            language="typescript"
            code={`type Button = { disabled: boolean };

function handleClick(this: Button, event: MouseEvent) {
  if (this.disabled) {
    event.preventDefault();
  }
}`}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Interview pitfalls">
          <BulletList
            items={[
              "Using overloads where a union parameter would be clearer.",
              "Letting helper functions return any and losing all downstream safety.",
              "Leaving callback contracts too vague to guide callers.",
              "Forgetting that arrow functions and normal functions handle this differently.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default TypeScriptFunctions;
