import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { TOPIC_DEFINITIONS } from "@/features/topics/topicRegistry";
import { buildNavigationTree } from "./navigationTree";

describe("buildNavigationTree", () => {
  it("builds explicit group and topic nodes from the topic registry", () => {
    const tree = buildNavigationTree(TOPIC_DEFINITIONS);

    expect(tree).toHaveLength(1);
    expect(tree[0]).toMatchObject({
      kind: "group",
      id: "frontend",
      label: "Frontend",
    });

    if (tree[0].kind !== "group") {
      throw new Error("Expected the root node to be a group node");
    }

    expect(tree[0].children).toHaveLength(1);
    expect(tree[0].children[0]).toMatchObject({
      kind: "group",
      id: "core-web-fundamentals",
      label: "Core Web Fundamentals",
    });

    if (tree[0].children[0].kind !== "group") {
      throw new Error("Expected the nested node to be a group node");
    }

    const leafKinds = tree[0].children[0].children.map((node) => node.kind);
    expect(leafKinds).toEqual(["topic", "topic", "topic", "topic"]);
  });
});
