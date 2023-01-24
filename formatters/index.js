import stylish from "./stylish.js";
import plainFormat from "./plain.js";
import jsonFormat from "./json.js";

function getFormatFunction(formatName) {
  if (formatName === 'plain') {
    return plainFormat;
  }
  else if (formatName === 'json') {
    return jsonFormat;
  }
  else {
    return stylish;
  }
}

export default getFormatFunction;

