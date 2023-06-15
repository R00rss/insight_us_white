import React from "react";
// import {
//   capitalizeFirstLetterWord,
//   capitalizeFirstLetterWords,
// } from "../../../functions/manageStr";
import { toFixedIfNecessary } from "../../../functions/manageNumbers";
const keysToDisplay = [
  "id",
  "tipo",
  "supervisorID",
  "gestorID",
  "isFinished",
  "cliente",
  "fecha",
  "ciudad",
  "puntoAtencion",
  "area",
  "estacion",
  "estado_plantilla",
  // "notaFinal",
];
const PostsPlantillaFiltrada = ({ plantillasFiltradas, handleModal }) => {
  // console.log(items, "items");
  return (
    <section className="text-sm bg-gradient-to-br from-[#d3d1d1] to-[#ffffff] shadow-[2px_2px_4px_1px_#868686cc] rounded-b-md w-full px-2 font-semibold flex flex-col justify-between items-center gap-2 text-slate-700  py-2">
      {plantillasFiltradas.map((plantilla, i) => (
        <div
          className="hover:bg-slate-600/40 cursor-pointer px-2 w-full grid grid-cols-[1fr_2fr_3fr_2fr_3fr_2fr_3fr_2fr_5fr_3fr_2fr_5fr] bg-slate-600/20 rounded-md"
          key={i}
          onClick={() => {
            handleModal({ show: true, data: plantilla });
          }}
        >
          {Object.keys(plantilla).map((keyPlantilla, j) => {
            if (
              // keyPlantilla !== "dataPlantilla" &&
              // keyPlantilla !== "coincide_video" &&
              // keyPlantilla !== "isVideoUpdated"
              keysToDisplay.includes(keyPlantilla)
            ) {
              return (
                <div className="text-center" key={j}>
                  {plantilla[keyPlantilla] === null
                    ? "Sin datos"
                    : keyPlantilla === "notaFinal"
                    ? toFixedIfNecessary(plantilla[keyPlantilla], 2)
                    : plantilla[keyPlantilla]}
                </div>
              );
            }
          })}
        </div>
      ))}
    </section>
  );
};

export default PostsPlantillaFiltrada;
