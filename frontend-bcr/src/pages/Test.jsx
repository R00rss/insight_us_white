import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import BarChart from "../components/Graphs/barchart/BarChart";
// import TacoMetro from "../components/Graphs/tacometro/TacoMetro";
import Table from "../components/table/table";
import { getPlantillas } from "../services/clienteFantasma";

const Test = () => {
  // const data = useSelector((state) => state.dataExcel.value);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    getPlantillas().then((data) => setData(data.message));
  }, []);

  return (
    <div className="min-h-screen">
      <div>
        {data.map((item, i) => {
          console.log(JSON.parse(item[1]));
          return <div key={i}>{item[1]}</div>;
        })}
      </div>
    </div>
  );
};

export default Test;
