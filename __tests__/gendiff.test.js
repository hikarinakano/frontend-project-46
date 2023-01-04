import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff';

let getFixturePath, readFile, json1, json2, data1, data2;
beforeAll(() => {
  getFixturePath = (filename) => path.join('__tests__', '..', '__fixtures__', filename);
   readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
})

test('json file test', () => {
  
  json1 = readFile('file1.json');
  json2 = readFile('file2.json');
  data1 = getFixturePath('file1.json');
  data2 = getFixturePath('file2.json');

  expect(Object.keys(json1).length).not.toBe(0);
  expect(Object.keys(json2).length).not.toBe(0);
  expect(json1).not.toEqual(json2);
  expect(gendiff(data1, data2)).not.toEqual('{}')
  expect(typeof (gendiff(data1, data2))).toEqual('string')
})

test('files type test', () => {
  data1 = getFixturePath('file1.yml');
  data2 = getFixturePath('file2.yml');
  console.log(data1)
  expect(data1.split('.')[1]).toBe('yml')
})