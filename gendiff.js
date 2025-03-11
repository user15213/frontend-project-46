#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

// Экспортируем функцию diff в начало файла
export function diff(file1, file2) {
  const keys = _.union(Object.keys(file1), Object.keys(file2)); // Объединение ключей
  const diff = [];

  keys.sort(); // Сортировка ключей для корректного вывода

  // Сравнение значений по ключам
  keys.forEach((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (value1 !== value2) {
      if (value1 === undefined) {
        diff.push(`+ ${key}: ${value2}`);
      } else if (value2 === undefined) {
        diff.push(`- ${key}: ${value1}`);
      } else {
        diff.push(`- ${key}: ${value1}`);
        diff.push(`+ ${key}: ${value2}`);
      }
    } else {
      diff.push(`  ${key}: ${value1}`);
    }
  });

  return diff;
}

// Функция для отображения различий в различных форматах
const displayDiff = (diff, format) => {
  if (format === 'stylish') {
    return `\n${diff.join('\n')} \n`;
  } else if (format === 'json') {
    return JSON.stringify(diff, null, 2);
  } else if (format === 'plain') {
    return diff.join(' ');
  } else {
    return 'Неизвестный формат';
  }
};

// Основной код программы
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
    'stylish'
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

  const diffResult = diff(file1, file2); // Используем функцию diff
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
