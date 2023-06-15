import React, { useContext, useEffect, useState } from "react";
import { getDataInicialFiltros3 } from "../../services/getDataFiltros";
import arrowIcon from "../../assets/icons/arrow.svg";
import { minimizeStr } from "../../functions/manageStr";
import { getToken } from "../../functions/general";
import { validateToken } from "../../services/token";
import {
  DataFiltradaContext,
  DataReporteEncuestaLealtadContext,
} from "../../pages/Home";
import { simpleAlertCallback } from "../../utils/manageAlerts";
import { useNavigate } from "react-router-dom";
function FilterBarGeneral({ callbackFilterData = () => { }, selectedModule }) {
  const dataFiltrada = useContext(DataFiltradaContext);
  const navigate = useNavigate();

  const { data_reporte_encuesta_lealtad } = useContext(
    DataReporteEncuestaLealtadContext
  );
  function verifyAllObject(obj) {
    let all = true;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (!element.selected) {
          all = false;
          break;
        }
      }
    }
    return all;
  }
  function handle_export_report() {
    const content_main = {
      title: "Exportar reporte",
      message: "¿Desea exportar el reporte?",
      typeOfAlert: "warning",
    };

    simpleAlertCallback(content_main, () => {
      fetch("/api/export_report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          data_reporte: {
            dashboard_general: null,
            encuesta_lealtad: data_reporte_encuesta_lealtad,
            voz_del_cliente: dataFiltrada,
          },
          report_type: selectedModule,
        }),
      })
        .then((res) => res.blob())
        .then((blob_reporte) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob_reporte);
          link.download = "report_voz_del_cliente.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.log(err);
        });
      // fetch("/api/export_users_test")
      //   .then((res) => res.blob())
      //   .then((blob_reporte) => {
      //     const link = document.createElement("a");
      //     link.href = URL.createObjectURL(blob_reporte);
      //     link.download = "report_voz_del_cliente.xlsx";
      //     document.body.appendChild(link);
      //     link.click();
      //     document.body.removeChild(link);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    });
  }
  function verifyAllArray(array) {
    let all = true;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (!element.selected) {
        all = false;
        break;
      }
    }
    return all;
  }

  const [zonas, setZonas] = useState({
    zona1: { selected: true, display_name: "Zona 1" },
    zona2: { selected: true, display_name: "Zona 2" },
  });

  const [tipo_agencias, setTipo_agencias] = useState({
    tipo_agencia1: { selected: true, display_name: "tipo agencia 1" },
    tipo_agencia2: { selected: true, display_name: "tipo agencia 2" },
  });

  const [indicadores, setIndicadores] = useState({
    indicador1: { selected: true, display_name: "Lealtad" },
    indicador2: { selected: false, display_name: "Atributos de servicio" },
  });

  const [subindicadores, setSubindicadores] = useState([
    {
      id: 1,
      name: "Satifacción general",
      selected: true,
      indicador: "indicador1",
    },
    {
      id: 2,
      name: "Recomendación",
      selected: true,
      indicador: "indicador1",
    },
    {
      id: 3,
      name: "Esfuerzo",
      selected: true,
      indicador: "indicador1",
    },
    {
      id: 4,
      name: "Agilidad",
      selected: true,
      indicador: "indicador2",
    },
    {
      id: 5,
      name: "Amabilidad",
      selected: true,
      indicador: "indicador2",
    },
  ]);
  const [periodos, set_periodos] = useState([
    {
      id: 1,
      name: "OCT-2022",
      selected: true,
      indicador: "periodo1",
    },
    {
      id: 2,
      name: "NOV-2022",
      selected: true,
      indicador: "periodo1",
    },
    {
      id: 3,
      name: "DIC-2022",
      selected: true,
      indicador: "periodo1",
    },
  ]);
  const [periodos_anio, set_periodos_anio] = useState([
    {
      id: 1,
      name: "2022",
      selected: true,
      indicador: "periodo1",
    },
    {
      id: 2,
      name: "2022",
      selected: true,
      indicador: "periodo1",
    },
    {
      id: 3,
      name: "2022",
      selected: true,
      indicador: "periodo1",
    },
  ]);
  const [periodos_mes, set_periodos_mes] = useState([
    {
      id: 1,
      name: "Oct",
      selected: true,
      indicador: "periodo1",
    },
    {
      id: 2,
      name: "Nov",
      selected: true,
      indicador: "periodo1",
    },
    {
      id: 3,
      name: "Dic",
      selected: true,
      indicador: "periodo1",
    },
  ]);
  const [cities, setCities] = useState([
    {
      id: 1,
      name: "Lima",
      selected: true,
      zona: "zona1",
    },
    {
      id: 2,
      name: "Arequipa",
      selected: true,
      zona: "zona2",
    },
    {
      id: 3,
      name: "Cusco",
      selected: true,
      zona: "zona2",
    },
  ]);
  const [agencias, setAgencias] = useState([
    {
      id: 1,
      name: "agencia1",
      selected: true,
      tipo_agencia: "tipo_agencia1",
      ciudad: "Lima",
      zona: "zona1",
    },
    {
      id: 2,
      name: "agencia2",
      selected: true,
      tipo_agencia: "tipo_agencia2",
      ciudad: "Lima",
      zona: "zona1",
    },
    {
      id: 3,
      name: "agencia3",
      selected: true,
      tipo_agencia: "tipo_agencia2",
      ciudad: "Lima",
      zona: "zona1",
    },
  ]);

  function format_periodos(periodos_array) {
    const periodos_anio_aux = [];
    const periodos_mes_aux = [];
    for (const periodo of periodos_array) {
      const periodo_separated = periodo.name.split("-");
      periodos_mes_aux.push({
        ...periodo,
        name: periodo_separated[0],
        year: periodo_separated[1],
      });
      periodos_anio_aux.push({ ...periodo, name: periodo_separated[1] });
    }
    return {
      periodos_anio_aux: periodos_anio_aux,
      periodos_mes_aux: periodos_mes_aux,
    };
  }

  useEffect(() => {
    getDataInicialFiltros3().then((res) => {
      console.log(res);
      if (res) {
        const { periodos_anio_aux, periodos_mes_aux } = format_periodos(res[4]);

        const token = getToken();
        if (token) {
          validateToken(token).then((data) => {
            // console.log(data);
            if (data && "success" in data && data.success) {
              const agencias_validas = data.payload.agencia.split(",");
              // console.log(res[3]);
              const agencias_encontradas = [];
              for (const agencia_aux of res[3]) {
                if (agencias_validas.includes(agencia_aux.name)) {
                  // console.log("agencia encontrada");
                  agencias_encontradas.push(agencia_aux);
                } else {
                  // console.log("agencia no encontrada");
                }
              }
              setZonas(res[0]);
              setCities(res[1]);
              setTipo_agencias(res[2]);
              if (data.payload.tipo_usuario === "administrador") {
                setAgencias(res[3]);
              } else {
                setAgencias(agencias_encontradas);
              }
              set_periodos_anio(periodos_anio_aux);
              set_periodos_mes(periodos_mes_aux);
              set_periodos(res[4]);
            } else {
              navigate("/login");
            }
          });
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    });
  }, []);
  useEffect(() => {
    callbackFilterData({
      zonas,
      tipo_agencias,
      indicadores,
      subindicadores,
      periodos,
      cities,
      agencias,
    });
  }, [
    zonas,
    tipo_agencias,
    indicadores,
    subindicadores,
    periodos,
    cities,
    agencias,
  ]);

  return (
    <section className="flex flex-row justify-center items-center w-full lg:max-w-[1150px] px-1 bg-color-filter-produ rounded-[0px_200px_0px_200px] text-xs 2xl:text-sm shadow-[3px_3px_4px_0px_#000000aa]">
      <section className="cursor-pointer relative group/menu_filtros py-1 flex flex-row gap-3 justify-center items-center text-slate-200/90 font-medium">
        <div className="flex lg:hidden w-[200px] h-6 relative px-2 flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90">
          <section className="w-full h-full flex flex-row justify-between items-center">
            <h2>Filtros</h2>
            <img
              className="h-4 w-4 filter contrast-[30%] outline-none group-hover/menu_filtros:contrast-100 group-hover/menu_filtros:rotate-180 duration-300 ease-in-out"
              src={arrowIcon}
              alt="arrow icon"
            />
          </section>
        </div>
        <div className="z-[700] px-2 lg:flex duration-300 lg:top-0 lg:left-0 md:top-[4px] md:left-[calc(50%+100px)] top-[30px] m-auto hidden lg:relative absolute group-hover/menu_filtros:flex hover:flex rounded-b-md outline-none cursor-pointer gap-2 text-slate-200 font-medium">
          <ul className="bg-[var(--green-produ-secondary)] py-1 lg:py-0 shadow-[0px_0px_10px_1px_#00000088] lg:shadow-none px-1 rounded-md lg:bg-transparent w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center text-slate-200/90 font-medium">
            <li className="w-full lg:w-[80px] 2xl:w-[100px] hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90">
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
                <li className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]">
                  <div className="flex flex-row justify-between gap-2">
                    <div>Todos</div>
                    <input
                      onChange={(e) => {
                        setZonas(
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
                      className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]"
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
                            setZonas({
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
            <li
              // style={{ minWidth: "130px" }}
              className="w-full lg:w-[110px] 2xl:w-[130px] hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
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
                <li className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]">
                  <div className="flex flex-row justify-between gap-2">
                    <div>Todos</div>
                    <input
                      onChange={(e) => {
                        setCities(
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
                        className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]"
                      >
                        <div className="flex flex-row justify-between w-full">
                          <div>{minimizeStr(city.name.toLowerCase(), 10)}</div>
                          <input
                            onChange={() => {
                              setCities(
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
            <li
              // style={{ minWidth: "120px" }}
              className="w-full lg:w-[110px] 2xl:w-[120px] hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
            >
              <section className="w-full h-full flex flex-row justify-between items-center">
                <div className="capitalize flex flex-row gap-1">
                  <div>Tipo Agencia</div>
                </div>
                <img
                  className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                  src={arrowIcon}
                  alt="arrow icon"
                />
              </section>
              <ul
                style={
                  Object.keys(tipo_agencias).length > 5
                    ? {
                      height: "300px",
                    }
                    : {}
                }
                className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
              >
                <li className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]">
                  <div className="flex flex-row justify-between gap-2">
                    <div>Todos</div>
                    <input
                      onChange={(e) => {
                        setTipo_agencias(
                          Object.keys(tipo_agencias).reduce((acc, key) => {
                            acc[key] = {
                              ...tipo_agencias[key],
                              selected: e.target.checked,
                            };
                            return acc;
                          }, {})
                        );
                      }}
                      checked={verifyAllObject(tipo_agencias)}
                      type="checkbox"
                    ></input>
                  </div>
                </li>
                {Object.keys(tipo_agencias).map((tipo_agencia_key, j) => {
                  return (
                    <li
                      key={j}
                      className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]"
                    >
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          {minimizeStr(
                            tipo_agencias[
                              tipo_agencia_key
                            ].display_name.toLowerCase(),
                            10
                          )}
                        </div>
                        <input
                          onChange={() => {
                            setTipo_agencias({
                              ...tipo_agencias,
                              [tipo_agencia_key]: {
                                ...tipo_agencias[tipo_agencia_key],
                                selected:
                                  !tipo_agencias[tipo_agencia_key].selected,
                              },
                            });
                          }}
                          checked={tipo_agencias[tipo_agencia_key].selected}
                          type="checkbox"
                        ></input>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li
              // style={{ minWidth: "150px" }}
              className="w-full lg:w-[130px] 2xl:w-[150px] hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
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
                    const flag_tipo_agencia = true;
                    return flag_city && flag_zona && flag_tipo_agencia;
                  }).length > 5
                    ? {
                      height: "170px",
                    }
                    : {}
                }
                className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
              >
                <li className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]">
                  <div className="flex flex-row justify-between gap-2">
                    <div>Todos</div>
                    <input
                      onChange={(e) => {
                        setAgencias(
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
                  const flag_tipo_agencia =
                    tipo_agencias[agencia.tipo_agencia].selected;
                  if (flag_city && flag_zona && flag_tipo_agencia) {
                    return (
                      <li
                        key={agencia.id}
                        className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]"
                      >
                        <div className="flex flex-row justify-between w-full">
                          <div>
                            {minimizeStr(agencia.name.toLowerCase(), 13)}
                          </div>
                          <input
                            onChange={() => {
                              setAgencias(
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

            {selectedModule !== "dashboard_general" && (
              <>
                <li
                  // style={{ minWidth: "150px" }}
                  className="w-full lg:w-[130px] 2xl:w-[150px] hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
                >
                  <section className="w-full h-full flex flex-row justify-between items-center">
                    <div className="capitalize flex flex-row gap-1">
                      <div>Tipo indicador</div>
                    </div>
                    <img
                      className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                      src={arrowIcon}
                      alt="arrow icon"
                    />
                  </section>
                  <ul
                    style={
                      Object.keys(indicadores).length > 5
                        ? {
                          height: "300px",
                        }
                        : {}
                    }
                    className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
                  >
                    {Object.keys(indicadores).map((indicador_key, j) => {
                      return (
                        <li
                          key={j}
                          className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]"
                        >
                          <div className="flex flex-row justify-between w-full">
                            <div>
                              {minimizeStr(
                                indicadores[
                                  indicador_key
                                ].display_name.toLowerCase(),
                                17
                              )}
                            </div>
                            <input
                              onChange={() => {
                                const temp = JSON.parse(
                                  JSON.stringify(indicadores)
                                );
                                Object.keys(temp).forEach(
                                  (indicador_key_aux) => {
                                    return (temp[indicador_key_aux].selected =
                                      indicador_key == indicador_key_aux);
                                  }
                                );
                                setIndicadores(temp);
                              }}
                              checked={indicadores[indicador_key].selected}
                              type="checkbox"
                            ></input>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                {/* <li
                  style={{ minWidth: "120px" }}
                  className=" hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
                >
                  <section className="w-full h-full flex flex-row justify-between items-center">
                    <div className="capitalize flex flex-row gap-1">
                      <div>Indicador</div>
                    </div>
                    <img
                      className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                      src={arrowIcon}
                      alt="arrow icon"
                    />
                  </section>
                  <ul
                    style={
                      subindicadores.length > 5
                        ? {
                            height: "300px",
                          }
                        : {}
                    }
                    className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
                  >
                    <li className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]">
                      <div className="flex flex-row justify-between gap-2">
                        <div>Todos</div>
                        <input
                          onChange={(e) => {
                            setSubindicadores(
                              subindicadores.map((subindicador) => {
                                return {
                                  ...subindicador,
                                  selected: e.target.checked,
                                };
                              })
                            );
                          }}
                          checked={verifyAllArray(subindicadores)}
                          type="checkbox"
                        ></input>
                      </div>
                    </li>
                    {subindicadores.map((subindicador) => {
                      if (indicadores[subindicador.indicador].selected) {
                        return (
                          <li
                            key={subindicador.id}
                            className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]"
                          >
                            <div className="flex flex-row justify-between w-full">
                              <div>
                                {minimizeStr(
                                  subindicador.name.toLowerCase(),
                                  10
                                )}
                              </div>
                              <input
                                onChange={() => {
                                  setSubindicadores(
                                    subindicadores.map((c) => {
                                      if (c.id === subindicador.id) {
                                        return {
                                          ...c,
                                          selected: !c.selected,
                                        };
                                      }
                                      return c;
                                    })
                                  );
                                }}
                                checked={subindicador.selected}
                                type="checkbox"
                              ></input>
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </li> */}
              </>
            )}
            <li
              // style={{ minWidth: "140px" }}
              className="w-full lg:w-[90px] 2xl:w-[100px] hover:shadow-[0px_0px_2px_2px_#0cd4d4] h-6 relative group/item px-1 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90"
            >
              <section className="w-full h-full flex flex-row justify-between items-center">
                <div className="capitalize flex flex-row gap-1">
                  <div>Periodos</div>
                </div>
                <img
                  className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item:contrast-100 group-hover/item:rotate-180 duration-300 ease-in-out"
                  src={arrowIcon}
                  alt="arrow icon"
                />
              </section>
              <ul
                style={
                  periodos.length > 5
                    ? {
                      height: "300px",
                    }
                    : {}
                }
                className="z-[500] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium"
              >
                <li className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]">
                  <div className="flex flex-row justify-between gap-2">
                    <div>Todos</div>
                    <input
                      onChange={(e) => {
                        set_periodos(
                          periodos.map((periodo) => {
                            return {
                              ...periodo,
                              selected: e.target.checked,
                            };
                          })
                        );
                      }}
                      checked={verifyAllArray(periodos)}
                      type="checkbox"
                    ></input>
                  </div>
                </li>
                {periodos.map((periodo) => {
                  return (
                    <li
                      key={periodo.id}
                      className="capitalize bg-[var(--green-produ-tertiary)] rounded-md px-1 hover:bg-[var(--green-produ-secondary)]"
                    >
                      <div className="flex flex-row justify-between w-full">
                        <div>{minimizeStr(periodo.name.toLowerCase(), 15)}</div>
                        <input
                          onChange={() => {
                            set_periodos(
                              periodos.map((c) => {
                                if (c.id === periodo.id) {
                                  return {
                                    ...c,
                                    selected: !c.selected,
                                  };
                                }
                                return c;
                              })
                            );
                          }}
                          checked={periodo.selected}
                          type="checkbox"
                        ></input>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="w-[110px] cursor-pointer gap-2 flex justify-center items-center">
              <button
                onClick={() => {
                  handle_export_report();
                }}
                className="duration-300 hover:border-cyan-300/60 hover:text-slate-800 border-[1px] border-transparent w-full h-6 bg-[#000000] hover:bg-transparent px-4 hover:shadow-[0px_0px_15px_1px_#0cd4d477] font-bold text-slate-200 rounded-lg"
              >
                Exportar
              </button>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
}
export default FilterBarGeneral;
