const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

// Add dev dependencies with updated, compatible versions for ESLint v9
packageJson.devDependencies = {
  ...packageJson.devDependencies,
  "eslint": "^9.5.0",
  "eslint-plugin-qwik": "^1.7.5", // Supports ESLint v9
  "@typescript-eslint/eslint-plugin": "^8.0.0-alpha.33", // v8 alpha supports ESLint v9
  "@typescript-eslint/parser": "^8.0.0-alpha.33", // v8 alpha supports ESLint v9
  "typescript-eslint": "^8.0.0-alpha.33", // v8 alpha supports ESLint v9
  "eslint-config-prettier": "^9.1.0", // Supports ESLint v9
  "prettier": "^3.3.2",
};

// Add scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "lint": "eslint .",
  "format": "prettier --write .",
};

// Add prettier config
packageJson.prettier = {
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Successfully updated package.json with ESLint v9 compatible versions!');
