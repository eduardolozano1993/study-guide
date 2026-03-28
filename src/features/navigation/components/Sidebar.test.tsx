import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { MenuItem } from "@/features/navigation/types/menuItem.interface";
import { MenuItemComponent } from "./Sidebar";

const mockItem: MenuItem = {
  id: "test-item",
  label: "Test Label",
  icon: "item",
  href: "/test-label",
};

const renderMenuItem = (item: MenuItem, initialPath: string = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <MenuItemComponent item={item} pathname={initialPath} />
    </MemoryRouter>,
  );
};

describe("MenuItemComponent", () => {
  beforeEach(() => {
    sessionStorage.removeItem("sidebar-menu-state");
  });

  describe("active state", () => {
    it("applies active styling when href matches current path", () => {
      const itemWithHref: MenuItem = { ...mockItem, href: "/current-path" };

      renderMenuItem(itemWithHref, "/current-path");

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-current", "page");
      expect(link.className).toContain("bg-primary");
    });

    it("does not apply active styling when href does not match", () => {
      const itemWithHref: MenuItem = { ...mockItem, href: "/other-path" };

      renderMenuItem(itemWithHref, "/current-path");

      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("aria-current", "page");
    });

    it("renders placeholder items as disabled text instead of links", () => {
      const itemWithHref: MenuItem = { ...mockItem, href: "#" };

      renderMenuItem(itemWithHref, "/");

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.getByText("Test Label")).toHaveAttribute(
        "aria-disabled",
        "true",
      );
    });
  });

  describe("expand/collapse", () => {
    it("shows children when clicked and has children", async () => {
      const parentItem: MenuItem = {
        ...mockItem,
        children: [
          { id: "child-1", label: "Child 1", href: "/child-1" },
          { id: "child-2", label: "Child 2", href: "/child-2" },
        ],
      };

      renderMenuItem(parentItem);

      const button = screen.getByRole("button");
      expect(screen.queryByText("Child 1")).not.toBeInTheDocument();

      await userEvent.click(button);

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });

    it("hides children when clicked again to collapse", async () => {
      const parentItem: MenuItem = {
        ...mockItem,
        children: [{ id: "child-1", label: "Child 1" }],
      };

      renderMenuItem(parentItem);

      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(screen.getByText("Child 1")).toBeInTheDocument();

      await userEvent.click(button);
      expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
    });

    it("toggles aria-expanded attribute correctly", async () => {
      const parentItem: MenuItem = {
        ...mockItem,
        children: [{ id: "child-1", label: "Child 1" }],
      };

      renderMenuItem(parentItem);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("does not render a button when item has no children", () => {
      renderMenuItem(mockItem);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders link without children", () => {
      renderMenuItem(mockItem);

      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });
  });
});
