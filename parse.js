import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export const parseFile = (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');

    if (filePath.endsWith('.json')) {
      return JSON.parse(fileContent);
    }

    if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
      return yaml.load(fileContent);
    }

    throw new Error('Unsupported file type');
  } catch (error) {
    throw new Error(
      `Error reading or parsing file at ${filePath}: ${error.message}`
    );
  }
};
