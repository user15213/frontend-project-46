import fs from 'fs';
import path from 'path';

describe('gendiff', () => {
  it('should return correct difference between two JSON files', () => {
    const filepath1 = path.resolve('__fixtures__', 'filepath1.json');
    const filepath2 = path.resolve('__fixtures__', 'filepath2.json');

    fs.writeFileSync(
      filepath1,
      JSON.stringify({ key1: 'value1', key2: 'value2' })
    );
    fs.writeFileSync(
      filepath2,
      JSON.stringify({ key1: 'value1', key2: 'value3' })
    );

    process.argv = ['node', 'gendiff.js', filepath1, filepath2];

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    require('../gendiff.js');

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('  key1: value1')
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('- key2: value2')
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('+ key2: value3')
    );

    logSpy.mockRestore();

    fs.unlinkSync(filepath1);
    fs.unlinkSync(filepath2);
  });
});
