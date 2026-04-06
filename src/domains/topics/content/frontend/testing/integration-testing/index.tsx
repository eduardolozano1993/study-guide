import {
  BulletList,
  Callout,
  CodeBlock,
  CollapsibleSection,
  Paragraph,
  SectionHeader,
  TopicCard,
  TopicLessonPage,
} from "@/features/content";
import { integrationTestingLesson } from "./meta";

export function IntegrationTesting() {
  return (
    <TopicLessonPage
      title={integrationTestingLesson.title}
      summary={integrationTestingLesson.summary}
      eyebrow="Frontend / Testing"
      estimatedReadingTimeMinutes={integrationTestingLesson.estimatedReadingTimeMinutes}
      difficulty={integrationTestingLesson.difficulty}
      relatedTopics={[
        { label: "Unit Testing", href: "/topic/unit-testing" },
        { label: "E2E Testing", href: "/topic/e2e-testing" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="Integration Testing"
          description="Integration tests verify that separate pieces of the system actually work together: components, state, routing, forms, API adapters, and side effects."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          An integration test is broader than a unit test. Instead of isolating
          one tiny function, it exercises collaboration between a few real
          pieces of the application.
        </Paragraph>
        <Paragraph>
          In frontend code, this often means rendering a component tree with the
          real form logic, state updates, and user interactions while mocking
          only the true external boundaries such as HTTP.
        </Paragraph>

        <CollapsibleSection title="Typical integration-test shape" collapsible={false}>
          <CodeBlock
            language="tsx"
            code={`it("submits the form and shows a success message", async () => {
  server.use(
    http.post("/api/profile", async () => HttpResponse.json({ ok: true })),
  );

  render(<ProfileForm />);

  await user.type(screen.getByLabelText(/name/i), "Eliza");
  await user.click(screen.getByRole("button", { name: /save/i }));

  expect(await screen.findByText(/saved successfully/i)).toBeInTheDocument();
});`}
          />
          <Paragraph>
            This is not a unit test because it relies on several pieces working
            together. That is exactly why it is useful.
          </Paragraph>
        </CollapsibleSection>

        <CollapsibleSection title="Where integration tests shine">
          <BulletList
            items={[
              "Form submission and validation flows.",
              "State updates that involve several components.",
              "Routing and page-level behavior.",
              "Data fetching behavior with mocked network boundaries.",
            ]}
          />
        </CollapsibleSection>

        <Callout variant="warning">
          If the collaboration between modules is the risk, a narrow unit test
          will often miss the bug.
        </Callout>

        <CollapsibleSection title="Common interview pitfalls">
          <BulletList
            items={[
              "Calling a component test a unit test when it exercises several real dependencies.",
              "Mocking most of the system and then claiming the test proves integration.",
              "Testing implementation details like internal state instead of user-visible outcomes.",
              "Pushing full user journeys into integration tests when the browser stack itself is the real risk.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default IntegrationTesting;
