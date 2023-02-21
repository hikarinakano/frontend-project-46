import _ from 'lodash';

function stringify(value) {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

function plainFormat(data, parentKey = []) {
  const textDiffRaw = _.flatMapDeep(data, (elem) => {
    const { key } = Array.isArray(elem) ? elem[0] : elem;
    const fullKey = [...parentKey, key];
    if (Array.isArray(elem)) {
      return `Property '${fullKey.join('.')}' was updated. From ${stringify(elem[0].value)} to ${stringify(elem[1].value)}\n`;
    }
    return [
      elem.status === 'added' && `Property '${fullKey.join('.')}' was added with value: ${stringify(elem.value)}\n`,
      elem.status === 'deleted' && `Property '${fullKey.join('.')}' was removed\n`,
      Array.isArray(elem.value) && plainFormat(elem.value, fullKey),
    ];
  });
  return _.filter(textDiffRaw, (elem) => elem !== false).join('');
}

function plain(data) {
  return plainFormat(data).trim();
}

export default plain;
