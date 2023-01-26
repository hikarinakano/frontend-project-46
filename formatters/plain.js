import _ from 'lodash';

function plainFormat(data, parentKey = []) {
  let result = [];
  let lastElem;
  let groupedData = [];
  for (const elem of data) {
    if (lastElem && lastElem.key === elem.key) {
      _.last(groupedData).push(elem);
    } else {
      groupedData.push([elem]);
    }
    lastElem = elem;
  }
  for (const group of groupedData) {
    const elem = group[0];
    const key = elem.key;
    const fullKey = [...parentKey, key];
    if (group.length === 2) {
      const secondElem = group[1];
      result.push(`Property '${fullKey.join('.')}' was updated. From ${formatValue(elem.value)} to ${formatValue(secondElem.value)}\n`);
      continue;
    }
    if (elem.status === 'added') {

      result.push(`Property '${fullKey.join('.')}' was added with value: ${formatValue(elem.value)}\n`)

    }
    else if (elem.status === 'deleted') {
      result.push(`Property '${fullKey.join('.')}' was removed\n`)
    }
    if (Array.isArray(elem.value)) {
      result = result.concat(plainFormat(elem.value, fullKey))
    }
  }
  return result.join('');
}

function formatValue(value) {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

function plain (data) {
  return plainFormat(data).trim()
}

export default plain;
