import _ from 'lodash';


function genDiff(data1, data2) {
  if (!(data2 instanceof Object)) {
    return data2;
  }
  const keys = Object.keys({ ...data1, ...data2 }).sort();
  const result = [];
  for (const key of keys) {
    const isVal1Object = data1[key] instanceof Object;
    const isVal2Object = data2[key] instanceof Object;
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key] || isVal1Object && isVal2Object) {
      result.push({ 'status': 'unchanged', key: key, value: genDiff(data1[key], data2[key]) })
      continue;
    }
    if (_.has(data1, key)) {
      result.push({ 'status': 'deleted', key: key, value: genDiff(data1[key], data1[key]) })
    }
    if (_.has(data2, key)) {
      result.push({ 'status': 'added', key: key, value: genDiff(data2[key], data2[key]) })
    }
  }
  return result;
}
export default genDiff;

