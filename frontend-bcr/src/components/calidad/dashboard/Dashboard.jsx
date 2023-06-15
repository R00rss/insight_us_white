import React, { useEffect, useState } from "react";
import { getSetData } from "../../../functions/general";
import { toFixedIfNecessary } from "../../../functions/manageNumbers";
import {
  getAVGGradeClient,
  getPlantillas,
} from "../../../services/clienteFantasma";
import FilterBarGeneral from "../../Bars/FilterBarFantasma";
import { BarChart } from "../../Graphs/charjs/BarChart";
import PieChart from "../../Graphs/charjs/PieChart";
import HeatMap from "../../Graphs/heatmap/HeatMap";
const promedio_aux2 = 80.1
const bgColors2 = ['#d66d27', '#f2ac7e']
const borderColors2 = ['#d66d2788', '#f2ac7e88']

function generate_promedio(array) {
  let acc = 0
  array.forEach((item) => {
    acc += item
  })
  return acc / array.length
}

function swap_number(number) {
  if (number >= 90) {
    return 'bg-green-500'
  }
  if (number >= 70) {
    return 'bg-yellow-200'
  }
  return 'bg-red-500'
}
const data_promedio = (promedio_aux, bgColors, borderColors) => {
  return {
    // labels: ["Red", "Blue"],
    labels: [],
    datasets: [
      {
        // label: "# of Votes",
        data: [promedio_aux, 100 - promedio_aux],
        backgroundColor: [
          bgColors[0],
          bgColors[1],
        ],
        borderColor: [
          borderColors[0],
          borderColors[1],
        ],
        borderWidth: 1,
      },
    ],
  }
}


const data_tabla1 = [{
  agencia: 'Ambato',
  actitud: 95.7,
  'destrezas de servicios': 92.2,
  'imagen y orden': 93.4,
  'cliente fantasma': 100,
},
{
  agencia: 'Multiplaza aki',
  actitud: 91.3,
  'destrezas de servicios': 96.7,
  'imagen y orden': 81.7,
  'cliente fantasma': 100,
},
{
  agencia: 'Esmeraldas',
  actitud: 100,
  'destrezas de servicios': 100,
  'imagen y orden': 100,
  'cliente fantasma': 100,
},
{
  agencia: 'Ibarra',
  actitud: 100,
  'destrezas de servicios': 100,
  'imagen y orden': 100,
  'cliente fantasma': 100,
}, {
  agencia: 'Latacunga',
  actitud: 100,
  'destrezas de servicios': 100,
  'imagen y orden': 100,
  'cliente fantasma': 100,
}
  , {
  agencia: 'Quevedo',
  actitud: 100,
  'destrezas de servicios': 100,
  'imagen y orden': 100,
  'cliente fantasma': 100,
}
  , {
  agencia: 'Atahualpa',
  actitud: 100,
  'destrezas de servicios': 100,
  'imagen y orden': 100,
  'cliente fantasma': 100,
}
  , {
  agencia: 'Centrum el bosque',
  actitud: 93.7,
  'destrezas de servicios': 95.7,
  'imagen y orden': 92.5,
  'cliente fantasma': 100,
}
  , {
  agencia: 'Calderon',
  actitud: 100,
  'destrezas de servicios': 100,
  'imagen y orden': 100,
  'cliente fantasma': 100,
},
{
  agencia: 'Carapungo',
  actitud: 100,
  'destrezas de servicios': 100,
  'imagen y orden': 100,
  'cliente fantasma': 100,
}]

data_tabla1.forEach((item) => {
  item.actitud = toFixedIfNecessary(item.actitud, 1)
  item['destrezas de servicios'] = toFixedIfNecessary(item['destrezas de servicios'], 1)
  item['imagen y orden'] = toFixedIfNecessary(item['imagen y orden'], 1)
  item['cliente fantasma'] = toFixedIfNecessary(item['cliente fantasma'], 1)

})
const colors = ['#47d733', '#ff9900', '#00aeff']

const dataDefault = {
  labels: ["Oct-22", "Nov-22", "Dic-22"],
  datasets: [
    {
      // pointStyle: "line",
      label: "Actitud",
      data: [96.7, 96.7, 90.1],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: colors[0],
      borderWidth: 0,
      pointRadius: 2,
    },
    {
      // pointStyle: "line",
      label: "Destrazas de servicios",
      data: [80, 95.7, 78],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: colors[1],
    },
    {
      // pointStyle: "line",
      label: "Imagen y Orden",
      data: [92, 90, 81.7],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: colors[2],
    },
  ],
};



