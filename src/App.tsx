import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Sidebar } from "./features/navigation/components/Sidebar";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import TopicPage from "./pages/components";
import { BASE_PATH } from "./features/navigation/data/menuItems";

const DEFAULT_TITLE = "Study Guide";

function HomePage() {
  useEffect(() => {
    document.title = DEFAULT_TITLE;
  }, []);

  return (
    <div className="flex min-h-screen">
      <main className="flex flex-1 items-center justify-center px-6 py-16 lg:px-10">
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
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASE_PATH}>
        <div className="flex min-h-screen bg-background">
          <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 border-r border-border/70 bg-white/80 backdrop-blur md:block">
            <Sidebar />
          </aside>
          <main className="min-w-0 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
