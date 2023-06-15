import React from "react";
import { useState } from "react";
import {
  colors_green_primary,
  colors_green_secondary,
  colors_red_primary,
  colors_yellow_primary,
} from "../../../constants/colors";
import styles from "./tacometro.module.css";
import styles2 from "./tacometro2.module.css";
// import styles2 from "./tacometro.module2.css";
function calculateRotation(satisfechos) {
  return -18 * (satisfechos / 10) + 180;
}
const deg_to_rad = (deg) => (deg * Math.PI) / 180;

function changeColorByRangeNota(number, type = 1) {
  if (type == 2) number = number * 10;
  if (number < 7) {
    return colors_red_primary.dark;
  }
  if (number < 9) {
    return colors_yellow_primary.dark;
  }
  return colors_green_primary.dark;
}
function changeColorByRangeNota2(number) {
  if (number < 3) {
    return colors_green_primary.dark;
  }
  if (number < 4) {
    return colors_red_primary.dark;
  }
  return colors_red_primary.dark;
}

const TacoMetro = ({
  data = { Insatisfecho: 5, Neutros: 15, Satisfechos: 30 },
  sizeContainer = { width: 300 },
  type = 2,
}) => {
  const FONT_SIZE_XL = sizeContainer.width / 10;
  const FONT_SIZE_L = sizeContainer.width / 18;
  const FONT_SIZE_S = sizeContainer.width / 18;
  const LENGTH_NUMBER_LIST = type === 2 ? 10 : 5;
  const LENGTH_NUMBER_BARS = 5;
  const numberList = Array.from(
    { length: LENGTH_NUMBER_LIST },
    (_, i) => i + 1
  );
  const numberBars = Array.from(
    { length: LENGTH_NUMBER_BARS },
    (_, i) => i + 1
  );
  const deg_to_rad = (deg) => (deg * Math.PI) / 180;
  const rotation = calculateRotation(
    data.Satisfechos
      ? data.Satisfechos
      : data.Promotores
        ? data.Promotores
        : data.Bajo
  );
  const radio = sizeContainer.width / 2;
  const tamanio_caja = 28;
  const x1 = Math.cos(deg_to_rad(rotation)) * radio;
  const y1 = Math.sin(deg_to_rad(rotation)) * radio;
  const x2 = Math.cos(deg_to_rad(180 - rotation)) * radio;
  const y2 = Math.sin(deg_to_rad(180 - rotation)) * radio;
  return (
    <section style={{ width: sizeContainer.width, position: "relative" }}>
      <div
        style={
          rotation > 90
            ? {
              right: `${x2 + radio}px`,
              top: `${radio - y2 - tamanio_caja}px`,
              zIndex: 600,
              animationDuration: "1s",
              animationName: "fadeIn",
            }
            : {
              left: `${x1 + radio}px`,
              top: `${radio - y1 - tamanio_caja}px`,
              zIndex: 600,
              animationDuration: "1s",
              animationName: "fadeIn",
            }
        }
        className={`absolute rounded-full p-[2px_6px] border-[0px] shadow-[0px_0px_12px_-2px_#000000] border-slate-900 bg-transparent text-slate-900 text-center font-bold ${styles.text}`}
      >
        {data.Satisfechos
          ? data.Satisfechos
          : data.Promotores
            ? data.Promotores
            : data.Bajo}
        %{/* {data.Satisfechos ? data.Satisfechos : data.Bajo}% */}
      </div>
      <section
        style={{ height: sizeContainer.width / 2, width: sizeContainer.width }}
      >
        <div className={styles.wrapper}>
          {/* <div className="w-full h-full rounded-t-full overflow-hidden relative"> */}
          <div className={styles.indicatorWrapper}>
            <div className={styles.indicatorWrapperInner}>
              <div
                style={{
                  transform: `rotate(-${rotation}deg)`,
                  width: `${sizeContainer.width / 2.1}px`,
                }}
                className={`${styles.indicator}`}
              >
                <div className={styles.ballIndicador}></div>
              </div>
            </div>
          </div>
          {numberBars.map((number, i) => (
            <div
              key={i}
              className={`${styles.bar} ${styles[`bar${number}`]} ${type === 1
                ? `${styles[`bg-bar${number}-inv`]}`
                : `${styles[`bg-bar${number}`]}`
                } `}
            ></div>
          ))}
        </div>
      </section>
      <div className="flex flex-row justify-between font-semibold px-3 py-1 dropMenuColor rounded-b-md border-t-[2px] shadow-[1px_1px_10px_1px_#000000]">
        {numberList.map((number, i) => {
          return (
            <div style={{ fontSize: FONT_SIZE_S }} key={i}>
              {number}
            </div>
          );
          // }
        })}
      </div>
      <div
        className={`font-bold flex ${type == 1 ? "flex-row" : "flex-row-reverse"
          } w-full justify-between px-2 `}
      >
        {Object.keys(data).map((key, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-center items-center duration-300 ease-in-out"
            >
              <div
                style={{ fontSize: FONT_SIZE_L }}
                className={`
                drop-shadow-[1px_1px_1px_#000000]
                ${type === 2
                    ? i === 0
                      ? " text-green-400"
                      : i === 1
                        ? "text-amber-500"
                        : i === 2
                          ? "text-rose-600"
                          : ""
                    : key === "Bajo"
                      ? "text-green-400"
                      : key === "Medio"
                        ? "text-amber-500"
                        : key === "Alto"
                          ? " text-rose-600"
                          : ""
                  }`}
              >
                {key}
              </div>
              <div
                className="text-slate-900/90"
                style={{ fontSize: FONT_SIZE_L }}
              >
                {data[key]}%
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export const TacoMetro2 = ({
  data = { Insatisfecho: 5, Neutros: 15, Satisfechos: 70 },
  sizeContainer = { width: 300 },
  type = 2,
  callback,
}) => {
  const [selectedKey, setSelectedKey] = useState(
    Object.keys(data)[Object.keys(data).length - 1]
  );
  const FONT_SIZE_L = sizeContainer.width / 20;
  const FONT_SIZE_S = sizeContainer.width / 22;
  const LENGTH_NUMBER_LIST = type === 2 ? 10 : 5;
  const LENGTH_NUMBER_BARS = 5;
  const numberList = Array.from(
    { length: LENGTH_NUMBER_LIST },
    (_, i) => i + 1
  );
  const numberBars = Array.from(
    { length: LENGTH_NUMBER_BARS },
    (_, i) => i + 1
  );
  const rotation = calculateRotation(
    data.Satisfechos
      ? data.Satisfechos
      : data.Promotores
        ? data.Promotores
        : data.Bajo
  );
  const radio = sizeContainer.width / 2;
  const tamanio_caja = 28;
  const x1 = Math.cos(deg_to_rad(rotation)) * radio;
  const y1 = Math.sin(deg_to_rad(rotation)) * radio;
  const x2 = Math.cos(deg_to_rad(180 - rotation)) * radio;
  const y2 = Math.sin(deg_to_rad(180 - rotation)) * radio;
  return (
    <section style={{ width: sizeContainer.width, position: "relative" }}>
      <div
        style={
          rotation > 90
            ? {
              right: `${x2 + radio}px`,
              top: `${radio - y2 - tamanio_caja}px`,
              zIndex: 600,
              animationDuration: "1s",
              animationName: "fadeIn",
            }
            : {
              left: `${x1 + radio}px`,
              top: `${radio - y1 - tamanio_caja}px`,
              zIndex: 600,
              animationDuration: "1s",
              animationName: "fadeIn",
            }
        }
        className={`absolute rounded-full p-[2px_6px] border-[0px] shadow-[0px_0px_12px_-2px_#000000] border-slate-900 bg-transparent text-slate-900 text-center font-bold`}
      >
        {data.Satisfechos
          ? data.Satisfechos
          : data.Promotores
            ? data.Promotores
            : data.Bajo}
        %
      </div>
      <section
        style={{ height: sizeContainer.width / 2, width: sizeContainer.width }}
      >
        <div className={styles2.wrapper}>
          {/* <div className="w-full h-full rounded-t-full overflow-hidden relative"> */}
          <div className={styles2.indicatorWrapper}>
            <div className={styles2.indicatorWrapperInner}>
              <div
                style={{
                  transform: `rotate(-${rotation}deg)`,
                  width: `${sizeContainer.width / 2.1}px`,
                }}
                className={`${styles2.indicator}`}
              >
                <div className={styles2.ballIndicador}></div>
              </div>
            </div>
          </div>
          {numberBars.map((number, i) => (
            <div
              key={i}
              className={`${styles2.bar} ${styles2[`bar${number}`]}`}
            ></div>
          ))}
        </div>
      </section>
      <div className="flex flex-row justify-between font-semibold px-3 py-1 dropMenuColor rounded-b-md border-t-[2px] shadow-[1px_1px_10px_1px_#000000] mb-1">
        {numberList.map((number, i) => {
          return (
            <div
              style={{ fontSize: FONT_SIZE_S }}
              className={`${number <= 2
                ? "text-red-600/80"
                : number <= 4
                  ? "text-orange-600/80"
                  : number <= 6
                    ? "text-yellow-600/80"
                    : number <= 8
                      ? "text-green-600/80"
                      : number <= 10
                        ? "text-green-900/80"
                        : ""
                }`}
              key={i}
            >
              {number}
            </div>
          );
        })}
      </div>
      <div className="dropMenuColor py-[4px] rounded-md font-bold flex flex-row w-full justify-evenly gap-2 px-[10px]">
        {Object.keys(data).map((key, i) => {
          return (
            <div
              onClick={() => {
                setSelectedKey(key);
                callback(key);
              }}
              key={i}
              style={
                selectedKey.toLowerCase() === key.toLowerCase()
                  ? {
                    backgroundColor: "rgb(241 245 249 / 0.1)",
                    borderColor: "rgb(148 163 184 / 0.2)",
                    boxShadow: "1px 1px 3px 0px #01494f",
                  }
                  : { opacity: 0.9 }
              }
              className={`w-full border-[2px] px-1 py-[2px] border-transparent cursor-pointer bg-slate-100/60 hover:shadow-[1px_1px_3px_0px_#01494f] rounded-lg  flex flex-col justify-center items-center duration-300 ease-in-out`}
            >
              <div
                style={{ fontSize: FONT_SIZE_L }}
                className={`
                drop-shadow-[1px_1px_1px_#00000088]
                ${type === 2
                    ? i === 0
                      ? "text-red-600"
                      : i === 1
                        ? "text-yellow-400"
                        : i === 2
                          ? "text-green-400"
                          : ""
                    : key === "bajo"
                      ? "text-green-400"
                      : key === "Medio"
                        ? "text-yellow-400"
                        : key === "Alto"
                          ? " text-red-600"
                          : ""
                  }
                
                `}
              >
                {key}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

function swap_labels(
  data = {
    data: {
      bajo: 0.12,
      medio: 5.1,
      alto: 94.78,
      promedio: 94.78,
    },
    info: {
      label: "INS",
      name: "Indice Neto de satisfacción",
    },
  }
) {
  const labels =
    data.info.label === "INS"
      ? { bajo: "Insatisfechos", medio: "Neutros", alto: "Satisfechos" }
      : data.info.label === "NPS"
        ? { bajo: "Detractores", medio: "Pasivos", alto: "Promotores" }
        : { bajo: "Bajo", medio: "Medio", alto: "Alto" };
  const colours =
    data.info.label === "INS"
      ? {
        bajo: colors_red_primary.dark,
        medio: colors_yellow_primary.dark,
        alto: colors_green_primary.dark,
      }
      : data.info.label === "NPS"
        ? {
          bajo: colors_red_primary.dark,
          medio: colors_yellow_primary.dark,
          alto: colors_green_primary.dark,
        }
        : {
          bajo: colors_green_primary.dark,
          medio: colors_yellow_primary.dark,
          alto: colors_red_primary.dark,
        };
  return {
    data: {
      bajo: {
        label: labels.bajo,
        nota: data.info.label === "CES" ? data.data.alto : data.data.bajo,
        // nota: data.data.bajo,
        color: colours.bajo,
      },
      medio: {
        label: labels.medio,
        nota: data.data.medio,
        color: colours.medio,
      },
      alto: {
        label: labels.alto,
        nota: data.info.label === "CES" ? data.data.bajo : data.data.alto,
        // nota: data.data.alto,
        color: colours.alto,
      },
      promedio: data.data.promedio,
      // data.info.label === "CES"
      //   ? 100 - data.data.promedio
      //   : data.data.promedio,
    },
    info: { ...data.info },
  };
}

export function TacoMetro3({
  data = {
    data: {
      bajo: 0.12,
      medio: 5.1,
      alto: 94.78,
      promedio: 94.78,
    },
    info: {
      label: "INS",
      name: "Indice Neto de satisfacción",
    },
  },
  sizeContainer = { width: 300 },
  type = 2,
}) {
  const formated_data = swap_labels(data);
  const FONT_SIZE_L = sizeContainer.width / 18;
  const FONT_SIZE_S = sizeContainer.width / 18;
  const LENGTH_NUMBER_LIST =
    type === 2 ? (data.info.label === "NPS" ? 11 : 10) : 5;
  const LENGTH_NUMBER_BARS = 5;
  const numberList = Array.from({ length: LENGTH_NUMBER_LIST }, (_, i) =>
    data.info.label === "NPS" ? i : i + 1
  );
  const numberBars = Array.from(
    { length: LENGTH_NUMBER_BARS },
    (_, i) => i + 1
  );
  const deg_to_rad = (deg) => (deg * Math.PI) / 180;
  const rotation = calculateRotation(formated_data.data.promedio);
  const radio = sizeContainer.width / 2;
  const tamanio_caja = 28;
  const x1 = Math.cos(deg_to_rad(rotation)) * radio;
  const y1 = Math.sin(deg_to_rad(rotation)) * radio;
  const x2 = Math.cos(deg_to_rad(180 - rotation)) * radio;
  const y2 = Math.sin(deg_to_rad(180 - rotation)) * radio;
  return (
    <section style={{ width: sizeContainer.width, position: "relative" }}>
      <div
        style={
          rotation > 90
            ? {
              // right: `${x2 + radio}px`,
              // top: `${radio - y2 - tamanio_caja}px`,
              right: "0px",
              left: "0px",
              bottom: "-23px",
              top: "0px",
              zIndex: 600,
              animationDuration: "1s",
              animationName: "fadeIn",
              // backgroundColor: colors_green_primary.dark,
            }
            : {
              // left: `${x1 + radio}px`,
              // top: `${radio - y1 - tamanio_caja}px`,
              right: "0px",
              left: "0px",
              bottom: "-23px",
              top: "0px",
              zIndex: 600,
              animationDuration: "1s",
              animationName: "fadeIn",
              // backgroundColor: colors_green_primary.dark,
            }
        }
        className={`w-[90px] h-[40px] mx-auto my-auto absolute bg-slate-100 rounded-t-2xl text-2xl font-semibold py-1 px-2 border-[0px] shadow-[0px_0px_4px_-2px_#000000] border-slate-900 text-slate-900 text-center `}
      >
        {/* {type === 1 ? data.data.bajo : data.data.promedio}% */}
        {type === 1 ? data.data.promedio : data.data.promedio}%
      </div>
      <section
        style={{ height: sizeContainer.width / 2, width: sizeContainer.width }}
      >
        <div className={styles.wrapper}>
          <div className={styles.indicatorWrapper}>
            <div className={styles.indicatorWrapperInner}>
              <div
                style={{
                  transform: `rotate(-${rotation}deg)`,
                  width: `${sizeContainer.width / 2.1}px`,
                }}
                className={`${styles.indicator}`}
              >
                <div className={styles.ballIndicador}></div>
              </div>
            </div>
          </div>
          {numberBars.map((number, i) => (
            <div
              key={i}
              className={`${styles.bar} ${styles[`bar${number}`]} ${type === 1
                ? `${styles[`bg-bar${number}-inv`]}`
                : `${styles[`bg-bar${number}`]}`
                } `}
            ></div>
          ))}
        </div>
      </section>
      <div
        style={{ backgroundColor: "#ffffff" }}
        className="flex flex-row justify-between font-semibold px-3 rounded-b-md border-t-[2px] shadow-[0px_0px_2px_1px_#000000] mb-1"
      >
        {numberList.map((number, i) => {
          return (
            <div
              className="text-slate-700"
              style={{
                fontSize: FONT_SIZE_S,
                // color:
                //   type === 2
                //     ? changeColorByRangeNota(number)
                //     : changeColorByRangeNota2(number),
              }}
              key={i}
            >
              {number}
            </div>
          );
          // }
        })}
      </div>
      <div
        // style={{ flexDirection: type == 1 ? "row-reverse" : "row" }}
        className="font-bold flex flex-row w-full justify-between px-2"
      >
        {Object.values(formated_data.data).map((item, i) => {
          if (typeof item === "object") {
            return (
              <div
                key={i}
                className="flex flex-col justify-center items-center duration-300 ease-in-out"
              >
                <div
                  style={{
                    fontSize: FONT_SIZE_L,
                    // color: item.color 
                  }}
                  className="drop-shadow-[1px_1px_1px_#00000066] text-slate-700"
                >
                  {item.label}
                </div>
                <div
                  className="text-slate-900/90 drop-shadow-[1px_1px_1px_#00000066]"
                  style={{
                    fontSize: FONT_SIZE_L,
                    color: item.color,
                  }}
                >
                  {item.nota}%
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}

export default TacoMetro;
