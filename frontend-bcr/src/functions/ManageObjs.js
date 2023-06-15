export function arrayOfObjEquals(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((obj, index) => equalObj(obj, array2[index]))
  );
}
export function objIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function equalObj(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return (
    equalArray(keys1, keys2) &&
    Object.keys(obj1).every((key) => obj1[key] === obj2[key])
  );
}
function equalArray(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
export function verifyAllObject(obj) {
  let all = true;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if (!element.selected) {
        all = false;
        break;
      }
    }
  }
  return all;
}
