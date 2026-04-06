import {
  BulletList,
  CodeBlock,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { strictModeAndTsconfigLesson } from "./meta";

export function StrictModeAndTsconfig() {
  return (
    <TopicLessonPage
      title={strictModeAndTsconfigLesson.title}
      summary={strictModeAndTsconfigLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={strictModeAndTsconfigLesson.estimatedReadingTimeMinutes}
      difficulty={strictModeAndTsconfigLesson.difficulty}
      relatedTopics={[
        { label: "Modules and Namespaces", href: "/topic/typescript-modules-and-namespaces" },
        { label: "Senior-Level Judgment", href: "/topic/typescript-senior-level-judgment" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Strict Mode and tsconfig"
          description="Compiler settings change what guarantees TypeScript actually gives the project. That makes tsconfig an architecture concern, not just a tooling file."
        />

        <Paragraph>
          Two teams can both say they use TypeScript and still get very
          different safety guarantees depending on compiler options.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true
  }
}`}
        />

        <BulletList
          items={[
            "Treat strictNullChecks and noImplicitAny as core baseline settings.",
            "Align module and resolution settings with the bundler and test runner.",
            "Adopt stricter settings incrementally in legacy codebases.",
            "Use tsconfig to make uncertainty explicit instead of normalizing unsafe shortcuts.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default StrictModeAndTsconfig;
