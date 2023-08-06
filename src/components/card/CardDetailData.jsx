import React from "react";

const CardDetailData = ({ item }) => {
  return (
    <div>
      <table className="border border-collapse border-gray-400 table-auto">
        <tbody>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Latitude
            </td>
            <td className="px-4 py-2 border border-gray-400">
              {item.latitude}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Longitude
            </td>
            <td className="px-4 py-2 border border-gray-400">
              {item.longitude}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Tinggi Gelombang
            </td>
            <td className="px-4 py-2 border border-gray-400">{item.wave}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Kecepatan Angin
            </td>
            <td className="px-4 py-2 border border-gray-400">{item.wind}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Kecepatan Arus
            </td>
            <td className="px-4 py-2 border border-gray-400">{item.current}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Suhu Permukaan
            </td>
            <td className="px-4 py-2 border border-gray-400">
              {item.temperature}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Salinitas
            </td>
            <td className="px-4 py-2 border border-gray-400">
              {item.salinity}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-bold border border-gray-400">
              Hasil Tangkapan
            </td>
            <td className="px-4 py-2 border border-gray-400">
              {item.catchResult}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CardDetailData;
