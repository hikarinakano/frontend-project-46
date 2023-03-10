import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import format from './formatters/index.js';
import computeDiff from './computeDiff.js';

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const readFile1 = fs.readFileSync(filepath1, 'utf-8');
  const readFile2 = fs.readFileSync(filepath2, 'utf-8');
  const type1 = path.extname(filepath1).substring(1);
  const type2 = path.extname(filepath2).substring(1);
  const data1 = parse(readFile1, type1);
  const data2 = parse(readFile2, type2);
  const diff = computeDiff(data1, data2);
  return format(formatName, diff);
}

export default genDiff;
