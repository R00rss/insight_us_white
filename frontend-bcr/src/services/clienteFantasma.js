export function savePlantillaFantasma(
  data,
  typePlantilla,
  gestorID,
  infoPlantilla
) {
  return fetch("/api/savePlantillaFantasma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: data,
      typePlantilla: typePlantilla,
      gestorID: gestorID,
      infoPlantilla: infoPlantilla,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getPlantillas() {
  return fetch("/api/getPlantillas").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getVideos() {
  return fetch("/api/getVideos").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getVideo(IdVideo, signal) {
  return fetch("/api/getVideo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "video/mp4",
    },
    signal: signal,
    body: JSON.stringify({
      idVideo: IdVideo,
    }),
  }).then((res) => {
    if (res.status === 200) return res.data;
    return null;
  });
}

export function updateVideoGestion(formVideo, id) {
  // return new Promise((resolve, reject) => {
  //   resolve(`/api/updateVideoGestion?plantillaID=${id}`);
  // });
  return fetch(`/api/updateVideoGestion?plantillaID=${id}`, {
    method: "POST",
    body: formVideo,
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function changeStatePlantilla(idPlantilla, state, idGestor) {
  return fetch(`/api/changeStatePlantilla`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plantillaID: idPlantilla,
      newState: state,
      gestorID: idGestor,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function changeStateGestion(idPlantilla, state, idGestor) {
  return fetch(`/api/changeStateGestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plantillaID: idPlantilla,
      newState: state,
      gestorID: idGestor,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function getPlantilla(idPlantilla) {
  return fetch(`/api/plantilla/${idPlantilla}`).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}

export function getAVGGradeClient() {
  return fetch(`/api/avgGradeClient`).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function get_data_fantasma_filtered({
  mediciones,
  zonas,
  cities,
  agencias,
}) {
  return fetch("/api/get_data_fantasma_filtered", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mediciones, zonas, cities, agencias }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
