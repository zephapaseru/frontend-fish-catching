import React, { useEffect, useState } from "react";
import AddVariable from "./AddVariable";
import axios from "axios";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { db } from "../../../config/firebase";
import { normalizeData } from "../../../utils/normalize";
import { ref, set, onValue } from "firebase/database";
import ToastError from "../../../components/toast/ToastError";

const DataVariable = () => {
  const [openAddVariable, setOpenAddVariable] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [year, setYear] = useState("");
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [yearly, setYearly] = useState([]);

  function removeAttributes(data, attributesToRemove) {
    return data.map((obj) => {
      attributesToRemove.forEach((attribute) => delete obj[attribute]);
      return obj;
    });
  }
  const attributesToRemove = ["id", "latitude", "longitude"];

  const pushData = (item) => {
    setData([...data, item]);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    if (!yearly.includes(selectedYear)) {
      setOpenError(false);
    } else {
      setMessage("Data Tahun Sudah Tersedia");
      setOpenError(true);
    }
  };

  const fetchDataYear = (selectedYear) => {
    try {
      const Ref = ref(db, "data");
      onValue(Ref, (snapshot) => {
        try {
          const data = snapshot.val();
          const years = Object.keys(data);
          setYearly(years);
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.error("Error fetching yearly data:", error);
      // Handle the error or show an error message to the user.
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      if (!year) {
        setMessage("Tahun Tidak Boleh Kosong");
        setOpenError(true);
        setTimeout(() => {
          setOpenError(false);
        }, 2100);
      } else {
        await set(ref(db, `/data/${year}`), {
          data,
        });

        const response = await axios.post("http://127.0.0.1:5000/cluster", {
          data: normalizeData(removeAttributes(data, attributesToRemove)),
        });

        const result = response.data;

        await set(ref(db, `/cluster/${year}`), {
          result,
        });

        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    fetchDataYear();
  }, []);
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
        <div className="w-full max-w-[200px]">
          <input
            type="text"
            placeholder="Tahun"
            onChange={handleYearChange}
            className="max-w-[200px] input input-bordered"
          />
          {openError && (
            <p className="mt-2 text-xs font-medium text-center text-red-600">
              {message}
            </p>
          )}
        </div>
        {data.length !== 0 && (
          <button className="max-w-[200px] btn " onClick={sendData}>
            Simpan
          </button>
        )}
        {data.length !== 0 ? (
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
          <p className="p-4 font-semibold text-center border shadow">
            Belum Ada Data
          </p>
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
