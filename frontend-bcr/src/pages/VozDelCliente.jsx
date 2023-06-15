import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "../components/Graphs/charjs/BarChart";
import PieChart from "../components/Graphs/charjs/PieChart";
function categorizarCalificacionPromesa(calf) {
  if (calf <= 6) return -1;
  if (calf <= 8) return 0;
  if (calf <= 10) return 1;
  return 0;
}
function swap_number2(number) {
  if (number >= 9) {
    return colors_produ.basic.green;
  }
  if (number >= 7) {
    return colors_produ.basic.yellow;
  }
  return colors_produ.basic.red;
}
function swap_number_str(calf_str) {
  // return colors_produ.basic.green;
  if (
    calf_str.localeCompare("muy facil", undefined, {
      sensitivity: "base",
    }) === 0
  )
    return colors_produ.basic.green;
  if (calf_str.localeCompare("facil", undefined, { sensitivity: "base" }) === 0)
    return colors_produ.basic.green;
  if (
    calf_str.localeCompare("poco facil", undefined, {
      sensitivity: "base",
    }) === 0
  )
    return colors_produ.basic.green;
  if (
    calf_str.localeCompare("dificil", undefined, { sensitivity: "base" }) === 0
  )
    return colors_produ.basic.yellow;
  if (
    calf_str.localeCompare("muy dificil", undefined, {
      sensitivity: "base",
    }) === 0
  )
    return colors_produ.basic.red;
  return 0;
}

import { minimizeStr } from "../functions/manageStr";
import { toFixedIfNecessary } from "../functions/manageNumbers";
import {
  DataFilterContext,
  DataFiltradaContext,
  DataSeleccionadaFiltros,
  DataTotalContext,
} from "./Home";
import { colors_produ } from "../constants/colors";
import { get_token_PQR } from "../services/pqr";
import { useNavigate } from "react-router-dom";
import AnalisisSentimiento from "../components/voc/AnalisisSentimiento";
import ProyeccionSentimiento from "../components/voc/ProyeccionSentimiento";
import Correlacion from "../components/voc/Correlacion";
import Desercion from "../components/voc/Desercion";
const DefaultKeys = {
  Lealtad: [
    {
      key: "respuesta_ins",
      label: "INS",
      name: "Indice Neto de satisfacción",
      bg_color: colors_produ.green.secondary,
      border_color: "#000000",
    },
    {
      key: "respuesta_ces",
      label: "CES",
      name: "Indice Neto de Esfuerzo",
      bg_color: colors_produ.green.primary,
      border_color: "#000000",
    },
    {
      key: "respuesta_nps",
      label: "NPS",
      name: "Indice Neto de Recomendacion",
      bg_color: colors_produ.green_secondary.dark,
      border_color: "#000000",
    },
  ],
  "Atributos de servicio": [
    {
      key: "respuesta_agilidad",
      label: "AGILIDAD",
      name: "Indice de Agilidad",
      bg_color: colors_produ.green.primary,
      border_color: "#000000",
    },
    {
      key: "respuesta_amabilidad",
      label: "AMABILIDAD",
      name: "Indice de Amabilidad",
      bg_color: colors_produ.green_secondary.dark,
      border_color: "#000000",
    },
  ],
};

