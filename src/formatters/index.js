import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormat from './json.js';

function format(formatName, data) {
  switch (formatName) {
    case 'plain':
      return plain(data);
    case 'json':
      return jsonFormat(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Invalid format! There is no format under ${formatName} name!`);
  }
}

export default format;
