import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 10, 10, 10, 10, 10],
      backgroundColor: "#0918A3",
    },
    {
      label: "Dataset 2",
      data: [10, 10, 10, 10, 10, 10],
      backgroundColor: "#F8CF10",
    },
    {
      label: "Dataset 2",
      data: [10, 10, 10, 10, 10, 10],
      backgroundColor: "#7CE053",
    },
  ],
};

const Information = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center">
        Informasi Hasil Penangkapan Ikan
      </h2>
      <div className="flex items-center justify-center w-full">
        <div className="w-1/2">
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="px-10 mt-10 overflow-x-auto">
        <table className="table mx-auto">
          <thead>
            <tr>
              <th>Nama Ikan</th>
              <th>Hasil Tangkapan (kg)</th>
              <th>Kedalaman Perairan (m)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cakalang</td>
              <td>500</td>
              <td>500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Information;
