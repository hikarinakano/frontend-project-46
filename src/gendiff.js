import _ from 'lodash';
import fs from 'fs';
import parse from '../src/parse.js';
import getFormatFunction from '../formatters/index.js';

function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const readFile1 = fs.readFileSync(filepath1, 'utf-8');
  const readFile2 = fs.readFileSync(filepath2, 'utf-8');
  const data1 = parse(readFile1, filepath1);
  const data2 = parse(readFile2, filepath2);
  const diff = computeDiff(data1, data2);
  const formatter = getFormatFunction(formatName);
  return formatter(diff);
}

function computeDiff(data1, data2) {
  if (!(data2 instanceof Object)) {
    return data2;
  }
  const keys = Object.keys({ ...data1, ...data2 }).sort();
  const result = [];
  for (const key of keys) {
    const isVal1Object = data1[key] instanceof Object;
    const isVal2Object = data2[key] instanceof Object;
    if (_.has(data1, key) && _.has(data2, key) && (data1[key] === data2[key] || isVal1Object && isVal2Object)) {
      result.push({ 'status': 'unchanged', 'key': `${key}`, 'value': computeDiff(data1[key], data2[key]) })
      continue;
    }
    if (_.has(data1, key)) {
      result.push({ 'status': 'deleted', 'key': `${key}`, 'value': computeDiff(data1[key], data1[key]) })
    }
    if (_.has(data2, key)) {
      result.push({ 'status': 'added', 'key': `${key}`, 'value': computeDiff(data2[key], data2[key]) })
    }
  }
  return result;
}
export default genDiff;
