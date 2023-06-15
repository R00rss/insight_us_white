import React from "react";
const MAX_BAR_HEIGHT = 100;
const LEGEND_HEIGHT = 100;
const BarChart = ({
  data = [
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
  ],
  title = "Esfuerzo",
  sizeContainer = { width: 500, height: 300 },
}) => {
  const BARS_HEIGHT = sizeContainer.height / MAX_BAR_HEIGHT;
  function calculateHeight(cant) {
    return cant * BARS_HEIGHT - LEGEND_HEIGHT;
  }
  const FONT_SIZE_TITLE = sizeContainer.width / 35;
  const FONT_SIZE_LEGEND = sizeContainer.width / 40;
  const FONT_SIZE_SUBTITLE = sizeContainer.width / 45;
  return (
    <div
      style={{ height: sizeContainer.height, width: sizeContainer.width }}
      className="text-xs text-slate-700/90 flex flex-col justify-center items-center"
    >
      <h1
        style={{ fontSize: FONT_SIZE_TITLE }}
        className="py-2 text-slate-900/90 font-extrabold w-full text-left"
      >
        {title}
      </h1>
      <section className=" flex flex-row gap-3 w-full justify-start items-center font-semibold">
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
                    item === "INS"
                      ? "#00ffdd"
                      : item === "NPS"
                      ? "#0e7af5"
                      : "#db1974"
                  }`,
                }}
              ></div>
              <span style={{ fontSize: FONT_SIZE_LEGEND }}>{item}</span>
            </div>
          );
        })}
      </section>
      <section className=" grow-[100] py-4 flex flex-row gap-2 items-end justify-between w-full font-semibold">
        {data.map((item, i) => (
          <div key={i} className=" flex flex-col items-center">
            <div className="flex flex-row gap-1 items-end ">
              {Object.keys(item.cant).map((key, i) => (
                <div
                  key={i}
                  className="w-[6px] bg-black rounded-t-md"
                  style={{
                    height: `calc(${calculateHeight(item.cant[key])}px)`,
                    backgroundColor: `${
                      key === "INS"
                        ? "#00ffdd"
                        : key === "NPS"
                        ? "#0e7af5"
                        : "#db1974"
                    }`,
                  }}
                ></div>
              ))}
            </div>
            <span style={{ fontSize: FONT_SIZE_SUBTITLE }}>{item.title}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BarChart;
