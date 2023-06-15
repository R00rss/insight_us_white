import { LineChart } from "../Graphs/charjs/LineChart";
import up_icon from "../../assets/images/arrow_up.png";
const optionsDefault = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            display: true,

            labels: {
                color: "#141414",
                display: true,
                usePointStyle: true,
                font: {
                    size: 15,
                    weight: "bold",
                }
            },
        },
        datalabels: {
            backgroundColor: function (context) {
                return context.dataset.backgroundColor;
            },
            formatter: (value) => {
                return value + " %";
                //   return ""
            },
            borderRadius: 4,
            // color: "#484a49",
            color: "#000000",
            font: {
                size: 13,
                weight: "bold",
            },
            // formatter: Math.round,
            padding: 6,
        },
    },

    scales: {
        y: {
            ticks: {
                display: false,
                color: "#000000",
                beginAtZero: false,
                stepSize: 20,
                font: {
                    weight: "bold",
                    size: 18,
                },
            },
        },
        x: {
            ticks: {
                color: "#000000",
                beginAtZero: false,
                stepSize: 20,
                font: {
                    weight: "bold",
                    size: 15,
                },
            },
        },
    },
};
const dataDefault = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
        {
            label: "Indice",
            data: [61.2, 73.4, 71.33, 72.1, 79.9, 83.05, 79.9, 90.4, 84.4, 92.4, 95.4, 96.74,],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
        {
            label: "Curva de tendencia",
            data: [63.3, 68.6, 71.9, 74.2, 76.5, 79.8, 83.1, 86.4, 88.7, 91, 93.3, 96],
            fill: false,
            borderColor: "rgb(33, 11, 192)",
            tension: 0.4,
        }
    ],
};
export default function ProyeccionSentimiento() {
    return (
        <section className="flex gap-2 justify-center items-center ">


            <div className="w-[800px] ">
                <div className="flex justify-center items-center">
                    <div className="relative text-center text-3xl font-semibold  mb-8">
                        <p>
                            Proyección
                        </p>
                        <div className="left-[130%] top-6 text-sm absolute flex justify-center items-center gap-1 flex-col">
                            <div className="flex justify-center items-center">
                                <p className="border-2 rounded-l-xl px-2 bg-slate-200 shadow-[1px_1px_10px_-4px]">Estado: </p>
                                <p className="border-2 rounded-r-xl font-bold bg-[#12b865] border-[#12b865]  px-2 shadow-[1px_1px_10px_-4px]">
                                    {/* ¡Tendencia en crecimiento! */}
                                    Positivo
                                </p>
                                {/* <img className="w-14 object-contai animate-bounce" src={up_icon} alt="up_icon" /> */}
                            </div>
                            <p className="animate-pulse  italic">¡Tendencia en crecimiento!</p>
                        </div>
                    </div>

                </div>
                <LineChart data={dataDefault} options={optionsDefault} />
            </div>
        </section>
    )
}
