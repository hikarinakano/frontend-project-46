import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import parse from '../src/parse';

const getFixturePath = (filename) => path.join('__tests__', '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json file test', () => {
  const data1 = readFile('file1.json');
  expect(Object.keys(parse(data1, 'file1.json')).length).not.toBe(0);
});

test('yaml file test', () => {
  const data1 = readFile('file1.yml');
  expect(Object.keys(parse(data1, 'file1.yml')).length).not.toBe(0);
});

test('wrong path', () => {
  const data1 = readFile('file1.yml');
  expect(() => {parse(data1, '/some/wrong/path/file.lol')}).toThrow(Error);
});
