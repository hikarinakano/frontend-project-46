import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff';



let getFixturePath, readFile, filepath1, filepath2;
beforeAll(() => {
  getFixturePath = (filename) => path.join('__fixtures__', filename);
  readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

})

test('genDiff test', () => {

  filepath1 = getFixturePath('file1.json')
  filepath2 = getFixturePath('file2.json');
  const result = readFile('formatted.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(result);
})
