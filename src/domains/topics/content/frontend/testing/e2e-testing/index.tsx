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
import { e2eTestingLesson } from "./meta";

export function E2eTesting() {
  return (
    <TopicLessonPage
      title={e2eTestingLesson.title}
      summary={e2eTestingLesson.summary}
      eyebrow="Frontend / Testing"
      estimatedReadingTimeMinutes={e2eTestingLesson.estimatedReadingTimeMinutes}
      difficulty={e2eTestingLesson.difficulty}
      relatedTopics={[
        { label: "Unit Testing", href: "/topic/unit-testing" },
        { label: "Integration Testing", href: "/topic/integration-testing" },
      ]}
    >
      <div className="space-y-8">
        <TopicCard
          icon="T"
          title="End-to-End Testing"
          description="E2E tests exercise the application as a user would, through the browser, across real routing, rendering, auth, and interaction boundaries. Their value is high, but so is their operational cost."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          E2E tests sit at the top of the testing pyramid. They are slower and
          more expensive than unit or integration tests, but they give
          confidence that critical user journeys actually work in the browser
          and in a realistic environment.
        </Paragraph>
        <Paragraph>
          This is where you validate the full stack of concerns that smaller
          tests often abstract away: routing, hydration, cookies, browser APIs,
          redirects, focus behavior, and cross-page flows.
        </Paragraph>

        <CollapsibleSection title="Typical E2E flow" collapsible={false}>
          <CodeBlock
            language="typescript"
            code={`test("user can sign in and reach the dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel("Password").fill("secret123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText("Welcome back")).toBeVisible();
});`}
          />
        </CollapsibleSection>

        <SectionHeader>What Deserves E2E Coverage</SectionHeader>
        <BulletList
          items={[
            "Authentication, checkout, onboarding, billing, and other business-critical funnels.",
            "Navigation across pages, layouts, protected routes, and browser history behavior.",
            "Flows where browser-only behavior, real cookies, redirects, or production-like rendering are the actual risk.",
            "A small set of critical paths that justify the maintenance cost because a broken flow would be expensive or embarrassing.",
          ]}
        />

        <SectionHeader>Operational Realism</SectionHeader>
        <BulletList
          items={[
            "Flakiness usually comes from nondeterministic data, timing races, weak waits, unstable selectors, and environment drift.",
            "Deterministic test accounts, controlled network behavior, and test isolation matter more than piling on retries.",
            "If failures only reproduce in CI, observability matters: screenshots, videos, traces, console logs, and network history turn guesswork into diagnosis.",
            "Environment parity matters because the browser stack, auth configuration, and backend behavior often differ more than teams expect.",
          ]}
        />
        <Callout variant="tip">
          Senior candidates usually say E2E tests should cover a small number of
          high-value flows, not the entire test surface of the app.
        </Callout>

        <CollapsibleSection title="Interviewer questions">
          <BulletList
            items={[
              "What makes an E2E test flaky, and how would you reduce that without hiding the problem?",
              "Why should some flows get E2E coverage while others stay at integration or unit level?",
              "How do you keep E2E suites fast enough that the team still trusts them?",
              "What extra observability do you want when a test only fails in CI?",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default E2eTesting;
