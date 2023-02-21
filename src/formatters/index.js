import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormat from './json.js';

function getFormatFunction(formatName) {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'json':
      return jsonFormat;
    case 'stylish':
      return stylish;
    default:
      throw new Error(`Invalid format! There is no format under ${formatName} name!`);
  }
}

export default getFormatFunction;
