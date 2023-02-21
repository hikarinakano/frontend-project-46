import yaml from 'js-yaml';
import path from 'path';

function parse(rawData, dataSource) {
  const extension = path.extname(dataSource).substring(1);
  switch (extension) {
    case 'json':
      return JSON.parse(rawData);
    case 'yaml':
    case 'yml':
      return yaml.load(rawData, 'utf8');
    default:
      throw new Error(`Unsupported format: ${extension}!`);
  }
}
export default parse;
