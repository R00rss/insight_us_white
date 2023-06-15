//se usa en el login
export function authenticUser({ username, password }) {
  return fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
}
