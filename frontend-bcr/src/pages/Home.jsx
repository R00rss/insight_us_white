import React, { createContext, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/Bars/SideBar";
import EncuestaSatisfaccion from "./EncuestaSatisfaccion";
import ClienteFantasmaIndividual from "../components/cliente_fantasma/ClienteFantasmaIndividual";
import VozDelCliente from "./VozDelCliente";
import DashboardGeneral from "../components/dashboards/DashboardGeneral";
import { useFetch } from "../hooks/useFetch";
import simpleAlert from "../utils/manageAlerts";
import { validateSession } from "../functions/validate";
import FilterBarGeneral from "../components/Bars/FilterBarLast";
import { toFixedIfNecessary } from "../functions/manageNumbers";
import ClienteFantasmaGeneral from "./ClienteFantasmaGeneral";
import {
  categorizarCalificacionCES,
  categorizarCalificacionPromesa,
  getToken,
  relation_mediccion_mes,
} from "../functions/general";
import { dataTotalEncuestsRoutePath } from "../services/getData";
import { get_data_filtros_fantasma } from "../services/getDataFiltros";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../services/token";
import { get_data_fantasma_filtered } from "../services/clienteFantasma";
// import IngresoFantasma from "../components/calidad/ingreso/IngresoFantasma";
import IngresoFantasma from "../components/cliente_fantasma/IngresoFantasma";
export const DataTotalContext = createContext(null);
export const DataForFilterFantasma = createContext(null);
export const DataSeleccionadaFiltros = createContext(null);
export const DataFiltradaContext = createContext(null);
export const DataFilterContext = createContext(null);
export const DataReporteEncuestaLealtadContext = createContext(null);
export const DataFantasmaContext = createContext(null);

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error, aboutController } = useFetch(
    dataTotalEncuestsRoutePath
  );
  const [data_fantasma_filters, set_data_fantasma_filters] = useState({
    mediciones: null,
    zonas: null,
    cities: null,
    agencias: null,
  });

  const sideBar = useSelector((state) => state.sideBarSelection.value);
  const user_info = useSelector((state) => state.userData.value);

  const [selectedData, setSelectedData] = useState(null);
  const [data_fantasma_total, set_data_fantasma_total] = useState(null);
  const [data_reporte_encuesta_lealtad, set_data_reporte_encuesta_lealtad] =
    useState(null);
  const [dataFiltrada, setDataFiltrada] = useState(null);
  const [dataFiltradaPromesa, setDataFiltradaPromesa] = useState({
    experiencia: null,
    promesa: null,
  });
  useEffect(() => {
    validateSession(dispatch);
  }, []);

  useEffect(() => {
    setDataFiltradaPromesa(formatData(dataFiltrada));
    // setDataFiltradaPromesa(formatData(data));
  }, [dataFiltrada]);
  useEffect(() => {
    if (selectedData && data) {
      const selectedDataClone = JSON.parse(JSON.stringify(selectedData));
      const {
        zonas,
        indicadores,
        tipo_agencias,
        cities,
        subindicadores,
        agencias,
        periodos,
      } = selectedDataClone;
      const selectedZonas = Object.keys(zonas).filter(
        (key_zona) => zonas[key_zona].selected
      );
      const selectedIndicadores = Object.keys(indicadores).filter(
        (key_indicador) => indicadores[key_indicador].selected
      );
      const selectedTipoAgencias = Object.keys(tipo_agencias).filter(
        (key_tipo_agencia) => tipo_agencias[key_tipo_agencia].selected
      );
      const selectedCities = cities.map((citie) => {
        if (citie.selected && zonas[citie.zona].selected) {
          return citie.name;
        }
      });
      const selectedSubindicadores = subindicadores.map((subindicador) => {
        if (subindicador.selected) {
          return subindicador.name;
        }
      });
      const selectedAgencias = agencias
        .filter((agencia) => {
          const flag_city =
            cities.filter(
              (ciudad) => ciudad.name === agencia.ciudad && ciudad.selected
            ).length > 0;
          const flag_zona = zonas[agencia.zona].selected;
          const flag_tipo_agencia =
            tipo_agencias[agencia.tipo_agencia].selected;
          const flag_agencia = agencia.selected;
          return flag_city && flag_zona && flag_tipo_agencia && flag_agencia;
        })
        .map((agencia) => agencia.name);

      const selectedPeriodos = periodos
        .filter((item) => item.selected)
        .map((periodo) => periodo.name);

      const data_filtrada_aux = data.filter((item) => {
        return (
          selectedZonas.includes(item.zona) &&
          //   selectedIndicadores.includes(item.indicador) &&
          selectedTipoAgencias.includes(item.tipo_agencia) &&
          selectedCities.includes(item.ciudad) &&
          //   selectedSubindicadores.includes(item.subindicador) &&
          selectedAgencias.includes(item.agencia) &&
          selectedPeriodos.includes(item.periodo)
        );
      });
      setDataFiltrada(data_filtrada_aux);
      const mediciones = {};

      periodos.forEach((periodo) => {
        const aux_key = relation_mediccion_mes(periodo.name.slice(0, 3));

        if (aux_key) {
          mediciones[aux_key] = {
            id: periodo.id,
            display_name: aux_key,
            selected:
              aux_key in mediciones
                ? mediciones[aux_key].selected || periodo.selected
                : periodo.selected,
          };
        }
      });
      get_data_fantasma_filtered({
        mediciones,
        zonas,
        cities,
        agencias,
      }).then((res) => {
        if (!res) return;
        set_data_fantasma_total(res);
      });
    }
  }, [selectedData]);

  useEffect(() => {
    console.log(data_fantasma_total);
  }, [data_fantasma_total]);

  useEffect(() => {
    get_data_filtros_fantasma(2).then((res) => {
      if (!res) return; //navigate("/login");
      const token = getToken();
      if (!token) return; //navigate("/login");
      validateToken(token).then((data) => {
        if (!data || !("success" in data) || !data.success) return; //navigate("/login");

        const agencias_validas = data.payload.agencia.split(",");
        const agencias_encontradas = [];
        for (const agencia_aux of res[3]) {
          if (agencias_validas.includes(agencia_aux.name))
            agencias_encontradas.push(agencia_aux);
        }
        set_data_fantasma_filters({
          mediciones: res[0],
          zonas: res[1],
          cities: res[2],
          agencias: agencias_encontradas,
          // agencias: res[3];
        });
      });
    });
  }, []);
  useEffect(() => {
    console.log(data_fantasma_filters);
    if (
      !data_fantasma_filters.mediciones ||
      !data_fantasma_filters.zonas ||
      !data_fantasma_filters.cities ||
      !data_fantasma_filters.agencias
    )
      return;
    get_data_fantasma_filtered({ ...data_fantasma_filters }).then((res) => {
      if (!res) return;
      set_data_fantasma_total(res);
    });
  }, [
    data_fantasma_filters.mediciones,
    data_fantasma_filters.zonas,
    data_fantasma_filters.cities,
    data_fantasma_filters.agencias,
  ]);

  function formatData(data, type_keys = 1) {
    const keys = [
      {
        key: "respuesta_ins",
        label: "INS",
        name: "Indice Neto de satisfacción",
        group: "promesa",
      },
      {
        key: "respuesta_nps",
        label: "NPS",
        name: "Indice Neto de Recomendación",
        group: "promesa",
      },
      {
        key: "respuesta_ces",
        label: "CES",
        name: "Nivel de Esfuerzo",
        group: "promesa",
      },
      {
        key: "respuesta_agilidad",
        label: "Agilidad",
        name: "Indice Neto de Agilidad",
        group: "experiencia",
      },
      {
        key: "respuesta_amabilidad",
        label: "Amabilidad",
        name: "Indice Neto de Amabilidad",
        group: "experiencia",
      },
    ];
    let result = null;
    let result_final = null;
    if (data && data.length > 0) {
      result = {};
      result_final = { promesa: {}, experiencia: {} };
      keys.forEach((obj_key) => {
        let acc_prom = 0;
        let acc_bad = 0;
        let acc_middle = 0;
        let acc_good = 0;
        let longitud_datos = data.length;
        data.forEach((row, index) => {
          let aux = row[obj_key.key];
          if (!(aux === null || aux === undefined || aux === "")) {
            const aux_int = parseInt(aux);
            let aux_categorizado;
            if (obj_key.key === "respuesta_ces") {
              aux_categorizado = categorizarCalificacionCES(aux);
              if (aux_categorizado === 1) acc_bad += 1;
              if (aux_categorizado === -1) acc_middle += 1; //porque no existe -1 acc_middle siempre es 0;
              if (aux_categorizado === 0) acc_good += 1;
              acc_prom += aux_categorizado;
            } else {
              aux_categorizado = categorizarCalificacionPromesa(aux_int);
              if (aux_categorizado === -1) acc_bad += 1;
              if (aux_categorizado === 0) acc_middle += 1;
              if (aux_categorizado === 1) acc_good += 1;
              acc_prom += aux_categorizado;
            }
          } else {
            longitud_datos--;
          }
        });
        const prom = toFixedIfNecessary((acc_prom / longitud_datos) * 100, 2);
        const prom_bad = toFixedIfNecessary(
          (acc_bad / longitud_datos) * 100,
          2
        );
        const prom_middle = toFixedIfNecessary(
          (acc_middle / longitud_datos) * 100,
          2
        );
        const prom_good = toFixedIfNecessary(
          (acc_good / longitud_datos) * 100,
          2
        );

        result[obj_key.label] = {
          data: {
            bajo: prom_bad,
            medio: prom_middle,
            alto: prom_good,
            promedio: prom,
          },
          info: {
            label: obj_key.label,
            name: obj_key.name,
            group: obj_key.group,
          },
        };
      });
      Object.keys(result).forEach((result_key, i) => {
        if (result[result_key].info.group === "promesa") {
          result_final.promesa[result_key] = result[result_key];
        } else {
          result_final.experiencia[result_key] = result[result_key];
        }
      });
    }
    return result_final;
  }
  if (error) {
    simpleAlert("Error al cargar los datos", "error", "Error");
    window.location.href = "/login";
    return <></>;
  } else {
    return (
      <Layout>
        {loading ? (
          <>cargando...</>
        ) : (
          <DataTotalContext.Provider value={data}>
            <DataFantasmaContext.Provider
              value={{
                data_fantasma_total,
                set_data_fantasma_total,
              }}
            >
              <DataSeleccionadaFiltros.Provider value={selectedData}>
                <DataFiltradaContext.Provider value={dataFiltrada}>
                  <DataReporteEncuestaLealtadContext.Provider
                    value={{
                      data_reporte_encuesta_lealtad,
                      set_data_reporte_encuesta_lealtad,
                    }}
                  >
                    <main className="flex flex-row justify-between pt-4 px-2">
                      <section className="min-w-[85px] w-[85px] md:w-[220px] ">
                        <SideBar />
                      </section>

                      <section className="min-h-screen w-full">
                        {!sideBar.cliente_fantasma.state && (
                          <div className="w-full flex justify-center items-center">
                            <FilterBarGeneral
                              selectedModule={
                                sideBar.encuesta_general.state
                                  ? "dashboard_general"
                                  : sideBar.encuesta_lealtad.state &&
                                    sideBar.encuesta_lealtad.subMenu.general
                                      .state
                                    ? "encuesta_lealtad"
                                    : sideBar.encuesta_lealtad.state &&
                                      sideBar.encuesta_lealtad.subMenu
                                        .voz_del_cliente.state
                                      ? "voz_del_cliente"
                                      : "cliente_fantasma"
                              }
                              callbackFilterData={(data) =>
                                setSelectedData(data)
                              }
                            />
                          </div>
                        )}
                        <DataFilterContext.Provider value={dataFiltradaPromesa}>
                          {sideBar.encuesta_general.state && (
                            <DashboardGeneral />
                          )}
                          {sideBar.encuesta_lealtad.state &&
                            sideBar.encuesta_lealtad.subMenu.general.state && (
                              <EncuestaSatisfaccion />
                            )}
                          {sideBar.encuesta_lealtad.state &&
                            sideBar.encuesta_lealtad.subMenu.voz_del_cliente
                              .state && <VozDelCliente />}
                          {sideBar.cliente_fantasma.state &&
                            sideBar.cliente_fantasma.subMenu.general.state && (
                              <ClienteFantasmaGeneral />
                            )}
                          {sideBar.cliente_fantasma.state &&
                            sideBar.cliente_fantasma.subMenu.detalle_por_agencia
                              .state && <ClienteFantasmaIndividual />}
                          {sideBar.cliente_fantasma.state &&
                            sideBar.cliente_fantasma.subMenu
                              .manage_cliente_fantasma.state && (
                              <IngresoFantasma />
                            )}
                        </DataFilterContext.Provider>
                      </section>
                    </main>
                  </DataReporteEncuestaLealtadContext.Provider>
                </DataFiltradaContext.Provider>
              </DataSeleccionadaFiltros.Provider>
            </DataFantasmaContext.Provider>
          </DataTotalContext.Provider>
        )}
      </Layout>
    );
  }
};

export default Home;
