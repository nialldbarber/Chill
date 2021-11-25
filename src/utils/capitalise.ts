/**
 * Capitalises the first letter of a string
 *
 * @param {string} str - The string to capitalise
 * @return {string | null} Capitalised string or null if the string is empty
 */
export function capitalise(str: string): string | null {
  if (str.length === 0) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
