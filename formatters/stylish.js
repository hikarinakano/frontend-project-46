
function stylish(data) {
  return doStylish(data).join('');
}

function doStylish(data, indent = '') {
  const newIndent = `${indent}    `;
  let result = ['{\n'];
  for (const elem of data) {
    let key = elem.key;
    if (elem['status'] === 'unchanged') {
      result.push(`${indent}    ${key}: `)
    }
    else if (elem['status'] === 'added') {
      result.push(`${indent}  + ${key}: `)
    }
    else if (elem['status'] === 'deleted') {
      result.push(`${indent}  - ${key}: `)
    }
    if (Array.isArray(elem['value'])) {
      result = result.concat(doStylish(elem['value'], newIndent))
    }
    else { result.push(`${elem['value']}\n`) }
  }
  result.push(`${indent}}\n`);
  return result;
}

export default stylish;
