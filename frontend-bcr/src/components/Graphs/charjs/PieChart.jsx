// import "chart.js/auto";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { counter } from "./BarChart";
ChartJS.register(ArcElement, Tooltip, Legend);
// ChartJS.unregister(counter);

export const optionsDefault = {
  responsive: true,
  plugins: {
    counter: false,
    legend: {
      position: "top",
      display: true,
      labels: {
        display: true,
        // color: "#141414",
        render: "percentage",
        precision: 2,
        color: "rgb(241,245,249)",
        font: {
          weight: "normal",
        },
        usePointStyle: true,
      },
    },
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderRadius: 4,
      color: "#000000",
      font: {
        size: 0,
        weight: "bold",
      },
      // formatter: Math.round,
      padding: 6,
    },
    labels: {
      display: true,
      color: "#141414",
      render: "value",
    },
  },
};

export const dataDefault = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
function PieChart({ data = dataDefault, options = optionsDefault }) {
  // console.log(data);
  return <Pie data={data} options={options} />;
}

export default PieChart;
