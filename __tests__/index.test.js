import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const dirname = path.dirname(currentFilename);

const getFixturePath = (filename) =>
  path.join(dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

const normalizeWhiteSpace = (str) => str.replace(/\s+/g, ' ').trim();

const formats = ['stylish', 'plain', 'json'];

describe.each([
  ['filepath1.json', 'filepath2.json'],
  ['filepath1.yml', 'filepath2.yml'],
])('gendiff with %s and %s', (file1Name, file2Name) => {
  const file1 = getFixturePath(file1Name);
  const file2 = getFixturePath(file2Name);

  describe.each(formats)('with format "%s"', (format) => {
    const expectedFile = `result${
      format.charAt(0).toUpperCase() + format.slice(1)
    }.txt`;

    test(`should generate ${format} format`, () => {
      expect(normalizeWhiteSpace(genDiff(file1, file2, format))).toMatch(
        normalizeWhiteSpace(readFile(expectedFile))
      );
    });
  });
});
