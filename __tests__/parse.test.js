import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import parse from '../src/parse';

const getFixturePath = (filename) => path.join('__tests__', '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  { data: readFile('file1.json'), dataSource: 'file1.json' },
  { data: readFile('file1.yml'), dataSource: 'file1.yml' },
])('parse functioning test', ({ data, dataSource }) => {
  expect(Object.keys(parse(data, dataSource)).length).not.toBe(0);
});

test('wrong path', () => {
  const data = readFile('file1.yml');
  expect(() => { parse(data, '/some/wrong/path/file.lol'); }).toThrow(Error);
});
