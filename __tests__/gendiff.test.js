import fs from 'fs';
import path from 'path';
import { diff } from '../gendiff.js';

describe('gendiff', () => {
  it('should return correct difference between two JSON files', () => {
    const file1 = path.resolve('__fixtures__', 'filepath1.json');
    const file2 = path.resolve('__fixtures__', 'filepath2.json');

    const result = diff(file1, file2);
    expect(result).toEqual([
      '  key1: value1',
      '- key2: value2',
      '+ key2: value3',
    ]);
  });
});
