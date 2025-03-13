#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

// Функция для поиска различий
const diff = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const diffResult = [];

  keys.sort();

  keys.forEach((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (_.isObject(value1) && !_.isArray(value1) && value1 !== null) {
      if (_.isObject(value2) && !_.isArray(value2) && value2 !== null) {
        const nestedDiff = diff(value1, value2);
        if (nestedDiff.length > 0) {
          diffResult.push({
            key,
            type: 'nested',
            children: nestedDiff,
          });
        } else {
          diffResult.push({ key, type: 'unchanged', value: value1 });
        }
      } else {
        diffResult.push({
          key,
          type: 'changed',
          oldValue: value1,
          newValue: value2,
        });
      }
    } else if (value1 !== value2) {
      if (value1 === undefined) {
        // Убираем вывод undefined для добавленных свойств
        if (value2 !== undefined) {
          diffResult.push({ key, type: 'added', value: value2 });
        }
      } else if (value2 === undefined) {
        // Убираем вывод undefined для удалённых свойств
        if (value1 !== undefined) {
          diffResult.push({ key, type: 'removed', value: value1 });
        }
      } else {
        diffResult.push({
          key,
          type: 'changed',
          oldValue: value1,
          newValue: value2,
        });
      }
    } else {
      diffResult.push({ key, type: 'unchanged', value: value1 });
    }
  });

  return diffResult;
};

// Функция для форматирования значений
const formatValue = (value, depth = 0) => {
  if (value === null) {
    return 'null';
  }

  if (_.isObject(value) && !_.isArray(value)) {
    const diffResult = diff(value, {});
    if (diffResult.length === 0) {
      return '{}'; // Пустой объект
    }
    return (
      '{\n' +
      formatStylish(diffResult, depth + 1) +
      '\n' +
      ' '.repeat(depth * 4) +
      '}'
    );
  }

  if (_.isArray(value)) {
    return `[${value.join(', ')}]`;
  }

  if (value !== undefined) {
    return JSON.stringify(value).replace(/\"(.*?)\"/g, '$1'); // Убираем кавычки у строк
  }

  return ''; // Для undefined
};

// Форматирование вывода в стиле 'stylish'
const formatStylish = (diff, depth = 0) => {
  const indent = ' '.repeat(depth * 4);
  const bracketIndent = ' '.repeat(Math.max(depth - 1, 0) * 4);

  const result = diff.map((item) => {
    const { key, type, value, oldValue, newValue, children } = item;

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${indent}- ${key}: ${formatValue(value, depth)}`;
      case 'changed':
        return `${indent}- ${key}: ${formatValue(
          oldValue,
          depth
        )}\n${indent}+ ${key}: ${formatValue(newValue, depth)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${formatValue(value, depth)}`;
      case 'nested':
        return `${indent}  ${key}: {\n${formatStylish(
          children,
          depth + 1
        )}\n${bracketIndent}}`;
      default:
        return '';
    }
  });

  return result.join('\n');
};

// Форматирование вывода в стиле 'plain'
const formatPlain = (diff) => {
  return diff
    .map(({ key, type, oldValue, newValue }) => {
      if (type === 'added')
        return `Property '${key}' was added with value: ${formatValue(
          newValue
        )}`;
      if (type === 'removed') return `Property '${key}' was removed`;
      if (type === 'changed')
        return `Property '${key}' was updated. From ${formatValue(
          oldValue
        )} to ${formatValue(newValue)}`;
      return null;
    })
    .filter(Boolean)
    .join('\n');
};

// Форматирование вывода в формате JSON
const formatJson = (diff) => {
  return JSON.stringify(diff, null, 2);
};

// Вывод результатов в зависимости от формата
const displayDiff = (diff, format) => {
  if (format === 'stylish') {
    return formatStylish(diff);
  } else if (format === 'json') {
    return formatJson(diff);
  } else if (format === 'plain') {
    return formatPlain(diff);
  } else {
    return 'Неизвестный формат';
  }
};

// Основная логика работы программы
const program = new Command();

program
  .version('1.0.0')
  .description('Сравнивает два файла конфигурации и показывает разницу.');

program
  .argument('<filepath1>', './__fixtures__/filepath1.json')
  .argument('<filepath2>', './__fixtures__/filepath2.json')
  .option(
    '-f, --format <type>',
    'формат вывода (stylish, plain, json)',
    'stylish' // Устанавливаем формат stylish по умолчанию
  );

program.action((filepath1, filepath2, options) => {
  const readFile = (filePath) => {
    try {
      const fixturesDir = path.resolve(process.cwd(), '__fixtures__');
      const absolutePath = path.resolve(fixturesDir, filePath);
      const extname = path.extname(absolutePath);
      const fileContent = fs.readFileSync(absolutePath, 'utf-8');

      if (extname === '.json') {
        return JSON.parse(fileContent);
      } else if (extname === '.yml' || extname === '.yaml') {
        return yaml.load(fileContent);
      } else {
        throw new Error(`Unsupported file format: ${extname}`);
      }
    } catch (error) {
      console.error(
        `Error reading or parsing file: ${filePath}`,
        error.message
      );
      process.exit(1);
    }
  };

  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const diffResult = diff(file1, file2);
  const output = displayDiff(diffResult, options.format);

  console.log(output);
});

program.on('--help', () => {
  console.log();
  console.log('  Использование: gendiff [options] <filepath1> <filepath2>');
  console.log();
  console.log('  Сравнивает два файла конфигурации и показывает разницу.');
  console.log();
  console.log('  Параметры:');
  console.log('    -V, --version        вывести номер версии');
  console.log('    -f, --format [type]  формат вывода');
  console.log('    -h, --help           вывести справку по команде');
  console.log();
});

program.configureHelp({
  sortOptions: true,
  showHelpAfterError: true,
  formatHelp: () => '',
});

program.parse(process.argv);
