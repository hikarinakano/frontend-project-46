import { readFileSync } from 'fs';


export default (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');

  const parsedData1 = JSON.parse(data1);

  const parsedData2 = JSON.parse(data2);
  return genDiff(parsedData1, parsedData2);
};

const genDiff = (parsedData1, parsedData2) => {
  const keys = Object.keys({ ...parsedData1, ...parsedData2 }).sort(); // https://youtu.be/vkUTX1hruF8?t=929
  const result = ['{'];
  for (const key of keys) {
    if (!Object.hasOwn(parsedData1, key)) {
      result.push(`  + ${key}: ${parsedData2[key]}`);
    } else if (!Object.hasOwn(parsedData2, key)) {
      result.push(`  - ${key}: ${parsedData1[key]}`);
    } else if (parsedData1[key] !== parsedData2[key]) {
      result.push(`  - ${key}: ${parsedData1[key]}`);
      result.push(`  + ${key}: ${parsedData2[key]}`);
    } else {
      result.push(`    ${key}: ${parsedData2[key]}`);
    }
  }
  result.push('}');
  return result.join('\n');
};
