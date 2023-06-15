export function verifyAllArray(array) {
  let all = true;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (!element.selected) {
      all = false;
      break;
    }
  }
  return all;
}
