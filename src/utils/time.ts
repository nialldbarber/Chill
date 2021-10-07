export const secToMill = (seconds: number): number => seconds * 1000;

const dateToString = (time: number, sub1: number, sub2: number): string =>
  new Date(time * 1000).toISOString().substring(sub1, sub2);

export function getTime(time: number): string {
  let ticker: string;
  if (time > 3600) {
    ticker = dateToString(time, 11, 8);
  } else {
    ticker = dateToString(time, 14, 19);
  }
  return ticker;
}
