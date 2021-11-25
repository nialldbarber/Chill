/**
 * Capitalises the first letter of a string
 *
 * @param {string} str - string to capitalise
 * @return {string} capitalised string or '' if the string is empty
 */
export function capitalise(str: string): string {
  if (str.length === 0 || !isValueAString(str)) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Determins if a value is a string
 *
 * @param {string} str - string to check
 * @return {boolean} true if the value is a string
 */
export const isValueAString = (str: string): boolean =>
  typeof str === 'string' && str.length > 0;
