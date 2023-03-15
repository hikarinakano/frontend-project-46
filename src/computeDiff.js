import _ from 'lodash';

function isObj(structure) {
  return structure instanceof Object;
}

function computeDiff(data1, data2) {
  if (!(data2 instanceof Object)) {
    return data2;
  }
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  return _.map(keys, (key) => {
    if (!_.has(data1, key)) {
      return {
        status: 'added',
        key,
        value: computeDiff(data2[key], data2[key]),
      };
    }
    if (!_.has(data2, key)) {
      return {
        status: 'deleted',
        key,
        value: computeDiff(data1[key], data1[key]),
      };
    }
    const areEqual = data1[key] === data2[key];
    const areObj = isObj(data1[key]) && isObj(data2[key]);
    if (areEqual || areObj) {
      return {
        status: 'unchanged',
        key,
        value: computeDiff(data1[key], data2[key]),
      };
    }
    return {
      status: 'changed',
      key,
      value1: computeDiff(data1[key], data1[key]),
      value2: computeDiff(data2[key], data2[key]),
    };
  });
}

export default computeDiff;
