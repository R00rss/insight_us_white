import React, { useContext, useEffect, useMemo, useState } from "react";
import PieChart from "../Graphs/charjs/PieChart";
import {
  DataFilterContext,
  DataFiltradaContext,
  DataReporteEncuestaLealtadContext,
  DataSeleccionadaFiltros,
} from "../../pages/Home";
import { TacoMetro3 } from "../Graphs/tacometro/TacoMetro";
import { BarChart } from "../Graphs/charjs/BarChart";
import { toFixedIfNecessary } from "../../functions/manageNumbers";
import { minimizeStr } from "../../functions/manageStr";

import { colors_produ } from "../../constants/colors";
import alertIcon from "../../assets/icons/tabla_icons/alert.png";
import dangerIcon from "../../assets/icons/tabla_icons/not_ok.png";
import okIcon from "../../assets/icons/tabla_icons/ok.png";
import {
  categorizarCalificacionCES,
  categorizarCalificacionPromesa,
} from "../../functions/general";

const DefaultLabels = {
  Lealtad: ["Agencia", "INS", "NPS", "CES", "Lealtad"],
  "Atributos de servicio": ["Agencia", "Amabilidad", "Agilidad"],
};
const DefaultTitleTotal = {
  Lealtad: "Encuesta de Lealtad",
  "Atributos de servicio": "Atributos de servicio",
};

