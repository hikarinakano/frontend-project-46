import _ from 'lodash';
import replaceChanged from '../replaceChanged.js';

const signMap = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
};

function createIndent(depth, bracketIndent = false, spaceCount = 4) {
  const replacer = ' ';
  const valueSpaceCount = 2;
  const indentSize = depth * spaceCount;
  if (bracketIndent) {
    return replacer.repeat(indentSize);
  }
  return replacer.repeat(indentSize + valueSpaceCount);
}

function doStylish(data, depth = 0) {
  if (data.length === 0) {
    return '';
  }
  const rest = _.tail(data);
  const elem = _.first(data);
  const { key, value, status } = elem;
  const sign = signMap[status];
  const line = `${createIndent(depth)}${sign} ${key}: `;
  const after = `\n${doStylish(rest, depth)}`;
  if (Array.isArray(value)) {
    return `${line}{\n${doStylish(value, depth + 1)}${createIndent(depth + 1, true)}}${after}`;
  }
  return `${line}${value}${after}`;
}

function stylish(data) {
  return `{\n${doStylish(replaceChanged(data))}}`.trim();
}

export default stylish;
