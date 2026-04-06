import {
  BulletList,
  CodeBlock,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { runtimeVsCompileTimeLesson } from "./meta";

export function RuntimeVsCompileTime() {
  return (
    <TopicLessonPage
      title={runtimeVsCompileTimeLesson.title}
      summary={runtimeVsCompileTimeLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={runtimeVsCompileTimeLesson.estimatedReadingTimeMinutes}
      difficulty={runtimeVsCompileTimeLesson.difficulty}
      relatedTopics={[
        { label: "Type Assertions and Casting", href: "/topic/typescript-type-assertions" },
        { label: "Async Typing", href: "/topic/typescript-async-typing" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Runtime vs Compile Time"
          description="This is one of the most important senior TypeScript topics because it explains both the power and the limits of the language."
        />

        <Paragraph>
          TypeScript checks code before execution, but most type information is
          erased from emitted JavaScript. At runtime, only JavaScript values
          remain.
        </Paragraph>
        <CodeBlock
          language="typescript"
          code={`type User = { id: string };

function logUser(user: User) {
  console.log(user.id);
}

// The emitted JavaScript has no User type.`}
        />

        <BulletList
          items={[
            "Compile-time safety prevents many developer mistakes before code runs.",
            "Type aliases and interfaces do not exist at runtime.",
            "External input still requires validation.",
            "Casts and annotations do not transform the actual runtime value.",
          ]}
        />
      </div>
    </TopicLessonPage>
  );
}

export default RuntimeVsCompileTime;
