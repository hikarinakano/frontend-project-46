import yaml from 'js-yaml';

function parse(data, filepath) {
  const extension = filepath.split('.')[1];
  if (extension === 'json') {
    return JSON.parse(data)
  }
  if (extension === 'yaml' || extension === 'yml') {
    return yaml.load(data, 'utf8');
  }
  else {
    return 'Unsupported format of the file'
  }
}
export default parse; 