export function getAnimatedTextFormatted(str: any): string {
  let formattedStr = str.value;
  formattedStr = formattedStr.toString();
  formattedStr = str.replace(/NaN/g, '');
  return formattedStr;
}

export function run<T extends number>(
  ex1: T,
  ex2: T,
  ex3: T,
  ex4: T,
): Promise<string> {
  const instructions = Promise.resolve()
    .then(() => delay(ex1))
    .then(() => inhale())
    .then(() => delay(ex2))
    .then(() => hold())
    .then(() => delay(ex3))
    .then(() => exhale())
    .then(() => delay(ex4))
    .then(() => hold());

  return instructions;
}

function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), duration);
  });
}

const inhale = () => 'Inhale';
const hold = () => 'Hold';
const exhale = () => 'Exhale';

export async function loopItUp<T extends number>(
  ex1: T,
  ex2: T,
  ex3: T,
  ex4: T,
) {
  let test;
  for (let i = 0; i < Infinity; i++) {
    test = await run(ex1, ex2, ex3, ex4);
  }
  return test;
}
