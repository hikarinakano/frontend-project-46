import { test, expect, beforeAll } from "@jest/globals";
import fs from "fs";
import path from "path";
import genDiff from "../src/gendiff";

let getFixturePath, readFile, filepath1, filepath2;
beforeAll(() => {
  getFixturePath = (filename) => path.join("__fixtures__", filename);
  readFile = (filename) => fs.readFileSync(getFixturePath(filename), "utf-8");
})

test("stylish format (default) json test", () => {

  filepath1 = getFixturePath("file1.json");
  filepath2 = getFixturePath("file2.json");
  const result = readFile("formatted.txt");

  expect((genDiff(filepath1, filepath2, "not existing format"))).toEqual(result);
})

test("stylish format (default) yml test", () => {

  filepath1 = getFixturePath("file1.yml");
  filepath2 = getFixturePath("file2.yml");
  const result = readFile("formatted.txt");

  expect((genDiff(filepath1, filepath2, { "format": "aa" }))).toEqual(result);
})

test("plain format json test", () => {

  filepath1 = getFixturePath("file1.json");
  filepath2 = getFixturePath("file2.json");
  const result = readFile("plain.txt");

  expect((genDiff(filepath1, filepath2, { "format": "plain" }))).toEqual(result);
})

test("plain format yml test", () => {

  filepath1 = getFixturePath("file1.yml");
  filepath2 = getFixturePath("file2.yml");
  const result = readFile("plain.txt");

  expect((genDiff(filepath1, filepath2, { "format": "plain" }))).toEqual(result);
})

test("json format json test", () => {
  filepath1 = getFixturePath("file1.json");
  filepath2 = getFixturePath("file2.json");
  const result = readFile("json_format.txt");

  expect((genDiff(filepath1, filepath2, { "format": "json" }))).toEqual(result);
})
test("json format yml test", () => {

  filepath1 = getFixturePath("file1.yml");
  filepath2 = getFixturePath("file2.yml");
  const result = readFile("json_format.txt");
  expect((genDiff(filepath1, filepath2, { "format": "json" }))).toEqual(result);
})