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
          description="Integration tests verify that several real pieces of the system work together: components, form state, router state, data fetching, and user interactions. The hard part is deciding what to keep real and what to mock."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          An integration test is broader than a unit test. Instead of isolating
          one tiny function, it exercises collaboration between a few real
          pieces of the application.
        </Paragraph>
        <Paragraph>
          In frontend code, this often means rendering a component tree with
          real form logic, state updates, validation, and user interaction while
          mocking only the true external boundaries such as HTTP or browser APIs
          that are outside the scope of the collaboration you want to prove.
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
        </CollapsibleSection>

        <SectionHeader>What To Keep Real</SectionHeader>
        <BulletList
          items={[
            "Keep the component tree, user interactions, and the state transitions under test real.",
            "Mock true process boundaries such as HTTP, payment providers, or browser services that would make the test slower or nondeterministic.",
            "Real router behavior and realistic form validation are often worth keeping because they are exactly where integration bugs hide.",
            "If the collaboration between modules is the risk, over-mocking turns the test into a unit test with extra ceremony.",
          ]}
        />

        <SectionHeader>Good Integration Targets</SectionHeader>
        <BulletList
          items={[
            "Forms with validation, submission, error recovery, and disabled-button logic.",
            "Route-aware components that react to params, navigation, or location state.",
            "Data-fetching boundaries where a component responds to loading, error, and success states.",
            "Cross-component state changes where the bug only appears when several pieces coordinate.",
          ]}
        />
        <Callout variant="warning">
          If you mock most of the system and still call the result an integration
          test, you are usually overstating what the test proves.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What should stay real in an integration test, and what should be mocked?",
              "How do you know an integration test is proving real collaboration instead of just dressed-up unit logic?",
              "Why are forms, router behavior, and data boundaries strong integration-test targets?",
              "What failure mode appears when a team over-mocks integration tests?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default IntegrationTesting;
