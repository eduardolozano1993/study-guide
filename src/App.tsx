import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Sidebar } from "./features/navigation/components/Sidebar";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/study-guide">
        <div className="flex h-screen overflow-hidden">
          <aside className="sticky top-0 h-screen w-64 shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 overflow-y-auto p-6 md:pt-6 pt-16">
            {/* Route content will go here */}
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
