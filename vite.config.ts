import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/components/Widget.tsx",
      },
      shared: {
        // Must match the host (PromptX-Frontend) exactly: React 19 throws if
        // react and react-dom resolve to different versions at runtime.
        react: { singleton: true, requiredVersion: "19.1.1" },
        "react-dom": { singleton: true, requiredVersion: "19.1.1" },
      },
      dts: {
        tsConfigPath: "./tsconfig.app.json",
      },
    }),
  ],
  build: {
    target: "esnext",
  },
});
