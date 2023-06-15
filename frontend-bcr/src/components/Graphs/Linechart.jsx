import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Dato A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Dato B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Dato C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Dato D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Dato E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Dato F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Dato G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const RenderLineChart = () => (
  <ResponsiveContainer width="100%" height="100%" aspect={3}>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="10 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="amt"
        stroke="#3fee"
        strokeWidth={2}
        activeDot={{ r: 8 }}
        // strokeDasharray="3 4 5 2"
      />
      <Line
        type="monotone"
        activeDot={{ r: 8 }}
        dataKey="uv"
        stroke="#82ca9d"
        strokeWidth={2}
        strokeDasharray="5 5"
      />
    </LineChart>
  </ResponsiveContainer>
);
