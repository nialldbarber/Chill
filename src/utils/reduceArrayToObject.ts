import compact from 'lodash.compact';

function reduceArrayToObject(item: number, culm: number) {
  return Object.assign(culm, item);
}

export default (array: any) => {
  return Array.isArray(array)
    ? compact(array).reduce(reduceArrayToObject, {})
    : array;
};
