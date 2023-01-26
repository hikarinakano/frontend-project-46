import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormat from './json.js';

function getFormatFunction(formatName) {
  if (formatName === 'plain') {
    return plain;
  }
  if (formatName === 'json') {
    return jsonFormat;
  }
  return stylish;
}

export default getFormatFunction;
