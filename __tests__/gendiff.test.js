import { test, expect, beforeEach } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff';

  

test('primary test', () => {
  const getFixturePath = (filename) => path.join('__tests__', '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  const json1 = readFile('file1.json');
  const json2 = readFile('file2.json');
  const data1 = getFixturePath('file1.json');
  const data2 = getFixturePath('file2.json');
  
  expect(Object.keys(json1).length).not.toBe(0);
  expect(Object.keys(json2).length).not.toBe(0);
  expect(json1).not.toEqual(json2);
  expect(gendiff(data1, data2)).not.toEqual('{}')
  expect(typeof(gendiff(data1, data2))).toEqual('string')
})