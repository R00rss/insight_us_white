import React from "react";
import { toFixedIfNecessary } from "../../functions/manageNumbers";
import { minimizeStr } from "../../functions/manageStr";

const Table = ({ data }) => {
  console.log("table", data);
  const SUBJECTS_DEFAULT = ['Agencias', 'INS', 'NPS', 'CES']
  if ("dataByCompanies" in data) {
    const companies = Object.keys(data.dataByCompanies);
    const subjects = Object.keys(data.dataByCompanies[companies[0]]);

    console.log("companies", companies);
    function calculateColor(value) {
      if (value <= 0.5) return "#ff210d";
      if (value > 0.5 && value <= 0.8) return "#ffe30d";
      if (value > 0.8) return "#40f77d";
    }
    function calculateColor2(value) {
      if (value <= 0.05) return "#40f77d";
      if (value > 0.05 && value <= 0.15) return "#ffe30d";
      if (value > 0.15) return "#ff210d ";
    }
    return (
      <div className="w-full overflow-y-auto h-[350px]">
        {companies.length > 0 && subjects.length > 0 && (
          <section className="flex flex-row font-bold text-xs">
            <div className="flex flex-col flex-grow-[100] px-2 ">
              <div
                style={{
                  gridTemplateColumns: `repeat(${subjects.length + 1}, 1fr)`,
                }}
                className="grid text-center sticky top-0 gap-[3px] rounded-md text-slate-900"
              >
                {/* <div className="first:rounded-l-lg  bg-slate-500/95 capitalize text-center flex justify-center items-center">
                  Agencias
                </div> */}
                {SUBJECTS_DEFAULT.map((subject, i) => (
                  <div
                    key={i}
                    className="capitalize text-center bg-slate-500/95  first:rounded-l-lg  last:rounded-r-lg flex justify-center items-center"
                  >
                    {subject}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between gap-[4px] mt-3">
                {companies.map((company, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        gridTemplateColumns: `repeat(${subjects.length + 1
                          }, 1fr)`,
                      }}
                      className="grid text-center odd:bg-slate-400/40 even:bg-slate-400/10"
                    >
                      <div
                        className="font-bold capitalize text-slate-900/90 "
                        key={i}
                      >
                        {minimizeStr(company.toLowerCase())}
                      </div>
                      {subjects.map((subject, j) => {
                        return (
                          <div
                            key={j}
                            className="flex justify-center items-center font-semibold"
                          >
                            <div
                              className="w-[62px] flex justify-center items-center text-slate-900 rounded-full px-2"
                              style={{
                                backgroundColor: j == 0 ? calculateColor2(data.dataByCompanies[company][subject].total) : calculateColor(
                                  data.dataByCompanies[company][subject].total
                                ),
                                fontSize: "0.75rem",
                              }}
                            >
                              {toFixedIfNecessary(
                                data.dataByCompanies[company][subject].total *
                                100,
                                2
                              )}
                              %
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div>Sin data disponible</div>
      </div>
    );
  }
};

export default Table;
