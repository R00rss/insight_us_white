import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
export const optionsDefault = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,

      labels: {
        color: "#141414",
        display: true,
        usePointStyle: true,
      },
    },
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      formatter: (value) => {
        return value + " %";
      },
      borderRadius: 4,
      // color: "#484a49",
      color: "#000000",
      font: {
        size: 18,
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

// export const optionsDefault = {
//   plugins: {
//     datalabels: {
//       // backgroundColor: function(context) {
//       //   return context.dataset.backgroundColor;
//       // },
//       borderRadius: 0,
//       color: "red",
//       font: {
//         weight: "bold",
//       },
//       formatter: Math.round,
//       padding: 6,
//     },
//   },

//   // Core options
//   aspectRatio: 5 / 3,
//   layout: {
//     padding: {
//       top: 32,
//       right: 16,
//       bottom: 16,
//       left: 8,
//     },
//   },
//   elements: {
//     line: {
//       fill: false,
//       tension: 0.4,
//     },
//   },
//   scales: {
//     y: {
//       stacked: true,
//     },
//   },
// };

export const dataDefault = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export function LineChart({ data = dataDefault, options = optionsDefault }) {
  return <Line options={options} data={data} />;
}
