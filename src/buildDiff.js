import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const sortedUniqueKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const resultObj = sortedUniqueKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }

    if (!_.has(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }

    if (value1 === value2) {
      return { key, value: value1, type: 'unchanged' };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: buildDiff(value1, value2), type: 'hasChild' };
    }
    return {
      key,
      oldValue: value1,
      newValue: value2,
      value: value2,
      type: 'changed',
    };
  });
  return resultObj;
};

export default buildDiff;
