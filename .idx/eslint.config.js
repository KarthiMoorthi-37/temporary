
import qwik from 'eslint-plugin-qwik';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      qwik: qwik,
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...qwik.configs.recommended.rules,
    },
  },
  prettier,
];
