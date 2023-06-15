export function changeTitle(title) {
  document.getElementById("title__page").innerHTML = title;
}
export function logOut() {
  sessionStorage.clear();
  window.location.href = "";
}
export function changeToTrueObject(selectedKey, obj) {
  let newObj = {};
  for (let key in obj) {
    newObj[key] = key === selectedKey;
  }
  return newObj;
}
export function getSetData(getter, setter, keyData) {
  getter().then((res) => {
    if (res && res[`${keyData}`]) {
      setter(res[`${keyData}`]);
    }
  });
}
export function getToken() {
  return sessionStorage.getItem("token");
}
export function categorizarCalificacionCES(calf_str) {
  if (
    calf_str.localeCompare("muy facil", undefined, {
      sensitivity: "base",
    }) === 0
  )
    return 0;
  if (calf_str.localeCompare("facil", undefined, { sensitivity: "base" }) === 0)
    return 0;
  if (
    calf_str.localeCompare("poco facil", undefined, {
      sensitivity: "base",
    }) === 0
  )
    return 0;
  if (
    calf_str.localeCompare("dificil", undefined, { sensitivity: "base" }) === 0
  )
    return 1;
  if (
    calf_str.localeCompare("muy dificil", undefined, {
      sensitivity: "base",
    }) === 0
  )
    return 1;
  return 0;
}
export function categorizarCalificacionPromesa(calf) {
  if (calf <= 6) return -1;
  if (calf <= 8) return 0;
  if (calf <= 10) return 1;
  return 0;
}
export function relation_mediccion_mes(value, type = "mes") {
  //this function returns array if type is "mes" and string if type is "medicion" or null if not found
  const relation = {
    M0: ["Ene", "Feb", "Mar", "Abr"],
    M1: ["Ene", "Feb", "Mar", "Abr"],
    M2: ["May", "Jun", "Jul", "Ago"],
    M3: ["Sep", "Oct", "Nov", "Dic"],
  };
  if (type === "mes") {
    for (let key in relation) {
      for (let i = 0; i < relation[key].length; i++) {
        if (
          relation[key][i].localeCompare(value, undefined, {
            sensitivity: "base",
          }) === 0
        )
          return key;
      }
      // if (relation[key].includes(value)) return key;
    }
    return null;
  }
  if (type === "medicion") return relation[value] || null;
}
