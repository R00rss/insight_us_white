import React, { useContext, useEffect, useState } from "react";
import PieChart from "../components/Graphs/charjs/PieChart";
import { BarChart } from "../components/Graphs/charjs/BarChart";
import { colors_produ } from "../constants/colors";
import { toFixedIfNecessary } from "../functions/manageNumbers";
import { DataFantasmaContext } from "./Home";

import arrow_icon from "../assets/icons/arrow2.png";
import FilterBarClienteFantasma from "../components/Bars/FilterBarClienteFantasma";

const labels_table = [
  "AGENCIA",
  "Actitud",
  "Destrezas de servicio",
  "Imagen y orden",
];

function format_for_datasets(data_per_medition) {
  const colors_obj = {
    actitud: { color: [colors_produ.green.primary], display_name: "Actitud" },
    destrezas_de_servicio: {
      color: [colors_produ.green.tertiary],
      display_name: "Destrezas de Servicio",
    },
    imagen_y_orden: {
      color: [colors_produ.green_secondary.light],
      display_name: "Imagen y Orden",
    },
  };
  const labels = data_per_medition.map((row) => row.medicion);
  const datasets = Object.keys(colors_obj).map((key) => {
    return {
      label: colors_obj[key].display_name,
      data: data_per_medition.map((row) => {
        return toFixedIfNecessary(row.promedios_platilla[key], 2);
      }),
      datalabels: {
        align: "end",
        anchor: "end",
      },
      backgroundColor: colors_obj[key].color,
      tension: 0.1,
    };
  });

  const data_bar_formated = {
    labels: labels,
    datasets: datasets,
  };
  return data_bar_formated;
}

function ClienteFantasmaGeneral() {
  function set_grade_color(grade) {
    grade = parseFloat(grade);
    if (grade >= 85) {
      return colors_produ.basic.green;
    } else if (grade >= 60) {
      return colors_produ.basic.yellow;
    }
    return colors_produ.basic.red;
  }

  const [data_barchart, set_data_barchart] = useState(null);
  const [data_promedios_fantasma, set_data_promedios_fantasma] = useState({
    promedio_total_plantilla: null,
    promedio_total_plantilla_per_agency: null,
    promedio_total_plantilla_per_attribute: null,
    promedio_total_plantilla_per_medition: null,
  });
  const [no_data_flag, set_no_data_flag] = useState(false);
  const { data_fantasma_total } = useContext(DataFantasmaContext);

  useEffect(() => {
    if (!data_fantasma_total) return;
    if (!data_fantasma_total.promedio_total) return set_no_data_flag(true);
    set_no_data_flag(false);
    set_data_promedios_fantasma(data_fantasma_total.promedio_total);
  }, [data_fantasma_total]);

  useEffect(() => {
    if (!data_promedios_fantasma.promedio_total_plantilla_per_medition) return;
    set_data_barchart(
      format_for_datasets(
        data_promedios_fantasma.promedio_total_plantilla_per_medition
      )
    );
  }, [data_promedios_fantasma.promedio_total_plantilla_per_medition]);

  return (
    <section className="flex flex-col gap-3 items-center">
      <FilterBarClienteFantasma />
      {no_data_flag ? (
        <div className="flex justify-center items-center h-full w-full pt-10">
          <h1 className="text-2xl">No hay datos para mostrar</h1>
        </div>
      ) : (
        <section className="w-full flex flex-col gap-2">
          <section className="flex flex-col items-center gap-2 lg:flex-row justify-center">
            <div className="flex flex-col justify-center items-center gap-2 capitalize font-semibold w-1/3">
              <div className="text-2xl flex flex-row gap-1 text-color-green-produ-primary font-bold">
                Cliente
                <div className="text-color-green-produ-secondary">Fantasma</div>
              </div>
              {data_promedios_fantasma.promedio_total_plantilla && (
                <div className="justify-center items-center relative flex">
                  <div className="w-[250px] h-[250px]">
                    <PieChart
                      data={{
                        labels: [],
                        datasets: [
                          {
                            data: [
                              data_promedios_fantasma.promedio_total_plantilla,
                              100 -
                              data_promedios_fantasma.promedio_total_plantilla,
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
                  <div className="text-5xl absolute left-0 right-0 mx-auto bg-[#ffffff] rounded-full w-[180px] h-[180px] top-2 bottom-0 my-auto flex justify-center items-center text-center">
                    <p>
                      {toFixedIfNecessary(
                        data_promedios_fantasma.promedio_total_plantilla,
                        2
                      )}
                      %
                    </p>
                  </div>
                </div>
              )}
            </div>

            {data_promedios_fantasma.promedio_total_plantilla_per_agency && (
              <div className="w-2/3 max-w-[700px]">
                <ul className="shadow-[3px_0px_20px_-1px_#000000aa] px-2 py-1 grid grid-cols-4 bg-green-produ-primary text-slate-100 font-semibold rounded-t-lg text-center">
                  {labels_table.map((label, i) => {
                    return <li key={i}>{label}</li>;
                  })}
                </ul>
                <ul
                  className={`shadow-[3px_0px_20px_-1px_#000000aa] h-[${data_promedios_fantasma.promedio_total_plantilla_per_agency
                    .length > 5
                    ? "450px"
                    : "auto"
                    }]  overflow-y-auto`}
                >
                  {data_promedios_fantasma.promedio_total_plantilla_per_agency.map(
                    (data, i) => {
                      return (
                        <li
                          key={data.id}
                          className="px-2 grid grid-cols-4 border-b-[1px] border-slate-800 text-center"
                        >
                          <div className="border-l-[0px] border-slate-800">
                            <div></div>
                            <p>{data.agencia}</p>
                          </div>
                          {Object.keys(data.promedios_platilla).map(
                            (key_data, i) => {
                              return (
                                <div
                                  key={i}
                                  className="border-l-[1px] border-slate-800 flex flex-row justify-center items-center gap-1"
                                >
                                  <div className="flex flex-row justify-between items-center gap-1 w-[60px]">
                                    <div
                                      style={{
                                        backgroundColor: set_grade_color(
                                          data.promedios_platilla[key_data]
                                        ),
                                      }}
                                      className="h-5 w-5 rounded-full"
                                    ></div>
                                    <p>
                                      {toFixedIfNecessary(
                                        data.promedios_platilla[key_data]
                                      )}
                                      %
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </li>
                      );
                    }
                  )}
                </ul>
                {/* <div className="shadow-[3px_0px_20px_-1px_#000000aa] relative bg-green-produ-primary rounded-b-lg w-full text-slate-100 font-semibold">
                  <div className="flex flex-row justify-center items-center gap-2 py-1">
                    <div>Pagina siguiente</div>
                    <img src={arrow_icon} className="h-5 w-5" alt="flecha" />
                  </div>
                  <div className="text-xs absolute right-2 bottom-0 top-0 my-auto flex justify-center items-center">
                    <p className="">pagina 1 de 5</p>
                  </div>
                </div> */}
              </div>
            )}
          </section>
          <section className="w-full flex justify-center items-center px-4 rounded-lg">
            <div className="w-[min(800px,100%)] aspect-[2/1]">
              {data_barchart && <BarChart data={data_barchart} />}
            </div>
          </section>
        </section>
      )}
    </section>
  );
}

export default ClienteFantasmaGeneral;
