import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        jest: 'readonly', // Указываем, что Jest глобальные переменные доступны
      },
    },
    rules: {
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/__tests__/**/*.js', 'gendiff.js'],
    languageOptions: {
      globals: {
        ...globals.jest, // Добавляем глобальные переменные Jest
      },
    },
    rules: {
      'no-console': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
  {
    files: ['**/__tests__/**/*.js'], // Применяется только для тестовых файлов
    plugins: {
      jest: eslintPluginJest, // Подключаем плагин для Jest
    },
    rules: {
      'no-console': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
    },
  },
];
