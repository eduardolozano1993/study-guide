import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Sidebar } from "./features/navigation/components/Sidebar";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";
import TopicPage from "./pages/components";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/study-guide">
        <div className="flex h-screen overflow-hidden">
          <aside className="sticky top-0 h-screen w-64 shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route
                path="*"
                element={
                  <div className="flex h-screen overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-8">
                      <h1 className="text-2xl font-bold">
                        Select a topic from the menu
                      </h1>
                    </main>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
