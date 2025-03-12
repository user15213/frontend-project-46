import fs from 'fs';
import path from 'path';
import mockfs from 'mock-fs';
import { parseFile } from '../parse';
import yaml from 'js-yaml';

describe('parseFile', () => {
  beforeAll(() => {
    mockfs({
      __fixtures__: {
        'validFile.json': JSON.stringify({ key1: 'value1', key2: 'value2' }),
        'invalidFile.json': '{ key1: value1, key2: value2 }',

        'validFile.yml': yaml.dump({ key1: 'value1', key2: 'value2' }),
        'validFile.yaml': yaml.dump({ key1: 'value1', key2: 'value2' }),
        'invalidFile.yml': 'key1: value1 key2: value2',
      },
    });
  });

  afterAll(() => {
    mockfs.restore();
  });

  it('should parse a valid JSON file correctly', () => {
    const filePath = path.resolve('__fixtures__', 'validFile.json');
    const result = parseFile(filePath);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should throw an error if the file content is not valid JSON', () => {
    const filePath = path.resolve('__fixtures__', 'invalidFile.json');
    expect(() => parseFile(filePath)).toThrowError(
      /Error reading or parsing file/
    );
  });

  it('should parse a valid YAML file (.yml) correctly', () => {
    const filePath = path.resolve('__fixtures__', 'validFile.yml');
    const result = parseFile(filePath);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should parse a valid YAML file (.yaml) correctly', () => {
    const filePath = path.resolve('__fixtures__', 'validFile.yaml');
    const result = parseFile(filePath);
    expect(result).toEqual({ key1: 'value1', key2: 'value2' });
  });

  it('should throw an error if the YAML file content is not valid', () => {
    const filePath = path.resolve('__fixtures__', 'invalidFile.yml');
    expect(() => parseFile(filePath)).toThrowError(
      /Error reading or parsing file/
    );
  });
});
