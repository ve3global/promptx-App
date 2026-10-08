import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="remote-app">
      <h1>PX Hub - Remote App</h1>
      <p>This app exposes <code>remoteApp/Widget</code>.</p>
      <p>It can be deployed independently from the Host.</p>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
