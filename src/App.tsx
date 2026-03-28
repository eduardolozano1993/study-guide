import "./App.css";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import TopicPage from "./pages/components";
import { Sidebar } from "./features/navigation/components/Sidebar";
import { BASE_PATH } from "./features/navigation/data/menuItems";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import { Button } from "./shared/components/ui/button";

const DEFAULT_TITLE = "Study Guide";

function HomePage() {
  useEffect(() => {
    // Keep the browser tab aligned with the landing view when no topic is open.
    document.title = DEFAULT_TITLE;
  }, []);

  return (
    <section className="flex min-h-full items-center justify-center px-6 py-16 lg:px-10">
      <div className="max-w-2xl rounded-[28px] border border-border/70 bg-card/90 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground">
          Select a topic from the menu
        </h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
          Use the navigation to open a study topic. The reading area is now
          designed to feel more like documentation and less like a dense
          accordion.
        </p>
      </div>
    </section>
  );
}

function MobileNavHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="border-b border-border/70 bg-white/80 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-sm font-semibold tracking-[-0.03em] text-foreground">
            Study Guide
          </p>
          <p className="text-xs text-muted-foreground">
            Browse topics and lessons
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setMobileNavOpen((value) => !value)}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-navigation"
        >
          <Menu className="h-4 w-4" />
          Menu
        </Button>
      </div>

      {mobileNavOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border/70 bg-white/95 shadow-sm"
        >
          <Sidebar
            showBrand={false}
            navLabel="Study topics mobile navigation"
            onNavigate={() => setMobileNavOpen(false)}
            className="max-h-[70svh] overflow-y-auto"
          />
        </div>
      )}
    </header>
  );
}

function AppShell() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen bg-background">
      <a
        href="#main-content"
        onClick={() => {
          document.getElementById("main-content")?.focus();
        }}
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <aside
        aria-label="Study navigation"
        className="sticky top-0 hidden h-screen w-[320px] shrink-0 border-r border-border/70 bg-white/80 backdrop-blur md:block"
      >
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNavHeader key={location.pathname} />

        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 overflow-y-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Routes>
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASE_PATH}>
        <AppShell />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
