import React, { useEffect, useState } from "react";
// import lupeIcon from "../../assets/icons/lupe2.png";
import { getData, getGlobalData } from "../../services/getData";
import { useSelector, useDispatch } from "react-redux";
import { getIndicadores, getInicialData } from "../../services/inicialData";
import { setValuesDataFromExcel } from "../../redux/sliders/data/dataFromExcel";
import useWindowDimensions from "../../hooks/windowsHook";
import arrowIcon from "../../assets/icons/arrow.svg";
import { minimizeStr } from "../../functions/manageStr";

const FilterBarEncuestas = ({ module = "indicadores" }) => {
  const { height, width } = useWindowDimensions();
  console.log(height, width);
  const dataFromExcel = useSelector((state) => state.dataExcel.value);
  console.log(dataFromExcel);
  const dispatch = useDispatch();

  const [selectedData, setSelectedData] = useState({
    agencia: "",
    tipo_indicador: "",
    indicador: "",
    fecha: "",
  });
  const [dataToFilter, setDataToFilter] = useState({
    module: module,
    data: {
      fechas: [],
      export: false,
      agencias: [],
      tipo_indicador: [],
      indicadores: [],
    },
  });
  useEffect(() => console.log(dataToFilter), [dataToFilter]);
  useEffect(() => console.log(selectedData), [selectedData]);

  useEffect(() => {
    getInicialData().then((response) => {
      console.log(response);
      if ("success" in response && response.success) {
        const temp = JSON.parse(JSON.stringify(dataToFilter));
        temp["data"]["agencias"] = response.payload.companies;
        temp["data"]["tipo_indicador"] = response.payload.tipo_indicador;
        temp["data"]["fechas"] = response.payload.fechas;
        setDataToFilter(temp);
        setSelectedData({
          ...selectedData,
          tipo_indicador: response.payload.tipo_indicador[0],
          agencia: response.payload.companies[0],
          fecha: response.payload.fechas[0],
        });
      }
    });
  }, []);
  useEffect(() => {
    console.log(selectedData.tipo_indicador);
    if (
      selectedData.tipo_indicador !== "" &&
      selectedData.tipo_indicador !== "Tipo de indicador"
    ) {
      getIndicadores(selectedData.tipo_indicador).then((response) => {
        if ("success" in response && response.success) {
          if (response.payload.length > 0) {
            const temp = JSON.parse(JSON.stringify(dataToFilter));
            temp["data"]["indicadores"] = response.payload;
            console.log(temp);
            console.log(response.payload);
            setDataToFilter(temp);
            setSelectedData({
              ...selectedData,
              indicador: response.payload[0],
            });
          }
        }
      });
      getGlobalData(selectedData).then((response) => {
        if (response && "payload" in response && response?.success) {
          dispatch(
            setValuesDataFromExcel({
              key: "dataGlobal",
              value: response.payload,
            })
          );
        }
      });
    }
  }, [selectedData.tipo_indicador]);
  useEffect(() => {
    console.log("cambio selected data", selectedData);
    if (
      selectedData.tipo_indicador !== undefined &&
      selectedData.indicador !== undefined &&
      selectedData.agencia !== undefined &&
      selectedData.fecha !== undefined &&
      selectedData.tipo_indicador !== "" &&
      selectedData.indicador !== "" &&
      selectedData.agencia !== "" &&
      selectedData.fecha !== ""
    ) {
      getData(selectedData).then((response) => {
        console.log(response);
        if (response && "payload" in response && response?.success) {
          dispatch(
            setValuesDataFromExcel({
              key: "dataFilter",
              value: response.payload,
            })
          );
        }
      });
    }
  }, [
    selectedData.agencia,
    selectedData.tipo_indicador,
    selectedData.indicador,
    selectedData.fecha,
  ]);

  return (
    <section className="flex flex-row justify-center lg:justify-between items-center w-full px-1 navbarColor2 rounded-[0px_200px_0px_200px] text-sm shadow-[3px_3px_4px_0px_#000000aa]">
      <section className="cursor-pointer relative group/menu_filtros py-1 w-[200px] lg:w-full flex flex-row gap-3 justify-center items-center text-slate-200/90 font-medium">
        <div className="flex lg:hidden w-[200px] h-6 relative px-2 flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90">
          <section className="w-full h-full flex flex-row justify-between items-center">
            <h2>Filtros</h2>
            <img
              className="h-4 w-4 filter contrast-[30%] outline-none group-hover/menu_filtros:contrast-100 group-hover/menu_filtros:rotate-180 duration-300 ease-in-out"
              src={arrowIcon}
              alt="arrow icon"
            />
          </section>
        </div>
        <div className="z-[700] px-2 lg:flex duration-300 lg:top-0 lg:left-0 md:top-[4px] md:left-[calc(50%+70px)] top-[30px] m-auto md:md-none hidden lg:relative absolute group-hover/menu_filtros:flex hover:flex rounded-b-md outline-none cursor-pointer gap-2 text-slate-200 font-medium">
          <ul className="bg-cyan-300 py-1 lg:py-0 shadow-[0px_0px_10px_1px_#00000088] lg:shadow-none px-1 rounded-md lg:bg-transparent w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center text-slate-200/90 font-medium">
            <li className="hover:shadow-[0px_0px_2px_2px_#0cd4d4] w-[180px] h-6 relative group/item1 px-2 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90">
              <section className="w-full h-full flex flex-row justify-between items-center">
                <div>Agencia</div>
                <img
                  className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item1:contrast-100 group-hover/item1:rotate-180 duration-300 ease-in-out"
                  src={arrowIcon}
                  alt="arrow icon"
                />
              </section>
              <ul className="z-[500] h-[300px] px-1 py-1 w-full flex-col overflow-y-auto duration-300 top-[22px] hidden absolute group-hover/item1:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium">
                {dataToFilter?.data?.agencias?.map((agencia, i) => (
                  <li
                    onClick={() => {
                      const temp = JSON.parse(JSON.stringify(selectedData));
                      temp["agencia"] = agencia;
                      setSelectedData(temp);
                    }}
                    key={i}
                    className="capitalize bg-[#0cd4d4bb] rounded-md px-1 hover:bg-[#0cd4d477]"
                  >
                    {minimizeStr(agencia.toLowerCase(), 20)}
                  </li>
                ))}
              </ul>
            </li>
            <li className="hover:shadow-[0px_0px_2px_2px_#0cd4d4]  w-[180px] h-6 relative group/item2 px-2 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90">
              <section className="w-full h-full flex flex-row justify-between items-center">
                <div>Tipos de indicador</div>
                <img
                  className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item2:contrast-100 group-hover/item2:rotate-180 duration-300 ease-in-out"
                  src={arrowIcon}
                  alt="arrow icon"
                />
              </section>
              <ul className="z-[500] px-1 py-1 w-full flex-col  duration-300 top-[22px] hidden absolute group-hover/item2:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium">
                {dataToFilter?.data?.tipo_indicador?.map(
                  (tipo_indicador, i) => (
                    <li
                      onClick={() => {
                        setSelectedData({
                          ...selectedData,
                          tipo_indicador: tipo_indicador,
                        });
                      }}
                      key={i}
                      className="capitalize bg-[#0cd4d4bb] rounded-md px-1 hover:bg-[#0cd4d477]"
                    >
                      {minimizeStr(tipo_indicador.toLowerCase(), 20)}
                    </li>
                  )
                )}
              </ul>
            </li>
            <li className="hover:shadow-[0px_0px_2px_2px_#0cd4d4] w-[180px] lg:w-[140px] h-6 relative group/item3 px-2 flex flex-row justify-center items-center rounded-md gap-2 text-slate-800/90 font-extrabold border-[1px] shadow-[4px_6px_20px_-2px_#00000066]  border-[#00000015] bg-gradient-to-r from-sky-100/90 via-sky-100 to-sky-100/90">
              <section className="w-full h-full flex flex-row justify-between items-center">
                <div>Periodo</div>
                <img
                  className="h-4 w-4 filter contrast-[30%] outline-none group-hover/item3:contrast-100 group-hover/item3:rotate-180 duration-300 ease-in-out"
                  src={arrowIcon}
                  alt="arrow icon"
                />
              </section>
              <ul className="z-[500] px-1 py-1 w-full flex-col  duration-300 top-[22px] hidden absolute group-hover/item3:flex hover:flex shadow-[0px_0px_15px_0px_#ffffffdd] rounded-b-md outline-none cursor-pointer bg-slate-300 gap-2 text-slate-200 font-medium">
                {dataToFilter?.data?.fechas?.map((fecha, i) => (
                  <li
                    onClick={() => {
                      setSelectedData({
                        ...selectedData,
                        fecha: fecha,
                      });
                    }}
                    key={i}
                    className="capitalize bg-[#0cd4d4bb] rounded-md px-1 hover:bg-[#0cd4d477]"
                  >
                    {minimizeStr(fecha.toLowerCase(), 20)}
                  </li>
                ))}
              </ul>
            </li>
            <li className="w-[180px] lg:w-[140px] cursor-pointer gap-2 flex justify-center items-center">
              <button className="duration-300 hover:border-cyan-300/60 hover:text-slate-800 border-[1px] border-transparent w-full h-6 bg-[#000000] hover:bg-transparent px-4 hover:shadow-[0px_0px_15px_1px_#0cd4d477] font-bold text-slate-200 rounded-lg">
                Exportar
              </button>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default FilterBarEncuestas;
