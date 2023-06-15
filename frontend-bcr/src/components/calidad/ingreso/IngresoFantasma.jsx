import React, { useEffect, useState } from "react";
import { useRef } from "react";
import plantilla_servicios from "../../../docs/models/plantillas/plantilla_servicios.json";
import plantilla_cajero from "../../../docs/models/plantillas/plantilla_cajero.json";
import plantilla_comercial from "../../../docs/models/plantillas/plantilla_comercial.json";
import { savePlantillaFantasma } from "../../../services/clienteFantasma";
import PlantillaCajero from "../plantillas/PlantillaCajero";
import PlantillaServicio from "../plantillas/PlantillaServicio";
import PlantillaComercial from "../plantillas/PlantillaComercial";
import { validateToken } from "../../../services/token";
import { useSelector } from "react-redux";

const CURRENT_CLIENTS = ["CCA", "Servipagos", "Maquita"];
const AREAS = ["Area comercial", "Ejecutivo de servicios", "Cajero"];

const IngresoFantasma = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const userData = useSelector((state) => state.userData.value);
  const formRef = useRef(null);
  const [dataClienteFantasma, setDataClienteFantasma] = useState({
    cliente: CURRENT_CLIENTS[0],
    fecha: new Date().toISOString().slice(0, 10),
    ciudad: "",
    puntoAtencion: "",
    area: AREAS[0],
    estacion: "",
  });
  function handleSave(data, typePlantilla) {
    console.log("entro en handle save");
    console.log(dataClienteFantasma);
    return savePlantillaFantasma(
      data,
      typePlantilla,
      userData.id,
      dataClienteFantasma
    );
  }
  function validateForm() {
    const form = formRef.current;
    const formElements = form.elements;
    let isValid = true;
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.type === "text" && element.value === "") {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
  useEffect(() => {
    setFormIsValid(validateForm());
  }, [
    dataClienteFantasma.cliente,
    dataClienteFantasma.area,
    dataClienteFantasma.ciudad,
    dataClienteFantasma.puntoAtencion,
    dataClienteFantasma.estacion,
    dataClienteFantasma.fecha,
  ]);

  useEffect(() => console.log(dataClienteFantasma), [dataClienteFantasma]);
  useEffect(() => console.log(formIsValid), [formIsValid]);
  return (
    <section className=" font-semibold flex flex-col justify-center items-center gap-3">
      <section className="w-[600px] pt-2 flex flex-col justify-center gap-1">
        <h1 className="navbarColor3 rounded-t-md w-full text-center text-base font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
          Ingreso cliente fantasma
        </h1>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="text-sm bg-gradient-to-br from-[#d3d1d1] to-[#ffffff] shadow-[2px_2px_4px_1px_#868686cc] rounded-b-md w-full px-2 font-semibold flex flex-col justify-between items-center gap-2 text-slate-700  py-2"
        >
          <div className="flex flex-row">
            <label className="w-[170px]">Gestor:</label>
            <div className="capitalize w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent text-cyan-700 drop-shadow-[1px_1px_1px_#00000033]">
              {userData.name}
            </div>
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Cliente:</label>
            <select
              required
              value={dataClienteFantasma.cliente}
              onChange={(e) =>
                setDataClienteFantasma({
                  ...dataClienteFantasma,
                  cliente: e.target.value,
                })
              }
              onFocus={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  console.log(validity);
                  e.target.reportValidity();
                }
              }}
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  console.log(validity);
                  e.target.reportValidity();
                }
              }}
              className="w-[300px] rounded-md invalid:shadow-[0px_0px_3px_2px_#fc110577] valid:shadow-[0px_0px_3px_2px_#0095ff77] px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044]"
            >
              {CURRENT_CLIENTS.map((client, i) => {
                return <option key={i}>{client}</option>;
              })}
            </select>
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Fecha de visita</label>
            <input
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  console.log(validity);
                  e.target.reportValidity();
                }
              }}
              required
              value={dataClienteFantasma.fecha}
              onChange={(e) =>
                setDataClienteFantasma({
                  ...dataClienteFantasma,
                  fecha: e.target.value,
                })
              }
              type="date"
              className="w-[300px] rounded-md invalid:shadow-[0px_0px_3px_2px_#fc110577] valid:shadow-[0px_0px_3px_2px_#0095ff77] px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
            />
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Ciudad</label>
            <input
              required
              value={dataClienteFantasma.ciudad}
              onChange={(e) =>
                setDataClienteFantasma({
                  ...dataClienteFantasma,
                  ciudad: e.target.value,
                })
              }
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  console.log(validity);
                  e.target.reportValidity();
                }
              }}
              type="text"
              className="w-[300px] rounded-md invalid:shadow-[0px_0px_3px_2px_#fc110577] valid:shadow-[0px_0px_3px_2px_#0095ff77] px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
            />
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Punto de atención</label>
            <input
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  console.log(validity);
                  e.target.reportValidity();
                }
              }}
              required
              value={dataClienteFantasma.puntoAtencion}
              onChange={(e) =>
                setDataClienteFantasma({
                  ...dataClienteFantasma,
                  puntoAtencion: e.target.value,
                })
              }
              type="text"
              className="w-[300px] rounded-md invalid:shadow-[0px_0px_3px_2px_#fc110577] valid:shadow-[0px_0px_3px_2px_#0095ff77] px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
            />
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Area</label>
            <select
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  console.log(validity);
                  e.target.reportValidity();
                }
              }}
              required
              value={dataClienteFantasma.area}
              onChange={(e) =>
                setDataClienteFantasma({
                  ...dataClienteFantasma,
                  area: e.target.value,
                })
              }
              className="w-[300px] rounded-md invalid:shadow-[0px_0px_3px_2px_#fc110577] valid:shadow-[0px_0px_3px_2px_#0095ff77] px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044]"
            >
              {AREAS.map((client, i) => {
                return <option key={i}>{client}</option>;
              })}
            </select>
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Estación</label>
            <input
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  console.log(validity);
                  e.target.reportValidity();
                }
              }}
              required
              value={dataClienteFantasma.estacion}
              onChange={(e) =>
                setDataClienteFantasma({
                  ...dataClienteFantasma,
                  estacion: e.target.value,
                })
              }
              type="text"
              className="w-[300px] rounded-md invalid:shadow-[0px_0px_3px_2px_#fc110577] valid:shadow-[0px_0px_3px_2px_#0095ff77] px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
            />
          </div>
        </form>
      </section>
      {dataClienteFantasma.area === "Ejecutivo de servicios" && formIsValid && (
        <PlantillaServicio
          data={plantilla_servicios}
          handleSave={handleSave}
          typePlantilla={"servicios"}
        />
      )}
      {dataClienteFantasma.area === "Cajero" && formIsValid && (
        <PlantillaCajero
          data={plantilla_cajero}
          handleSave={handleSave}
          typePlantilla={"cajero"}
        />
      )}
      {dataClienteFantasma.area === "Area comercial" && formIsValid && (
        <PlantillaComercial
          data={plantilla_comercial}
          handleSave={handleSave}
          typePlantilla={"cajero"}
        />
      )}
    </section>
  );
};

export default IngresoFantasma;
