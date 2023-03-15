import _ from 'lodash';
import replaceChanged from '../replaceChanged.js';

const signMap = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
};

function indent(depth) {
  const spaces = '    '
  return spaces.repeat(depth);
}

function doStylish(data, depth = 0) {
  if (data.length === 0) {
    return '';
  }
  const rest = _.tail(data);
  const elem = _.first(data);
  const { key, value, status } = elem;
  const sign = signMap[status];
  const line = `${indent(depth)}  ${sign} ${key}: `;
  const after = `\n${doStylish(rest, depth)}`;
  if (Array.isArray(value)) {
    return `${line}{\n${doStylish(value, depth + 1)}${indent(depth + 1)}}${after}`;
  }
  return `${line}${value}${after}`;
}

function stylish(data) {
  return `{\n${doStylish(replaceChanged(data))}}`.trim();
}

export default stylish;
