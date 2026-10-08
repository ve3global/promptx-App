import React from "react";

export interface WidgetProps {
  userId?: string;
  theme?: "light" | "dark";
}

const remoteEntryUrl = new URL(
  import.meta.env.DEV ? "/remoteEntry.js" : "../remoteEntry.js",
  import.meta.url
).href;

export default function Widget({
  userId = "demo-user",  theme = "dark"}: WidgetProps) {
  return (
    <section
      style={{
        padding: 24,
        borderRadius: 12,
        border: "1px solid #d0d7de",
        background: theme === "dark" ? "#12171e" : "#f8fafc",
        color: theme === "dark" ? "#fff" : "#111827",
      }}
    >
      <h2>PX Widget</h2>
      <p>Loaded remotely through Module Federation.</p>
      <p>
        <strong>User:</strong> {userId}
      </p>
      <p>
        <strong>Theme:</strong> {theme}
      </p>
      <p style={{ wordBreak: "break-all" }}>
        <strong>Served from:</strong>{" "}
        <a href={remoteEntryUrl} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
          {remoteEntryUrl}
        </a>
      </p>
    </section>
  );
}
