export function getAnimatedTextFormatted(str: any): string {
  let formattedStr: string = str.value;
  formattedStr = str.replace(/NaN/g, '');
  return formattedStr;
}