const dataDefault = {
  labels: ["Red", "Blue"],
  datasets: [
    {
      // label: "# of Votes",
      data: ["1", "2"],
      backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};
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
      key: "respuesta_nps",
      label: "NPS",
      name: "Indice Neto de Recomendacion",
      bg_color: colors_produ.green_secondary.dark,
      border_color: "#000000",
    },
    {
      key: "respuesta_ces",
      label: "CES",
      name: "Indice Neto de Esfuerzo",
      bg_color: colors_produ.green.primary,
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

const Indicadores = () => {
  const dataFormateadaIndicadores = useContext(DataFilterContext);
  const dataFiltrada = useContext(DataFiltradaContext);
  const dataSeleccionadaFiltros = useContext(DataSeleccionadaFiltros);
  const { data_reporte_encuesta_lealtad, set_data_reporte_encuesta_lealtad } =
    useContext(DataReporteEncuestaLealtadContext);
  const [nota_total, set_nota_total] = useState({
    Lealtad: 92,
    "Atributos de servicio": 94,
  });
  const [selected_labels_table, set_selected_labels_table] = useState(
    DefaultLabels.Lealtad
  );
  const [selected_title_total_table, set_selected_title_total_table] = useState(
    DefaultTitleTotal.Lealtad
  );
  const [selected_data_piecharts, set_selected_data_piecharts] = useState(null);

  const [selected_data_table, set_selected_data_table] = useState(null);
  const [selected_data_barchar, set_selected_data_barchar] = useState(null);
  const [data_barchart, set_data_barchart] = useState(null);

  useEffect(() => {
    if (dataSeleccionadaFiltros && dataFiltrada) {
      set_data_barchart(formatDataBarchart());
    }
    return () => { };
  }, [dataSeleccionadaFiltros, dataFiltrada]);

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
              prom = (data_prom / lenght_data) * 100;
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
  useEffect(() => {
    if (dataSeleccionadaFiltros) {
      const { indicadores } = dataSeleccionadaFiltros;
      const indicador_seleccionado = Object.values(indicadores).filter(
        (item) => item.selected
      )[0].display_name;
      set_selected_labels_table(DefaultLabels[indicador_seleccionado]);
      set_selected_title_total_table(DefaultTitleTotal[indicador_seleccionado]);
      if (dataFormateadaIndicadores) {
        function switchNames(name) {
          if (name === "Atributos de servicio") return "experiencia";
          if (name === "Lealtad") return "promesa";
          return "promesa";
        }
        const aux =
          dataFormateadaIndicadores[switchNames(indicador_seleccionado)];
        if (aux) {
          set_selected_data_piecharts(aux);
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

  useEffect(() => {
    if (dataSeleccionadaFiltros && dataFiltrada) {
      const { dataBarChart, dataTable } = formatDataTable();
      set_selected_data_table(dataTable);
      set_data_reporte_encuesta_lealtad(dataTable);
      set_selected_data_barchar(dataBarChart);
    }
  }, [dataFiltrada]);

  function formatDataTable() {
    const { agencias, indicadores, periodos, cities, zonas, tipo_agencias } =
      dataSeleccionadaFiltros;

    const indicador_seleccionado = Object.values(indicadores).filter(
      (item) => item.selected
    )[0].display_name;
    const keys = DefaultKeys[indicador_seleccionado];
    const agencias_selected = agencias
      .filter((agencia) => {
        const flag_city =
          cities.filter(
            (ciudad) => ciudad.name === agencia.ciudad && ciudad.selected
          ).length > 0;
        const flag_zona = zonas[agencia.zona].selected;
        const flag_tipo_agencia = tipo_agencias[agencia.tipo_agencia].selected;
        const flag_agencia = agencia.selected;
        return flag_city && flag_zona && flag_tipo_agencia && flag_agencia;
      })
      .map((agencia) => agencia.name);

    const periodos_selecteds = periodos
      .filter((item) => item.selected)
      .map((periodo) => periodo.name);
    const datasetsBarChart = [];
    const data_result = agencias_selected.map((agencia, i) => {
      const data = dataFiltrada.filter((item) => item.agencia === agencia);
      const promedios = {};
      keys.forEach((key) => {
        if (i === 0) {
          const promedios_aux = [];
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
              let aux_categorizado;
              if (key.key === "respuesta_ces") {
                aux_categorizado = categorizarCalificacionCES(aux);
              } else {
                aux_categorizado = categorizarCalificacionPromesa(aux_int);
              }
              return acc + aux_categorizado;
            }, 0);
            let prom = 0;
            if (lenght_data !== 0) {
              prom = toFixedIfNecessary((data_prom / lenght_data) * 100, 2);
            }
            promedios_aux.push(prom);
          });
          datasetsBarChart.push({
            label: key.label,
            data: promedios_aux,
            datalabels: {
              align: "end",
              anchor: "end",
            },
            borderColor: key.border_color,
            backgroundColor: key.bg_color,
            borderWidth: 0,
            pointRadius: 2,
          });
        }
        let lenght_data = data.length;
        const data_prom = data.reduce((acc, item) => {
          const aux = item[key.key];
          if (aux === null || aux === undefined || aux === "") {
            lenght_data--;
            return acc;
          }
          const aux_int = parseInt(aux);
          let aux_categorizado;
          if (key.key === "respuesta_ces") {
            aux_categorizado = categorizarCalificacionCES(aux);
          } else {
            aux_categorizado = categorizarCalificacionPromesa(aux_int);
          }

          // const aux_categorizado = categorizarCalificacionPromesa(aux_int);
          return acc + aux_categorizado;
        }, 0);
        let prom = 0;
        if (data_prom <= 0) {
          prom = 0;
        } else {
          if (lenght_data !== 0) {
            prom = (data_prom / lenght_data) * 100;
          }
        }
        promedios[key.label] = prom;
      });
      if (indicador_seleccionado === "Atributos de servicio") {
        return {
          id: i,
          name: agencia,
          promedios: [
            promedios.AMABILIDAD,
            promedios.AGILIDAD,
            // (promedios.AMABILIDAD + promedios.AGILIDAD) / 2,
          ],
          promedios_keys: {
            AMABILIDAD: promedios.AMABILIDAD,
            AGILIDAD: promedios.AGILIDAD,
          },
        };
      } else {
        return {
          id: i,
          name: agencia,
          promedios: [
            promedios.INS,
            promedios.CES,
            promedios.NPS,
            (promedios.NPS + promedios.INS) / 2,
          ],
          promedios_keys: {
            INS: promedios.INS,
            NPS: promedios.NPS,
            CES: promedios.CES,
            Lealtad: (promedios.NPS + promedios.INS) / 2,
          },
        };
      }
    });
    return {
      dataTable: data_result,
      dataBarChart: { labels: periodos_selecteds, datasets: datasetsBarChart },
    };
  }

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
    // <></>
    <div className="flex justify-center items-center w-full">
      <section className="flex flex-col justify-center gap-1 w-full 2xl:w-[1350px]">
        <section className="flex flex-row w-full justify-center px-4 py-2">
          <div className="w-[250px] flex flex-col justify-center items-center gap-2 capitalize font-semibold">
            <h1 className="text-2xl">{selected_title_total_table}</h1>
            <div className="justify-center items-center relative flex w-full">
              <div className="w-full">
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
          <section
            // className="grid grid-cols-[repeat(auto-fit,minmax(17rem,1fr))]  2xl:flex 2xl:flex-row-reverse  justify-center w-full 2xl:w-[min(70%,1000px)] gap-3 items-center"
            className="grid grid-cols-[repeat(auto-fit,minmax(17rem,1fr))]  2xl:flex 2xl:flex-row  justify-center w-full 2xl:w-[min(70%,1000px)] gap-3 items-center"
          >
            {selected_data_piecharts &&
              Object.keys(selected_data_piecharts).map((key_data, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col justify-center items-center gap-1 font-bold"
                  >
                    <div className="w-full text-center text-md flex flex-col justify-center items-center gap-2">
                      <h2
                        style={{ backgroundColor: colors_produ.green.tertiary }}
                        className="text-3xl font-semibold shadow-[1px_1px_10px_-2px_#000000] rounded-full px-8 py-1"
                      >
                        {selected_data_piecharts[key_data].info.label}
                      </h2>
                      <h2 className="font-normal text-xl">
                        {selected_data_piecharts[key_data].info.name}
                      </h2>
                    </div>
                    <TacoMetro3
                      sizeContainer={{ width: 240 }}
                      type={
                        selected_data_piecharts[key_data].info.label === "CES"
                          ? 1
                          : 2
                      }
                      data={selected_data_piecharts[key_data]}
                    />
                  </div>
                );
              })}
          </section>
        </section>
        <section className="w-full flex flex-col xl:flex-row justify-center items-center gap-4">
          <section className="w-full sm:w-[min(90%,700px)] xl:w-7/12 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Comparativo indicadores</h1>
            <div className="aspect-[2/1] w-full flex justify-center items-center">
              {selected_data_barchar && (
                <BarChart data={selected_data_barchar} />
              )}
            </div>
          </section>
          <section className="w-full sm:w-[min(90%,700px)] xl:w-5/12 flex flex-col justify-center items-center">
            <div className="w-full mb-9">
              <ul
                style={{
                  backgroundColor: colors_produ.green.primary,
                  gridTemplateColumns:
                    "2fr" + " 1fr".repeat(selected_labels_table.length - 1),
                }}
                className="w-full grid px-2 py-1 font-normal text-lg sticky top-0 text-slate-100 rounded-t-lg"
              >
                {selected_labels_table.map((label, i) => {
                  return (
                    <li className="text-center" key={i}>
                      {label}
                    </li>
                  );
                })}
              </ul>
              <ul className="w-full h-[400px] overflow-y-auto shadow-[1px_1px_10px_-4px]">
                {selected_data_table &&
                  selected_data_table.map((item, i) => {
                    return (
                      <li
                        style={{
                          gridTemplateColumns:
                            "2fr" +
                            " 1fr".repeat(selected_labels_table.length - 1),
                        }}
                        className={`w-full grid px-2 even:bg-[#dae5ff] odd:bg-[#ecf1fd] text-base text-center border-b-[1px] border-slate-800 last:border-b-0`}
                        key={i}
                      >
                        <div className="capitalize">
                          {minimizeStr(item.name.toLowerCase(), 23)}
                        </div>
                        {Object.keys(item.promedios_keys).map(
                          (promedio_key, j) => {
                            const aux_promedio =
                              item.promedios_keys[promedio_key];
                            const aux_promedio2 =
                              promedio_key === "CES"
                                ? 100 - aux_promedio
                                : aux_promedio;
                            console.log(aux_promedio);

                            return (
                              <div
                                key={j}
                                className="flex flex-row gap-1 border-l-[1px] border-slate-800 justify-center items-center"
                              >
                                <img
                                  className="h-4 w-4"
                                  src={
                                    aux_promedio2 >= 80
                                      ? okIcon
                                      : aux_promedio2 >= 70
                                        ? alertIcon
                                        : dangerIcon
                                  }
                                  alt="alert icon"
                                />
                                <div>
                                  {toFixedIfNecessary(aux_promedio, 2)}%
                                </div>
                              </div>
                            );
                          }
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* <div className="relative bg-green-produ-primary rounded-b-lg w-full text-slate-100 font-semibold">
              <div className="flex flex-row justify-center items-center gap-2 py-1">
                <div>Pagina siguiente</div>
                <img src={arrow_icon} className="h-5 w-5" alt="flecha" />
              </div>
              <div className="text-xs absolute right-2 bottom-0 top-0 my-auto flex justify-center items-center">
                <p className="">pagina 1 de 5</p>
              </div>
            </div> */}
          </section>
        </section>
      </section>
    </div>
  );
};

export default Indicadores;
