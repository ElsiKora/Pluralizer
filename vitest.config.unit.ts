import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["**/*.test.ts"],
		exclude: ["**/node_modules/**", "**/dist/**", "**/test/e2e/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", "dist/", "**/index.ts", "src/index.ts", "**/*.d.ts", "**/test/**", "**/*.interface.ts", "**/*.type.ts", "*.config.js", "*.config.ts", ".elsikora/**"],
			include: ["src/**/*.ts", "dist/**/*.js", "!src/index.ts", "!dist/index.js"],
			all: true,
		},
		root: ".",
		watch: false,
	},
});
