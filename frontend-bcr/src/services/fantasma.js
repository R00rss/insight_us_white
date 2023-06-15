import { getToken } from "../functions/general";

export function save_plantilla(
  datos_plantilla,
  plantilla_detalle,
  token = getToken()
) {
  return fetch("/api/plantilla_fantasma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ datos_plantilla, plantilla_detalle }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export function save_video(file, token = getToken()) {
  return fetch("/api/plantilla_fantasma/video", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: file,
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
export async function get_video(id_plantilla, token = getToken()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/plantilla_fantasma/video/${id_plantilla}`, {
      method: "GET",
      headers: {
        AccessControlAllowOrigin: "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
