import React from "react";
import { toFixedIfNecessary } from "../../../functions/manageNumbers";
import { minimizeStr } from "../../../functions/manageStr";
const keysToDisplay = {
  cliente: { name: "cliente", size: "1" },
  notaFinal: { name: "calificación", size: "1" },
  fecha: { name: "fecha", size: "1" },
  ciudad: { name: "ciudad", size: "1" },
  estacion: { name: "estación", size: "1" },
  area: { name: "área", size: "2" },
};
function formateGridStr() {
  let resultStr = "";
  Object.values(keysToDisplay).forEach((value, i) => {
    if (i === Object.values(keysToDisplay).length - 1) {
      resultStr += `${value.size}fr`;
    } else {
      resultStr += `${value.size}fr `;
    }
  });
  return resultStr;
}

const Table = ({ data }) => {
  console.log("table", data);
  function calculateColor(value) {
    if (value <= 0.5) return "#ff210d";
    if (value > 0.5 && value <= 0.8) return "#ffe30d";
    if (value > 0.8) return "#40f77d";
  }
  if (data && data.length > 0) {
    return (
      <div className="overflow-y-auto h-full w-full flex flex-col font-bold text-xs gap-1">
        <div
          style={{
            gridTemplateColumns: `${formateGridStr()}`,
          }}
          className={`grid text-center sticky top-0 gap-[3px] rounded-md text-slate-900`}
        >
          {Object.values(keysToDisplay).map((title, i) => (
            <div
              key={i}
              className="first:rounded-l-lg  bg-slate-500/95 last:rounded-r-lg capitalize text-center flex justify-center items-center"
            >
              {title.name.toLowerCase()}
            </div>
          ))}
        </div>
        {data.map((item, i) => (
          <div
            key={i}
            style={{
              gridTemplateColumns: `${formateGridStr()}`,
            }}
            className="grid items-center text-center odd:bg-slate-400/40 even:bg-slate-400/10"
          >
            {Object.keys(keysToDisplay).map((key, j) => {
              return (
                <div
                  className="font-bold capitalize text-slate-900/90 flex justify-center items-center"
                  key={j}
                >
                  <p
                    style={
                      key === "notaFinal"
                        ? {
                            // boxShadow: `1px 1px 6px 0px ${calculateColor(
                            //   item[key]
                            // )}`,
                            backgroundColor: calculateColor(item[key]),
                            // width: "36px",
                            minWidth: "38px",
                          }
                        : {}
                    }
                    className=" rounded-lg px-2"
                  >
                    {key === "notaFinal"
                      ? toFixedIfNecessary(item[key], 2)
                      : minimizeStr(item[key], 20)}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  } else {
    <>no data</>;
  }
};

export default Table;
