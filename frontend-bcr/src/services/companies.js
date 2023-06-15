export function getCompanies() {
  return fetch("/api/companies").then((res) => {
    if (res.status === 200) return res.json();
    return null;
  });
  //return promise with settimeout
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ data: ["company1", "company2", "company3", "company4"] });
  //   }, 1000);
  // });
}