const DefaultLabels = {
  Lealtad: [
    "Periodo Encuesta",
    "Agencia",
    "Fecha Transacción",
    "Calf. INS",
    "Motivo INS",
    "Calf. CES",
    // "Motivo CES",
    "Calf. NPS",
    "Motivo NPS",
  ],
  "Atributos de servicio": [
    "Periodo Encuesta",
    "Agencia",
    "Fecha Transacción",
    "Calf. Amabilidad",
    // "Motivo Amabilidad",
    "Calf. Agilidad",
    // "Motivo Agilidad",
  ],
};
const DefaultTitleTotal = {
  Lealtad: "Encuesta de Lealtad",
  "Atributos de servicio": "Atributos de servicio",
};
function VozDelCliente() {
  const navigate = useNavigate();
  const dataFormateadaIndicadores = useContext(DataFilterContext);
  const dataFiltrada = useContext(DataFiltradaContext);
  const [data_table, set_data_table] = useState(null);
  const dataSeleccionadaFiltros = useContext(DataSeleccionadaFiltros);
  const [data_barchart, set_data_barchart] = useState(null);
  const [nota_total, set_nota_total] = useState({
    Lealtad: 92,
    "Atributos de servicio": 94,
  });
  const [selected_key, set_selected_key] = useState("Lealtad");
  const [menu_module_options, set_menu_module_options] = useState([
    {
      id: 1,
      name: "Tabla detalle",
      selected: true,
    },
    {
      id: 2,
      name: "Análisis de sentimiento",
      selected: false,
    },
    {
      id: 3,
      name: "Proyecciones",
      selected: false,
    },
    {
      id: 4,
      name: "Correlación",
      selected: false,
    },
    // {
    //   id: 5,
    //   name: "Deserción",
    //   selected: false,
    // }, {
    //   id: 6,
    //   name: "Economics",
    //   selected: false,
    // }
  ])
  const [selected_option_module, set_selected_option_module] = useState(menu_module_options[0].id);

  function formatDataBarchart() {
    if (dataSeleccionadaFiltros && dataFiltrada) {
      const { periodos, indicadores } = dataSeleccionadaFiltros;
      const indicador_seleccionado = Object.values(indicadores).filter(
        (item) => item.selected
      )[0].display_name;
      const keys = DefaultKeys[indicador_seleccionado];
      const periodos_selecteds = periodos
        .filter((item) => item.selected)
        .map((periodo) => periodo.name);

      const result = {
        labels: periodos_selecteds,
        datasets: keys.map((key, i) => {
          const promedios = [];
          periodos_selecteds.forEach((periodo, j) => {
            const data = dataFiltrada.filter(
              (item) => item.periodo === periodo
            );
            let lenght_data = data.length;
            const data_prom = data.reduce((acc, item) => {
              const aux = item[key.key];
              if (aux === null || aux === undefined || aux === "") {
                lenght_data--;
                return acc;
              }
              const aux_int = parseInt(aux);
              const aux_categorizado = categorizarCalificacionPromesa(aux_int);
              return acc + aux_categorizado;
            }, 0);
            let prom = 0;
            if (lenght_data !== 0) {
              prom = toFixedIfNecessary((data_prom / lenght_data) * 100);
            }
            promedios.push(prom);
          });
          return {
            label: key.label,
            data: promedios,
            datalabels: {
              align: "end",
              anchor: "end",
            },
            borderColor: key.border_color,
            backgroundColor: key.bg_color,
            borderWidth: 0,
            pointRadius: 2,
          };
        }),
      };
      return result;
    } else {
      return dataDefault;
    }
  }
  const navigateToPQR = (token) => {
    window.open(`http://localhost:7004/modulo/ticket?token=${token}`, '_blank');
  };



  function DataTableDetalle({ dataToMap, type = "Lealtad" }) {
    return (
      <section className="w-[min(70%,1400px)] flex flex-col">
        <h1 className="text-center text-3xl font-semibold text-slate-900 mb-8">Tabla detalle</h1>
        <section className="flex flex-col h-[300px] overflow-y-auto gap-1 text-slate-100 rounded-t-lg">

          <div
            style={{
              backgroundColor: colors_produ.green.primary,
              gridTemplateColumns:
                type === "Lealtad"
                  ? "3fr 3fr 3fr 3fr 7fr 4fr 2fr 7fr"
                  : "repeat(5, 1fr)",
            }}
            className="w-full grid px-2 py-1 font-normal text-base sticky top-0 text-center"
          >
            {DefaultLabels[selected_key].map((label, i) => {
              return (
                <div className="capitalize" key={i}>
                  {minimizeStr(label, 14)}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            {dataToMap.map((data, i) => {
              console.log(data)
              const user_data = {
                birth_date: "1998-08-16T00:00:00",
                client_id: "",
                client_id_type: "cedula",
                client_identification: data.identificacion,
                client_mail: "default@default.com",
                client_name: data.nombre_cliente,
                client_phone: data.contactaddress,
                created_at: new Date().toISOString().slice(0, 19),
                first_street: "calle 1",
                genre: "N",
                house_number: "N61",
                second_street: "calle 2",
              }

              return (
                <div
                  onClick={async () => {
                    const token_ = await get_token_PQR(user_data);
                    // console.log(user_data)
                    // console.log(token_)
                    navigateToPQR(token_)

                  }}
                  style={{
                    gridTemplateColumns:
                      type === "Lealtad"
                        ? "3fr 3fr 3fr 3fr 7fr 4fr 2fr 7fr"
                        : "repeat(5, 1fr)",
                    // "3fr 2fr 3fr" +
                    // " 2fr 7fr".repeat(
                    //   (DefaultLabels[selected_key].length - 3) / 2
                    // ) +
                    // " 7fr",
                  }}
                  // target="_blank"
                  // href={`http://localhost:7004/modulo/ticket?token:${JSON.stringify(user_data)}`}
                  key={i}
                  className="cursor-pointer px-2 grid text-center gap-1 font-normal text-sm even:bg-[#dae5ff] odd:bg-[#ecf1fd]1 text-slate-900"
                >
                  <div className="flex justify-center items-center">
                    {data.periodo.toLowerCase()}
                  </div>
                  <div className="flex justify-center items-center">
                    {minimizeStr(data.agencia)}
                  </div>
                  <div className="flex justify-center items-center">
                    {data.periodo}
                  </div>
                  {selected_key === "Lealtad" ? (
                    <>
                      <div
                        style={{
                          backgroundColor: swap_number2(
                            parseInt(data["respuesta_ins"])
                          ),
                        }}
                        className="rounded-full h-[19px] m-auto w-[50px]  flex justify-center items-center"
                      >
                        {minimizeStr(data["respuesta_ins"].toLowerCase(), 90)}
                      </div>
                      <div className="flex justify-center items-center">
                        {minimizeStr(data["respuesta_ins_1"], 90)}
                      </div>
                      <div
                        style={{
                          backgroundColor: swap_number_str(
                            data["respuesta_ces"]
                          ),
                        }}
                        className="rounded-full h-[19px] min-w-[70px] px-2  m-auto flex justify-center items-center"
                      >
                        {minimizeStr(data["respuesta_ces"].toLowerCase(), 10)}
                      </div>
                      {/* <div className="flex justify-center items-center">
                          {minimizeStr(
                            data["respuesta_ces_1"].toLowerCase(),
                            90
                          )}
                        </div> */}
                      <div
                        style={{
                          backgroundColor: swap_number2(
                            parseInt(data["respuesta_nps"])
                          ),
                        }}
                        className="rounded-full h-[19px] m-auto w-[50px]  flex justify-center items-center"
                      >
                        {minimizeStr(data["respuesta_nps"].toLowerCase(), 90)}
                      </div>
                      <div className="flex justify-center items-center">
                        {minimizeStr(data["respuesta_nps_1"], 90)}
                      </div>
                    </>
                  ) : (
                    selected_key === "Atributos de servicio" && (
                      <>
                        <div
                          style={{
                            backgroundColor: swap_number2(
                              parseInt(data["respuesta_amabilidad"])
                            ),
                          }}
                          className="rounded-full h-[19px] m-auto w-[50px]  flex justify-center items-center"
                        >
                          {minimizeStr(
                            data["respuesta_amabilidad"].toLowerCase(),
                            90
                          )}
                        </div>
                        {/* <div className="flex justify-center items-center">
                            {minimizeStr(
                              data["respuesta_amabilidad_1"].toLowerCase(),
                              90
                            )}
                          </div> */}
                        <div
                          style={{
                            backgroundColor: swap_number2(
                              parseInt(data["respuesta_agilidad"])
                            ),
                          }}
                          className="rounded-full h-[19px] m-auto w-[50px]  flex justify-center items-center"
                        >
                          {minimizeStr(
                            data["respuesta_agilidad"].toLowerCase(),
                            90
                          )}
                        </div>
                        {/* <div className="flex justify-center items-center">
                            {minimizeStr(
                              data["respuesta_agilidad_1"].toLowerCase(),
                              90
                            )}
                          </div> */}
                      </>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </section>

    );
  }
  useEffect(() => {
    if (dataSeleccionadaFiltros && dataFiltrada) {
      set_data_barchart(formatDataBarchart());
      set_data_table(dataFiltrada);
    }
    return () => { };
  }, [dataSeleccionadaFiltros, dataFiltrada]);
  useEffect(() => {
    return () => { };
  }, [data_table]);
  useEffect(() => {
    if (dataSeleccionadaFiltros) {
      const { indicadores } = dataSeleccionadaFiltros;
      const indicador_seleccionado = Object.values(indicadores).filter(
        (item) => item.selected
      )[0].display_name;
      set_selected_key(indicador_seleccionado);
      if (dataFormateadaIndicadores) {
        function switchNames(name) {
          if (name === "Atributos de servicio") return "experiencia";
          if (name === "Lealtad") return "promesa";
          return "promesa";
        }
        const aux =
          dataFormateadaIndicadores[switchNames(indicador_seleccionado)];
        if (aux) {
          let tam_aux = Object.values(aux).length;
          const prom = Object.keys(aux).reduce((acc, aux_key) => {
            if (aux_key === "CES") {
              tam_aux--;
              return acc;
            }
            const item = aux[aux_key];
            return acc + item.data.promedio;
          }, 0);
          set_nota_total(prom / tam_aux);
        }
      }
    }
  }, [dataSeleccionadaFiltros, dataFormateadaIndicadores]);
  const dataDefault = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  if (!dataFiltrada) {
    return (
      <div className="flex justify-center items-center h-full w-full pt-10">
        <h1 className="text-2xl">No hay datos para mostrar</h1>
      </div>
    );
  }
  if (dataFiltrada.length === 0)
    return (
      <div className="flex justify-center items-center h-full w-full pt-10">
        <h1 className="text-2xl">No hay datos para mostrar</h1>
      </div>
    );

  return (
    <section className="relative">
      <section className="py-4 flex flex-col gap-2 justify-center items-start w-full">
        <section className="w-[min(100%,1200px)] mx-auto flex flex-row gap-5 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2 capitalize font-semibold h-[400px] w-full">
            <h1 className="text-2xl">{DefaultTitleTotal[selected_key]}</h1>
            <div className="justify-center items-center relative flex">
              <div className="w-[250px] h-[250px]">
                <PieChart
                  data={{
                    labels: [],
                    datasets: [
                      {
                        data: [nota_total, 100 - nota_total],
                        backgroundColor: [
                          colors_produ.green.primary,
                          colors_produ.green.secondary,
                        ],
                        borderColor: ["#00000000"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
              <div className="text-5xl absolute left-0 right-0 mx-auto bg-[#ffffff] rounded-full w-[180px] h-[180px] top-2 bottom-0 my-auto flex justify-center items-center text-center">
                <p>{toFixedIfNecessary(nota_total, 2)}%</p>
              </div>
            </div>
          </div>
          <section className="w-full h-[390px] flex justify-center items-center px-4 rounded-lg">
            {data_barchart && <BarChart data={data_barchart} />}
          </section>
        </section>
        <section className="w-[min(100%,1400px)] mx-auto flex justify-center items-center gap-4">

          {selected_option_module === 1 && data_table && (
            <DataTableDetalle dataToMap={data_table.slice(0, 30)} type={selected_key} />
          )}
          {selected_option_module === 2 && data_table && (
            <AnalisisSentimiento />
          )}
          {selected_option_module === 3 && data_table && (
            <ProyeccionSentimiento />
          )}
          {selected_option_module === 4 && data_table && (
            <Correlacion />
          )}
          {/* {selected_option_module === 5 && data_table && (
            <Desercion />
          )} */}


          <div className="flex flex-col gap-1 self-start mt-14">
            {menu_module_options.map((item) => {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`px-2 rounded-lg border-2 border-[var(--green-produ-primary)] hover:bg-transparent hover:text-[var(--green-produ-primary)] duration-500 ${item.selected ? "bg-transparent text-[var(--green-produ-primary)]" : "text-slate-100 bg-[var(--green-produ-primary)] "}`}
                  onClick={() => {
                    set_selected_option_module(item.id)
                    set_menu_module_options(menu_module_options.map((item_) => {
                      return {
                        ...item_,
                        selected: (item_.id === item.id)
                      }
                    }))
                  }}
                >{item.name}</button>
              )
            })}
          </div>
        </section>

      </section>
      {/* <section
        style={{ display: modalDetalleVozCliente ? "flex" : "none" }}
        className="flex-col items-center justify-evenly gap-2 px-10 z-[700] absolute top-0 left-[-140px] bottom-0 right-0 shadow-[0px_0px_200px_200px_#000000cf] p-1 w-[1300px] h-[500px] mx-auto  rounded-lg bg-slate-700 text-slate-50"
      >
        <div
          onClick={() => setModalDetalleVozCliente(false)}
          className="absolute right-2 top-1 font-bold text-2xl hover:text-slate-900 cursor-pointer duration-300 hover:scale-[1.7] ease-in-out"
        >
          x
        </div>
        <div className="text-center font-extralight text-3xl">
          Detalle de la voz del cliente
        </div>
        <div className="flex flex-col gap-1 bg-slate-900">
          <div className="px-2 grid grid-cols-[1fr_1fr_3fr_7fr] gap-1 text-sm bg-cyan-500">
            <div className="text-slate-50 font-semibold text-base">Periodo</div>
            <div className="text-slate-50 font-semibold text-base">Agencia</div>
            <div className="text-slate-50 font-semibold text-base">
              Calificacion
            </div>
            <div className="text-slate-50 font-semibold text-base">
              Comentario
            </div>
          </div>
          {dataTotal &&
            dataTotal.map((data, i) => {
              if (i == 2) {
                return (
                  <div
                    key={i}
                    onClick={() => setModalDetalleVozCliente(true)}
                    className="px-2 grid grid-cols-[1fr_1fr_3fr_7fr] gap-1 text-sm text-center"
                  >
                    <div className="flex flex-col justify-center items-start">
                      <div>{data.periodo.toLowerCase()}</div>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <div>{minimizeStr(data.agencia.toLowerCase())}</div>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <div
                        className="max-h-[18px] h-full min-w-[40px] max-w-[40px] self-center text-slate-50 text-center rounded-full"
                        style={{
                          background: `${
                            parseInt(data["pregunta_4"]) < 6
                              ? "#ff0000"
                              : "#00ff80"
                          }`,
                        }}
                      >
                        {data["pregunta_4"]}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                      <div>{data["respuesta_ces_1"].toLowerCase()}</div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </section> */}
    </section>
  );
}

export default VozDelCliente;
