import _ from 'lodash';
import fs from 'fs';
import parse from './parse.js';
import getFormatFunction from '../formatters/index.js';

function computeDiff(data1, data2) {
  if (!(data2 instanceof Object)) {
    return data2;
  }
  function doComputeDiff(keys, data1, data2) {
    if (keys.length === 0) {
      return [];
    }
    const key = _.first(keys);
    const rest = _.tail(keys);
    const restDiffComputed = doComputeDiff(rest, data1, data2);
    function areEqual(val1, val2) {
      return val1 === val2;
    }
    function areObj(val1, val2) {
      return val1 instanceof Object && val2 instanceof Object;
    }
    function haveMutualKey(data1,data2, key) {
      return _.has(data1, key) && _.has(data2, key);
    }
    if (haveMutualKey(data1, data2, key) && (areEqual(data1[key],data2[key]) || areObj(data1[key],data2[key]))) {
      const obj = { status: 'unchanged', key: `${key}`, value: computeDiff(data1[key], data2[key]) };
      return [obj].concat(restDiffComputed);
    }
    const result = [
      _.has(data1, key) && { status: 'deleted', key: `${key}`, value: computeDiff(data1[key], data1[key]) },
      _.has(data2, key) && { status: 'added', key: `${key}`, value: computeDiff(data2[key], data2[key]) },
    ];
    return _.filter(result, (item) => item instanceof Object).concat(restDiffComputed);
  }
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unsortedKeys = _.union(keys1, keys2);
  const keys = _.sortBy(unsortedKeys);
  return doComputeDiff(keys, data1, data2);
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
