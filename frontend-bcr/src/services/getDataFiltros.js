export function getDataInicialFiltros() {
  return fetch("/api/filtro_data").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}

export function getDataInicialFiltros2() {
  return fetch("/api/data_filter_general").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getDataInicialFiltros3() {
  return fetch("/api/data_filter_general2").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function get_data_filtros_fantasma(type = 1) {
  const path_api = "/api/data_filter_fantasma";
  const type_aux = type === 1 ? "" : `?type=${type}`;
  return fetch(path_api + type_aux).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}

export function get_rest_data({ medicion, agencia, zona, ciudad }) {
  return fetch("/api/get_rest_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      info_data: {
        medicion: medicion,
        agencia: agencia,
        zona: zona,
        ciudad: ciudad,
        fecha: fecha,
      },
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function get_plantilla_fantasma({ medicion, agencia, zona, ciudad }) {
  return fetch("/api/get_plantilla_fantasma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      medicion: medicion,
      agencia: agencia,
      zona: zona,
      ciudad: ciudad,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}

export function agencies_for_filters(agencies) {
  return fetch("/api/agencies_for_filters", {
    Method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ agencias: agencies }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
// export const queryGetAgenciesFiltersPath = "/api/agencies_for_filters";
