// eslint-disable-next-line @elsikora/unicorn/prevent-abbreviations
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			exclude: ["node_modules/", "dist/", "**/index.ts", "src/index.ts", "**/*.d.ts", "**/test/**", "**/*.interface.ts", "**/*.type.ts", "*.config.js", "*.config.ts", ".elsikora/**"],
			include: ["src/**/*.ts", "dist/**/*.js", "!src/index.ts", "!dist/index.js"],
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
		environment: "node",
		exclude: ["**/node_modules/**", "**/dist/**", "**/test/unit/**"],
		globals: true,
		include: ["test/e2e/**/*.test.ts"],
		root: ".",
		watch: false,
	},
});
