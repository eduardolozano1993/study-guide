import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { SampleCard } from "./components/SampleCard";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter basename="/study-guide">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:pt-6 pt-16">
          <SampleCard />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
