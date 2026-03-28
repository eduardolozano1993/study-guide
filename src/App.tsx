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
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-bold">Select a topic from the menu</h1>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASE_PATH}>
        <div className="flex h-screen overflow-hidden">
          <aside className="sticky top-0 h-screen w-64 shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 overflow-y-auto">
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
