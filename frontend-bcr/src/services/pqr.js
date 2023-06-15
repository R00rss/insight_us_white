export function get_token_PQR(datos) {
    console.log(datos)
    return fetch("/api/generate_access_token_PQR",
        {
            method: "POST",
            // body: JSON.stringify({
            //     datos
            // }),
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ datos }),
        }).then((res) => {
            if (res.status === 200) return res.json();
            return null;
        });
    // return promise with settimeout
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({ data: ["company1", "company2", "company3", "company4"] });
    //   }, 1000);
    // });
}