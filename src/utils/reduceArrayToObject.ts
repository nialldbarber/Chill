import compact from 'lodash.compact';

function reduceArrayToObject<T extends number>(item: T, culm: T) {
  return Object.assign(culm, item);
}

export default (array: any) => {
  return Array.isArray(array)
    ? compact(array).reduce(reduceArrayToObject, {})
    : array;
};
