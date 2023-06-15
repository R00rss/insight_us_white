export function getInicialData() {
  return fetch("/api/inicialData").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getInicialDataEncuesta() {
  return fetch("/api/inicialDataEncuesta").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getIndicadores(tipoIndicador) {
  return fetch(`/api/indicador?tipo_indicador=${tipoIndicador}`).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
