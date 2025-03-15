import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

const currentFilename = fileURLToPath(import.meta.url);
const dirname = path.dirname(currentFilename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
      'import/extensions': [
        'error',
        'always',
        {
          js: 'never', // Ожидается, что не будет использоваться расширение .js
        },
      ],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'no-console': 'off', // Разрешаем использование console.log
      'import/no-extraneous-dependencies': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'implicit-arrow-linebreak': ['error', 'beside'],
    },
  },
  ...compat.extends('airbnb-base'),
];
