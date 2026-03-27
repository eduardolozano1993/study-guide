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

  it("applies correct styling classes", () => {
    const { container } = renderContentContainer();
    const div = container.firstChild;
    expect(div).toHaveClass(
      "mx-auto",
      "max-w-[65ch]",
      "px-4",
      "md:px-6",
      "lg:px-8",
      "py-6",
    );
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <ContentContainer className="custom-class">Content</ContentContainer>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
