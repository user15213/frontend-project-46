import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const dirname = path.dirname(currentFilename);

const getFixturePath = (filename) => path.join(dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['filepath1.json', 'filepath2.json'],
  ['filepath1.yml', 'filepath2.yml'],
])('gendiff with %s and %s', (file1Name, file2Name) => {
  const file1 = getFixturePath(file1Name);
  const file2 = getFixturePath(file2Name);

  test.each(['stylish', 'plain', 'json'])(
    'should generate %s format',
    (format) => {
      const expectedFile = `result${
        format.charAt(0).toUpperCase() + format.slice(1)
      }.txt`;

      console.log('Comparing:', file1, file2, 'Expected file:', expectedFile);

      const result = genDiff(file1, file2, format).trim();
      const expected = readFile(expectedFile).trim();

      const resultToCompare = format === 'json' ? JSON.stringify(JSON.parse(result)) : result;
      const expectedToCompare = format === 'json' ? JSON.stringify(JSON.parse(expected)) : expected;

      expect(resultToCompare).toBe(expectedToCompare);
    },
  );
});
