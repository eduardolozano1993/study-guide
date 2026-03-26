import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { MenuItem } from "@/core/interfaces/menuItem.interface";
import { MENU_ITEMS } from "@/core/data/menuItems";

interface MenuItemProps {
  item: MenuItem;
  depth?: number;
}

const depthStyles = {
  0: {
    button: "text-lg font-semibold px-3 py-2",
    link: "text-lg font-medium px-3 py-2",
    icon: "text-base",
    label: "text-lg",
    chevron: "text-xs",
  },
  1: {
    button: "text-sm font-medium px-3 py-1.5",
    link: "text-sm font-normal px-3 py-1",
    icon: "text-sm",
    label: "text-sm",
    chevron: "text-xs",
  },
  2: {
    button: "text-sm font-normal px-3 py-1",
    link: "text-sm font-normal px-3 py-1",
    icon: "text-xs",
    label: "text-xs",
    chevron: "text-xs",
  },
};

const getIndent = (depth: number) => {
  return 12 + depth * 6; // 12px base + 6px per level (4-8px range)
};

function MenuItemComponent({ item, depth = 0 }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const styles =
    depthStyles[depth as keyof typeof depthStyles] || depthStyles[2];
  const indent = getIndent(depth);

  const isActive =
    item.href && item.href !== "#" && location.pathname === item.href;

  const activeClasses = isActive
    ? "bg-primary/10 text-foreground font-medium"
    : "text-foreground hover:bg-accent/50";
  const inactiveClasses = isActive
    ? "bg-primary/10 text-foreground font-medium"
    : "text-foreground hover:bg-accent/50";

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full rounded-lg text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${activeClasses} ${styles.button}`}
          style={{
            paddingLeft: `${indent}px`,
            paddingRight: `${indent / 2}px`,
          }}
          aria-expanded={isOpen}
          aria-current={isActive ? "page" : undefined}
        >
          <span className="flex items-center gap-2.5">
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.label}>{item.label}</span>
          </span>
          <span
            className={`${styles.chevron} transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          >
            ▶
          </span>
        </button>
        {isOpen && (
          <ul className="mt-1 space-y-0.5">
            {item.children!.map((child, index) => (
              <MenuItemComponent key={index} item={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href || "#"}
        className={`flex items-center gap-2 rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${inactiveClasses} ${styles.link}`}
        style={{
          paddingLeft: `${indent + (item.icon ? 8 : 0)}px`,
          paddingRight: `${indent / 2}px`,
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {item.icon && <span className={styles.icon}>{item.icon}</span>}
        <span className={styles.label}>{item.label}</span>
      </a>
    </li>
  );
}

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b border-border">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-4 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{isMobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileSidebar}
          onTouchStart={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? "fixed top-0 left-0 h-full z-50" : "relative"}
          ${isMobileOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : ""}
          w-64 bg-background border-r border-border transition-transform duration-300 ease-in-out
        `}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="flex items-center gap-2 font-semibold text-lg text-black">
              <span>📖</span>
              <span>Study Guide</span>
            </span>
            <button
              onClick={closeMobileSidebar}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-xl"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <div className="p-4 border-b border-border">
            <h2 className="flex items-center gap-2 font-bold text-lg text-foreground">
              <span>📖</span>
              <span>Study Guide</span>
            </h2>
          </div>
        )}

        {/* Navigation */}
        <nav className="overflow-y-auto h-[calc(100%-64px)]">
          <ul className="p-2 space-y-1">
            {MENU_ITEMS.map((item, index) => (
              <MenuItemComponent key={index} item={item} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
