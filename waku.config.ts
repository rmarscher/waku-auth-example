import { fileURLToPath } from "node:url";
import { defineConfig } from "waku/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  middleware: [
    "waku/middleware/context",
    "waku/middleware/dev-server",
    "./src/middleware/auth.ts",
    "waku/middleware/handler",
  ],
  unstable_viteConfigs: {
    common: () => ({
      plugins: [
        tsconfigPaths({ root: fileURLToPath(new URL(".", import.meta.url)) }),
      ],
    }),
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
});
