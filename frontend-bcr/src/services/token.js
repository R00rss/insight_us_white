//se usa en el login
export function validateToken(tokenStr) {
  return fetch("/api/validateToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: tokenStr,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
