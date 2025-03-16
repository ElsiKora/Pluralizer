import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["test/e2e/**/*.test.ts"],
		exclude: ["**/node_modules/**", "**/dist/**", "**/test/unit/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", "dist/", "**/index.ts", "src/index.ts", "**/*.d.ts", "**/test/**", "**/*.interface.ts", "**/*.type.ts", "*.config.js", "*.config.ts", ".elsikora/**"],
			all: true,
			include: ["src/**/*.ts", "dist/**/*.js", "!src/index.ts", "!dist/index.js"],
		},
		root: ".",
		watch: false,
	},
});
