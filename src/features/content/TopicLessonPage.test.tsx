import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopicLessonPage } from "./TopicLessonPage";

describe("TopicLessonPage", () => {
  it("renders standardized lesson metadata and content", () => {
    render(
      <TopicLessonPage
        title="Test Lesson"
        summary="A concise lesson summary."
        eyebrow="Section"
        estimatedReadingTimeMinutes={12}
        difficulty="intro"
        relatedTopics={[{ label: "Next topic", href: "/topic/next" }]}
      >
        <p>Lesson content</p>
      </TopicLessonPage>,
    );

    expect(screen.getByText("Test Lesson")).toBeInTheDocument();
    expect(screen.getByText("A concise lesson summary.")).toBeInTheDocument();
    expect(screen.getByText("Read time")).toBeInTheDocument();
    expect(screen.getByText("12 min")).toBeInTheDocument();
    expect(screen.getByText("Level")).toBeInTheDocument();
    expect(screen.getByText("Intro")).toBeInTheDocument();
    expect(screen.getByText("Next topic")).toHaveAttribute("href", "/topic/next");
    expect(screen.getByText("Lesson content")).toBeInTheDocument();
  });
});
