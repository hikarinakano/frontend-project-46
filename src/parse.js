import yaml from 'js-yaml';

function parse(rawData, type) {
  switch (type) {
    case 'json':
      return JSON.parse(rawData);
    case 'yaml':
    case 'yml':
      return yaml.load(rawData, 'utf8');
    default:
      throw new Error(`Unsupported format: ${type}!`);
  }
}
export default parse;
