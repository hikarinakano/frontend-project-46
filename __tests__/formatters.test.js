import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylish format (default) json test', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('formatted.txt');

  expect((genDiff(filepath1, filepath2, 'not existing format'))).toEqual(result);
});

test('stylish format (default) yml test', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('formatted.txt');

  expect((genDiff(filepath1, filepath2, 'aa'))).toEqual(result);
});

test('plain format json test', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('plain.txt');

  expect((genDiff(filepath1, filepath2, 'plain'))).toEqual(result);
});
test('plain format yml test', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('plain.txt');

  expect((genDiff(filepath1, filepath2, 'plain'))).toEqual(result);
});

test('json format json test', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('json_format.txt');

  expect((genDiff(filepath1, filepath2, 'json'))).toEqual(result);
});

test('json format yml test', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const result = readFile('json_format.txt');
  expect((genDiff(filepath1, filepath2, 'json'))).toEqual(result);
});
