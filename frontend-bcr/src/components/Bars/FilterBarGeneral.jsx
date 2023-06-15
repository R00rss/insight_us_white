import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInicialDataEncuesta } from "../../services/inicialData";
import arrowIcon from "../../assets/icons/arrow.svg";
import { minimizeStr } from "../../functions/manageStr";

const default_options_filter_bar = {
  zona: {
    display_name: "Zona",
    name: "zona",
    options: { all: [] },
  },
  ciudad: {
    display_name: "Ciudad",
    name: "ciudad",
    options: { all: [] },
  },
  "tipo agencia": {
    display_name: "Tipo de agencia",
    name: "tipo agencia",
    options: { all: [] },
  },
  agencia: {
    display_name: "Agencia",
    name: "agencia",
    options: { all: [] },
  },
  indicador: {
    display_name: "Indicador",
    name: "indicador",
    options: { all: [] },
  },
  subindicador: {
    display_name: "Subindicador",
    name: "subindicador",
    options: { all: [], experiencia: [], 'promesa de servicio': [] },
  },
  periodo: {
    display_name: "Periodo",
    name: "periodo",
    options: { all: [] },
  },
};

function FilterBarGeneral({ callbackFilterData }) {
  const [options_filter_bar, set_options_filter_bar] = useState(default_options_filter_bar);
  const [selectedData, setSelectedData] = useState({
    zona: [],
    ciudad: [],
    "tipo agencia": [],
    agencia: [],
    indicador: [],
    subindicador: [],
    periodo: [],
  });
  useEffect(() => {
    getInicialDataEncuesta().then((response) => {
      if ("success" in response && response.success) {
        const options_filter_bar_temp = {
          zona: {
            display_name: "Zona",
            name: "zona",
            options: {
              all: response.payload.zonas.map(zona => {
                return {
                  display_name: zona,
                  name: zona,
                  value: true
                }
              })
            }
          },
          ciudad: {
            display_name: "Ciudades",
            name: "ciudad",
            options: {
              all: response.payload.ciudades.map(ciudad => {
                return {
                  display_name: ciudad,
                  name: ciudad,
                  value: true
                }
              })
            }
          },
          'tipo agencia': {
            display_name: "Tipo de agencia",
            name: "tipo agencia",
            options: {
              all: response.payload['tipos de agencia'].map(tipo_agencia => {
                return {
                  display_name: tipo_agencia,
                  name: tipo_agencia,
                  value: true
                }
              })
            }
          },
          agencia: {
            display_name: "Agencia",
            name: "agencia",
            options: {
              all: response.payload.agencias.map(agencia => {
                return {
                  display_name: agencia,
                  name: agencia,
                  value: true
                }
              })
            }
          },
          indicador: {
            display_name: "Indicador",
            name: "indicador",
            options: {
              all: response.payload.indicadores.map(indicador => {
                return {
                  display_name: indicador,
                  name: indicador,
                  value: true
                }
              })
            }
          },
          subindicador: {
            display_name: "Subindicador",
            name: "subindicador",
            options: {
              'experiencia': response.payload.subindicadores[response.payload.indicadores[0]].map(subindicador => {
                return {
                  display_name: subindicador,
                  name: subindicador,
                  value: true
                }
              }),
              'promesa de servicio': response.payload.subindicadores[response.payload.indicadores[1]].map(subindicador => {
                return {
                  display_name: subindicador,
                  name: subindicador,
                  value: true
                }
              }),
            },
          },
          periodo: {
            display_name: "Periodo",
            name: "periodo",
            options: {
              all: response.payload.periodos.map(periodo => {
                return {
                  display_name: periodo,
                  name: periodo,
                  value: true
                }
              })
            }
          },
        };
        set_options_filter_bar(options_filter_bar_temp);
      }
    });
  }, []);
  // useEffect(() => {
  //   if (selectedData.indicador !== "") {
  //     const dataSelectedTemp = {
  //       ...selectedData,
  //       subindicador:
  //         dataToFilter.subindicador[selectedData.indicador][0] || "Todos",
  //     };
  //     setSelectedData(dataSelectedTemp);
  //   }
  // }, [selectedData.indicador]);

  // useEffect(() => {
  //   if (options_filter_bar.indicador.options.length > 0) {

  //   }
  //   return () => { }
  // }, [options_filter_bar.indicador.options])

  useEffect(() => {
    callbackFilterData(options_filter_bar);
    console.log(options_filter_bar);
    return () => { }
  }, [
    options_filter_bar.zona.options,
    options_filter_bar.ciudad.options,
    options_filter_bar['tipo agencia'].options,
    options_filter_bar.agencia.options,
    options_filter_bar.indicador.options,
    options_filter_bar.subindicador.options,
    options_filter_bar.periodo.options,
  ]);

  return (
    <section className="flex flex-row justify-center xl:justify-between items-center w-full px-1 navbarColor2 rounded-[0px_200px_0px_200px] text-xs shadow-[3px_3px_4px_0px_#000000aa]">
      <section className="cursor-pointer relative group/menu_filtros py-1 w-[200px] xl:w-full flex flex-row gap-3 justify-center items-center text-slate-200/90 font-medium">
        <div className="flex xl:hidden w-[200px] h-6 relative px-2 flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90">
          <section className="w-full h-full flex flex-row justify-between items-center">
            <h2>Filtros</h2>
            <img
              className="h-4 w-4 filter contrast-[30%] outline-none group-hover/menu_filtros:contrast-100 group-hover/menu_filtros:rotate-180 duration-300 ease-in-out"
              src={arrowIcon}
              alt="arrow icon"
            />
          </section>
        </div>
        <div className="z-[700] px-2 xl:flex duration-300 xl:top-0 xl:left-0 lg:top-[4px] lg:left-[calc(50%+100px)] top-[30px] m-auto lg:md-none hidden xl:relative absolute group-hover/menu_filtros:flex hover:flex rounded-b-md outline-none cursor-pointer gap-2 text-slate-200 font-medium">
          <ul className="bg-cyan-300 py-1 xl:py-0 shadow-[0px_0px_10px_1px_#00000088] xl:shadow-none px-1 rounded-md xl:bg-transparent w-full flex flex-col xl:flex-row gap-1 xl:gap-3 justify-center items-center text-slate-200/90 font-medium">
            {options_filter_bar && Object.keys(options_filter_bar).map((option_filter_bar_key, i) => {
              return (
                <li
                  style={{ minWidth: "100px" }}
                  // style={{ width: "fit-contain", minWidth: "90px" }}
                  // style={{ width: "fit-contain"}}
                  key={i}
                  className=" hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
                >
                  <section className="w-full h-full flex flex-row justify-between items-center">
                    <div className="capitalize flex flex-row gap-1">
                      <div>{options_filter_bar[option_filter_bar_key].display_name}:</div>
                      {/* <div className="text-cyan-500">
                        {minimizeStr(
                          selectedData[keyData]?.toLowerCase(),
                          10
                        )}
                      </div> */}
                    </div>
                    <img
                      className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                      src={arrowIcon}
                      alt="arrow icon"
                    />
                  </section>
                  <ul
                    style={
                      options_filter_bar[option_filter_bar_key].options.length > 5
                        ? {
                          height: "300px",
                        }
                        : {}
                    }
                    className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
                  >
                    {(!["indicador", "subindicador"].includes(option_filter_bar_key)) && (

                      <li
                        className="capitalize bg-[#0cd4d4bb] rounded-md px-1 hover:bg-[#0cd4d477]"
                      >
                        <div className="flex flex-row justify-between gap-2">
                          <div>Todos</div>
                          <input type="checkbox" checked={true}></input>
                        </div>
                      </li>
                    )}
                    {option_filter_bar_key === "subindicador" ? (<>
                      {options_filter_bar[option_filter_bar_key].options[`${options_filter_bar.indicador.options.all[0]?.value ? 'experiencia' : 'promesa de servicio'}`].map((option, j) => (
                        <li
                          key={j}
                          className="capitalize bg-[#0cd4d4bb] rounded-md px-1 hover:bg-[#0cd4d477]"
                          onClick={() => set_options_filter_bar(
                            (prev) => ({
                              ...prev,
                              [option_filter_bar_key]: {
                                ...prev[option_filter_bar_key],
                                options: {
                                  ...prev[option_filter_bar_key].options,
                                  [`${options_filter_bar.indicador.options.all[0]?.value ? 'experiencia' : 'promesa de servicio'}`]: prev[option_filter_bar_key].options[`${options_filter_bar.indicador.options.all[0]?.value ? 'experiencia' : 'promesa de servicio'}`].map((item, i) => {
                                    if (i === j) {
                                      return {
                                        ...item,
                                        value: !item.value,
                                      };
                                    }
                                    return item;
                                  }),
                                }
                              },
                            })
                          )}
                        >
                          <div
                            className="flex flex-row justify-between w-full">
                            <div>
                              {minimizeStr(option.display_name.toLowerCase(), 10)}
                            </div>
                            <input checked={option.value} readOnly
                              type="checkbox"></input>
                          </div>
                        </li>
                      ))}
                    </>) : <>
                      {options_filter_bar[option_filter_bar_key].options.all.map((option, j) => (
                        <li
                          key={j}
                          className="capitalize bg-[#0cd4d4bb] rounded-md px-1 hover:bg-[#0cd4d477]"
                          onClick={() => {
                            set_options_filter_bar(
                              (prev) => ({
                                ...prev,
                                [option_filter_bar_key]: {
                                  ...prev[option_filter_bar_key],
                                  options: {
                                    all: prev[option_filter_bar_key].options.all.map((item, i) => {
                                      if (i === j) {
                                        return {
                                          ...item,
                                          value: !item.value,
                                        };
                                      }
                                      return item;
                                    })
                                  },
                                },
                              })
                            )
                          }}
                        >
                          <div className="flex flex-row justify-between">
                            <div>
                              {minimizeStr(option.display_name.toLowerCase(), 10)}
                            </div>
                            <input checked={option.value} readOnly
                              type="checkbox"></input>
                          </div>
                        </li>
                      ))}
                    </>

                    }


                  </ul>
                </li>
              );
            })}
            <li className="w-[110px] cursor-pointer gap-2 flex justify-center items-center">
              <button className="duration-300 hover:border-cyan-300/60 hover:text-slate-800 border-[1px] border-transparent w-full h-6 bg-[#000000] hover:bg-transparent px-4 hover:shadow-[0px_0px_15px_1px_#0cd4d477] font-bold text-slate-200 rounded-lg">
                Exportar
              </button>
            </li>
          </ul>
        </div>
      </section>
    </section >
  );
}
export default FilterBarGeneral;