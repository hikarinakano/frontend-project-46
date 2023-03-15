import _ from 'lodash';
import replaceChanged from '../replaceChanged.js';

const signMap = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
};

function doStylish(data, indent = '') {
  if (data.length === 0) {
    return '';
  }
  const rest = _.tail(data);
  const elem = _.first(data);
  const { key, value, status } = elem;
  const sign = signMap[status];
  const line = `${indent}  ${sign} ${key}: `;
  const after = `\n${doStylish(rest, indent)}`;
  if (Array.isArray(value)) {
    const newIndent = `${indent}    `;
    return `${line}{\n${doStylish(value, newIndent)}${newIndent}}${after}`;
  }
  return `${line}${value}${after}`;
}

function stylish(data) {
  return `{\n${doStylish(replaceChanged(data))}}`.trim();
}

export default stylish;
