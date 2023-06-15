import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../functions/general";
import { get_data_filtros_fantasma } from "../../services/getDataFiltros";
import { validateToken } from "../../services/token";
import arrowIcon from "../../assets/icons/arrow.svg";
import { verifyAllObject } from "../../functions/ManageObjs";
import { minimizeStr } from "../../functions/manageStr";
import { verifyAllArray } from "../../functions/manageArray";
import { get_data_fantasma_filtered } from "../../services/clienteFantasma";
import { DataFantasmaContext } from "../../pages/Home";

function FilterBarClienteFantasma() {
  const { set_data_fantasma_total } = useContext(DataFantasmaContext);
  const [mediciones, set_mediciones] = useState(null);
  const [zonas, set_zonas] = useState(null);
  const [cities, set_cities] = useState(null);
  const [agencias, set_agencias] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    get_data_filtros_fantasma(2).then((res) => {
      console.log(res);
      if (!res) navigate("/login");
      const token = getToken();
      if (!token) navigate("/login");
      validateToken(token).then((data) => {
        if (!data || !("success" in data) || !data.success) navigate("/login");

        const agencias_validas = data.payload.agencia.split(",");
        const agencias_encontradas = [];
        for (const agencia_aux of res[3]) {
          if (agencias_validas.includes(agencia_aux.name))
            agencias_encontradas.push(agencia_aux);
        }
        set_zonas(res[1]);
        set_cities(res[2]);

        console.log(res[0]);
        set_mediciones(res[0]);
        set_agencias(agencias_encontradas);
        // if (data.payload.tipo_usuario === "administrador") {
        //   set_mediciones(res[0]);
        //   set_agencias(res[3]);
        // } else {
        //   set_agencias(agencias_encontradas);
        //   set_mediciones({ M0: { display_name: "M0", id: 0, selected: true } });
        // }
      });
    });
  }, []);
  useEffect(() => {
    if (!mediciones || !zonas || !cities || !agencias) return;
    get_data_fantasma_filtered({ mediciones, zonas, cities, agencias }).then(
      (res) => {
        if (!res) return;
        set_data_fantasma_total(res);
        // callbackFilterData(res);
      }
    );
  }, [mediciones, zonas, cities, agencias]);
  return (
    <section className="flex flex-row justify-center items-center w-full xl:max-w-[1150px] px-1 bg-color-filter-produ rounded-[0px_200px_0px_200px] text-xs lg:text-sm  shadow-[3px_3px_4px_0px_#000000aa]">
      <section className="cursor-pointer relative group/menu_filtros py-1 flex flex-row gap-3 justify-center items-center text-slate-200/90 font-medium">
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
            {mediciones && (
              <li
                style={{ minWidth: "120px" }}
                className=" hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
              >
                <section className="w-full h-full flex flex-row justify-between items-center">
                  <div className="capitalize flex flex-row gap-1">
                    <div>Mediciones</div>
                  </div>
                  <img
                    className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                    src={arrowIcon}
                    alt="arrow icon"
                  />
                </section>
                <ul
                  style={
                    Object.keys(mediciones).length > 5
                      ? {
                          height: "300px",
                        }
                      : {}
                  }
                  className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
                >
                  <li className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]">
                    <div className="flex flex-row justify-between gap-2">
                      <div>Todos</div>
                      <input
                        onChange={(e) => {
                          set_mediciones(
                            Object.keys(mediciones).reduce((acc, key) => {
                              acc[key] = {
                                ...mediciones[key],
                                selected: e.target.checked,
                              };
                              return acc;
                            }, {})
                          );
                        }}
                        checked={verifyAllObject(mediciones)}
                        type="checkbox"
                      ></input>
                    </div>
                  </li>
                  {Object.keys(mediciones).map((medicion_key, j) => {
                    return (
                      <li
                        key={j}
                        className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]"
                      >
                        <div className="flex flex-row justify-between w-full">
                          <div>
                            {minimizeStr(
                              mediciones[
                                medicion_key
                              ].display_name.toLowerCase(),
                              10
                            )}
                          </div>
                          <input
                            onChange={() => {
                              set_mediciones({
                                ...mediciones,
                                [medicion_key]: {
                                  ...mediciones[medicion_key],
                                  selected: !mediciones[medicion_key].selected,
                                },
                              });
                            }}
                            checked={mediciones[medicion_key].selected}
                            type="checkbox"
                          ></input>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            )}
            {zonas && (
              <li
                style={{ minWidth: "120px" }}
                className=" hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
              >
                <section className="w-full h-full flex flex-row justify-between items-center">
                  <div className="capitalize flex flex-row gap-1">
                    <div>Zona</div>
                  </div>
                  <img
                    className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                    src={arrowIcon}
                    alt="arrow icon"
                  />
                </section>
                <ul
                  style={
                    Object.keys(zonas).length > 5
                      ? {
                          height: "300px",
                        }
                      : {}
                  }
                  className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
                >
                  <li className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]">
                    <div className="flex flex-row justify-between gap-2">
                      <div>Todos</div>
                      <input
                        onChange={(e) => {
                          set_zonas(
                            Object.keys(zonas).reduce((acc, key) => {
                              acc[key] = {
                                ...zonas[key],
                                selected: e.target.checked,
                              };
                              return acc;
                            }, {})
                          );
                        }}
                        checked={verifyAllObject(zonas)}
                        type="checkbox"
                      ></input>
                    </div>
                  </li>
                  {Object.keys(zonas).map((zona_key, j) => {
                    return (
                      <li
                        key={j}
                        className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]"
                      >
                        <div className="flex flex-row justify-between w-full">
                          <div>
                            {minimizeStr(
                              zonas[zona_key].display_name.toLowerCase(),
                              10
                            )}
                          </div>
                          <input
                            onChange={() => {
                              set_zonas({
                                ...zonas,
                                [zona_key]: {
                                  ...zonas[zona_key],
                                  selected: !zonas[zona_key].selected,
                                },
                              });
                            }}
                            checked={zonas[zona_key].selected}
                            type="checkbox"
                          ></input>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            )}
            {cities && (
              <li
                style={{ minWidth: "130px" }}
                className=" hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
              >
                <section className="w-full h-full flex flex-row justify-between items-center">
                  <div className="capitalize flex flex-row gap-1">
                    <div>Ciudad</div>
                  </div>
                  <img
                    className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                    src={arrowIcon}
                    alt="arrow icon"
                  />
                </section>
                <ul
                  style={
                    cities.filter((city) => {
                      const flag_zona = zonas[city.zona].selected;
                      return flag_zona;
                    }).length > 5
                      ? {
                          height: "170px",
                        }
                      : {}
                  }
                  className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
                >
                  <li className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]">
                    <div className="flex flex-row justify-between gap-2">
                      <div>Todos</div>
                      <input
                        onChange={(e) => {
                          set_cities(
                            cities.map((city) => {
                              return {
                                ...city,
                                selected: e.target.checked,
                              };
                            })
                          );
                        }}
                        checked={verifyAllArray(cities)}
                        type="checkbox"
                      ></input>
                    </div>
                  </li>
                  {cities.map((city) => {
                    if (zonas[city.zona].selected) {
                      return (
                        <li
                          key={city.id}
                          className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]"
                        >
                          <div className="flex flex-row justify-between w-full">
                            <div>
                              {minimizeStr(city.name.toLowerCase(), 10)}
                            </div>
                            <input
                              onChange={() => {
                                set_cities(
                                  cities.map((c) => {
                                    if (c.id === city.id) {
                                      return {
                                        ...c,
                                        selected: !c.selected,
                                      };
                                    }
                                    return c;
                                  })
                                );
                              }}
                              checked={city.selected}
                              type="checkbox"
                            ></input>
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </li>
            )}
            {agencias && (
              <li
                style={{ minWidth: "150px" }}
                className=" hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
              >
                <section className="w-full h-full flex flex-row justify-between items-center">
                  <div className="capitalize flex flex-row gap-1">
                    <div>Agencias</div>
                  </div>
                  <img
                    className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                    src={arrowIcon}
                    alt="arrow icon"
                  />
                </section>
                <ul
                  style={
                    agencias.filter((agencia) => {
                      const flag_city =
                        cities.filter(
                          (ciudad) =>
                            ciudad.name === agencia.ciudad && ciudad.selected
                        ).length > 0;
                      const flag_zona = zonas[agencia.zona].selected;
                      return flag_city && flag_zona;
                    }).length > 5
                      ? {
                          height: "170px",
                        }
                      : {}
                  }
                  className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
                >
                  <li className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]">
                    <div className="flex flex-row justify-between gap-2">
                      <div>Todos</div>
                      <input
                        onChange={(e) => {
                          set_agencias(
                            agencias.map((agencia) => {
                              return {
                                ...agencia,
                                selected: e.target.checked,
                              };
                            })
                          );
                        }}
                        checked={verifyAllArray(agencias)}
                        type="checkbox"
                      ></input>
                    </div>
                  </li>
                  {agencias.map((agencia) => {
                    const flag_city =
                      cities.filter(
                        (ciudad) =>
                          ciudad.name === agencia.ciudad && ciudad.selected
                      ).length > 0;
                    const flag_zona = zonas[agencia.zona].selected;
                    if (flag_city && flag_zona) {
                      return (
                        <li
                          key={agencia.id}
                          className="capitalize bg-[#0db83b] rounded-md px-1 hover:bg-[#0db83b55]"
                        >
                          <div className="flex flex-row justify-between w-full">
                            <div>
                              {minimizeStr(agencia.name.toLowerCase(), 13)}
                            </div>
                            <input
                              onChange={() => {
                                set_agencias(
                                  agencias.map((c) => {
                                    if (c.id === agencia.id) {
                                      return {
                                        ...c,
                                        selected: !c.selected,
                                      };
                                    }
                                    return c;
                                  })
                                );
                              }}
                              checked={agencia.selected}
                              type="checkbox"
                            ></input>
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </section>
    </section>
  );
}

export default FilterBarClienteFantasma;
