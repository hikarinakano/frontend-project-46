import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parse from '../src/parse';

let getFixturePath, readFile, data1, data2;
beforeAll(() => {
  getFixturePath = (filename) => path.join('__tests__', '..', '__fixtures__', filename);
  readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
})

test('json file test', () => {

  data1 = readFile('file1.json');

  expect(Object.keys(parse(data1, 'file1.json')).length).not.toBe(0);
})


test('yaml file test', () => {
  data1 = readFile('file1.yml');

  expect(Object.keys(parse(data1, 'file1.yml')).length).not.toBe(0);
})


test('wrong path', () => {
  expect(parse('fileData', 'wrong path')).toEqual('Unsupported format of the file')
})
