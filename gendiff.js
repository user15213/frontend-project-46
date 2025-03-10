#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.');

program
  .argument('<filepath1>', 'Path to the first file')
  .argument('<filepath2>', 'Path to the second file')
  .option(
    '-f, --format <type>',
    'output format (stylish, plain, json)',
    'stylish'
  );

program.on('--help', () => {
  console.log();
  console.log('  Usage: gendiff [options] <filepath1> <filepath2>');
  console.log();
  console.log('  Compares two configuration files and shows a difference.');
  console.log();
  console.log('  Options:');
  console.log('    -V, --version        output the version number');
  console.log('    -f, --format [type]  output format');
  console.log('    -h, --help           display help for command');
  console.log();
});

program.configureHelp({
  sortOptions: true,
  showHelpAfterError: true,
  formatHelp: () => '',
});

program.parse(process.argv);

const options = program.opts();
const [filepath1, filepath2] = program.args;

const readFile = (filePath) => {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileContent);
};

const compareFiles = (file1, file2) => {
  const diff = [];

  for (const key in file1) {
    if (file1[key] !== file2[key]) {
      diff.push(`- ${key}: ${file1[key]}`);
      diff.push(`+ ${key}: ${file2[key]}`);
    }
  }

  return diff;
};

const displayDiff = (diff, format) => {
  if (format === 'stylish') {
    return diff.join('\n');
  } else if (format === 'json') {
    return JSON.stringify(diff, null, 2);
  } else if (format === 'plain') {
    return diff.join(' ');
  } else {
    return 'Unknown format';
  }
};

const file1 = readFile(filepath1);
const file2 = readFile(filepath2);

const diff = compareFiles(file1, file2);
const output = displayDiff(diff, options.format);

console.log(output);
