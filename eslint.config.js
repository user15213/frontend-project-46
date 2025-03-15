import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

// mimic CommonJS variables -- not needed if using CommonJS
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
        // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
        // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,

      // Убираем расширения из импорта
      'import/extensions': [
        'error',
        {
          js: 'never', // Убираем расширения .js
        },
      ],

      // Разрешаем использование __filename и __dirname
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],

      // Отключаем правило для console.log
      'no-console': 'off',

      // Отключаем проверки на зависимости в devDependencies
      'import/no-extraneous-dependencies': 'off',

      // Добавлены правила для трейлинг-комма и стрелочных функций
      'comma-dangle': ['error', 'always-multiline'],
      'implicit-arrow-linebreak': ['error', 'beside'],
    },
  },
  ...compat.extends('airbnb-base'),
];
