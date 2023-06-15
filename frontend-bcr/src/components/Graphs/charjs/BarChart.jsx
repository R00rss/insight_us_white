import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
// import faker from "faker";

export const counter = {
  id: "counter",
  beforeInit: function (chart, options) {
    const originalFit = chart.legend.fit;
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)();
      this.height += 30;
    };
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
ChartJS.register(counter);

// ChartJS.Legend.prototype.afterFit = function () {
//   this.height = this.height + 50;
// };

export const optionsDefault = {
  responsive: true,
  plugins: {
    legend: {
      counter,
      position: "top",
      display: true,
      // display: false,
      // padding: 20,
      // beforeInit(chart) {
      //   console.log(chart);
      //   // Get reference to the original fit function
      //   const originalFit = chart.legend.fit;

      //   // Override the fit function
      //   chart.legend.fit = function fit() {
      //     // Call original function and bind scope in order to use `this` correctly inside it
      //     originalFit.bind(chart.legend)();
      //     // Change the height as suggested in another answers
      //     this.height += 100;
      //   };
      // },
      labels: {
        // display: false,
        color: "#141414",
        usePointStyle: true,
        font: {
          size: 15,
          weight: "bold",
          // padding: 20,
        },
      },
    },
    datalabels: {
      // backgroundColor: function (context) {
      //   return context.dataset.backgroundColor;
      // },
      borderRadius: 4,
      color: "#000000",
      font: {
        size: 16,
        weight: "bold",
      },
      formatter: (value) => {
        return value + " %";
      },
      padding: 3,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
      color: "#141414",
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
  // tooltipTemplate: "<%= value %>",

  // showTooltips: true,

  // onAnimationComplete: function () {
  //   this.showTooltip(this.datasets[0].points, true);
  // },
  // tooltipEvents: [],
  // onClick: (e) => {
  //   console.log(e);
  // },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataDefault = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      // pointStyle: "line",
      label: "Dataset 1",
      data: labels.map((label, i) => i),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderWidth: 0,
      pointRadius: 2,
    },
    {
      // pointStyle: "line",
      label: "Dataset 2",
      data: labels.map((label, i) => i),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function BarChart({
  data = dataDefault,
  options = optionsDefault,
  title = "",
  clickHandler = (e) => {
    console.log(e);
  },
  setter = (pos) => {
    console.log(pos);
  },
}) {
  // console.log(data);
  const chartRef = useRef();
  // options.plugins.title.text = title;
  options.onClick = clickHandler;

  function defaultOncClick(event) {
    const point = getElementAtEvent(chartRef.current, event);

    if (point[0]) {
      const firstPoint = point[0];
      const label = chartRef.current.data.labels[firstPoint.index];
      const value =
        chartRef.current.data.datasets[firstPoint.datasetIndex].data[
          firstPoint.index
        ];
      const datasetIndex = firstPoint.datasetIndex;
      const index = firstPoint.index;
      setter({ label, value, datasetIndex, index });
    }
  }
  return (
    <Bar
      ref={chartRef}
      options={options}
      data={data}
      onClick={(e) => defaultOncClick(e)}
    />
  );
}
