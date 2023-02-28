import _ from 'lodash';
import fs from 'fs';
import parse from './parse.js';
import path from 'path';
import getFormatFunction from './formatters/index.js';

function computeDiff(data1, data2) {
  if (!(data2 instanceof Object)) {
    return data2;
  }
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unsortedKeys = _.union(keys1, keys2);
  const keys = _.sortBy(unsortedKeys);
  return _.map(keys, (key) => {
    const areEqual = data1[key] === data2[key];
    const areObj = data1[key] instanceof Object && data2[key] instanceof Object;
    const haveMutualKey = _.has(data1, key) && _.has(data2, key);
    if (haveMutualKey && (areEqual || areObj)) {
      const obj = { status: 'unchanged', key, value: computeDiff(data1[key], data2[key]) };
      return obj;
    }
    const deleted = _.has(data1, key) && { status: 'deleted', key, value: computeDiff(data1[key], data1[key]) };
    const added = _.has(data2, key) && { status: 'added', key, value: computeDiff(data2[key], data2[key]) };
    if (deleted && added) {
      return [deleted, added];
    }
    if (deleted) {
      return deleted;
    }
    return added;
  });
}

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const readFile1 = fs.readFileSync(filepath1, 'utf-8');
  const readFile2 = fs.readFileSync(filepath2, 'utf-8');
  const type1 = path.extname(filepath1).substring(1);
  const type2 = path.extname(filepath2).substring(1);
  const data1 = parse(readFile1, type1);
  const data2 = parse(readFile2, type2);
  const diff = computeDiff(data1, data2);
  const formatter = getFormatFunction(formatName);
  return formatter(diff);
}

export default genDiff;
