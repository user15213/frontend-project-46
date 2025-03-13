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

        // Добавляем новые тестовые файлы с вложенными структурами
        'validFileWithNested.json': JSON.stringify({
          common: {
            setting1: 'Value 1',
            setting2: 200,
            setting3: true,
            setting6: {
              key: 'value',
              doge: {
                wow: '',
              },
            },
          },
          group1: {
            baz: 'bas',
            foo: 'bar',
            nest: {
              key: 'value',
            },
          },
          group2: {
            abc: 12345,
            deep: {
              id: 45,
            },
          },
        }),
        'validFileWithNested.yml': yaml.dump({
          common: {
            setting1: 'Value 1',
            setting2: 200,
            setting3: true,
            setting6: {
              key: 'value',
              doge: {
                wow: '',
              },
            },
          },
          group1: {
            baz: 'bas',
            foo: 'bar',
            nest: {
              key: 'value',
            },
          },
          group2: {
            abc: 12345,
            deep: {
              id: 45,
            },
          },
        }),

        // Добавляем еще файлы с различиями (для тестирования диффа)
        'validFile2WithNested.json': JSON.stringify({
          common: {
            follow: false,
            setting1: 'Value 1',
            setting3: null,
            setting4: 'blah blah',
            setting5: {
              key5: 'value5',
            },
            setting6: {
              key: 'value',
              ops: 'vops',
              doge: {
                wow: 'so much',
              },
            },
          },
          group1: {
            foo: 'bar',
            baz: 'bars',
            nest: 'str',
          },
          group3: {
            deep: {
              id: {
                number: 45,
              },
            },
            fee: 100500,
          },
        }),
        'validFile2WithNested.yml': yaml.dump({
          common: {
            follow: false,
            setting1: 'Value 1',
            setting3: null,
            setting4: 'blah blah',
            setting5: {
              key5: 'value5',
            },
            setting6: {
              key: 'value',
              ops: 'vops',
              doge: {
                wow: 'so much',
              },
            },
          },
          group1: {
            foo: 'bar',
            baz: 'bars',
            nest: 'str',
          },
          group3: {
            deep: {
              id: {
                number: 45,
              },
            },
            fee: 100500,
          },
        }),
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

  // Тестирование вложенных структур для JSON
  it('should parse a valid nested JSON file correctly', () => {
    const filePath = path.resolve('__fixtures__', 'validFileWithNested.json');
    const result = parseFile(filePath);
    expect(result).toEqual({
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          key: 'value',
          doge: { wow: '' },
        },
      },
      group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
      group2: { abc: 12345, deep: { id: 45 } },
    });
  });

  it('should parse a valid nested YAML file correctly', () => {
    const filePath = path.resolve('__fixtures__', 'validFileWithNested.yml');
    const result = parseFile(filePath);
    expect(result).toEqual({
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          key: 'value',
          doge: { wow: '' },
        },
      },
      group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
      group2: { abc: 12345, deep: { id: 45 } },
    });
  });

  // Тестирование различных JSON для диффа
  it('should parse and compare two nested JSON files', () => {
    const filePath1 = path.resolve('__fixtures__', 'validFileWithNested.json');
    const filePath2 = path.resolve('__fixtures__', 'validFile2WithNested.json');
    const result = parseFile(filePath1);
    const result2 = parseFile(filePath2);

    // Здесь можно сделать соответствующие проверки на то, что результаты сравнения правильные
    expect(result).not.toEqual(result2);
  });

  it('should parse and compare two nested YAML files', () => {
    const filePath1 = path.resolve('__fixtures__', 'validFileWithNested.yml');
    const filePath2 = path.resolve('__fixtures__', 'validFile2WithNested.yml');
    const result = parseFile(filePath1);
    const result2 = parseFile(filePath2);

    // Здесь можно сделать соответствующие проверки на то, что результаты сравнения правильные
    expect(result).not.toEqual(result2);
  });
});
