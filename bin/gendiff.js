#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import url from 'url';
import genDiff from '../src/index.js';

// Получаем путь текущего модуля
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    // Преобразуем пути в абсолютные с учётом директории __fixtures__ в корне проекта
    const absoluteFilepath1 = path.resolve(
      __dirname,
      '..',
      '__fixtures__',
      filepath1
    );
    const absoluteFilepath2 = path.resolve(
      __dirname,
      '..',
      '__fixtures__',
      filepath2
    );

    // Получаем разницу между файлами
    const diff = genDiff(absoluteFilepath1, absoluteFilepath2, options.format);
    console.log(diff);
  });

program.parse();
