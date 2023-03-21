import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import format from '../src/formatters';
import genDiff from '../src/gendiff';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const stylishFormatResult = readFile('formatted.txt');
const plainFormatResult = readFile('plain.txt');
const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');
const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yaml');
const wrongGenDiff = readFile('wrong_gendiff.json');

test('incorrect format json test', () => {
  expect(() => { genDiff(json1, json2, 'plainn'); }).toThrow(Error);
});

test('incorrect status test', () => {
  expect(() => { format('plain', wrongGenDiff); }).toThrow(Error);
});

test.each([
  {
    filepath1: json1, filepath2: json2, formatName: 'plain', expected: plainFormatResult,
  },
  {
    filepath1: yml1, filepath2: yml2, formatName: 'stylish', expected: stylishFormatResult,
  },
  {
    filepath1: yaml1, filepath2: yaml2, expected: stylishFormatResult,
  },
])('stylish format(default) json and yaml test', (
  {
    filepath1, filepath2, formatName, expected,
  },
) => {
  expect(genDiff(filepath1, filepath2, formatName)).toEqual(expected);
});

test('json format yml test', () => {
  const data = genDiff(json1, json2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
