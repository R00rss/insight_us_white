import { useEffect, useRef, useState } from "react";
import Modal, { ModalLoading } from "../modals/simple_modal";
import FormFantasma from "./FormFantasma";
import PlantillaFantasma from "./PlantillaFantasma";
import loading_icon from "../../assets/icons/loading1.png";
import simpleAlert from "../../utils/manageAlerts";
import { save_plantilla, save_video } from "../../services/fantasma";
import { useSelector } from "react-redux";

function IngresoFantasma() {
  const user_info = useSelector((state) => state.userData.value);
  const [plantilla_detalle, set_plantilla_detalle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, set_loading] = useState(false);
  const [loading_video, set_loading_video] = useState(false);
  const [file_upload, set_file_upload] = useState(null);
  const videoFromBDref = useRef(null);
  const [open_visualizacion, set_open_visualizacion] = useState(false);
  useEffect(() => {
    onkeydown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
  }, []);

  function handleVisualizarVideo(file) {
    if (file) {
      try {
        set_loading_video(true);
        const r = new FileReader();
        r.onload = function (e) {
          var contents = e.target.result;
          var uint8Array = new Uint8Array(contents);
          var arrayBuffer = uint8Array.buffer;
          var blob = new Blob([arrayBuffer]);
          console.log(uint8Array);
          videoFromBDref.current.src = URL.createObjectURL(blob);
          console.log(URL.createObjectURL(blob));
        };
        r.readAsArrayBuffer(file);
        set_loading_video(false);
        set_open_visualizacion(true);
      } catch (e) {
        console.log(e);
        set_loading_video(false);
        set_open_visualizacion(false);
        simpleAlert("No se ha podido visualizar el video", "error", "Error");
      }
    } else {
      simpleAlert("No se ha seleccionado un video", "error", "Error");
    }
  }

  function handleFileChange(e) {
    set_open_visualizacion(false);
    if (e.target.files && e.target.files.length > 0) {
      set_file_upload(e.target.files[0]);
    }
  }
  useEffect(() => {
    console.log(file_upload);
    if (file_upload) console.log(file_upload.name);
  }, [file_upload]);
  function handleSubmitFile(e) {
    e.preventDefault();
    // check if form is valid
    if (e.currentTarget.checkValidity() === false) {
      e.currentTarget.reportValidity();
      return;
    }

    if (!file_upload) {
      simpleAlert("Por favor seleccione un archivo.", "error", "Error");
      return;
    }
    if (file_upload.size > 350000000) {
      simpleAlert("El archivo no puede ser mayor a 350MB.", "error", "Error");
      return;
    }
    if (!file_upload.type.includes("video")) {
      simpleAlert("El archivo debe ser una video.", "error", "Error");
      return;
    }

    simpleAlert("El video es valido", "success", "Éxito");

    return handleCloseModal();
  }

  function handleOpenModal() {
    setIsModalOpen(true);
    set_open_visualizacion(false);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
    set_open_visualizacion(false);
  }
  async function handle_submit(datos_plantilla) {
    if (!file_upload) {
      simpleAlert("Por favor seleccione un video", "error", "Error");
      return false;
    }
    set_loading(true);
    console.log(user_info);
    datos_plantilla.ingresador_id = user_info.id;
    datos_plantilla.name_file = file_upload.name;
    const response_plantilla = await save_plantilla(
      datos_plantilla,
      plantilla_detalle
    );
    if (response_plantilla) {
      console.log(response_plantilla);
      const id_plantilla = response_plantilla.id_plantilla;
      console.log(id_plantilla);
      const formData = new FormData();
      formData.append("file", file_upload);
      formData.append("id_plantilla", id_plantilla.toString());
      const response_video = await save_video(formData);
      set_loading(false);
      if (response_video) {
        simpleAlert("Se guardo la plantilla correctamente", "success", "Éxito");
        return true;
      } else {
        simpleAlert("No se pudo guardar la plantilla", "error", "Error");
        return false;
      }
    } else {
      set_loading(false);
      simpleAlert("No se pudo guardar la plantilla", "error", "Error");
      return false;
    }
  }
  return (
    <div className="py-2 px-3 gap-4 flex xl:flex-row justify-start items-center xl:justify-center xl:items-start 2xl:gap-10 lg:gap-5 flex-col">
      <FormFantasma
        handle_submit={handle_submit}
        handle_video={handleOpenModal}
      />
      <PlantillaFantasma
        save_plantilla={(data) => set_plantilla_detalle(data)}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form
          onSubmit={handleSubmitFile}
          className="flex flex-col justify-center h-full w-full cursor-pointer rounded-xl bg-[#fdffff] p-1 "
        >
          <header className="self-start border-b-2 w-full py-1">
            <p className="text-xl font-light ml-2 text-slate-700">
              Agregar Video
            </p>
          </header>
          <div className="font-light text-slate-700 text-lg py-2 flex flex-col justify-center items-center gap-3">
            <label className=" flex flex-row items-center justify-between gap-4">
              <p>Video:</p>
              <input
                className=" ml-2 border-2 border-gray-300 rounded-md"
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                accept="video/x-m4v,video/*"
                multiple={false}
              />
            </label>
            <div className="w-[min(440px,100%)] flex justify-center items-center gap-5">
              <button
                className="w-full duration-300 group rounded-xl bg-[var(--green-produ-primary)] hover:bg-transparent border-2 hover:border-[var(--green-produ-primary)] border-transparent px-2 shadow-[2px_2px_4px_1px_#b3b3b3]"
                disabled={loading}
                type="submit"
              >
                <div
                  className={`${loading ? "hidden" : "block"}  
            text-slate-50 font-normal duration-300 group-hover:text-[var(--green-produ-primary)]`}
                >
                  Agregar Video
                </div>
                <img
                  className={`${loading ? "block" : "hidden"
                    } animate-spin w-8 h-8 filter invert-[0.15] hue-rotate-[65deg]`}
                  src={loading_icon}
                  alt="loading_icon"
                />
              </button>
              {file_upload && (
                <button
                  onClick={() => handleVisualizarVideo(file_upload)}
                  className="w-full duration-300 group rounded-xl bg-[#91de66] hover:bg-transparent border-2 hover:border-[#91de66] border-transparent px-2 shadow-[2px_2px_4px_1px_#b3b3b3]"
                  disabled={loading_video}
                  type="button"
                >
                  <div
                    className={`${loading_video ? "hidden" : "block"}  
            text-slate-50 font-normal duration-300 group-hover:text-[#91de66]`}
                  >
                    Previsualizar video
                  </div>
                  <img
                    className={`${loading_video ? "block" : "hidden"
                      } animate-spin w-8 h-8 filter invert-[0.15] hue-rotate-[65deg]`}
                    src={loading_icon}
                    alt="loading_icon"
                  />
                </button>
              )}
            </div>
            {open_visualizacion && (
              <section className="pt-2 flex flex-col justify-center gap-1 w-[700px]">
                <h1 className="bg-[#91de66] rounded-t-md w-full text-center text-base font-semibold text-slate-200 shadow-[2px_2px_4px_1px_#868686cc]">
                  Previsualización
                </h1>
                <video
                  className="w-full aspect-video rounded-b-md"
                  ref={videoFromBDref}
                  controls={true}
                />
              </section>
            )}
          </div>
        </form>
      </Modal>
      <ModalLoading isOpen={loading}>
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl text-slate-200 font-bold">
            Guardando plantilla
          </h1>
          <img
            className="w-[200px] h-[200px]  object-contain animate-spin"
            src={loading_icon}
            alt=""
          />
        </div>
      </ModalLoading>
    </div>
  );
}

export default IngresoFantasma;
