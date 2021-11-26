const SECOND_CONVERSION = 1000;

export const secToMill = (sec: number): number => sec * SECOND_CONVERSION;

/**
 * ## Formats in breaths from seconds to milliseconds
 *
 * @param {number} sec - number to format
 * @return {number} formatted number
 */
const QUARTER_OF_STEP = 1600;
export const formatInBreaths = (sec: number): number =>
  sec * 1000 - QUARTER_OF_STEP;

/**
 * ## Rerturns the current, formatted time
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
    ticker = new Date(time * SECOND_CONVERSION).toISOString().substr(11, 8);
  } else {
    ticker = new Date(time * SECOND_CONVERSION).toISOString().substring(14, 19);
  }
  return ticker;
}
