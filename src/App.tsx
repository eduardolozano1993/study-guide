import "./App.css";

import { SampleCard } from "./components/SampleCard";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1>Study Guide</h1>
        <SampleCard />
      </main>
    </div>
  );
}

export default App;
