import _ from 'lodash';

const signMap = {
  'unchanged': ' ',
  'added': '+',
  'deleted': '-'
}

function doStylish(data, indent = '') {
  if (data.length === 0) {
    return '';
  }
  const [elem, ...rest] = data;
  const key = elem.key;
  const sign = signMap[elem.status];
  const line = `${indent}  ${sign} ${key}: `;
  const after = `\n${doStylish(rest, indent)}`;

  if (Array.isArray(elem.value)) {
    const newIndent = `${indent}    `;
    return `${line}{\n${doStylish(elem.value, newIndent)}${newIndent}}${after}`;
  }
  else {
    return `${line}${elem.value}${after}`;
  }
}

function stylish(data) {
  return `{\n${doStylish(data)}}`.trim();
}

export default stylish;
