import React from "react";

const PostsTable = ({ data }) => {
  if ("dataByCompanies" in data) {
    const companies = Object.keys(data.dataByCompanies);
    const subjects = Object.keys(data.dataByCompanies[companies[0]]);

    function calculateColor(value) {
      if (value <= 0.5) return "#ff210d";
      if (value > 0.5 && value <= 0.8) return "#ffe30d";
      if (value > 0.8) return "#40f77d";
    }
    return (
      <div className="">
        {companies.length > 0 && subjects.length > 0 && (
          <section className="flex flex-row font-bold text-xs">
            <div className="flex flex-col flex-grow-[100] px-2">
              <div
                style={{
                  gridTemplateColumns: `repeat(${subjects.length + 1}, 1fr)`,
                }}
                className="grid text-center"
              >
                <div>Agencias</div>
                {subjects.map((subject, i) => (
                  <div key={i} className="capitalize text-center">
                    {subject.toLowerCase()}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between gap-6 mt-6">
                {companies.map((company, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        gridTemplateColumns: `repeat(${
                          subjects.length + 1
                        }, 1fr)`,
                      }}
                      className="grid text-center"
                    >
                      <div
                        className="font-semibold capitalize text-slate-800/90"
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
                                backgroundColor: calculateColor(
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

export default PostsTable;
