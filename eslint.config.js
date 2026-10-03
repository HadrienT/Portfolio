import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
	{ ignores: ["dist", "node_modules", "screenshots"] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2023,
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			"jsx-a11y": jsxA11y,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...jsxA11y.flatConfigs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
	},
	{
		// Plain browser script, loaded before the bundle (see index.html).
		files: ["public/**/*.js"],
		languageOptions: { globals: globals.browser, sourceType: "script" },
		rules: { "@typescript-eslint/no-unused-vars": "off" },
	},
	{
		files: ["scripts/**/*.mjs"],
		languageOptions: { globals: globals.node },
	},
);
