import fs from 'fs';
import path from 'path';

export const parseFile = (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(
      `Error reading or parsing file at ${filePath}: ${error.message}`
    );
  }
};
