#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js'; // Импортируем основную функцию

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish') // Опция для формата
  .arguments('<filepath1> <filepath2>') // Параметры для путей
  .action((filepath1, filepath2, options) => {
    // Вызываем genDiff с уже переданными путями
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff); // Выводим результат
  });

program.parse();
