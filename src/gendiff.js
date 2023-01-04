
//import parser from 'src/parser.js';

//parser(filepath1, filepath2);

import yaml from 'js-yaml';
import fs from 'fs';


export default (filepath1, filepath2) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const extension = data1.split('.')[1];
  let parsedData1, parsedData2;
  if (extension === 'yml' || extension === 'yaml') {
    parsedData1 = yaml.load(data1, 'utf8');
    parsedData2 = yaml.load(data2, 'utf8');
  }
  else if (extension === 'json') {
    parsedData1 = JSON.parse(data1);
    parsedData2 = JSON.parse(data2);
  }
  console.log(yaml.load(data1, 'utf8'))
  return genDiff(parsedData1, parsedData2);
}

function genDiff(parsedData1, parsedData2) {
  const keys = Object.keys({ ...parsedData1, ...parsedData2 }).sort(); // https://youtu.be/vkUTX1hruF8?t=929
  const result = [];
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
  return result.join('\n');
}
