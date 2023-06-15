import React from "react";
import { useState } from "react";
import {
  simpleAlertCallbackParamsVerify,
  simpleAlertCallbackParamsVerify2,
} from "../../../utils/manageAlerts";

const PlantillaServicio = ({ data, handleSave, typePlantilla }) => {
  console.log(data);
  function handleSavePlantilla(params) {
    const content = {
      title: "Guardar plantilla",
      message: "¿Está seguro que desea guardar la plantilla?",
      typeOfAlert: "warning",
    };
    const contentSuccess = {
      title: "Plantilla guardada con éxito",
      message: "La plantilla se ha guardado con éxito",
      typeOfAlert: "success",
    };
    const contentError = {
      title: "Error al guardar plantilla",
      message: "La plantilla no se ha guardado con éxito",
      typeOfAlert: "error",
    };
    simpleAlertCallbackParamsVerify2(
      content,
      contentSuccess,
      contentError,
      handleSave,
      params
    );
  }
  const [currentData, setCurrentData] = useState({ ...data });
  return (
    <section className="w-full">
      <section className="flex flex-col gap-1">
        <section className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] text-center py-[1px] navbarColor3 text-slate-100 rounded-t-md shadow-[2px_2px_4px_1px_#868686cc]">
          <div className="">Nombre</div>
          <div className="">Descripción</div>
          <div className="">Porcentaje</div>
          <div className="">Calificación</div>
          <div className="">Cumple</div>
        </section>
        <section className="text-slate-600 bg-gradient-to-br from-[#d3d1d1] to-[#ffffff] shadow-[2px_2px_4px_1px_#868686cc] rounded-b-md">
          {currentData?.items.map((item, j) => {
            return (
              <section
                className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] even:bg-slate-300 text-sm"
                key={j}
              >
                <div className="py-1 flex justify-center items-center text-slate-900">
                  {item.name}
                </div>
                <div className="py-1 break-all">{item.description}</div>
                <div className="py-1 flex justify-center items-center">
                  {item.percentage}%
                </div>
                <div className="py-1 flex justify-center items-center">
                  {item.calf}%
                </div>
                <div className="py-1 w-full flex justify-center items-center">
                  <section className="text-slate-100 flex flex-row w-[60px] bg-gradient-to-br  from-[#2f72be] to-[#2dbbf3] shadow-[2px_2px_4px_1px_#868686cc] rounded-md">
                    <button
                      className={`${
                        item.percentage === item.calf ? " bg-slate-900/30" : ""
                      } w-1/2 rounded-l-md`}
                      onClick={() => {
                        const newData = { ...currentData };
                        newData.items[j].calf = item.percentage;
                        setCurrentData(newData);
                      }}
                    >
                      Si
                    </button>
                    <button
                      className={`${
                        item.percentage !== item.calf ? " bg-slate-900/30" : ""
                      } w-1/2 rounded-r-md`}
                      onClick={() => {
                        const newData = { ...currentData };
                        newData.items[j].calf = 0;
                        setCurrentData(newData);
                      }}
                    >
                      No
                    </button>
                  </section>
                </div>
              </section>
            );
          })}
        </section>
      </section>
      <section className="flex justify-center items-center mt-2">
        <button
          onClick={() => {
            handleSavePlantilla([currentData, typePlantilla]);
          }}
          className="hover:border-cyan-500 hover:bg-transparent hover:text-cyan-400 border-[1px] border-transparent w-[230px] h-[35px] bg-cyan-500 rounded-lg text-slate-100"
        >
          Guardar
        </button>
      </section>
    </section>
  );
};

export default PlantillaServicio;
