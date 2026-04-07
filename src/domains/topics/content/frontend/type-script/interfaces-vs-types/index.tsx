import {
  BulletList,
  Callout,
  CollapsibleSection,
  ComparisonTable,
  Paragraph,
  SectionHeader,
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
          description="This is a tradeoff question, not a trivia contest. Interviewers care more about where the differences matter than about a team’s style preference."
        />

        <SectionHeader>Where They Overlap and Where They Differ</SectionHeader>
        <Paragraph>
          Interfaces and type aliases overlap for object modeling, but they are
          not identical. Interfaces are open to declaration merging and feel
          natural for extensible object contracts. Type aliases are more
          flexible because they can represent unions, tuples, primitives,
          conditional types, and mapped types.
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
                types: "Unions, tuples, primitive aliases, advanced composition, and derived helpers.",
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

        <SectionHeader>Maintainability and Team Conventions</SectionHeader>
        <BulletList
          items={[
            "Use interfaces when openness or external augmentation is genuinely part of the design.",
            "Use type aliases for unions and advanced composition where interfaces simply do not fit.",
            "A team convention can reduce friction, but senior engineers should still know when to make an exception.",
            "Declaration merging is powerful but can also surprise engineers by silently broadening a contract.",
          ]}
        />
        <Callout variant="warning">
          The weak answer is `they are basically the same`. The stronger answer
          is `they overlap often, but openness, advanced composition, and team
          conventions change the choice`.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "When is declaration merging helpful, and when can it become a maintenance trap?",
              "Why can a type alias express things an interface cannot?",
              "When would team consistency matter more than a tiny technical advantage?",
              "What is a case where using an interface would have been less clear than a type alias?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default InterfacesVsTypes;
