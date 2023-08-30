import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  coordinates,
  staticDataArrays,
  labels,
  dataFishes,
  fishes,
} from "../../../utils/data";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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

const ComparisonChart = () => {
  const [selectedArrayIndex, setSelectedArrayIndex] = useState(0);
  const selectedDataArray = staticDataArrays[selectedArrayIndex];

  const [selectedFishIndex, setSelectedFishIndex] = useState(0);
  const selectedDataFish = dataFishes[0][selectedFishIndex];

  const handleSelectChange = (event, setState) => {
    setState(parseInt(event.target.value, 10));
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

  const dataFish = {
    labels,
    datasets: [
      {
        label: fishes[selectedFishIndex],
        data: selectedDataFish,
        borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
        backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
      },
    ],
  };

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

  return (
    <div className="flex items-center justify-center h-screen p-10">
      <div className="w-1/2 p-4">
        {" "}
        {/* Set width here */}
        <div className="flex justify-end mb-2">
          <select
            className="text-primary input input-bordered"
            value={selectedArrayIndex}
            onChange={(e) => handleSelectChange(e, setSelectedArrayIndex)}
          >
            {coordinates.map((data, index) => (
              <option key={index} value={index}>
                Lat {data.latitude}, Long {data.longitude}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full p-4 shadow-md h-1/2">
          <Line className="w-full h-full" options={options} data={data} />
        </div>
      </div>
      <div className="w-1/2 p-4">
        {" "}
        {/* Set width here */}
        <div className="flex justify-end mb-2">
          <select
            className="text-primary input input-bordered"
            value={selectedFishIndex}
            onChange={(e) => handleSelectChange(e, setSelectedFishIndex)}
          >
            {fishes.map((data, index) => (
              <option key={index} value={index}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full p-4 shadow-md h-1/2">
          <Bar className="w-full h-full" options={options} data={dataFish} />
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
