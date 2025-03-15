import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import form from './formatters/formatters.js';

// Функция для резолвинга путей файлов
const resolvePaths = (filepath1, filepath2) => {
  const currentDir = cwd(); // Получаем текущую директорию
  const absolutePath1 = resolve(currentDir, '__fixtures__', filepath1); // Резолвим путь первого файла
  const absolutePath2 = resolve(currentDir, '__fixtures__', filepath2); // Резолвим путь второго файла

  return [absolutePath1, absolutePath2]; // Возвращаем резолвленные пути
};

// Функция для чтения файла
const readFile = (filepath) => {
  try {
    const content = readFileSync(filepath, 'utf-8');
    return content; // Возвращаем содержимое файла
  } catch (error) {
    console.error(`Error reading file ${filepath}: ${error.message}`);
    return ''; // Возвращаем пустую строку, чтобы избежать выхода из программы
  }
};

// Функция для получения расширения файла
const getExtension = (file) => {
  const extension = extname(file).slice(1);
  if (!['json', 'yml', 'yaml'].includes(extension)) {
    console.error(`Unsupported file extension: ${extension}`);
    return ''; // Возвращаем пустую строку, если расширение неподдерживаемое
  }
  return extension; // Возвращаем расширение файла
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
