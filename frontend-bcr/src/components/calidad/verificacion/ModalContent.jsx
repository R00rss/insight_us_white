import React, { useEffect, useState } from "react";

const ModalContent = ({ data }) => {
  const [selectedPlantilla, setSelectedPlantilla] = useState([]);
  useEffect(() => {
    const parseData = JSON.parse(data.dataPlantilla);
    if ("items" in parseData) {
      setSelectedPlantilla(parseData.items);
    }
  }, []);
  // useEffect(() => {
  //   console.log(selectedPlantilla);
  // }, [selectedPlantilla]);

  return (
    <>
      {
        <section className="flex flex-col gap-1">
          <section className="grid grid-cols-[2fr_5fr_1fr_1fr] text-center py-[1px] navbarColor4 text-slate-100 rounded-t-md shadow-[2px_2px_4px_1px_#868686cc]">
            <div className="">Nombre</div>
            <div className="">Descripción</div>
            <div className="">Porcentaje</div>
            <div className="">Calificación</div>
          </section>
          <section className="text-slate-600 bg-gradient-to-br from-[#d3d1d1] to-[#ffffff] shadow-[2px_2px_4px_1px_#868686cc] rounded-b-md">
            {selectedPlantilla.map((item, j) => {
              // console.log(item);
              return (
                <section
                  className="grid grid-cols-[2fr_5fr_1fr_1fr] even:bg-slate-300 text-sm"
                  key={j}
                >
                  <div className="py-1 flex justify-center items-center text-slate-900 px-2 text-center">
                    {item.name}
                  </div>

                  {item.items ? (
                    <ul className="py-1 flex flex-col gap-1 ">
                      {item.items.map((subitem, k) => {
                        return (
                          <li className="list-disc ml-5" key={k}>
                            {subitem}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="py-1 flex justify-center items-center">
                      {item.description}%
                    </div>
                  )}
                  <div className="py-1 flex justify-center items-center">
                    {item.percentage}%
                  </div>
                  <div className="py-1 flex justify-center items-center">
                    {item.calf}%
                  </div>
                </section>
              );
            })}
          </section>
        </section>
      }
    </>
  );
};

export default ModalContent;
