import stylish from "./stylish.js";
import plainFormat from "./plain.js";
import jsonFormat from "./json.js";

function getFormatFunction(formatName) {
  if (formatName.format === 'plain') {
    return plainFormat;
  }
  else if (formatName.format === 'json') {
    return jsonFormat;
  }
  else {
    return stylish;
  }
}

export default getFormatFunction;

