import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

interface TestConfig {
  environment: "jsdom";
  globals: true;
  setupFiles: string;
}

type AppConfig = UserConfig & {
  test: TestConfig;
};

const config = {
  plugins: [react()],
  base: "/study-guide/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
} satisfies AppConfig;

export default defineConfig(config);
