/**
 * Converts seconds to milliseconds
 *
 * @param {number} sec - number to format
 * @return {number} formatted number
 */
export const secToMill = (sec: number): number => sec * 1000;

/**
 * Formats out breaths from seconds to minutes
 *
 * @param {number} sec - number to format
 * @return {number} formatted number
 */
export const fmtOutSTM = (sec: number): number => (sec * 1000) / 4;

/**
 * Formats in breaths from seconds to minutes
 *
 * @param {number} sec - number to format
 * @return {number} formatted number
 */
export const fmtInSTM = (sec: number): number => sec * 1000 - 1600;

/**
 * Rerturns the current, formatted time
 *
 * @param {number | string} time - number to format
 * @return {string} formatted time
 */
export function getTime(time: number | string): string {
  let ticker: string;

  if (isNaN(parseInt(time, 10))) {
    return '';
  }

  if (typeof time === 'string') {
    time = parseInt(time, 10);
  }

  if (time > 3600) {
    ticker = new Date(time * 1000).toISOString().substr(11, 8);
  } else {
    ticker = new Date(time * 1000).toISOString().substring(14, 19);
  }
  return ticker;
}
