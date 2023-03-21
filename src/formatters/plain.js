import _ from 'lodash';

function stringify(value) {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
}

function plainFormat(data, parentKey = []) {
  const textDiffRaw = _.flatMapDeep(data, (elem) => {
    const { key, status } = elem;
    const fullKey = [...parentKey, key];
    switch (status) {
      case 'added':
        return `Property '${fullKey.join('.')}' was added with value: ${stringify(elem.value)}\n`;
      case 'deleted':
        return `Property '${fullKey.join('.')}' was removed\n`;
      case 'changed':
        return `Property '${fullKey.join('.')}' was updated. From ${stringify(elem.value1)} to ${stringify(elem.value2)}\n`;  
      case 'unchanged':
      return (elem.value instanceof Object ? plainFormat(elem.value, fullKey) : '');
      default:
        throw new Error(`Error! status: ${ status } with key: ${ key } in ${ elem } is not valid!`);
        
    }
    
  });

  return textDiffRaw.join('');
}

function plain(data) {
  return plainFormat(data).trim();
}

export default plain;
