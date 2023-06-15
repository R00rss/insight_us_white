import React, { useEffect, useState } from "react";

const DEFAULT_DATA = [
  { cant: { INS: 100, NPS: 20, CES: 80 }, title: "Jan 20" },
  { cant: { INS: 10, NPS: 90, CES: 80 }, title: "Feb 20" },
  { cant: { INS: 30, NPS: 70, CES: 80 }, title: "Mar 20" },
  { cant: { INS: 7, NPS: 30, CES: 40 }, title: "Apr 20" },
  { cant: { INS: 100, NPS: 10, CES: 70 }, title: "Apr 20" },
  { cant: { INS: 7, NPS: 30, CES: 100 }, title: "Apr 20" },
  { cant: { INS: 20, NPS: 50, CES: 40 }, title: "Apr 20" },
  { cant: { INS: 7, NPS: 30, CES: 20 }, title: "Apr 20" },
  { cant: { INS: 70, NPS: 30, CES: 40 }, title: "Apr 20" },
  { cant: { INS: 100, NPS: 30, CES: 80 }, title: "Dec 20" },
];
const colors = ['#47d733', '#ff9900', '#00aeff', '#9bfa52', '#00aeff']

const MAX_WIDTH = "20px";
function BarChart({
  data = DEFAULT_DATA,
  title = "Esfuerzo",
  sizeContainer = { width: 500, height: 300 },
}) {
  const SPACE_BETWEEN_LEGEND_GRAPH = 8;
  const SPACE_BETWEEN_SUBTITLE_GRAPH = 5;
  const sizeLegend = {
    height: sizeContainer.height * 0.2,
  };
  const sizeGraph = {
    height: sizeContainer.height - sizeLegend.height,
  };
  const FONT_SIZE_TITLE = sizeContainer.width / 45;
  const FONT_SIZE_LEGEND = sizeLegend.width / (data.length * 1.4);
  const FONT_SIZE_SUBTITLE = sizeContainer.width / (data.length * 15);
  console.log("FONT_SIZE_TITLE", FONT_SIZE_TITLE);
  console.log("FONT_SIZE_LEGEND", FONT_SIZE_LEGEND);
  console.log("FONT_SIZE_SUBTITLE", FONT_SIZE_SUBTITLE);
  const MAX_BAR_HEIGHT =
    sizeGraph.height - SPACE_BETWEEN_SUBTITLE_GRAPH - FONT_SIZE_SUBTITLE * 4.8;
  function calculateHeight(cant) {
    return cant * (MAX_BAR_HEIGHT / 100);
  }
  return (
    <div
      style={{
        height: sizeContainer.height,
        width: sizeContainer.width,
        gap: `${SPACE_BETWEEN_LEGEND_GRAPH}px`,
      }}
      className="text-xs text-slate-700/90 flex flex-col justify-center items-center rounded-lg"
    >
      <section
        style={{ height: sizeLegend.height }}
        className={`w-full flex justify-center items-center flex-col`}
      >
        <h1
          style={{ fontSize: FONT_SIZE_TITLE }}
          className="py-0 text-slate-900/90 font-extrabold w-full text-left"
        >
          {title}
        </h1>
        <section className=" flex flex-col gap-1 w-full justify-start items-start font-semibold">
          {Object.keys(data[0].cant).map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-row gap-1 justify-center items-center"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: `${item === "AGILIDAD" || item === "ESFUERZO"
                      ? "#1c786c"
                      : item === "AMABILIDAD" || item === "RECOMENDACION"
                        ? "#0e7af5"
                        : item === "BIOSEGURIDAD" || item === "RECOMPRA"
                          ? "#9c3214"
                          : item === "SATISFACCION GENERAL" || item === "RECOMPRA"
                            ? "#107839"
                            : "#959c14"
                      }`,
                  }}
                ></div>
                <div
                  className="capitalize"
                  style={{ fontSize: FONT_SIZE_LEGEND }}
                >
                  {item.toLowerCase()}
                </div>
              </div>
            );
          })}
        </section>
      </section>
      <section
        style={{
          height: sizeGraph.height,
          display: "grid",
          gridTemplateColumns: `repeat(${data.length},1fr)`,
          gap: `${(sizeContainer.width / data.length) * 0.2}px`,
        }}
        className={`w-full`}
      >
        {data.map((item, i) => (
          <div
            key={i}
            style={{ gap: `${SPACE_BETWEEN_SUBTITLE_GRAPH}px` }}
            className="flex flex-col justify-end items-center"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Object.keys(data[0].cant).length
                  },1fr)`,
                alignItems: "end",
                justifyItems: "center",
                width: "100%",
              }}
              key={i}
            >
              {Object.keys(item.cant).map((key, j) => {
                return (
                  <div
                    key={j}
                    className={`w-full rounded-t-md shadow-[1px_1px_10px_1px_#000000]`}
                    style={{
                      maxWidth: MAX_WIDTH,
                      height: `calc(${calculateHeight(item.cant[key])}px)`,
                      // backgroundColor: `${
                      //   key === "AGILIDAD" || key === "ESFUERZO"
                      //     ? "#1c786c"
                      //     : key === "AMABILIDAD" || key === "RECOMENDACION"
                      //     ? "#0e7af5"
                      //     : key === "BIOSEGURIDAD" || key === "RECOMPRA"
                      //     ? "#9c3214"
                      //     : key === "SATISFACCION GENERAL" || key === "RECOMPRA"
                      //     ? "#107839"
                      //     : "#959c14"
                      // }`,
                      backgroundColor: `${key === "AGILIDAD" || key === "ESFUERZO"
                        ? colors[0]
                        : key === "AMABILIDAD" || key === "RECOMENDACION"
                          ? colors[1]
                          : key === "BIOSEGURIDAD" || key === "RECOMPRA"
                            ? colors[2]
                            : key === "SATISFACCION GENERAL" || key === "RECOMPRA"
                              ? colors[3]
                              : colors[4]
                        }`,
                    }}
                  ></div>
                );
              })}
            </div>
            <span
              className="w-full text-slate-900 font-extrabold bg-slate-900/30 rounded-lg px-2"
              style={{ fontSize: FONT_SIZE_SUBTITLE }}
            >
              {item.title}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default BarChart;
