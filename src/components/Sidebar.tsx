export function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-[280px] flex-shrink-0 bg-secondary p-4">
      <nav className="space-y-2">
        <h2 className="text-lg font-semibold px-2 py-1">Study Guide</h2>
        <ul className="space-y-1">
          <li>
            <a
              href="#"
              className="block px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Sections
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Progress
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
