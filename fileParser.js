import fs from 'fs';
import path from 'path';

export const parseFile = (filePath) => {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};
