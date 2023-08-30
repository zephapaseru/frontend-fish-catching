import React, { useState } from "react";
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
import { coordinates, staticDataArrays, labels } from "../../../utils/data";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Grafik Perbandingan Hasil Tangkapan",
    },
  },
};

export default function ComparisonChart() {
  const [selectedArrayIndex, setSelectedArrayIndex] = useState(0);
  const selectedDataArray = staticDataArrays[selectedArrayIndex];

  const handleSelectChange = (event) => {
    setSelectedArrayIndex(parseInt(event.target.value, 10));
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Hasil tangkapan",
        data: selectedDataArray,
        borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 p-4">
        <div className="flex justify-end mb-2">
          <select
            className="text-primary input input-bordered"
            value={selectedArrayIndex}
            onChange={handleSelectChange}
          >
            {coordinates.map((data, index) => (
              <option key={index} value={index}>
                Lat {data.latitude}, Long {data.longitude}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full h-1/2">
          <Line className="w-full h-full" options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
