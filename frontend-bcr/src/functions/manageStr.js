export function minimizeStr(str, maxLength = 12) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  } else {
    return str;
  }
}
export const capitalizeFirstLetterWord = (str) => {
  let auxStr = str.toLowerCase();
  return auxStr.charAt(0).toUpperCase() + auxStr.slice(1);
};
export const capitalizeFirstLetterWords = (str) => {
  const str2 = str.toLowerCase();
  const separate_str = str2.split(" ");
  let auxStr = "";
  separate_str.forEach((word, key) => {
    if (key !== separate_str.length - 1) {
      auxStr += capitalizeFirstLetterWord(word) + " ";
    } else {
      auxStr += capitalizeFirstLetterWord(word);
    }
  });
  return auxStr;
};
export const capitalizeFirstLetterParagraph = (str) => {
  const str2 = str.toLowerCase();
  const separate_str = str2.split(" ");
  let auxStr = "";
  separate_str.forEach((word, key) => {
    if (key !== separate_str.length - 1) {
      if (key === 0) {
        auxStr += capitalizeFirstLetterWord(word) + " ";
      } else {
        auxStr += word + " ";
      }
    } else {
      auxStr += word;
    }
  });
  return auxStr;
};
