const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

// Add dev dependencies
packageJson.devDependencies = {
  ...packageJson.devDependencies,
  "eslint": "^8.0.0",
  "eslint-plugin-qwik": "^1.2.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "eslint-config-prettier": "^9.0.0",
  "prettier": "^3.0.0",
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

console.log('Successfully updated package.json!');
