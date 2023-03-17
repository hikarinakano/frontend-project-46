import _ from 'lodash';
import replaceChanged from '../replaceChanged.js';

const signMap = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
};

function createIndent(depth, spaceCount = 4) {
  return ' '.repeat(depth * spaceCount);
}

function doStylish(data, depth = 0) {
  if (data.length === 0) {
    return '';
  }
  const rest = _.tail(data);
  const elem = _.first(data);
  const { key, value, status } = elem;
  const sign = signMap[status];
  const line = `${createIndent(depth)}${createIndent(1, 2)}${sign} ${key}: `;
  const after = `\n${doStylish(rest, depth)}`;
  if (Array.isArray(value)) {
    return `${line}{\n${doStylish(value, depth + 1)}${createIndent(depth + 1)}}${after}`;
  }
  return `${line}${value}${after}`;
}

function stylish(data) {
  return `{\n${doStylish(replaceChanged(data))}}`.trim();
}

export default stylish;
