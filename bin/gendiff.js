#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';
import stylish from '../src/stylish.js';
import util from 'util';
import fs from 'fs';
import parse from '../src/parse.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format', 'output format')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .action((filepath1, filepath2) => {
    const readFile1 = fs.readFileSync(filepath1, 'utf-8');
    const readFile2 = fs.readFileSync(filepath2, 'utf-8');
    const data1 = parse(readFile1, filepath1);
    const data2 = parse(readFile2, filepath2);
    if (program.opts().format) {
      console.log(stylish(genDiff(data1, data2)))
    }
    else {
      console.log(util.inspect(genDiff(data1, data2), { showHidden: false, depth: null, colors: true }));
    }
  });

program.parse();



