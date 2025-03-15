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

      // Добавлены новые правила
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'], // Разрешаем использование этих переменных
        },
      ],

      'import/extensions': [
        'error',
        {
          js: 'never', // Убираем расширения .js из импорта
        },
      ],

      'import/no-named-as-default': 'off', // Отключаем правило
      'import/no-named-as-default-member': 'off', // Отключаем правило

      'no-console': 'off', // Отключаем правило для использования console.log

      'import/no-extraneous-dependencies': 'off', // Отключаем проверку на зависимости
    },
  },
  ...compat.extends('airbnb-base'),
];