// import FilterBarGeneral from "../../Bars/FilterBarLast";
const INITIAL_VALUE_CHART_GESTION = {
  labels: [],
  datasets: [
    {
      pointStyle: "rect",
      label: "Calificacion",
      data: [],
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: "rgba(54, 162, 235)",
      borderColor: "rgb(54, 162, 235)",
    },
    {
      pointStyle: "rect",
      label: "nota",
      data: [],
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: "rgba(54, 162, 33)",
      borderColor: "rgb(54, 162, 33)",
    },
  ],
};
function formatAVGGradeClient(data) {
  console.log(data);
  // const temp = {
  //   pointStyle: "rect",
  //   label: "calificaciones",
  //   data: data.data,
  //   borderWidth: 1,
  //   borderRadius: 4,
  //   backgroundColor: "rgba(54, 162, 235)",
  //   borderColor: "rgba(54, 162, 235)",
  // };
  const temp2 = {
    labels: data.labels,
    datasets: [
      {
        pointStyle: "rect",
        label: "Promedio de calificaciones",
        data: data.data,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "rgba(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
      },
      {
        pointStyle: "rect",
        label: "Notas mas altas",
        data: [100, 90, 95],
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "rgba(54, 162, 33)",
        borderColor: "rgba(54, 162, 33)",
      },
      {
        pointStyle: "rect",
        label: "Notas mas bajas",
        data: [0, 30, 10],
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "#ff210d",
        borderColor: "#ff210d",
      },
    ],
  };

  // const result = {
  //   labels: data.labels,
  //   datasets: temp,
  // };
  // console.log(result);
  // return result;
  return temp2;
}
const Dashboard = () => {
  const [avgGradeClient, setavgGradeClient] = useState({
    labels: [],
    datasets: [],
  });

  const [plantillas, setPlantillas] = useState([]);
  useEffect(() => {
    getSetData(getPlantillas, setPlantillas, "plantillas");
    getAVGGradeClient().then((res) => {
      if (res) {
        setavgGradeClient(formatAVGGradeClient(res));
      }
    });
  }, []);
  useEffect(() => console.log(plantillas), [plantillas]);
  return (
    <section className="w-full flex flex-col ">
      <FilterBarGeneral callbackFilterData={e => console.log(e)} />
      {/* <FilterBar /> */}
      <section className="w-full p-2 flex flex-row gap-9 mt-4 justify-center items-center">
        <div className="w-[440px] flex flex-col gap-4">
          <div
            // key={i}
            className="flex flex-col justify-center items-center gap-1 capitalize font-bold "
          // ref={container1}
          >
            <h1 className="text-2xl">Cliente fantasma</h1>
            <div className="max-w-[250px] relative">
              <PieChart data={data_promedio(promedio_aux2, bgColors2, borderColors2)} />
              <div className="absolute left-0 right-0 mx-auto bg-slate-50 rounded-full w-[90px] h-[90px] top-0 bottom-0 my-auto flex justify-center items-center text-center">
                {/* {console.log(data_promedio.datasets[0].data[0])} */}
                <p>{toFixedIfNecessary(data_promedio(promedio_aux2, bgColors2, borderColors2).datasets[0].data[0], 2)}%</p>
              </div>
            </div>
          </div>

          <div className="w-full h-[440px]">
            <HeatMap />
          </div>
        </div>
        <section className="flex flex-col gap-4">
          <div className="h-[380px] shadow-cards-indicadores rounded-lg px-3 py-5 flex justify-center items-center">
            <BarChart data={dataDefault} />
            {/* <BarChart data={avgGradeClient} /> */}
          </div>
          <div className=" rounded-lg px-3 py-5">
            {/* <Table data={plantillas} /> */}
            <ul className="grid grid-cols-[2fr_1fr_2fr_2fr_2fr] gap-1 text-sm shadow-[1px_1px_23px_1px_#00000055] rounded-full bg-transparent">
              {Object.keys(data_tabla1[0]).map((e, i) => {
                return (
                  <li key={i} className="flex flex-row bg-gradient-to-r from-cyan-300 via-cyan-200 to-sky-200 text-center capitalize first:rounded-l-lg last:rounded-r-lg px-1 font-medium text-slate-600">
                    {e}
                  </li>)
              })}
            </ul>
            <ul className="flex flex-col gap-1 mt-1">
              {data_tabla1.map((e, i) => {
                return (
                  <li key={i} className=" text-sm grid grid-cols-[2fr_1fr_2fr_2fr_2fr] gap-1 bg-slate-50 text-center capitalize px-1 font-medium text-slate-600 rounded-full bg-cyan-200/50 shadow-[1px_1px_23px_1px_#00000055]">

                    <div>{e.agencia}</div>
                    <div className={`mx-auto  rounded-full w-[50px] ${swap_number(e.actitud)}`}>{e.actitud}%</div>
                    <div className={`mx-auto  rounded-full w-[50px] ${swap_number(e['destrezas de servicios'])}`}>{e['destrezas de servicios']}%</div>
                    <div className={` mx-auto rounded-full w-[50px] ${swap_number(e['imagen y orden'])}`}>{e['imagen y orden']}%</div>
                    <div className={` mx-auto rounded-full w-[50px] ${swap_number(e['cliente fantasma'])}`}>{toFixedIfNecessary(generate_promedio([e.actitud, e["imagen y orden"], e["destrezas de servicios"]]), 1)}%</div>
                  </li>)
              })}
            </ul>
          </div>

        </section>
      </section>
    </section>
  );
};

export default Dashboard;
