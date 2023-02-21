import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('incorrect format json test', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(() => { genDiff(filepath1, filepath2, 'plainn'); }).toThrow(Error);
});

test('stylish format (default) json test', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = readFile('formatted.txt');

  expect((genDiff(filepath1, filepath2))).toEqual(result);
});

test('stylish format (default) yaml test', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const result = readFile('formatted.txt');

  expect((genDiff(filepath1, filepath2))).toEqual(result);
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
  const data = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});

test('json format yml test', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const data = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
