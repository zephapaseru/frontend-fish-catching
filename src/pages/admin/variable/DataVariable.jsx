import React, { useEffect, useState } from "react";
import AddVariable from "./AddVariable";
import axios from "axios";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const DataVariable = () => {
  const [openAddVariable, setOpenAddVariable] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const testData = [
    {
      latitude: 4.6352775,
      longitude: 126.948347,
      wave: 0.31,
      wind: 1.0,
      current: 0.18,
      salinity: 0.85,
      temperature: 0.84,
      catchResult: 0.64,
    },
    {
      latitude: 4.626041666666667,
      longitude: 126.82249722222222,
      wave: 0.47,
      wind: 0.32,
      current: 0.27,
      salinity: 0.64,
      temperature: 0.0,
      catchResult: 0.65,
    },
    {
      latitude: 4.553333333333333,
      longitude: 126.98000000000002,
      wave: 0.41,
      wind: 0.69,
      current: 0.18,
      salinity: 0.13,
      temperature: 0.26,
      catchResult: 0.29,
    },
    {
      latitude: 4.747513888888889,
      longitude: 126.91221666666667,
      wave: 0.44,
      wind: 0.0,
      current: 0.27,
      salinity: 0.0,
      temperature: 0.4,
      catchResult: 0.79,
    },
    {
      latitude: 4.790347222222222,
      longitude: 126.79975277777779,
      wave: 1.0,
      wind: 0.46,
      current: 0.55,
      salinity: 0.56,
      temperature: 0.46,
      catchResult: 1.0,
    },
    {
      latitude: 4.738138888888889,
      longitude: 126.69805555555556,
      wave: 0.34,
      wind: 0.96,
      current: 0.64,
      salinity: 0.94,
      temperature: 0.7,
      catchResult: 0.6,
    },
    {
      latitude: 4.377025,
      longitude: 126.52111111111112,
      wave: 0.63,
      wind: 0.87,
      current: 0.64,
      salinity: 0.19,
      temperature: 0.46,
      catchResult: 0.26,
    },
    {
      latitude: 4.0472222222222225,
      longitude: 126.46166666666667,
      wave: 0.0,
      wind: 0.73,
      current: 0.0,
      salinity: 0.43,
      temperature: 1.0,
      catchResult: 0.51,
    },
    {
      latitude: 4.162547222222222,
      longitude: 126.51152777777778,
      wave: 0.19,
      wind: 0.76,
      current: 0.27,
      salinity: 0.89,
      temperature: 0.5,
      catchResult: 0.0,
    },
    {
      latitude: 4.561305555555556,
      longitude: 126.625,
      wave: 0.44,
      wind: 0.78,
      current: 0.18,
      salinity: 0.79,
      temperature: 0.62,
      catchResult: 0.02,
    },
    {
      latitude: 4.491527777777778,
      longitude: 126.56388888888888,
      wave: 0.28,
      wind: 0.8,
      current: 1.0,
      salinity: 0.69,
      temperature: 0.83,
      catchResult: 0.23,
    },
    {
      latitude: 4.674513888888889,
      longitude: 126.66536111111111,
      wave: 0.53,
      wind: 0.82,
      current: 0.0,
      salinity: 0.88,
      temperature: 0.79,
      catchResult: 0.03,
    },
    {
      latitude: 4.470416666666667,
      longitude: 126.51288888888889,
      wave: 0.25,
      wind: 0.84,
      current: 0.73,
      salinity: 0.92,
      temperature: 0.79,
      catchResult: 0.35,
    },
    {
      latitude: 4.360027777777777,
      longitude: 126.5486101111111,
      wave: 0.44,
      wind: 0.87,
      current: 0.27,
      salinity: 0.48,
      temperature: 0.61,
      catchResult: 0.33,
    },
    {
      latitude: 4.214722222222222,
      longitude: 126.57224444444445,
      wave: 0.22,
      wind: 0.89,
      current: 0.73,
      salinity: 1.0,
      temperature: 0.67,
      catchResult: 0.16,
    },
  ];
  const pushData = (item) => {
    setData([...data, item]);
    console.log(data);
  };

  // Function to calculate the total number of pages
  const totalPages = Math.ceil(testData.length / itemsPerPage);

  // Function to get the current items to display based on the current page
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return testData.slice(startIndex, endIndex);
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/cluster", {
        data: testData,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <h3 className="text-[#191635] font-bold text-xl">Data Variabel</h3>
        {!openAddVariable && (
          <button
            className="max-w-[200px] btn btn-primary"
            onClick={() => setOpenAddVariable(true)}
          >
            Tambah Data
          </button>
        )}
        <input
          type="text"
          placeholder="Tahun"
          className="max-w-[200px] input input-bordered"
        />
        {testData.length !== 0 && (
          <button className="max-w-[200px] btn " onClick={sendData}>
            Simpan
          </button>
        )}
        {testData.length !== 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Titik Koordinat</th>
                  <th>Gelombang</th>
                  <th>Angin</th>
                  <th>Arus</th>
                  <th>Salinitas</th>
                  <th>Suhu Permukaan</th>
                  <th>Hasil Tangkapan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item, index) => (
                  <tr key={index + 1}>
                    <td className="px-6 py-4">
                      {item?.latitude}, {item?.longitude}
                    </td>
                    <td className="px-6 py-4">{item?.wave}</td>
                    <td className="px-6 py-4">{item?.wind}</td>
                    <td className="px-6 py-4">{item?.current}</td>
                    <td className="px-6 py-4">{item?.salinity}</td>
                    <td className="px-6 py-4">{item?.temperature}</td>
                    <td className="px-6 py-4">{item?.catchResult}</td>
                    <td className="px-6 py-4">
                      {" "}
                      {/* Add your action buttons here */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-4 text-center border shadow">Belum Ada Data</p>
        )}
      </div>
      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          className="btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft />
        </button>
        <span>
          {currentPage} dari {totalPages}
        </span>
        <button
          className="btn"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      {openAddVariable && (
        <AddVariable
          setOpenAddVariable={setOpenAddVariable}
          pushData={pushData}
        />
      )}
    </>
  );
};

export default DataVariable;
