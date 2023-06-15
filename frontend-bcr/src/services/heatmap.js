export function getCoordCiudades() {
  return fetch("/api/coordCiudades").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
