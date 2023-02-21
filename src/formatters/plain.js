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
  const groupedDataReversed = _.reduce(data, (acc, elem) => {
    const head = _.head(acc);
    const tail = _.tail(acc);
    if (head) {
      const lastHead = _.last(head);
      if (lastHead && lastHead.key === elem.key) {
        return [head.concat([elem])].concat(tail);
      }
    }
    return [[elem]].concat(acc);
  }, []);
  const groupedData = _.reverse(groupedDataReversed);
  const textDiffRaw = _.flatMapDeep(groupedData, (group) => {
    const elem = _.head(group);
    const { key } = elem;
    const fullKey = [...parentKey, key];
    if (group.length === 2) {
      const secondElem = _.last(group);
      return `Property '${fullKey.join('.')}' was updated. From ${stringify(elem.value)} to ${stringify(secondElem.value)}\n`;
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
