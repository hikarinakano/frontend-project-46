import yaml from 'js-yaml';
import path from 'path';

function parse(data, filepath) {
  const extension = path.extname(filepath);
  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(data, 'utf8');
  }
  return 'Unsupported format of the file';
}
export default parse;
