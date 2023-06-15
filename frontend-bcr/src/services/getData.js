export function getData(data) {
  return fetch("/api/getData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getGlobalData(data) {
  return fetch("/api/getGlobalData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getDataTotalEncuestas() {
  return fetch("/api/getDataTotalEncuestas").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}

export function getDataEncuestaByFilters(data) {
  return fetch("/api/getDataByFilterEncuesta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}

export function getDataEncuesta() {
  return fetch("/api/getGlobalData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}

export function getDataTotal() {
  return fetch("/api/getDataTotal").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export const dataTotalRoutePath = "/api/getDataTotal";
export const dataTotalEncuestsRoutePath = "/api/getDataTotalEncuestas2";
export const calfTotalEncuestsRoutePath = "/api/getCalificacionTotal";
