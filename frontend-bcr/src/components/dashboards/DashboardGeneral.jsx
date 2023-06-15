import React, { useContext, useEffect, useState } from "react";
import { colors_produ } from "../../constants/colors";
import {
  categorizarCalificacionCES,
  categorizarCalificacionPromesa,
} from "../../functions/general";
import { toFixedIfNecessary } from "../../functions/manageNumbers";
import {
  DataFantasmaContext,
  DataFilterContext,
  DataFiltradaContext,
  DataSeleccionadaFiltros,
} from "../../pages/Home";
import { BarChart } from "../Graphs/charjs/BarChart";
import { LineChart } from "../Graphs/charjs/LineChart";
import PieChart from "../Graphs/charjs/PieChart";

function DashboardGeneral() {
  const { data_fantasma_total } = useContext(DataFantasmaContext);
  const dataSeleccionadaFiltros = useContext(DataSeleccionadaFiltros);
  const dataFiltrada = useContext(DataFiltradaContext);
  const dataFitrada2 = useContext(DataFilterContext);
  const [nota_lealtad, set_nota_lealtad] = useState(92);
  const [nota_fantasma, set_nota_fantasma] = useState(0);
  const [nota_promedio_total, set_nota_promedio_total] = useState(0);
  const [data_linechart, set_data_linechart] = useState(null);
  const [data_barchart, set_data_barchart] = useState(null);

  useEffect(() => {
    if (
      data_fantasma_total &&
      data_fantasma_total.promedio_total &&
      data_fantasma_total.promedio_total.promedio_total_plantilla
    ) {
      set_nota_fantasma(
        data_fantasma_total.promedio_total.promedio_total_plantilla
      );
    }
  }, [data_fantasma_total]);

  useEffect(() => {
    if (nota_fantasma === 0 && nota_lealtad !== 0) {
      set_nota_promedio_total(nota_lealtad);
      return;
    }
    if (nota_fantasma !== 0 && nota_lealtad === 0) {
      set_nota_promedio_total(nota_fantasma);
      return;
    }
    set_nota_promedio_total((nota_fantasma + nota_lealtad) / 2);
    return () => { };
  }, [nota_fantasma, nota_lealtad]);

  useEffect(() => {
    if (dataSeleccionadaFiltros && dataFiltrada) {
      set_data_linechart(formatLineChart());
      set_data_barchart(formatDataBarchart());
    }
    return () => { };
  }, [dataSeleccionadaFiltros, dataFiltrada]);

  useEffect(() => {
    if (
      dataFitrada2?.promesa?.INS?.data?.promedio !== undefined &&
      dataFitrada2?.promesa?.NPS?.data?.promedio !== undefined
    ) {
      set_nota_lealtad(
        (dataFitrada2.promesa.INS.data.promedio +
          dataFitrada2.promesa.NPS.data.promedio) /
        2
      );
    }
    return () => { };
  }, [dataFitrada2]);
  function formatLineChart(
    keys = [
      {
        key: "respuesta_ces",
        label: "CES",
        name: "Indice Neto de Esfuerzo",
        bg_color: "#05f52d",
        border_color: "#05f52d99",
      },
      {
        key: "respuesta_ins",
        label: "INS",
        name: "Indice Neto de satisfacción",
        bg_color: "#20c93c",
        border_color: "#20c93c99",
      },
      {
        key: "respuesta_nps",
        label: "NPS",
        name: "Indice Neto de Recomendacion",
        bg_color: "#2ea341",
        border_color: "#2ea34199",
      },
    ]
  ) {
    const { periodos } = dataSeleccionadaFiltros;
    const periodos_selecteds = periodos
      .filter((item) => item.selected)
      .map((periodo) => periodo.name);
    const promedios_keys = keys.map((key, i) => {
      const promedios = [];
      periodos_selecteds.forEach((periodo, j) => {
        const data = dataFiltrada.filter((item) => item.periodo === periodo);
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
          prom = (data_prom / lenght_data) * 100;
        }
        promedios.push(prom);
      });
      return {
        label: key.label,
        data: promedios,
        borderColor: key.border_color,
        backgroundColor: key.bg_color,
        borderWidth: 0,
        pointRadius: 2,
      };
    });
    let promedios_totales = [81];
    if (
      promedios_keys.length === 3 &&
      promedios_keys[1].data &&
      promedios_keys[2].data &&
      promedios_keys[1].data.length > 0 &&
      promedios_keys[2].data.length > 0
    ) {
      promedios_totales = promedios_keys[1].data.map((prom, i) => {
        return (prom + promedios_keys[2].data[i]) / 2;
      });
    }
    const result = {
      labels: periodos_selecteds,
      datasets: [
        {
          label: "",
          data: promedios_totales.map((promedio, i) =>
            toFixedIfNecessary((promedio + nota_fantasma) / 2, 2)
          ),
          datalabels: {
            align: "end",
            anchor: "end",
          },
          backgroundColor: [colors_produ.green_secondary.light],
          borderColor: [colors_produ.green_secondary.dark],
          borderWidth: 7,
          tension: 0.4,
          fill: false,
        },
      ],
    };
    return result;
  }
  function formatDataBarchart(
    keys = [
      {
        key: "respuesta_ces",
        label: "CES",
        name: "Indice Neto de Esfuerzo",
        bg_color: "#05f52d",
        border_color: "#05f52d99",
      },
      {
        key: "respuesta_ins",
        label: "INS",
        name: "Indice Neto de satisfacción",
        bg_color: "#20c93c",
        border_color: "#20c93c99",
      },
      {
        key: "respuesta_nps",
        label: "NPS",
        name: "Indice Neto de Recomendacion",
        bg_color: "#2ea341",
        border_color: "#2ea34199",
      },
    ]
  ) {
    const { periodos } = dataSeleccionadaFiltros;
    const periodos_selecteds = periodos
      .filter((item) => item.selected)
      .map((periodo) => periodo.name);
    const promedios_keys = keys.map((key, i) => {
      const promedios = [];
      periodos_selecteds.forEach((periodo, j) => {
        const data = dataFiltrada.filter((item) => item.periodo === periodo);
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
          prom = (data_prom / lenght_data) * 100;
        }
        promedios.push(prom);
      });
      return {
        label: key.label,
        data: promedios,
        borderColor: key.border_color,
        backgroundColor: key.bg_color,
        borderWidth: 0,
        pointRadius: 2,
      };
    });
    let promedios_totales = [81];
    if (
      promedios_keys.length === 3 &&
      promedios_keys[1].data &&
      promedios_keys[2].data &&
      promedios_keys[1].data.length > 0 &&
      promedios_keys[2].data.length > 0
    ) {
      promedios_totales = promedios_keys[1].data.map((prom, i) => {
        return (prom + promedios_keys[2].data[i]) / 2;
      });
    }
    const result = {
      labels: periodos_selecteds,
      datasets: [
        {
          label: "ENCUESTA LEALTAD",
          data: promedios_totales.map((promedio, i) =>
            toFixedIfNecessary(promedio, 2)
          ),
          backgroundColor: [colors_produ.gray_secondary.dark],
          borderColor: ["#00000000"],
          borderWidth: 1,
          datalabels: {
            align: "end",
            anchor: "end",
          },
        },
        {
          label: "CLIENTE FANTASMA",
          datalabels: {
            align: "end",
            anchor: "end",
          },
          data: promedios_totales.map((promedio, i) =>
            toFixedIfNecessary(nota_fantasma, 2)
          ),
          backgroundColor: [colors_produ.green_secondary.dark],
          borderColor: ["#00000000"],
          borderWidth: 1,
        },
      ],
    };
    return result;
  }
  return (
    <div className="flex justify-center items-center w-full">
      {!dataFiltrada ||
        dataFiltrada.length === 0 ||
        !dataSeleccionadaFiltros ? (
        <div className="flex justify-center items-center h-full w-full pt-10">
          <h1 className="text-2xl">No hay datos para mostrar</h1>
        </div>
      ) : (
        <section className="flex flex-col justify-center gap-1 w-full 2xl:w-[1350px]">
          <section className="border-2 md:border-0 rounded-lg mt-2 flex flex-col lg:flex-row justify-center items-center w-full px-2 py-1 gap-5">
            <section className="flex flex-row gap-2 w-full justify-center items-center">
              <div className="w-[280px] xl:w-[290px] flex flex-col justify-center items-center gap-2 capitalize font-semibold">
                <h1 className="text-2xl">Resultado general</h1>
                <div className="w-full justify-center items-center relative flex">
                  <div className="w-full">
                    <PieChart
                      data={{
                        labels: [],
                        datasets: [
                          {
                            data: [
                              nota_promedio_total,
                              100 - nota_promedio_total,
                            ],
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
                  <div className="text-5xl absolute left-0 right-0 mx-auto bg-[#ffffff] rounded-full w-[180px] h-[180px] xl:w-[200px] xl:h-[200px] top-2 bottom-0 my-auto flex justify-center items-center text-center">
                    <p>{toFixedIfNecessary(nota_promedio_total, 2)}%</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="flex flex-row gap-2 w-full justify-center items-center">
              <div className="xl:w-[250px] w-[200px] flex flex-col justify-center items-center gap-1 capitalize font-semibold">
                <h1 className="lg:text-lg xl:text-2xl">Resultado Lealtad</h1>
                <div className="w-full relative flex justify-center items-center">
                  <PieChart
                    data={{
                      labels: [],
                      datasets: [
                        {
                          data: [nota_lealtad, 100 - nota_lealtad],
                          backgroundColor: [
                            colors_produ.gray_secondary.dark,
                            colors_produ.gray_secondary.light,
                          ],
                          borderColor: ["#00000000"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                  <div className="text-4xl absolute left-0 right-0 mx-auto bg-slate-50 rounded-full w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] top-2 bottom-0 my-auto flex justify-center items-center text-center">
                    <p>{toFixedIfNecessary(nota_lealtad, 2)}%</p>
                  </div>
                </div>
              </div>
              <div className="xl:w-[250px] w-[200px] flex flex-col justify-center items-center gap-1 capitalize font-semibold">
                <h1 className="lg:text-lg xl:text-2xl">Cliente fantasma</h1>
                <div className="w-full relative flex justify-center items-center">
                  <PieChart
                    data={{
                      labels: [],
                      datasets: [
                        {
                          data: [nota_fantasma, 100 - nota_fantasma],
                          backgroundColor: [
                            colors_produ.green_secondary.dark,
                            colors_produ.green_secondary.light,
                          ],
                          borderColor: ["#00000000"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                  <div className="text-4xl absolute left-0 right-0 mx-auto bg-slate-50 rounded-full w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] top-2 bottom-0 my-auto flex justify-center items-center text-center">
                    <p>{toFixedIfNecessary(nota_fantasma, 2)}%</p>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section className="border-2 md:border-0 rounded-lg mb-2 flex flex-col xl:flex-row justify-center items-center w-full px-2 py-1 gap-5">
            <section className="w-full sm:w-[min(90%,700px)] xl:w-1/2 flex flex-col justify-center items-center">
              <h1 className="text-2xl font-semibold">
                Comparativo indicadores
              </h1>
              <div className="aspect-[2/1] w-full flex justify-center items-center">
                {data_barchart && <BarChart data={data_barchart} />}
              </div>
            </section>
            <section className="w-full sm:w-[min(90%,700px)] xl:w-1/2 flex flex-col justify-center items-center">
              <h1 className="text-2xl font-semibold">
                Evolutivo Resultado General
              </h1>
              <div className="aspect-[2/1] w-full flex justify-center items-center">
                {data_linechart && <LineChart data={data_linechart} />}
              </div>
            </section>
          </section>
        </section>
      )}
    </div>
  );
}

export default DashboardGeneral;
