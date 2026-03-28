import React from "react";
import { BookOpenText, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { MenuItem } from "@/features/navigation/types/menuItem.interface";
import { MENU_ITEMS } from "../data/menuItems";

const MENU_STATE_KEY = "sidebar-menu-state";

const getStoredMenuState = (): Record<string, boolean> => {
  try {
    const stored = sessionStorage.getItem(MENU_STATE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn("Failed to read menu state from sessionStorage:", error);
    return {};
  }
};

const storeMenuState = (state: Record<string, boolean>) => {
  try {
    sessionStorage.setItem(MENU_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to store menu state in sessionStorage:", error);
  }
};

export interface MenuItemProps {
  item: MenuItem;
  depth?: number;
}

const depthStyles = {
  0: {
    button: "px-3 py-2.5 text-base font-semibold",
    link: "px-3 py-2.5 text-base font-medium",
    icon: "text-base",
    label: "text-base",
    chevron: "text-xs",
  },
  1: {
    button: "px-3 py-2 text-sm font-medium",
    link: "px-3 py-2 text-sm font-medium",
    icon: "text-sm",
    label: "text-sm",
    chevron: "text-xs",
  },
  2: {
    button: "px-3 py-1.5 text-sm font-normal",
    link: "px-3 py-1.5 text-sm font-normal",
    icon: "text-xs",
    label: "text-[0.95rem]",
    chevron: "text-xs",
  },
};

const getDepthStyles = (depth: number) => {
  if (depthStyles[depth as keyof typeof depthStyles]) {
    return depthStyles[depth as keyof typeof depthStyles];
  }

  const maxDepth = Math.min(depth, 2);
  return depthStyles[maxDepth as keyof typeof depthStyles];
};

const BASE_INDENT_PX = 12;
const INDENT_PER_LEVEL_PX = 10;

const getIndent = (depth: number) =>
  BASE_INDENT_PX + depth * INDENT_PER_LEVEL_PX;

const itemContainsPath = (item: MenuItem, pathname: string): boolean => {
  if (item.href && item.href !== "#" && pathname === item.href) {
    return true;
  }

  return (
    item.children?.some((child) => itemContainsPath(child, pathname)) ?? false
  );
};

const useMenuExpanded = (
  itemKey: string,
  shouldBeOpen: boolean,
): [boolean, () => void] => {
  const [isOpen, setIsOpen] = React.useState(() => {
    return getStoredMenuState()[itemKey] ?? shouldBeOpen;
  });

  const storedStateRef = React.useRef(getStoredMenuState());

  React.useEffect(() => {
    if (shouldBeOpen) {
      setIsOpen(true);
    }
  }, [shouldBeOpen]);

  const toggle = React.useCallback(() => {
    const currentStored = storedStateRef.current;
    const nextStoredValue = currentStored[itemKey] ?? shouldBeOpen;
    const newValue = !nextStoredValue;
    const newState: Record<string, boolean> = {};

    for (const key of Object.keys(currentStored)) {
      newState[key] = currentStored[key];
    }

    newState[itemKey] = newValue;
    storedStateRef.current = newState;
    storeMenuState(newState);
    setIsOpen(newValue);
  }, [itemKey, shouldBeOpen]);

  return [isOpen, toggle];
};

export const MenuItemComponent = React.memo(function MenuItemComponent({
  item,
  depth = 0,
}: MenuItemProps) {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const styles = getDepthStyles(depth);
  const indent = getIndent(depth);
  const isInActivePath = itemContainsPath(item, location.pathname);
  const itemKey = item.id ?? `${depth}-${item.label}`;

  const [isOpen, toggleOpen] = useMenuExpanded(itemKey, isInActivePath);

  const isActive =
    item.href && item.href !== "#" && location.pathname === item.href;

  const baseStateClasses = isActive
    ? "bg-primary text-primary-foreground shadow-sm"
    : "text-foreground hover:bg-muted/80";

  const parentStateClasses =
    isInActivePath && !isActive
      ? "bg-accent/70 text-foreground"
      : baseStateClasses;

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={toggleOpen}
          className={`flex w-full items-center justify-between rounded-xl text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${parentStateClasses} ${styles.button}`}
          style={{
            paddingLeft: `${indent}px`,
            paddingRight: `${indent / 1.5}px`,
          }}
          aria-expanded={isOpen}
          aria-current={isActive ? "page" : undefined}
        >
          <span className="flex items-center gap-2.5">
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
          </span>
          <ChevronRight
            className={`${styles.chevron} h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          />
        </button>
        {isOpen && (
          <ul className="mt-1.5 space-y-1">
            {item.children!.map((child) => (
              <MenuItemComponent
                key={`${child.label}-${depth + 1}`}
                item={child}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={item.href || "#"}
        className={`flex items-center gap-2 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${baseStateClasses} ${styles.link}`}
        style={{
          paddingLeft: `${indent + (item.icon ? 8 : 0)}px`,
          paddingRight: `${indent / 1.5}px`,
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {item.icon && <span className={styles.icon}>{item.icon}</span>}
        <span className={styles.label}>{item.label}</span>
      </Link>
    </li>
  );
});

export interface SidebarProps {
  menuItems?: MenuItem[];
}

export function Sidebar({ menuItems = MENU_ITEMS }: SidebarProps) {
  return (
    <>
      <div className="border-b border-border/70 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpenText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-[-0.035em] text-foreground">
              Study Guide
            </h1>
          </div>
        </div>
      </div>

      <nav className="h-[calc(100vh-134px)] overflow-y-auto px-3 py-4">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <MenuItemComponent key={item.label} item={item} />
          ))}
        </ul>
      </nav>
    </>
  );
}
