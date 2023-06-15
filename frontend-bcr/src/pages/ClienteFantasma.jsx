import React, { useContext } from "react";
import Calidad from "../components/calidad/Calidad";
import bg_mockup from "../assets/images/fantasma/mockup_fantasma.jpeg";
import FilterBarGeneral from "../components/Bars/FilterBarLast";
import PieChart from "../components/Graphs/charjs/PieChart";
import { BarChart } from "../components/Graphs/charjs/BarChart";
import { DataFilterContext } from "./Home";
import checkedIcon from "../assets/icons/checked.png";
import cancelIcon from "../assets/icons/cancel.png";
import {
  colors_green_primary,
  colors_green_secondary,
  colors_produ,
} from "../constants/colors";
import { toFixedIfNecessary } from "../functions/manageNumbers";

const labels = ["Actitud", "Destrezas de servicio", "Imagen y orden"];
// const data_default
const data_cliente_fantasma_detalle = [
  {
    title: "Actitud",
    calf: 66.7,
    items: [
      {
        id: 1,
        comentario:
          "invita a pasar al cliente a la caja diciendo: 'Siga por favor','Continue Señor(a)'",
        checked: true,
      },
      {
        id: 2,
        comentario:
          "Saluda al cliente con 'Buenos días/tardes, bienvenido(a) a Servipagos',",
        checked: false,
      },
      {
        id: 3,
        comentario: "Mantiene contacto visual con el cliente",
        checked: false,
      },
      {
        id: 4,
        comentario:
          "Utiliza frases amables en la atención 'Por favor', 'Gracias','Permítame'",
        checked: true,
      },
      {
        id: 5,
        comentario: "Durante la atención trata por el apellido al cliente",
        checked: true,
      },
      {
        id: 6,
        comentario:
          'Se despide del cliente diciendo "Que tenga un buen dia/tarde, Gracias por visitarnos"',
        checked: true,
      },
    ],
  },
  {
    title: "Destrezas de servicio",
    calf: 75.2,
    items: [
      {
        id: 1,
        comentario: "Mantiene un buen conocimiento de los procesos que realiza",
        checked: true,
      },
      {
        id: 2,
        comentario:
          "Resuelve con claridad los requerimientos e inquietudes de los clientes",
        checked: false,
      },
      {
        id: 3,
        comentario: "Demuestra agilidad en la atención",
        checked: false,
      },
      {
        id: 4,
        comentario: "No interrumpe el servicio por conversaciones personales",
        checked: true,
      },
    ],
  },
  {
    title: "Imagen y orden",
    calf: 50.2,
    items: [
      {
        id: 1,
        comentario:
          "Apariencia personal limpia y ordenada: uso de uniforme, elementos no llamativos, maquillaje, peinados sobrios",
        checked: true,
      },
      {
        id: 2,
        comentario:
          "Escritorio limpio, papeles ordenados, no elementos decorativos personales, uso de material institucional",
        checked: false,
      },
    ],
  },
];

const menu_fantasma = {
  Medición: "M1",
  Zona: "Zona 1",
  Ciudad: "Quito",
  Agencia: "La prensa",
  Cajero: "Jorge Batallas",
  Fecha: "26-ene",
};
const dataBarDefault = {
  labels: labels,
  datasets: [
    {
      label: "Actitud",
      data: [66.7, 90, 80],
      // borderColor: "#00000066",
      backgroundColor: [
        colors_produ.green.primary,
        colors_produ.green.secondary,
        colors_produ.green_secondary.dark,
      ],
      datalabels: {
        align: "end",
        anchor: "end",
      },
    },
    {
      label: "Destrezas de servicio",
      // data: [75],
      // borderColor: "#00000066",
      backgroundColor: [
        colors_produ.green.primary,
        colors_produ.green.secondary,
        colors_produ.green_secondary.dark,
      ],
      datalabels: {
        align: "end",
        anchor: "end",
      },
    },
    {
      label: "Imagen y orden",
      // data: [100, 200, 300],
      // borderColor: "#00000066",
      backgroundColor: [
        colors_produ.green.primary,
        colors_produ.green.secondary,
        colors_produ.green_secondary.dark,
      ],
      datalabels: {
        align: "end",
        anchor: "end",
      },
    },
  ],
};
function ClienteFantasma() {
  const dataFitrada = useContext(DataFilterContext);

  return (
    <section className="flex flex-row gap-3">
      <div className="flex flex-col justify-start items-center gap-0 w-full py-3 px-10">
        <section className="flex flex-row w-full gap-10 justify-center items-center py-2 px-1">
          <div className="flex flex-col justify-center items-center gap-2 capitalize font-semibold">
            <h1 className="text-2xl">Cliente fantasma</h1>
            <div className="justify-center items-center relative flex">
              <div className="w-[250px] h-[250px]">
                <PieChart
                  data={{
                    labels: [],
                    datasets: [
                      {
                        data: [90, 100 - 90],
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
                <p>{toFixedIfNecessary(90, 2)}%</p>
              </div>
            </div>
          </div>
          <div>
            {Object.keys(menu_fantasma).map((key, i) => {
              console.log(key);
              return (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000]">
                    <div
                      style={{
                        backgroundColor: colors_produ.green_secondary.dark,
                      }}
                      className="px-2 w-[120px] font-medium flex justify-center items-center"
                    >
                      <p>{key}</p>
                    </div>
                    <select className=" px-1 w-[160px] outline-none focus:outline-none">
                      <option value="">{menu_fantasma[key]}</option>
                    </select>
                  </div>
                </div>
              );
            })}
            <div className="w-full flex justify-center items-center mt-4">
              <button className="px-8 py-1 hover:bg-[#6caf47] bg-[#0d703a] duration-300 ease-in-out rounded-lg text-xl font-medium text-slate-50 ">
                Ver video
              </button>
            </div>
          </div>
        </section>
        <div className="w-[800px]">
          <BarChart data={dataBarDefault} />
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <section className="w-full">
          {data_cliente_fantasma_detalle.map((main_item, i) => {
            return (
              <div key={i}>
                <div
                  style={{
                    backgroundColor: colors_produ.green.primary,
                    borderRadius:
                      i === 0
                        ? "20px 20px 0px 0px"
                        : i === main_item.length - 1
                        ? "0px 0px 20px 20px"
                        : "0px 0px 0px 0px",
                  }}
                  className="grid grid-cols-[9fr_1fr] text-xl font-semibold text-slate-100 px-5"
                >
                  <div className="flex items-center">
                    <p>{main_item.title}</p>
                  </div>
                  <div className="flex items-center justify-center border-l-2 w-[90px] py-1">
                    <p>{main_item.calf}%</p>
                  </div>
                </div>
                {main_item.items.map((item, j) => {
                  return (
                    <div
                      className="border-b-2 grid grid-cols-[9fr_1fr] px-5 border-l-2 border-r-2 py-1"
                      key={j}
                    >
                      <div className="flex items-center">
                        <p>{item.comentario}</p>
                      </div>
                      <div className="border-l-2 flex justify-center items-center w-[90px]">
                        <img
                          className="h-6 w-6"
                          src={item.checked ? checkedIcon : cancelIcon}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </div>
    </section>
  );
}

export default ClienteFantasma;
