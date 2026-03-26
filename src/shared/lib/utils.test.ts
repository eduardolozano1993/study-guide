import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names with clsx and tailwind-merge", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toContain("text-red-500");
    expect(result).toContain("bg-blue-500");
  });

  it("handles array inputs", () => {
    const result = cn(["text-red-500", "bg-blue-500"]);
    expect(result).toContain("text-red-500");
    expect(result).toContain("bg-blue-500");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toContain("base-class");
    expect(result).toContain("active-class");
  });

  it("handles falsy conditional classes", () => {
    const isActive = false;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toContain("base-class");
    expect(result).not.toContain("active-class");
  });

  it("handles object inputs for conditional styles", () => {
    const result = cn({
      "text-red-500": true,
      "bg-blue-500": false,
    });
    expect(result).toContain("text-red-500");
    expect(result).not.toContain("bg-blue-500");
  });

  it("merges tailwind classes with the same property (last wins)", () => {
    const result = cn("text-red-500 text-blue-500");
    expect(result).toContain("text-blue-500");
  });
});
