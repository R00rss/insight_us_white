export function formatDataPiechart(
  data,
  filtros = null,
  keys = [
    "respuesta_ces",
    // "respuesta_ces_1",
    "respuesta_ins",
    // "respuesta_ins_1",
    "respuesta_nps",
    // "respuesta_nps_1",
  ]
) {
  keys.forEach((key) => {
    let acc = 0;
    let prom = 0;
    data.forEach((row, index) => {
      let aux = row[key];
      if (aux === null || aux === undefined || aux === "") aux = 10;
      console.log(aux);
      acc += parseInt(aux);
    });
    prom = acc / data.length;
    console.log(`acumulado: ${acc}, promedio: ${prom} de ${key}`);
  });
}
