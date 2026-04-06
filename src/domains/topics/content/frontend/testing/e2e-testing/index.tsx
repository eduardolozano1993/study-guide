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
          description="E2E tests exercise the application as a user would, through the browser, across the real routing, rendering, and interaction stack."
        />

        <SectionHeader>Mental Model</SectionHeader>
        <Paragraph>
          E2E tests sit at the top of the testing pyramid. They are slower and
          more expensive than unit or integration tests, but they give
          confidence that critical user journeys actually work in the browser.
        </Paragraph>
        <Paragraph>
          This is where you validate the full stack of concerns that smaller
          tests often abstract away: routing, hydration, cookies, browser APIs,
          real DOM behavior, and cross-page flows.
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

        <CollapsibleSection title="What E2E tests are best for">
          <BulletList
            items={[
              "Authentication and authorization journeys.",
              "Checkout, payment, or other business-critical funnels.",
              "Navigation across pages, layouts, and protected routes.",
              "Browser-specific behaviors that smaller tests cannot prove convincingly.",
            ]}
          />
        </CollapsibleSection>

        <Callout variant="tip">
          Senior candidates usually say E2E tests should cover a small number of
          high-value flows, not the entire test surface of the app.
        </Callout>

        <CollapsibleSection title="Common interview pitfalls">
          <BulletList
            items={[
              "Treating E2E tests as the default for every feature.",
              "Ignoring cost, flakiness, and maintenance tradeoffs.",
              "Relying on E2E tests to compensate for missing unit or integration coverage.",
              "Writing brittle selectors that break on harmless UI changes.",
            ]}
          />
        </CollapsibleSection>
      </div>
    </TopicLessonPage>
  );
}

export default E2eTesting;
