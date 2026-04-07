import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MenuItem } from "@/features/navigation/types/menuItem.interface";
import { MenuItemComponent, Sidebar } from "./Sidebar";

const mockItem: MenuItem = {
  kind: "topic",
  id: "test-item",
  label: "Test Label",
  icon: "item",
  href: "/test-label",
  status: "ready",
  disabled: false,
};

const renderMenuItem = (item: MenuItem, initialPath: string = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <MenuItemComponent
        item={item}
        pathname={initialPath}
        completedTopics={{}}
        onToggleTopicCompletion={() => {}}
      />
    </MemoryRouter>,
  );
};

describe("MenuItemComponent", () => {
  beforeEach(() => {
    sessionStorage.removeItem("sidebar-menu-state");
    localStorage.removeItem("sidebar-topic-completion");
  });

  describe("active state", () => {
    it("applies active styling when href matches current path", () => {
      const itemWithHref: MenuItem = {
        ...mockItem,
        href: "/current-path",
      };

      renderMenuItem(itemWithHref, "/current-path");

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-current", "page");
      expect(link.parentElement?.className).toContain("bg-primary");
    });

    it("does not apply active styling when href does not match", () => {
      const itemWithHref: MenuItem = {
        ...mockItem,
        href: "/other-path",
      };

      renderMenuItem(itemWithHref, "/current-path");

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("aria-current", "page");
    });

    it("renders placeholder items as disabled text instead of links", () => {
      const itemWithHref: MenuItem = {
        ...mockItem,
        href: "#",
        status: "coming-soon",
      };

      renderMenuItem(itemWithHref, "/");

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Test Label").closest('[aria-disabled="true"]')).toHaveAttribute(
        "aria-disabled",
        "true",
      );
      expect(screen.getByText("Soon")).toBeInTheDocument();
    });
  });

  describe("expand/collapse", () => {
    it("shows children when clicked and has children", async () => {
      const parentItem: MenuItem = {
        kind: "group",
        id: "parent-item",
        label: "Parent",
        children: [
          {
            kind: "topic",
            id: "child-1",
            label: "Child 1",
            href: "/child-1",
            status: "ready",
            disabled: false,
          },
          {
            kind: "topic",
            id: "child-2",
            label: "Child 2",
            href: "/child-2",
            status: "ready",
            disabled: false,
          },
        ],
      };

      renderMenuItem(parentItem);

      const button = screen.getByRole("button", { name: "Parent" });
      expect(screen.queryByText("Child 1")).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });

    it("hides children when clicked again to collapse", async () => {
      const parentItem: MenuItem = {
        kind: "group",
        id: "parent-item",
        label: "Parent",
        children: [
          {
            kind: "topic",
            id: "child-1",
            label: "Child 1",
            href: "/child-1",
            status: "ready",
            disabled: false,
          },
        ],
      };

      renderMenuItem(parentItem);

      const button = screen.getByRole("button", { name: "Parent" });
      await userEvent.click(button);
      expect(screen.getByText("Child 1")).toBeInTheDocument();

      await userEvent.click(button);
      expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
    });

    it("toggles aria-expanded attribute correctly", async () => {
      const parentItem: MenuItem = {
        kind: "group",
        id: "parent-item",
        label: "Parent",
        children: [
          {
            kind: "topic",
            id: "child-1",
            label: "Child 1",
            href: "/child-1",
            status: "ready",
            disabled: false,
          },
        ],
      };

      renderMenuItem(parentItem);

      const button = screen.getByRole("button", { name: "Parent" });
      expect(button).toHaveAttribute("aria-expanded", "false");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("does not render a button when item has no children", () => {
      renderMenuItem(mockItem);

      expect(screen.queryByRole("button", { name: "Test Label" })).not.toBeInTheDocument();
    });

    it("renders link without children", () => {
      renderMenuItem(mockItem);

      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });
  });

  describe("topic completion", () => {
    it("renders a completion checkbox for ready topics", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar menuItems={[mockItem]} showBrand={false} />
        </MemoryRouter>,
      );

      expect(
        screen.getByRole("button", { name: "Mark as complete: Test Label" }),
      ).toBeInTheDocument();
    });

    it("stores completion state in localStorage when toggled", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar menuItems={[mockItem]} showBrand={false} />
        </MemoryRouter>,
      );

      const checkbox = screen.getByRole("button", {
        name: "Mark as complete: Test Label",
      });

      await user.click(checkbox);

      expect(checkbox).toHaveAttribute("aria-pressed", "true");
      expect(localStorage.getItem("sidebar-topic-completion")).toBe(
        JSON.stringify({ "test-item": true }),
      );
    });

    it("restores completion state from localStorage", () => {
      localStorage.setItem(
        "sidebar-topic-completion",
        JSON.stringify({ "test-item": true }),
      );

      render(
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar menuItems={[mockItem]} showBrand={false} />
        </MemoryRouter>,
      );

      expect(
        screen.getByRole("button", { name: "Mark as incomplete: Test Label" }),
      ).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("sidebar layout", () => {
    it("keeps the navigation area scrollable within the sidebar height", () => {
      render(
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>,
      );

      const navigation = screen.getByRole("navigation", {
        name: "Study topics",
      });

      expect(navigation.className).toContain("min-h-0");
      expect(navigation.className).toContain("flex-1");
      expect(navigation.className).toContain("overflow-y-auto");
    });
  });
});
