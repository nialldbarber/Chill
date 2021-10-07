export function getAnimatedTextFormatted(str: any): any {
  let formattedStr: any = str.value;
  formattedStr = str.replace(/NaN/g, '');
  return formattedStr;
}
