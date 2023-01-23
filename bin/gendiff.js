#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.4')
  .option('-f, --format [type]', 'output format(default: "stylish")')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts()))
  });

program.parse();
