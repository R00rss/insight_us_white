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

function BarChart({
  data = DEFAULT_DATA,
  title = "Esfuerzo",
  sizeContainer = { width: 500, height: 300 },
  sizeLegend = { height: sizeContainer.height / 4 },
  sizeGraph = { height: (3 * sizeContainer.height) / 4 },
}) {
  const FONT_SIZE_TITLE = sizeContainer.width / 35;
  const FONT_SIZE_LEGEND = sizeContainer.width / 40;
  const FONT_SIZE_SUBTITLE = sizeContainer.width / 42;
  const MAX_BAR_HEIGHT =
    sizeContainer.height - sizeLegend.height - FONT_SIZE_SUBTITLE - 4;
  const [barSizes, setBarSizes] = useState({
    width: 0,
    space: 0,
  });
  function calculateHeight(cant) {
    console.log(MAX_BAR_HEIGHT);
    console.log(cant);
    console.log(cant * (MAX_BAR_HEIGHT / 100));
    return cant * (MAX_BAR_HEIGHT / 100);
    // if (cant * MAX_BAR_HEIGHT - LEGEND_HEIGHT > 0) {
    //   return cant * MAX_BAR_HEIGHT - LEGEND_HEIGHT;
    // } else {
    //   return cant * MAX_BAR_HEIGHT;
    // }
  }

  useEffect(() => {
    if (data.length > 0) {
      const temp_bar_width = sizeContainer.width / (data.length * 3);
      console.log(temp_bar_width);
      console.log(sizeContainer.width);
      console.log(data.length);
      if (temp_bar_width >= 5) {
        console.log("se puede renderizar");
        setBarSizes({
          width: temp_bar_width,
          space: Math.round(temp_bar_width * 0.2),
        });
      } else {
        console.log("no se puede renderizar");
      }
    } else {
      console.log("data no tiene items");
    }

    return () => {};
  }, []);

  useEffect(() => console.log(barSizes), [barSizes]);
  console.log(sizeContainer);
  return (
    <div
      style={{ height: sizeContainer.height, width: sizeContainer.width }}
      className="text-xs text-slate-700/90 flex flex-col justify-center items-center rounded-lg"
    >
      <section className="w-full" style={{ height: sizeLegend.height }}>
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
                    backgroundColor: `${
                      item === "AGILIDAD" || item === "ESFUERZO"
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
        className={`w-full py-0 flex flex-row gap-[${barSizes.space}px] items-end justify-center font-semibold`}
        style={{ height: sizeGraph.height }}
      >
        {data.map((item, i) => (
          <div
            key={i}
            style={{ width: `${barSizes.width}px` }}
            className={`flex flex-col items-center`}
          >
            <div className="grid grid-rows-[repeat(3,1fr)] w-full">
              {Object.keys(item.cant).map((key, j) => {
                return (
                  <div
                    key={j}
                    className={`bg-black rounded-t-md shadow-[1px_1px_10px_1px_#000000]`}
                    style={{
                      height: `calc(${calculateHeight(item.cant[key])}px)`,
                      backgroundColor: `${
                        key === "AGILIDAD" || key === "ESFUERZO"
                          ? "#1c786c"
                          : key === "AMABILIDAD" || key === "RECOMENDACION"
                          ? "#0e7af5"
                          : key === "BIOSEGURIDAD" || key === "RECOMPRA"
                          ? "#9c3214"
                          : key === "SATISFACCION GENERAL" || key === "RECOMPRA"
                          ? "#107839"
                          : "#959c14"
                      }`,
                    }}
                  ></div>
                );
              })}
            </div>
            <span
              className="text-slate-900 font-extrabold bg-slate-900/30 rounded-lg px-2"
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
