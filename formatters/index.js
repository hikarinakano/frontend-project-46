import stylish from "./stylish.js";
import plain from "./plain.js";
import jsonFormat from "./json.js";

function getFormatFunction(formatName) {
  if (formatName === 'plain') {
    return plain;
  }
  else if (formatName === 'json') {
    return jsonFormat;
  }
  else {
    return stylish;
  }
}

export default getFormatFunction;

