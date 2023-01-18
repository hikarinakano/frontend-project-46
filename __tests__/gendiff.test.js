import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff';
import parse from '../src/parse';


let getFixturePath, readFile, readParsedFile, data1, data2;
beforeAll(() => {
  getFixturePath = (filename) => path.join('__tests__', '..', '__fixtures__', filename);
  readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  readParsedFile = (filename) => parse(readFile(filename), filename);
})

test('genDiff test', () => {
  data1 = readParsedFile('file1.json');
  data2 = readParsedFile('file2.json');
  const result = readFile('gendiff_result.json');

  expect(genDiff(data1, data2)).toEqual(JSON.parse(result))
})
