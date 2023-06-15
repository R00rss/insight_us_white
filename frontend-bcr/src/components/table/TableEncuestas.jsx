import React from "react";
const VALID_KEYS = [
  // "ENCUESTA",
  "PERIODO",
  // "PAIS",
  // "PUNTO CÓDIGO",
  "PUNTO NOMBRE",
  "SECCIÓN CÓDIGO",
  // "SECCIÓN NOMBRE",
  "FECHA ENCUESTA",
  // "EXPERIENCIA_INS_nota",
  // "EXPERIENCIA_INS",
  // "ATRIBUTOS_AMABILIDAD_nota",
  // "ATRIBUTOS_AMABILIDAD",
  // "ATRIBUTOS_AGILIDAD_nota",
  // "ATRIBUTOS_AGILIDAD",
  // "EXPERIENCIA_RECOMPRA_nota",
  // "EXPERIENCIA_RECOMPRA",
  // "EXPERIENCIA_ESFUERZO_nota",
  // "EXPERIENCIA_ESFUERZO",
  // "EXPERIENCIA_RECOMENDACION_nota",
  // "EXPERIENCIA_RECOMENDACION",
];
const KEYS_ENCUESTA = {
  // "ENCUESTA",
  PERIODO: {
    display_name: "Fecha",
  },
  // "PAIS",
  // "PUNTO CÓDIGO",
  "PUNTO NOMBRE": {
    display_name: "Agencia",
  },
  // "SECCIÓN NOMBRE",
  "FECHA ENCUESTA": {
    display_name: "Fecha encuesta",
  },
  EXPERIENCIA_INS_nota: {
    display_name: "Calf. Exp. INS",
  },
  // "EXPERIENCIA_INS",
  // "ATRIBUTOS_AMABILIDAD_nota",
  // "ATRIBUTOS_AMABILIDAD",
  // "ATRIBUTOS_AGILIDAD_nota",
  // "ATRIBUTOS_AGILIDAD",
  // "EXPERIENCIA_RECOMPRA_nota",
  // "EXPERIENCIA_RECOMPRA",
  // "EXPERIENCIA_ESFUERZO_nota",
  // "EXPERIENCIA_ESFUERZO",
  // "EXPERIENCIA_RECOMENDACION_nota",
  // "EXPERIENCIA_RECOMENDACION",
};
const NOTA_KEYS = [
  "EXPERIENCIA_INS_nota",
  "EXPERIENCIA_INS",
  "ATRIBUTOS_AMABILIDAD_nota",
  "ATRIBUTOS_AMABILIDAD",
  "ATRIBUTOS_AGILIDAD_nota",
  "ATRIBUTOS_AGILIDAD",
  "EXPERIENCIA_RECOMPRA_nota",
  "EXPERIENCIA_RECOMPRA",
  "EXPERIENCIA_ESFUERZO_nota",
  "EXPERIENCIA_ESFUERZO",
  "EXPERIENCIA_RECOMENDACION_nota",
  "EXPERIENCIA_RECOMENDACION",
];

function TableEncuestas({ data }) {
  console.log(data);
  function calculateColor(value) {
    if (value <= 0.5) return "#ff210d";
    if (value > 0.5 && value <= 0.8) return "#ffe30d";
    if (value > 0.8) return "#40f77d";
  }
  console.log(data);
  return (
    <div className="overflow-y-auto h-[350px]">
      <section className="flex flex-row font-bold text-xs gap-1 text-slate-900">
        {data &&
          Object.keys(data).map((key, i) => {
            if (key in KEYS_ENCUESTA) {
              return (
                <div
                  key={i}
                  className="px-2 first:rounded-l-lg  last:rounded-r-lg bg-slate-500/95 capitalize text-center flex justify-center items-center"
                >
                  {KEYS_ENCUESTA[key].display_name.toLowerCase()}
                </div>
              );
            }
          })}
      </section>
    </div>
  );
}

export default TableEncuestas;
