type N = number;
type S = string;

export const secToMill = (sec: N): N => sec * 1000;

export const fmtOutSTM = (sec: N): N => (sec * 1000) / 4;

export const fmtInSTM = (sec: N): N => sec * 1000 - 1600;

export function getTime(time: N): S {
  let ticker: S;
  if (time > 3600) {
    ticker = new Date(time * 1000).toISOString().substr(11, 8);
  } else {
    ticker = new Date(time * 1000).toISOString().substring(14, 19);
  }
  return ticker;
}
