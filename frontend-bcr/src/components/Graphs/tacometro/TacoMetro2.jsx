import React from "react";
import { useState } from "react";
import styles from "./tacometro2.module.css";
const TacoMetro = ({
  data = { Insatisfecho: 5, Neutros: 15, Satisfechos: 30 },
  sizeContainer = { width: 300 },
  type = 2,
}) => {
  function calculateRotation(satisfechos) {
    return 180 * (1 - satisfechos / 100);
  }
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
    data.Satisfechos ? data.Satisfechos : data.Bajo
  );
  const xPos = 100 * (1 - Math.cos(deg_to_rad(rotation)));
  const yPos = 100 * (1 - Math.sin(deg_to_rad(rotation))) - 20;
  return (
    <section style={{ width: sizeContainer.width, position: "relative" }}>
      <div
        style={{
          right: `${xPos > 150 ? xPos + 75 : xPos - 65}px`,
          top: `${yPos}px`,
          zIndex: 600,
          animationDuration: "1s",
          animationName: "fadeIn",
        }}
        className={`absolute rounded-full p-[2px_6px] border-[0px] shadow-[0px_0px_12px_-2px_#000000] border-slate-900 bg-transparent text-slate-900 text-center font-bold ${styles.text}`}
      >
        {data.Satisfechos ? data.Satisfechos : data.Bajo}%
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
            <div className={`${styles.bar} ${styles[`bar${number}`]}`}></div>
          ))}
        </div>
      </section>
      <div className="flex flex-row justify-between font-semibold px-3 py-2">
        {numberList.map((number, i) => {
          return (
            <div
              style={{ fontSize: FONT_SIZE_S }}
              className={`${
                number <= 2
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
          // }
        })}
      </div>
      <div className="font-bold flex flex-row w-full justify-between px-2">
        {Object.keys(data).map((key, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-center items-center duration-300 ease-in-out"
            >
              <div
                style={{ fontSize: FONT_SIZE_L }}
                // className={`${
                //   key === "Insatisfecho"
                //     ? "text-red-600"
                //     : key === "Neutros"
                //     ? "text-yellow-600"
                //     : key === "Satisfechos"
                //     ? "text-green-900"
                //     : ""
                // }`}
                className={`${
                  i === 0
                    ? "text-red-600"
                    : i === 1
                    ? "text-yellow-600"
                    : i === 2
                    ? "text-green-900"
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

export default TacoMetro;
