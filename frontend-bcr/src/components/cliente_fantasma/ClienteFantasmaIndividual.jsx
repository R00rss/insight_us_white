import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { colors_produ } from "../../constants/colors";
import { getToken } from "../../functions/general";
import loading_icon from "../../assets/icons/loading2.png";
import {
  get_data_filtros_fantasma,
  get_plantilla_fantasma,
  get_rest_data,
} from "../../services/getDataFiltros";
import { validateToken } from "../../services/token";
import { minimizeStr } from "../../functions/manageStr";
import alertIcon from "../../assets/icons/tabla_icons/alert.png";
import dangerIcon from "../../assets/icons/tabla_icons/not_ok.png";
import okIcon from "../../assets/icons/tabla_icons/ok.png";
import PieChart from "../Graphs/charjs/PieChart";
import { toFixedIfNecessary } from "../../functions/manageNumbers";
import { BarChart, optionsDefault } from "../Graphs/charjs/BarChart";
import { get_video } from "../../services/fantasma";
import simpleAlert from "../../utils/manageAlerts";
import Modal, { ModalLoading } from "../modals/simple_modal";

function ClienteFantasmaIndividual() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediciones, set_mediciones] = useState({});
  const [zonas, set_zonas] = useState({});
  const [cities, set_cities] = useState([]);
  const [agencias, set_agencias] = useState([]);
  const [fecha, set_fecha] = useState(null);
  const [cajero, set_cajero] = useState(null);
  const [cities_filtered, set_cities_filtered] = useState([]);
  const [agencias_filtered, set_agencias_filtered] = useState([]);
  const [plantilla_detalle, set_plantilla_detalle] = useState(null);
  const [video_src, set_video_src] = useState(null);
  const [loading_video, set_loading_video] = useState(false);
  const [flag_no_datos, set_flag_no_datos] = useState(true);

  const [id_plantilla, set_id_plantilla] = useState(null);
  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const [promedios_plantilla, set_promedios_plantilla] = useState({
    actitud: 0,
    destrezas_de_servicio: 0,
    imagen_y_orden: 0,
  });
  async function handle_ver_video() {
    console.log("ver video");
    set_loading_video(true);
    if (id_plantilla) {
      const response = await get_video(id_plantilla);
      if (response) {
        let chunks = [];
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
        }

        const videoBlob = new Blob(chunks, { type: "video/mp4" });
        const url = URL.createObjectURL(videoBlob);
        set_video_src(url);
        handleOpenModal();
        // URL.revokeObjectURL(url);
      } else {
        simpleAlert("No se pudo obtener el video", "error", "Error");
      }
    }
    set_loading_video(false);
  }
  const [promedios_plantilla_total, set_promedios_plantilla_total] =
    useState(null);
  const [data_barchart, set_data_barchart] = useState(null);
  const [options_barchart] = useState({
    ...optionsDefault,
    plugins: { ...optionsDefault.plugins, legend: { display: false } },
  });
  const navigate = useNavigate();

  useEffect(() => {
    get_data_filtros_fantasma().then((res) => {
      if (!res) navigate("/login");
      const token = getToken();
      if (!token) navigate("/login");
      validateToken(token).then((data) => {
        if (!data || !("success" in data) || !data.success) navigate("/login");

        if (data.payload.tipo_usuario == "administrador") {
          set_mediciones(res[0]);
        } else {
          set_mediciones({
            M0: { ...res[0].M0 },
          });
        }

        set_zonas(res[1]);
        set_cities(res[2]);
        set_agencias(res[3]);
      });
    });
  }, []);

  useEffect(() => {
    let selected_zona;
    for (const zona in zonas)
      if (zonas[zona].selected) {
        selected_zona = zona;
        break;
      }
    const cities_filtered_aux = cities.filter(
      (city) => city.zona == selected_zona
    );
    cities_filtered_aux.forEach((city, i) => (city.selected = i == 0));
    set_cities_filtered(cities_filtered_aux);
  }, [zonas]);

  useEffect(() => {
    let selected_zona;
    let selected_city;
    for (const zona in zonas)
      if (zonas[zona].selected) {
        selected_zona = zona;
        break;
      }
    for (const city in cities_filtered)
      if (cities_filtered[city].selected) {
        selected_city = cities_filtered[city].name;
        break;
      }
    const agencias_filtered_aux = agencias.filter(
      (agencia) =>
        agencia.zona == selected_zona && agencia.ciudad == selected_city
    );
    agencias_filtered_aux.forEach((agencia, i) => (agencia.selected = i == 0));

    set_agencias_filtered(agencias_filtered_aux);
  }, [cities_filtered]);

  useEffect(() => {
    let selected_zona;
    let selected_city;
    let selected_medicion;
    let selected_agencia;
    for (const zona in zonas)
      if (zonas[zona].selected) {
        selected_zona = zona;
        break;
      }
    for (const medicion in mediciones)
      if (mediciones[medicion].selected) {
        selected_medicion = medicion;
        break;
      }
    console.log(selected_medicion);
    for (const city in cities_filtered)
      if (cities_filtered[city].selected) {
        selected_city = cities_filtered[city].name;
        break;
      }
    for (const agencia in agencias_filtered)
      if (agencias_filtered[agencia].selected) {
        selected_agencia = agencias_filtered[agencia].name;
        break;
      }
    if (
      !selected_zona ||
      !selected_city ||
      !selected_medicion ||
      !selected_agencia
    ) {
      return;
    }

    get_plantilla_fantasma({
      medicion: selected_medicion,
      agencia: selected_agencia,
      zona: selected_zona,
      ciudad: selected_city,
    })
      .then((res) => {
        console.log(res);
        if (res && res.cajero && res.fecha !== null && res.items) {
          set_id_plantilla(res.id);
          set_cajero(res.cajero);
          set_fecha(res.fecha);
          set_plantilla_detalle(res.items);
          set_flag_no_datos(false);
        } else {
          console.log("no hay datos");
          set_id_plantilla(null);
          set_plantilla_detalle(null);
          set_cajero(null);
          set_fecha(null);
          set_flag_no_datos(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [agencias_filtered, mediciones]);

  function get_sub_prom(items) {
    let acc = 0;
    for (const item of items) {
      acc += item.correct;
    }
    return acc / items.length;
  }

  useEffect(() => {
    if (plantilla_detalle) {
      Object.keys(plantilla_detalle).forEach((plantilla_detalle_key, i) => {
        const sub_prom = get_sub_prom(
          plantilla_detalle[plantilla_detalle_key].items
        );
        set_promedios_plantilla((prev) => {
          return {
            ...prev,
            [plantilla_detalle_key]: sub_prom,
          };
        });
      });
    }
  }, [plantilla_detalle]);

  useEffect(() => {
    const pesos_plantilla = {
      actitud: 0.475,
      destrezas_de_servicio: 0.475,
      imagen_y_orden: 0.05,
    };
    let total = 0;
    const keys_promedios_platilla = Object.keys(promedios_plantilla);
    const data_datasets = [];
    keys_promedios_platilla.forEach((prom_key) => {
      total += promedios_plantilla[prom_key] * pesos_plantilla[prom_key];
      data_datasets.push(toFixedIfNecessary(promedios_plantilla[prom_key], 2));
    });

    // const prom = total / Object.keys(promedios_plantilla).length;
    const prom = total;
    set_promedios_plantilla_total(prom);
    const labels = plantilla_detalle
      ? keys_promedios_platilla.map(
        (key) => plantilla_detalle[key].display_name
      )
      : keys_promedios_platilla;
    const result = {
      labels: labels,
      datasets: [
        {
          label: "actitud",
          data: data_datasets,
          backgroundColor: [
            colors_produ.green.primary,
            colors_produ.green.secondary,
            colors_produ.green_secondary.light,
          ],
          borderWidth: 1,
          datalabels: {
            align: "end",
            anchor: "end",
          },
        },
      ],
    };
    set_data_barchart(result);
  }, [
    promedios_plantilla.actitud,
    promedios_plantilla.destrezas_de_servicio,
    promedios_plantilla.imagen_y_orden,
  ]);

  return (
    <section className="w-full flex 2xl:flex-row flex-col justify-center items-center gap-3 lg:gap-10 py-4">
      <section className="w-full lg:w-auto flex flex-col justify-start items-center gap-10">
        <section className="flex lg:flex-row flex-col-reverse  gap-3 ">
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
                          promedios_plantilla_total,
                          100 - promedios_plantilla_total,
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
                <p>{toFixedIfNecessary(promedios_plantilla_total, 2)}%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[280px]">
            <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
              <div
                style={{
                  backgroundColor: colors_produ.green_secondary.dark,
                }}
                className="px-2 w-[120px] font-medium flex justify-center items-center"
              >
                <p>Medición</p>
              </div>
              <select
                onChange={(e) => {
                  const mediciones_clone = JSON.parse(
                    JSON.stringify(mediciones)
                  );
                  Object.keys(mediciones_clone).map((medicion_key) => {
                    mediciones_clone[medicion_key].selected =
                      e.target.value === medicion_key;
                  });
                  set_mediciones(mediciones_clone);
                }}
                className=" px-1 w-[160px] outline-none focus:outline-none"
              >
                {Object.keys(mediciones).map((medicion_key, j) => {
                  return (
                    <option key={j} value={medicion_key}>
                      {mediciones[medicion_key].display_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
              <div
                style={{
                  backgroundColor: colors_produ.green_secondary.dark,
                }}
                className="px-2 w-[120px] font-medium flex justify-center items-center"
              >
                <p>Zonas</p>
              </div>
              <select
                onChange={(e) => {
                  const zonas_clone = JSON.parse(JSON.stringify(zonas));
                  Object.keys(zonas_clone).map((zona_key) => {
                    zonas_clone[zona_key].selected =
                      e.target.value === zona_key;
                  });
                  set_zonas(zonas_clone);
                }}
                className=" px-1 w-[160px] outline-none focus:outline-none"
              >
                {Object.keys(zonas).map((zona_key, j) => {
                  return (
                    <option key={j} value={zona_key}>
                      {zonas[zona_key].display_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
              <div
                style={{
                  backgroundColor: colors_produ.green_secondary.dark,
                }}
                className="px-2 w-[120px] font-medium flex justify-center items-center"
              >
                <p>Ciudades</p>
              </div>
              <select
                onChange={(e) => {
                  set_cities_filtered(
                    cities_filtered.map((city) => {
                      return {
                        ...city,
                        selected: e.target.value === city.name,
                      };
                    })
                  );
                }}
                className=" px-1 w-[160px] outline-none focus:outline-none"
              >
                {cities_filtered.map((city) => {
                  return (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
              <div
                style={{
                  backgroundColor: colors_produ.green_secondary.dark,
                }}
                className="px-2 w-[120px] font-medium flex justify-center items-center"
              >
                <p>Agencia</p>
              </div>
              <select
                onChange={(e) => {
                  set_agencias_filtered(
                    agencias_filtered.map((agencia) => {
                      return {
                        ...agencia,
                        selected: e.target.value === agencia.name,
                      };
                    })
                  );
                }}
                className=" px-1 w-[160px] outline-none focus:outline-none"
              >
                {agencias_filtered.map((agencia) => {
                  return (
                    <option key={agencia.id} value={agencia.name}>
                      {agencia.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {cajero && (
              <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
                <div
                  style={{
                    backgroundColor: colors_produ.green_secondary.dark,
                  }}
                  className="px-2 w-[120px] font-medium flex justify-center items-center"
                >
                  <p>Cajero</p>
                </div>
                <div className=" px-1 w-[160px] outline-none focus:outline-none bg-[#efefef]">
                  {minimizeStr(cajero, 15)}
                </div>
              </div>
            )}
            {fecha && (
              <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
                <div
                  style={{
                    backgroundColor: colors_produ.green_secondary.dark,
                  }}
                  className="px-2 w-[120px] font-medium flex justify-center items-center"
                >
                  <p>Fecha</p>
                </div>
                <div className=" px-1 w-[160px] outline-none focus:outline-none bg-[#efefef]">
                  {fecha}
                </div>
              </div>
            )}
            {flag_no_datos && (
              <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
                <div
                  style={{
                    backgroundColor: colors_produ.green_secondary.dark,
                  }}
                  className="px-2 w-[280px] font-medium flex justify-center items-center"
                >
                  <p>No datos</p>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center items-center mt-2">
              <button
                disabled={flag_no_datos}
                onClick={async () => await handle_ver_video()}
                className="
                disabled:opacity-50 disabled:cursor-not-allowed
                py-1 px-8 duration-300 h-[40px] rounded-[10px] bg-[var(--green-produ-primary)] font-medium mt-2 hover:bg-transparent border-2 border-[var(--green-produ-primary)] hover:text-[var(--green-produ-primary)]"
              >
                Ver video
              </button>
            </div>
          </div>
        </section>
        <section className="w-[min(750px,90%)]">
          <div className="aspect-[2/1] w-full flex justify-center items-center">
            {data_barchart && (
              <BarChart data={data_barchart} options={options_barchart} />
            )}
          </div>
        </section>
      </section>
      {plantilla_detalle && (
        <div className="w-[min(90%,780px)]">
          {Object.keys(plantilla_detalle).map((plantilla_detalle_key, i) => {
            return (
              <section key={i} className="">
                <section
                  style={{
                    backgroundColor: colors_produ.green.primary,
                    borderRadius:
                      i === 0
                        ? "20px 20px 0px 0px"
                        : // : i === Object.keys(plantilla_detalle).length - 1
                        // ? "0px 0px 20px 20px"
                        "0px 0px 0px 0px",
                  }}
                  className="grid grid-cols-[9fr_1fr] text-xl font-semibold text-slate-100 px-4 py-1"
                >
                  <div>
                    {plantilla_detalle[plantilla_detalle_key].display_name}
                  </div>
                  <div className="border-l-2 text-center">
                    {/* {get_sub_prom(
                      plantilla_detalle[plantilla_detalle_key].items
                    )} */}
                    {toFixedIfNecessary(
                      promedios_plantilla[plantilla_detalle_key],
                      2
                    )}
                    %
                  </div>
                </section>
                <section>
                  {plantilla_detalle[plantilla_detalle_key].items.map(
                    (item) => {
                      return (
                        <div
                          key={item.id}
                          className="grid grid-cols-[9fr_1fr] text-base font-normal px-4 py-1 border-b-2 border-l-2"
                        >
                          <div>{item.question}</div>
                          <div className="flex justify-center items-center border-l-2">
                            <img
                              className="w-5 h-5 object-cover"
                              src={item.correct == 100 ? okIcon : dangerIcon}
                              alt=""
                            />
                            {/* <p>{item.total}</p> */}
                          </div>
                        </div>
                      );
                    }
                  )}
                </section>
              </section>
            );
          })}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {video_src && (
          <section className="pt-1 flex flex-col justify-center gap-1 w-full">
            <h1 className="py-1 bg-[#91de66] rounded-t-md w-full text-center text-lg font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
              Previsualización
            </h1>
            {/* <ReactPlayer url={video_src} /> */}
            <video className="w-full aspect-video rounded-b-md" controls={true}>
              <source src={video_src} />
            </video>
          </section>
        )}
      </Modal>
      <ModalLoading isOpen={loading_video}>
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl text-slate-200 font-bold">
            Cargando video...
          </h1>
          <img
            className="w-[170px] h-[170px]  object-contain animate-spin"
            src={loading_icon}
            alt=""
          />
        </div>
      </ModalLoading>
    </section>
  );
}

export default ClienteFantasmaIndividual;
