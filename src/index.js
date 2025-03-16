import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import form from './formatters/formatters.js';

// Функция для резолвинга путей файлов
const resolvePaths = (filepath1, filepath2) => [
  resolve(cwd(), filepath1),
  resolve(cwd(), filepath2),
];
// Функция для чтения файла
const readFile = (filepath) => {
  try {
    return readFileSync(filepath, 'utf-8');
  } catch (error) {
    throw new Error(`Error reading file ${filepath}: ${error.message}`);
  }
};

const getExtension = (file) => {
  const extension = extname(file).slice(1);
  if (!['json', 'yml', 'yaml'].includes(extension)) {
    throw new Error(`Unsupported file extension: ${extension}`);
  }
  return extension;
};

// Основная функция для генерации диффа
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const [absoluteFilepath1, absoluteFilepath2] = resolvePaths(
    filepath1,
    filepath2,
  );

  // Читаем файлы и парсим их
  const file1 = parseFile(
    getExtension(absoluteFilepath1),
    readFile(absoluteFilepath1),
  );
  const file2 = parseFile(
    getExtension(absoluteFilepath2),
    readFile(absoluteFilepath2),
  );

  // Если один из файлов не удалось прочитать, возвращаем ошибку
  if (!file1 || !file2) {
    return 'Error: Unable to read files or parse them properly.'; // Сообщение об ошибке
  }

  // Вычисляем разницу
  const diffTree = buildDiff(file1, file2);

  // Форматируем разницу и возвращаем результат
  return form(diffTree, format); // Возвращаем итоговое значение
};

export default genDiff;
