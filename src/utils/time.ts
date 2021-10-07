export const secToMill = (seconds: number): number => seconds * 1000;

export function getTime(time: number): string {
  let ticker;
  if (time > 3600) {
    ticker = new Date(time * 1000).toISOString().substr(11, 8);
  } else {
    ticker = new Date(time * 1000).toISOString().substring(14, 19);
  }
  return ticker;
}
