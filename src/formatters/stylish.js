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

/*function striingify(value, replacer = ' ', spacesCount = 1) {
  const iter = (currentVal, depth) => {
    if (typeof currentVal !== 'object' || currentVal === null) {
      return String(currentVal);
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const currentValToArray = Object.entries(currentVal);
    const lines = currentValToArray.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');

    return result;
  };
  return iter(value, 1);
}*/
