import {
  BulletList,
  Callout,
  CodeBlock,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { babelTypeScriptLesson } from "./meta";

export function BabelTypeScript() {
  return (
    <TopicLessonPage
      title={babelTypeScriptLesson.title}
      summary={babelTypeScriptLesson.summary}
      eyebrow="Frontend / Tooling"
      estimatedReadingTimeMinutes={babelTypeScriptLesson.estimatedReadingTimeMinutes}
      difficulty={babelTypeScriptLesson.difficulty}
      relatedTopics={[
        { label: "Strict Mode and tsconfig", href: "/topic/typescript-strict-mode-and-tsconfig" },
        { label: "Runtime vs Compile Time", href: "/topic/typescript-runtime-vs-compile-time" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Babel and TypeScript"
          description="This topic matters because many teams confuse compiling TypeScript syntax with actually type-checking a project."
        />

        <Paragraph>
          Babel can transform TypeScript-flavored syntax into JavaScript, but it
          does not replace TypeScript's type checker. That distinction is one of
          the core interview points here.
        </Paragraph>
        <CodeBlock
          language="text"
          code={`Babel:
- transpiles syntax
- applies language and framework transforms

TypeScript compiler:
- understands TypeScript syntax
- can emit JavaScript
- performs type checking`}
        />

        <Callout variant="warning">
          A build can succeed after Babel transpilation while the codebase still
          has real type errors if type-checking runs separately or not at all.
        </Callout>

        <BulletList
          items={[
            "Babel is mainly about syntax transforms and build pipeline behavior.",
            "TypeScript type safety comes from the TypeScript compiler or a dedicated type-check step.",
            "Many teams use Babel or SWC for transforms and run tsc --noEmit separately for type-checking.",
            "Senior answers should clearly separate transpilation concerns from static-analysis concerns.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default BabelTypeScript;
