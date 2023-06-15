import { colors_produ } from "../../constants/colors";
import { toFixedIfNecessary } from "../../functions/manageNumbers";
import check_icon from "../../assets/icons/check.png";
import cross_icon from "../../assets/icons/cerrar.png";

import { useEffect, useState } from "react";

const plantilla_fantasma = {
  actitud: {
    display_name: "Actitud",
    items: [
      {
        id: 1,
        question:
          "invita a pasar al cliente a la caja diciendo: `Siga por favor`,`Continue Señor(a)`",
        total: 100,
        correct: 100,
      },
      {
        id: 2,
        question:
          "Saluda al cliente con `Buenos días/tardes, bienvenido(a) a Servipagos`",
        total: 100,
        correct: 100,
      },
      {
        id: 3,
        question: "Mantiene contacto visual con el cliente",
        total: 100,
        correct: 100,
      },
      {
        id: 4,
        question:
          "Utiliza frases amables en la atención `Por favor`, `Gracias`,`Permítame`",
        total: 100,
        correct: 100,
      },
      {
        id: 5,
        question: "Durante la atención trata por el apellido al cliente",
        total: 100,
        correct: 100,
      },
      {
        id: 6,
        question:
          "Se despide del cliente diciendo `Que tenga un buen dia/tarde, Gracias por visitarnos`",
        total: 100,
        correct: 100,
      },
    ],
  },
  destrezas_de_servicio: {
    display_name: "Destrezas de servicio",
    items: [
      {
        id: 1,
        question: "Mantiene un buen conocimiento de los procesos que realiza",
        total: 100,
        correct: 100,
      },
      {
        id: 2,
        question:
          "Resuelve con claridad los requerimientos e inquietudes de los clientes",
        total: 100,
        correct: 100,
      },
      {
        id: 3,
        question: "Demuestra agilidad en la atención",
        total: 100,
        correct: 100,
      },
      {
        id: 4,
        question: "No interrumpe el servicio por conversaciones personales",
        total: 100,
        correct: 100,
      },
    ],
  },
  imagen_y_orden: {
    display_name: "Imagen y orden",
    items: [
      {
        id: 1,
        question:
          "Apariencia personal limpia y ordenada: uso de uniforme, elementos no llamativos, maquillaje, peinados sobrios",
        total: 100,
        correct: 100,
      },
      {
        id: 2,
        question:
          "Escritorio limpio, papeles ordenados, no elementos decorativos personales, uso de material institucional",
        total: 100,
        correct: 100,
      },
    ],
  },
};

function subtotal_plantilla(section) {
  let total = 0;
  section.items.forEach((item) => {
    total += item.correct;
  });
  return total / section.items.length;
}

function PlantillaFantasma({ save_plantilla }) {
  const [plantilla_detalle, set_plantilla_detalle] =
    useState(plantilla_fantasma);
  const [sub_promedios, set_sub_promedios] = useState({
    actitud: 0,
    destrezas_de_servicio: 0,
    imagen_y_orden: 0,
  });
  useEffect(() => {
    let new_sub_promedios = JSON.parse(JSON.stringify(sub_promedios));
    Object.keys(plantilla_detalle).forEach((section_key) => {
      new_sub_promedios[section_key] = subtotal_plantilla(
        plantilla_detalle[section_key]
      );
    });
    set_sub_promedios(new_sub_promedios);
    save_plantilla(plantilla_detalle);
  }, [plantilla_detalle]);

  return (
    <div className="w-[min(90%,780px)]">
      {Object.keys(plantilla_detalle).map((plantilla_detalle_key, i) => {
        return (
          <section key={i}>
            <section
              style={{
                backgroundColor: colors_produ.green.primary,
                borderRadius: i === 0 ? "20px 20px 0px 0px" : "0px 0px 0px 0px",
              }}
              className="grid grid-cols-[9fr_2fr] text-lg font-semibold text-slate-100 px-4 py-1"
            >
              <div>{plantilla_detalle[plantilla_detalle_key].display_name}</div>
              <div className="border-l-2 text-center">
                {toFixedIfNecessary(sub_promedios[plantilla_detalle_key], 2)}%
              </div>
            </section>
            <section>
              {plantilla_detalle[plantilla_detalle_key].items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[9fr_2fr] justify-center items-center text-base font-normal px-4 py-1 border-b-2 border-l-2"
                  >
                    <div>{item.question}</div>
                    <div className="w-full flex justify-center items-center">
                      <div className="w-[80px] flex justify-evenly gap-1 items-center border-l-2 rounded-full shadow-[1px_1px_10px_-4px] px-1 py-1">
                        <button
                          onClick={() => {
                            let new_plantilla_detalle = JSON.parse(
                              JSON.stringify(plantilla_detalle)
                            );
                            new_plantilla_detalle[
                              plantilla_detalle_key
                            ].items.find(
                              (item_) => item_.id === item.id
                            ).correct = 100;
                            set_plantilla_detalle(new_plantilla_detalle);
                          }}
                          className={`group w-8 h-8 rounded-full  ${item.correct === 100
                            ? "bg-lime-500"
                            : "bg-transparent"
                            } p-2 outline-none focus:outline-none`}
                        >
                          <img
                            className="object-cover filter brightness-0 invert"
                            src={check_icon}
                            alt=""
                          />
                        </button>
                        <button
                          onClick={() => {
                            let new_plantilla_detalle = JSON.parse(
                              JSON.stringify(plantilla_detalle)
                            );
                            new_plantilla_detalle[
                              plantilla_detalle_key
                            ].items.find(
                              (item_) => item_.id === item.id
                            ).correct = 0;
                            set_plantilla_detalle(new_plantilla_detalle);
                          }}
                          className={`group w-8 h-8 rounded-full  ${item.correct === 0 ? "bg-red-500" : "bg-transparent"
                            } p-2 outline-none focus:outline-none`}
                        >
                          <img
                            className="object-cover filter brightness-0 invert-0"
                            src={cross_icon}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </section>
        );
      })}
    </div>
  );
}

export default PlantillaFantasma;
