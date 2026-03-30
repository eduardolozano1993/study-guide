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
    if (import.meta.env.DEV) {
      console.warn("Failed to read menu state from sessionStorage:", error);
    }
    return {};
  }
};

const storeMenuState = (state: Record<string, boolean>) => {
  try {
    sessionStorage.setItem(MENU_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Failed to store menu state in sessionStorage:", error);
    }
  }
};

export interface MenuItemProps {
  item: MenuItem;
  depth?: number;
  onNavigate?: () => void;
  pathname: string;
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

const statusLabels = {
  draft: "Draft",
  "coming-soon": "Soon",
  archived: "Archived",
} as const;

const itemContainsPath = (item: MenuItem, pathname: string): boolean => {
  if (item.kind === "topic") {
    return item.href !== "#" && pathname === item.href;
  }

  return item.children.some((child) => itemContainsPath(child, pathname));
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

const renderStatusBadge = (item: MenuItem) => {
  if (item.kind !== "topic" || item.status === "ready") {
    return null;
  }

  return (
    <span className="rounded-full border border-border/70 bg-background/80 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {statusLabels[item.status]}
    </span>
  );
};

export const NavigationItemComponent = React.memo(
  function NavigationItemComponent({
    item,
    depth = 0,
    onNavigate,
    pathname,
  }: MenuItemProps) {
    const styles = getDepthStyles(depth);
    const indent = getIndent(depth);
    const isInActivePath = itemContainsPath(item, pathname);
    const itemKey = item.id ?? `${depth}-${item.label}`;

    const [isOpen, toggleOpen] = useMenuExpanded(itemKey, isInActivePath);

    if (item.kind === "group") {
      const isActive = false;
      const baseStateClasses = "text-foreground hover:bg-muted/80";
      const parentStateClasses = isInActivePath && !isActive
        ? "bg-accent/70 text-foreground"
        : baseStateClasses;

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
          >
            <span className="flex items-center gap-2.5">
              <span className={styles.label}>{item.label}</span>
            </span>
            <ChevronRight
              className={`${styles.chevron} h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
            />
          </button>
          {isOpen && (
            <ul className="mt-1.5 space-y-1">
              {item.children.map((child) => (
                <NavigationItemComponent
                  key={child.id ?? `${child.label}-${depth + 1}`}
                  item={child}
                  depth={depth + 1}
                  onNavigate={onNavigate}
                  pathname={pathname}
                />
              ))}
            </ul>
          )}
        </li>
      );
    }

    const isActive = item.href !== "#" && pathname === item.href;
    const isDisabled = item.disabled || item.href === "#";
    const baseStateClasses = isActive
      ? "bg-primary text-primary-foreground shadow-sm"
      : "text-foreground hover:bg-muted/80";

    if (isDisabled) {
      return (
        <li>
          <span
            className={`flex cursor-not-allowed items-center gap-2 rounded-xl text-foreground/55 transition-all duration-200 ${styles.link}`}
            style={{
              paddingLeft: `${indent + (item.icon ? 8 : 0)}px`,
              paddingRight: `${indent / 1.5}px`,
            }}
            aria-disabled="true"
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
            {renderStatusBadge(item)}
          </span>
        </li>
      );
    }

    return (
      <li>
        <Link
          to={item.href}
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${baseStateClasses} ${styles.link}`}
          style={{
            paddingLeft: `${indent + (item.icon ? 8 : 0)}px`,
            paddingRight: `${indent / 1.5}px`,
          }}
          aria-current={isActive ? "page" : undefined}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className={styles.label}>{item.label}</span>
          {renderStatusBadge(item)}
        </Link>
      </li>
    );
  },
);

export const MenuItemComponent = NavigationItemComponent;

export interface SidebarProps {
  menuItems?: MenuItem[];
  onNavigate?: () => void;
  showBrand?: boolean;
  navLabel?: string;
  className?: string;
}

export function Sidebar({
  menuItems = MENU_ITEMS,
  onNavigate,
  showBrand = true,
  navLabel = "Study topics",
  className,
}: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <div className={className}>
      {showBrand && (
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
      )}

      <nav aria-label={navLabel} className="h-full overflow-y-auto px-3 py-4">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <NavigationItemComponent
              key={item.id ?? item.label}
              item={item}
              onNavigate={onNavigate}
              pathname={pathname}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
