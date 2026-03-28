import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContentContainer } from "./ContentContainer";

const renderContentContainer = (children = "Test content") => {
  return render(<ContentContainer>{children}</ContentContainer>);
};

describe("ContentContainer", () => {
  it("renders children correctly", () => {
    renderContentContainer("Hello World");
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies current layout classes", () => {
    const { container } = renderContentContainer();
    const div = container.firstChild;
    expect(div).toHaveClass(
      "mx-auto",
      "w-full",
      "max-w-[88rem]",
      "px-5",
      "py-8",
    );
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <ContentContainer className="custom-class">Content</ContentContainer>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
