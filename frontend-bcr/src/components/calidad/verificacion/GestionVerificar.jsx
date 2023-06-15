import React, { useEffect, useRef, useState } from "react";
import { changeToTrueObject } from "../../../functions/general";
import {
  changeStateGestion,
  changeStatePlantilla,
  getPlantilla,
  getPlantillas,
  getVideo,
  getVideos,
  updateVideoGestion,
} from "../../../services/clienteFantasma";
import simpleAlert, {
  simpleAlertCallbackParamsVerify2,
} from "../../../utils/manageAlerts";
import Layout from "../../Layout/Layout";
import ModalContent from "./ModalContent";
import loadingIcon from "../../../assets/icons/login/loadingColor.png";
import { useSelector } from "react-redux";

const labels_table_videos = ["id", "name_video", "plantillaID", "createDate"];
const GestionVerificar = ({ dataProp, setModal }) => {
  // const data = dataProp;
  const [data, setData] = useState(dataProp);
  const userData = useSelector((state) => state.userData.value);

  const abortController = useRef(null);
  const [navOptions, setNavOptions] = useState({
    verificarVideo: true,
    ingresoVideo: false,
  });
  const INITIAL_VALUE_FILE = {
    isSelected: false,
    file: null,
  };
  const [selectedFile, setSelectedFile] = useState(INITIAL_VALUE_FILE);
  const reproductorVideoBD = useRef(null);
  const revisionFileRef = useRef(null);
  const [videosPaths, setVideosPaths] = useState([]);
  const [videoFromBDShow, setVideoFromBDShow] = useState(false);
  const videoFromBDref = useRef(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const [heightCurrentPage, setHeightCurrentPage] = useState(0);
  const [gestionOptions, setGestionOptions] = useState(
    data.coincide_video === 1
  );

  function handleCancelGetVideo() {
    abortController.current && abortController.current.abort();
  }
  async function handleGetVideo(idVideo) {
    setLoadingVideo(true);
    abortController.current = new AbortController();
    try {
      const response = await fetch("/api/getVideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.current.signal,
        body: JSON.stringify({
          idVideo: idVideo,
        }),
      });
      let reader = null;
      let arrayVideo = [];
      if (response.status == 200) {
        reader = response.body.getReader();
      }
      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          arrayVideo.push(value);
        }
        console.log(arrayVideo);
        const videoBLOB = new Blob([arrayVideo], { type: "video/mp4" });
        console.log(videoBLOB);
        const url = URL.createObjectURL(videoBLOB);
        console.log(url);
        // setVideoFromBDShow(true);
        console.log(videoFromBDref.current);
        videoFromBDref.current.src = url;
        // videoFromBDref.current.load();
        // videoFromBDref.current.play();
      }
      setLoadingVideo(false);
    } catch (e) {
      console.log(e);
      if (e.name == "AbortError") {
        console.log("AbortError");
        setLoadingVideo(false);
      }
    }
  }
  function manageUpdateStateGestion(e) {
    e.preventDefault();

    if (data.id && userData.id != "") {
      if (data.isVideoUpdated == 1) {
        const contentMain = {
          message:
            "¿Esta seguro que el video corresponde a la gestión seleccionada?",
          typeOfAlert: "warning",
          title: "Alerta",
        };
        const contentSuccess = {
          message: "Se ha actualizado el estado de la gestión exitosamente",
          typeOfAlert: "success",
          title: "Éxito",
        };
        const contentError = {
          message: "Ha ocurrido un error al cambiar el estado de la gestion",
          typeOfAlert: "error",
          title: "Error",
        };

        function changeStateGestionTemp(...params) {
          console.log(params);
          return new Promise((resolve, reject) => {
            changeStateGestion(...params)
              .then((res) => {
                console.log(res);
                if ("success" in res.status && res.status.success) {
                  getPlantilla(data.id).then((res) => {
                    setData(res);
                  });
                  resolve(res);
                } else {
                  reject(res);
                }
              })
              .catch((err) => {
                reject(err);
              });
          });
        }

        const params = [data.id, gestionOptions ? 1 : 0, userData.id];
        simpleAlertCallbackParamsVerify2(
          contentMain,
          contentSuccess,
          contentError,
          changeStateGestionTemp,
          params
        );
      } else {
        simpleAlert(
          "No se ha subido el video, no se puede cambiar el estado de la plantilla",
          "error",
          "Error"
        );
      }
    } else {
      simpleAlert(
        "Error",
        "Hubo un error en la autentificación, vuelva a cargar la pagina o loguese nuevamente",
        "error"
      );
    }
  }
  function manageFinishGestion(e) {
    e.preventDefault();
    console.log(data);
    if (data.id && userData.id != "") {
      if (data.isVideoUpdated == 1) {
        const contentMain = {
          message:
            "¿Esta seguro que quiere finalizar la gestión?, no podrá gestionarla nuevamente",
          typeOfAlert: "warning",
          title: "Alerta",
        };
        const contentSuccess = {
          message: "La plantilla se ha finalizado exitosamente",
          typeOfAlert: "success",
          title: "Éxito",
        };
        const contentError = {
          message: "Ha ocurrido un error al finalizar la plantilla",
          typeOfAlert: "error",
          title: "Error",
        };
        function FinishGestionTemp(...params) {
          console.log(params);
          return new Promise((resolve, reject) => {
            changeStatePlantilla(...params)
              .then((res) => {
                console.log(res);
                if ("success" in res.status && res.status.success) {
                  window.location.reload();
                  resolve(res);
                } else {
                  reject(res);
                }
              })
              .catch((err) => {
                reject(err);
              });
          });
        }
        const params = [data.id, "finalizado", userData.id];
        simpleAlertCallbackParamsVerify2(
          contentMain,
          contentSuccess,
          contentError,
          FinishGestionTemp,
          params
        );
      } else {
        simpleAlert(
          "No se ha subido el video, no se puede finalizar la plantilla",
          "error",
          "Error"
        );
      }
    } else {
      simpleAlert(
        "No se ha encontrado el id de la plantilla, vuelva a cargar la pagina",
        "error",
        "Error"
      );
    }
  }
  function handleVisualizarVideo(file) {
    if (file) {
      const r = new FileReader();
      r.onload = function (e) {
        var contents = e.target.result;
        var uint8Array = new Uint8Array(contents);
        var arrayBuffer = uint8Array.buffer;
        var blob = new Blob([arrayBuffer]);
        console.log(uint8Array);
        videoFromBDref.current.src = URL.createObjectURL(blob);
      };
      r.readAsArrayBuffer(file);
    } else {
      simpleAlert("No se ha seleccionado un video", "error", "Error");
    }
  }
  function handleUpdateVideo(e) {
    e.preventDefault();
    if (selectedFile.isSelected) {
      const fileValidity = revisionFileRef.current.checkValidity();
      if (!fileValidity) {
        revisionFileRef.current.reportValidity();
        return;
      }
      const videoData = new FormData();
      videoData.append("payloadFile", selectedFile.file);
      if (data.id) {
        const contentMain = {
          message: "¿Esta seguro que quiere subir este video?",
          typeOfAlert: "warning",
          title: "Alerta",
        };
        const contentSuccess = {
          message: "El video se ha subido exitosamente",
          typeOfAlert: "success",
          title: "Éxito",
        };
        const contentError = {
          message: "Ha ocurrido un error al subir el video",
          typeOfAlert: "error",
          title: "Error",
        };
        function updateVideoTemp(...params) {
          console.log(params);
          return new Promise((resolve, reject) => {
            updateVideoGestion(...params)
              .then((res) => {
                console.log(res);
                if (res && "success" in res.status && res.status.success) {
                  getPlantilla(data.id).then((res) => {
                    setData(res);
                    console.log(res);
                  });
                  resolve(res);
                } else {
                  resolve(null);
                }
              })
              .catch((err) => {
                resolve(null);
              });
          });
        }
        const params = [videoData, data.id];
        simpleAlertCallbackParamsVerify2(
          contentMain,
          contentSuccess,
          contentError,
          updateVideoTemp,
          params
        );
      }
    } else {
      simpleAlert("No se ha seleccionado ningún archivo", "error", "Error");
    }
  }
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    setHeightCurrentPage(height);
  }, []);

  useEffect(() => {
    getVideos().then((res) => res && setVideosPaths(res));
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (selectedFile.file) {
    handleVisualizarVideo(selectedFile.file);
  }
  useEffect(() => {
    if (selectedFile.file) {
      handleVisualizarVideo(selectedFile.file);
    }
  }, [selectedFile.file]);
  return (
    <Layout>
      <section
        style={{ height: `calc(${heightCurrentPage}px)` }}
        className={`z-[1060] left-0 top-0 absolute w-full px-2 flex justify-center items-start bg-slate-900/90 py-2`}
      >
        <section className="flex flex-col w-full gap-2 justify-center items-center rounded-md duration-300  py-4 relative">
          <nav className="w-full flex flex-row justify-center items-center gap-2 bg-slate-900 sticky top-0 py-2">
            <section className="flex justify-center items-center gap-1">
              <button
                onClick={() => {
                  setNavOptions(
                    changeToTrueObject("verificarVideo", navOptions)
                  );
                }}
                // onClick={(e) => handleFinalizarGestion(e)}
                className={`font-bold ${
                  navOptions.verificarVideo
                    ? " border-sky-500 bg-sky-500/40 shadow-[inset_2px_2px_4px_0px_#000000cc]"
                    : "bg-sky-500 "
                } hover:bg-sky-600/90 border-[2px] border-transparent w-[230px] h-[32px] rounded-lg text-slate-100`}
              >
                Verificar Gestión
              </button>
            </section>
            <section className="flex justify-center items-center gap-1">
              <button
                // onClick={(e) => handleSubirVideo(e)}
                onClick={() => {
                  setNavOptions(changeToTrueObject("ingresoVideo", navOptions));
                }}
                className={`font-bold ${
                  navOptions.ingresoVideo
                    ? " border-sky-500 bg-sky-500/40 shadow-[inset_2px_2px_4px_0px_#000000cc]"
                    : "bg-sky-500 "
                } hover:bg-sky-600/90 border-[2px] border-transparent w-[230px] h-[32px] rounded-lg text-slate-100`}
              >
                Ingreso de video
              </button>
            </section>
            <section
              className="px-2 absolute top-0 bottom-0 right-2 flex justify-center items-center "
              onClick={() => setModal({ data: {}, show: false })}
            >
              <div className="navbarColor4 text-slate-200 hover:border-sky-500 hover:bg-sky-500/40 hover:shadow-[0px_0px_4px_2px_#036bfc44] duration-200 cursor-pointer rounded-md w-[20px] h-[20px] flex justify-center items-center">
                x
              </div>
            </section>
          </nav>
          {data && (
            <>
              {navOptions.verificarVideo && (
                <div className="w-[min(80%,1200px)] flex flex-col justify-center items-center gap-2">
                  <section className="w-full grid grid-cols-[3fr_3fr] gap-2 justify-center items-center">
                    <section className="pt-2 flex flex-col justify-center gap-1">
                      <h1 className="navbarColor4 rounded-t-md w-full text-center text-base font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
                        Datos de la gestión
                      </h1>
                      <section className="text-sm bg-gradient-to-br from-[#d3d1d1] to-[#ffffff] shadow-[2px_2px_4px_1px_#868686cc] rounded-b-md w-full px-2 font-semibold flex flex-col justify-between items-center gap-2 text-slate-700  py-2">
                        <div className="flex flex-row">
                          <label className="w-[170px]">Cliente</label>
                          <div className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] ">
                            {data.cliente}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <label className="w-[170px]">Fecha de visita</label>
                          <div className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] ">
                            {data.fecha}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <label className="w-[170px]">Ciudad</label>
                          <div className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] ">
                            {data.ciudad}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <label className="w-[170px]">Punto de atención</label>
                          <div className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] ">
                            {data.puntoAtencion}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <label className="w-[170px]">Area</label>
                          <div className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] ">
                            {data.area}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <label className="w-[170px]">Estación</label>
                          <div className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] ">
                            {data.estacion}
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <label className="w-[170px]">
                            Estado de la gestión
                          </label>
                          <div className="w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] ">
                            {data.estado_plantilla}
                          </div>
                        </div>
                      </section>
                    </section>
                    <section className="flex flex-col justify-center items-center w-full">
                      <h3 className="rtext-center text-base font-semibold text-slate-200">
                        ¿El video corresponde a la gestión seleccionada?
                      </h3>
                      <section className="pt-2 flex flex-row justify-center gap-1">
                        <button
                          onClick={() => {
                            if (data.isVideoUpdated) {
                              setGestionOptions(true);
                            } else {
                              simpleAlert(
                                "No se ha subido el video, por favor suba el video",
                                "warning",
                                "Alerta"
                              );
                            }
                          }}
                          className={`font-bold ${
                            gestionOptions
                              ? " border-sky-500 bg-sky-500/40 shadow-[inset_2px_2px_4px_0px_#000000cc]"
                              : "bg-sky-500 "
                          } hover:bg-sky-600/90 border-[2px] border-transparent w-[30px] h-[30px] rounded-lg text-slate-100`}
                        >
                          Si
                        </button>
                        <button
                          onClick={() => {
                            if (data.isVideoUpdated) {
                              setGestionOptions(false);
                            } else {
                              simpleAlert(
                                "No se ha subido el video, por favor suba el video",
                                "warning",
                                "Alerta"
                              );
                            }
                          }}
                          className={`font-bold ${
                            !gestionOptions
                              ? " border-sky-500 bg-sky-500/40 shadow-[inset_2px_2px_4px_0px_#000000cc]"
                              : "bg-sky-500 "
                          } hover:bg-sky-600/90 border-[2px] border-transparent w-[30px] h-[30px] rounded-lg text-slate-100`}
                        >
                          No
                        </button>
                      </section>
                      <section className="pt-2 flex flex-col justify-center gap-1">
                        <button
                          onClick={(e) => manageUpdateStateGestion(e)}
                          className="navbarColor4 mt-2 font-bold w-[230px] h-[32px] rounded-lg text-slate-100 hover:opacity-75 hover:scale-105 duration-300"
                        >
                          Actualizar Estado
                        </button>
                        <button
                          onClick={(e) => manageFinishGestion(e)}
                          className="navbarColor4 mt-2 font-bold w-[230px] h-[32px] rounded-lg text-slate-100 hover:opacity-75 hover:scale-105 duration-300"
                        >
                          Finalizar Gestión
                        </button>
                      </section>
                    </section>
                  </section>
                  <section className="w-full">
                    <ModalContent data={data} />
                  </section>
                </div>
              )}
              {navOptions.ingresoVideo && (
                <div className="w-full flex flex-col justify-center items-center gap-2">
                  <section className="w-full flex flex-row justify-center items-center gap-2">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <section className="pt-2 flex flex-col justify-center gap-1 w-[330px]">
                        <h1 className="navbarColor4 rounded-t-md w-full text-center text-base font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
                          Ingreso de video
                        </h1>
                        <section className="text-sm bg-gradient-to-br from-[#d3d1d1] to-[#ffffff] shadow-[2px_2px_4px_1px_#868686cc] rounded-b-md w-full px-2 font-semibold flex flex-col justify-between items-center gap-2 text-slate-700  py-2">
                          <input
                            onChange={(e) => {
                              setSelectedFile({
                                isSelected: true,
                                file: e.target.files[0],
                              });
                              // handleInputFileChange(e);
                            }}
                            ref={revisionFileRef}
                            required
                            type="file"
                            className="invalid:shadow-[0px_0px_8px_-1px_#fc1105bb] valid:shadow-[0px_0px_3px_2px_#0095ff77] w-[300px] rounded-md px-2 py-[2px] outline-none focus:outline-none bg-transparent shadow-[inset_1px_1px_1px_1px_#00000044] "
                          />
                        </section>
                      </section>
                      <section className="pt-2 flex flex-col justify-center items-center gap-1 w-full">
                        <button
                          onClick={(e) => handleUpdateVideo(e)}
                          className="navbarColor4 mt-2 font-bold w-[230px] h-[32px] rounded-lg text-slate-100 hover:opacity-75 hover:scale-105 duration-300"
                        >
                          Subir video
                        </button>
                      </section>
                    </div>
                  </section>
                  {selectedFile.isSelected && (
                    <section className="pt-2 flex flex-col justify-center gap-1 w-[700px]">
                      <h1 className="navbarColor4 rounded-t-md w-full text-center text-base font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
                        Previsualización
                      </h1>
                      <video
                        className="w-full aspect-video rounded-b-md"
                        ref={videoFromBDref}
                        controls={true}
                      />
                    </section>
                  )}
                  <section>
                    {loadingVideo && (
                      <div className="flex flex-col justify-center items-center gap-2">
                        <img
                          className="w-[50px] h-[50px] animate-spin filter hue-rotate-[290deg]"
                          src={loadingIcon}
                          alt="loadingIcon"
                        />
                        <p className="text-slate-300 font-semibold">
                          Cargando video...
                        </p>
                        <p
                          onClick={() => handleCancelGetVideo()}
                          className="hover:border-red-600 hover:bg-transparent cursor-pointer border-[2px] border-transparent text-slate-300 font-semibold bg-red-600 px-5 rounded-full"
                        >
                          Cancelar
                        </p>
                      </div>
                    )}
                  </section>
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default GestionVerificar;
