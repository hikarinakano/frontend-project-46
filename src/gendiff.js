import _ from 'lodash';
import fs from 'fs';
import parse from './parse.js';
import getFormatFunction from '../formatters/index.js';

function computeDiff(data1, data2) {
  if (!(data2 instanceof Object)) {
    return data2;
  }
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unsortedKeys = _.union(keys1, keys2);
  const keys = _.sortBy(unsortedKeys);
  return _.flatMap(keys, (key) => {
    const areEqual = data1[key] === data2[key];
    const areObj = data1[key] instanceof Object && data2[key] instanceof Object;
    const haveMutualKey = _.has(data1, key) && _.has(data2, key);
    if (haveMutualKey && (areEqual || areObj)) {
      const obj = { status: 'unchanged', key: `${key}`, value: computeDiff(data1[key], data2[key]) };
      return [obj];
    }
    const result = [
      _.has(data1, key) && { status: 'deleted', key: `${key}`, value: computeDiff(data1[key], data1[key]) },
      _.has(data2, key) && { status: 'added', key: `${key}`, value: computeDiff(data2[key], data2[key]) },
    ];
    return _.filter(result, (item) => item instanceof Object);
  });
}

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const readFile1 = fs.readFileSync(filepath1, 'utf-8');
  const readFile2 = fs.readFileSync(filepath2, 'utf-8');
  const data1 = parse(readFile1, filepath1);
  const data2 = parse(readFile2, filepath2);
  const diff = computeDiff(data1, data2);
  const formatter = getFormatFunction(formatName);
  return formatter(diff);
}

export default genDiff;
