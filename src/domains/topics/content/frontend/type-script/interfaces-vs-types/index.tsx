import {
  BulletList,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { interfacesVsTypesLesson } from "./meta";

export function InterfacesVsTypes() {
  return (
    <TopicLessonPage
      title={interfacesVsTypesLesson.title}
      summary={interfacesVsTypesLesson.summary}
      eyebrow="Frontend / TypeScript"
      estimatedReadingTimeMinutes={interfacesVsTypesLesson.estimatedReadingTimeMinutes}
      difficulty={interfacesVsTypesLesson.difficulty}
      relatedTopics={[
        { label: "Structural Typing", href: "/topic/typescript-structural-typing" },
        { label: "API Type Design", href: "/topic/typescript-api-type-design" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Interfaces vs Types"
          description="This is mostly a tradeoff question. Interviewers care more about when the differences matter than about style preferences."
        />

        <Paragraph>
          Interfaces and type aliases overlap for object modeling, but they are
          not interchangeable in every case. Interfaces are open to declaration
          merging and feel natural for extensible object contracts. Type aliases
          are more flexible because they can represent unions, tuples,
          primitives, conditional types, and mapped types.
        </Paragraph>

        <ComparisonTable
          columns={[
            { key: "interfaces", label: "Interface" },
            { key: "types", label: "Type alias" },
          ]}
          rows={[
            {
              label: "Best fit",
              values: {
                interfaces: "Public object contracts, class implements, extension-heavy models.",
                types: "Unions, tuples, primitive aliases, advanced composition.",
              },
            },
            {
              label: "Special capability",
              values: {
                interfaces: "Declaration merging.",
                types: "Can name any type expression, not just object shapes.",
              },
            },
          ]}
        />

        <CollapsibleSection title="Practical guidance">
          <BulletList
            items={[
              "Use interfaces for clear object contracts when extensibility matters.",
              "Use type aliases for unions, advanced composition, and aliases of primitives.",
              "Prefer consistency across the codebase over dogmatic rules.",
              "Be careful with declaration merging because it can be surprising.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default InterfacesVsTypes;
