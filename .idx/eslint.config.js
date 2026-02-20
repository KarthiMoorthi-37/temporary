// @ts-check
const tseslint = require("typescript-eslint");
const qwikPlugin = require("eslint-plugin-qwik");
const prettierConfig = require("eslint-config-prettier");

module.exports = tseslint.config({
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "qwik": qwikPlugin,
    },
    rules: {
      // Start with TypeScript ESLint's recommended rules
      ...tseslint.configs.recommended.rules,
      // Then Qwik's recommended rules
      ...qwikPlugin.configs.recommended.rules,
      // Then add Prettier for formatting (this disables conflicting rules)
      ...prettierConfig.rules,
      // Add any custom rules or overrides here
      "@typescript-eslint/no-unused-vars": "warn",
    },
});
