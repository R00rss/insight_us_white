import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSetData } from "../../../functions/general";
import { getPlantillas } from "../../../services/clienteFantasma";
import simpleAlert from "../../../utils/manageAlerts";
import GestionVerificar from "./GestionVerificar";
import PaginationComponent from "../paginacionFiltro/PaginationComponent";

const CURRENT_DATE = new Date();

const INITIAL_DATE_I = new Date(
  CURRENT_DATE.getFullYear(),
  CURRENT_DATE.getMonth() - 1,
  1
)
  .toISOString()
  .slice(0, 10);
const INITIAL_DATE_E = CURRENT_DATE.toISOString().slice(0, 10);

const DEFAULT_CLIENT = "Seleccione un cliente";
const DEFAULT_AREA = "Seleccione un area";

const CURRENT_CLIENTS = ["CCA", "Servipagos", "Maquita"];
const AREAS = ["Area comercial", "Ejecutivo de servicios", "Cajero"];

const Verificacion = () => {
  const formRef = useRef(null);
  const userData = useSelector((state) => state.userData.value);
  const [plantillas, setPlantillas] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    data: {},
  });

  const [plantillasFiltradas, setPlantillasFiltradas] = useState([]);
  const [dataFiltro, setDataFiltro] = useState({
    cliente: DEFAULT_CLIENT,
    fechaI: INITIAL_DATE_I,
    fechaF: INITIAL_DATE_E,
    ciudad: "",
    puntoAtencion: "",
    area: DEFAULT_AREA,
    estacion: "",
  });

  useEffect(() => {
    getSetData(getPlantillas, setPlantillas, "plantillas");
  }, []);
  function handleFiltrar(e) {
    e.preventDefault();
    // console.log(dataFiltro);
    // console.log(plantillasFiltradas);
    // console.log(plantillas);
    const tempPlantillas = plantillas.filter((item) => {
      // console.log(item);
      let flag = true;
      Object.keys(dataFiltro).forEach((key) => {
        if (key === "fechaI" || key === "fechaF") {
          return;
        }
        let pattern = ".*";
        if (
          !(
            dataFiltro[key] === DEFAULT_CLIENT ||
            dataFiltro[key] === DEFAULT_AREA
          )
        ) {
          pattern = `.*${dataFiltro[key]}.*`;
        }
        const str = item[key];
        const result = new RegExp(pattern).test(str);
        flag = flag && result;
      });
      const fechaI = new Date(dataFiltro.fechaI);
      const fechaF = new Date(dataFiltro.fechaF);
      const fecha = new Date(item.fecha);
      flag = flag && fecha >= fechaI && fecha <= fechaF;
      return flag;
    });
    setPlantillasFiltradas(tempPlantillas);
  }
  function handleModal(input) {
    if (input.data.estado_plantilla === "finalizado") {
      simpleAlert("Esta plantilla ya ha sido verificada", "error", "Error");
    } else {
      setModal(input);
    }
  }
  useEffect(() => {
    console.log(plantillasFiltradas);
  }, [plantillasFiltradas]);
  return (
    <section className=" font-semibold flex flex-col justify-center items-center gap-3">
      <section className="w-[600px] pt-2 flex flex-col justify-center gap-1">
        <h1 className="navbarColor3 rounded-t-md w-full text-center text-base font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
          Filtro gestión
        </h1>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="text-sm bg-gradient-to-br from-[#d3d1d1] to-[#ffffff] shadow-[2px_2px_4px_1px_#868686cc] rounded-b-md w-full px-2 font-semibold flex flex-col justify-between items-center gap-2 text-slate-700  py-2"
        >
          <div className="flex flex-row">
            <label className="w-[170px]">Supervisor:</label>
            <div className="text-teal-500 capitalize w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent drop-shadow-[0px_0px_4px_#03cdff55]">
              {userData.name}
            </div>
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Cliente:</label>
            <select
              value={dataFiltro.cliente}
              onChange={(e) =>
                setDataFiltro({
                  ...dataFiltro,
                  cliente: e.target.value,
                })
              }
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  // console.log(validity);
                  e.target.reportValidity();
                }
              }}
              className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044]"
            >
              <option value={DEFAULT_CLIENT}>{DEFAULT_CLIENT}</option>;
              {CURRENT_CLIENTS.map((client, i) => {
                return <option key={i}>{client}</option>;
              })}
            </select>
          </div>
          <div className="flex flex-row justify-center items-center">
            <label className="w-[170px]">Fecha de visita</label>
            <div className="flex flex-row gap-2 justify-center items-center">
              <input
                onKeyUp={(e) => {
                  const validity = e.target.checkValidity();
                  if (!validity) {
                    // console.log(validity);
                    e.target.reportValidity();
                  }
                }}
                value={dataFiltro.fechaI}
                onChange={(e) =>
                  setDataFiltro({
                    ...dataFiltro,
                    fechaI: e.target.value,
                  })
                }
                type="date"
                className="w-[145px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
              />
              <input
                onKeyUp={(e) => {
                  const validity = e.target.checkValidity();
                  if (!validity) {
                    // console.log(validity);
                    e.target.reportValidity();
                  }
                }}
                value={dataFiltro.fechaF}
                onChange={(e) =>
                  setDataFiltro({
                    ...dataFiltro,
                    fechaF: e.target.value,
                  })
                }
                type="date"
                className="w-[145px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
              />
            </div>
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Ciudad</label>
            <input
              value={dataFiltro.ciudad}
              onChange={(e) =>
                setDataFiltro({
                  ...dataFiltro,
                  ciudad: e.target.value,
                })
              }
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  // console.log(validity);
                  e.target.reportValidity();
                }
              }}
              type="text"
              className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
            />
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Punto de atención</label>
            <input
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  // console.log(validity);
                  e.target.reportValidity();
                }
              }}
              value={dataFiltro.puntoAtencion}
              onChange={(e) =>
                setDataFiltro({
                  ...dataFiltro,
                  puntoAtencion: e.target.value,
                })
              }
              type="text"
              className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
            />
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Area</label>
            <select
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  // console.log(validity);
                  e.target.reportValidity();
                }
              }}
              value={dataFiltro.area}
              onChange={(e) =>
                setDataFiltro({
                  ...dataFiltro,
                  area: e.target.value,
                })
              }
              className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044]"
            >
              <option value={DEFAULT_AREA}>{DEFAULT_AREA}</option>;
              {AREAS.map((area, i) => {
                return <option key={i}>{area}</option>;
              })}
            </select>
          </div>
          <div className="flex flex-row">
            <label className="w-[170px]">Estación</label>
            <input
              onKeyUp={(e) => {
                const validity = e.target.checkValidity();
                if (!validity) {
                  // console.log(validity);
                  e.target.reportValidity();
                }
              }}
              value={dataFiltro.estacion}
              onChange={(e) =>
                setDataFiltro({
                  ...dataFiltro,
                  estacion: e.target.value,
                })
              }
              type="text"
              className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
            />
          </div>
          <div>
            <button
              onClick={(e) => handleFiltrar(e)}
              className="mt-2 font-bold hover:border-teal-500 hover:bg-transparent hover:text-teal-500 border-[2px] border-transparent w-[230px] h-[32px] bg-teal-500 rounded-lg text-slate-100"
            >
              filtrar
            </button>
          </div>
        </form>
      </section>
      {plantillasFiltradas.length > 0 && (
        <section className="pt-2 flex flex-col justify-center gap-1">
          <div className="px-2 w-full grid grid-cols-[1fr_2fr_3fr_2fr_3fr_2fr_3fr_2fr_5fr_3fr_2fr_5fr] gap-1 navbarColor3 rounded-t-md text-center text-base font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
            <div className="capitalize bg-slate-900/10 rounded-md">id</div>
            <div className="capitalize bg-slate-900/10 rounded-md">tipo</div>
            <div className="capitalize bg-slate-900/10 rounded-md">
              supervisor
            </div>
            <div className="capitalize bg-slate-900/10 rounded-md">gestor</div>
            <div className="capitalize bg-slate-900/10 rounded-md">
              finalizado
            </div>
            <div className="capitalize bg-slate-900/10 rounded-md">cliente</div>
            <div className="capitalize bg-slate-900/10 rounded-md">fecha</div>
            <div className="capitalize bg-slate-900/10 rounded-md">ciudad</div>
            <div className="capitalize bg-slate-900/10 rounded-md">
              punto de atención
            </div>
            <div className="capitalize bg-slate-900/10 rounded-md">area</div>
            <div className="capitalize bg-slate-900/10 rounded-md">
              estación
            </div>
            <div className="capitalize bg-slate-900/10 rounded-md">
              estado revision
            </div>
          </div>
          <PaginationComponent
            itemsToPaginate={plantillasFiltradas}
            handleSelectItem={handleModal}
            postsPerPageProp={6}
          />
        </section>
      )}
      {modal.show && (
        <GestionVerificar
          dataProp={modal.data}
          setModal={setModal}
          updatePlantillasParams={[getPlantillas, setPlantillas, "plantillas"]}
        />
      )}
    </section>
  );
};

export default Verificacion;
