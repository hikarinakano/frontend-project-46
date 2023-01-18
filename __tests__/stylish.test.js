import stylish from '../src/stylish';
import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff';
import parse from '../src/parse';

let getFixturePath, readFile, parseReadFile, data1, data2;
beforeAll(() => {
  getFixturePath = (filename) => path.join('__fixtures__', filename);
  readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  parseReadFile = (filename) => parse(readFile(filename), filename);
})

test('stylish json test', () => {

  data1 = parseReadFile('file1.json');
  data2 = parseReadFile('file2.json');
  const result = readFile('formatted.txt');

  expect(stylish(genDiff(data1, data2))).toEqual(result);
})

test('stylish yml test', () => {

  data1 = parseReadFile('file1.yml');
  data2 = parseReadFile('file2.yml')
  const result = readFile('formatted.txt');

  expect(stylish(genDiff(data1, data2))).toEqual(result);
})
