import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';

beforeEach(() => {
  const getFixturePath = (filename) => path.join(__tests__, '..', '__fixtures', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  const json1 = readFile('file1.json');
  const json2 = readFile('file2.json');

  return 
})

test('primary test', () => {
  expect(json1).toBe({
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  })
})