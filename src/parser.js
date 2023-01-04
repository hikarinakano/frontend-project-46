//import { load } from 'js-yaml';
//import readFileSync from 'fs';


/*xport default (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');
  const extension = data1.split('.')[1];
  console.log(data1)
  let parsedData1, parsedData2;
  if (extension === 'yml' || extension === 'yaml') {
    parsedData1 = load(data1, 'utf8');
    parsedData2 = load(data2, 'utf-8');
  }
  else if (extension === 'json') {
    parsedData1 = JSON.parse(data1);
    parsedData2 = JSON.parse(data2);
  }
  return genDiff(parsedData1, parsedData2);
}*/