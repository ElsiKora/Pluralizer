import typescript from "@rollup/plugin-typescript";
import generatePackageJson from "rollup-plugin-generate-package-json";

const external = [];

export default [
	{
		external,
		input: "src/index.ts",
		output: {
			dir: "dist/esm",
			format: "esm",
			preserveModules: true,
			sourcemap: true,
		},
		plugins: [
			typescript({
				declaration: true,
				declarationDir: "dist/esm",
				outDir: "dist/esm",
				sourceMap: true,
				tsconfig: "./tsconfig.build.json",
			}),
			generatePackageJson({
				baseContents: { type: "module" },
				outputFolder: "dist/esm",
			}),
		],
	},
	{
		external,
		input: "src/index.ts",
		output: {
			dir: "dist/cjs",
			exports: "named",
			format: "cjs",
			preserveModules: true,
			sourcemap: true,
		},
		plugins: [
			typescript({
				declaration: true,
				declarationDir: "dist/cjs",
				outDir: "dist/cjs",
				sourceMap: true,
				tsconfig: "./tsconfig.build.json",
			}),
			generatePackageJson({
				baseContents: { type: "commonjs" },
				outputFolder: "dist/cjs",
			}),
		],
	},
];
