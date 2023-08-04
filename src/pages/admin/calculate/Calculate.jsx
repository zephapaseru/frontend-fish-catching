import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { ref, set, onValue } from "firebase/database";

const Calculate = () => {
  const [yearly, setYearly] = useState([]);
  const [dataCluster, setDataCluster] = useState([]);
  const [selectedYear, setSelectedYear] = useState(yearly[0]);
  const [centerCluster, setCenterCluster] = useState([]);
  const [data, setData] = useState([]);
  const [FPC, setFPC] = useState(null);

  const fetchDataCluster = (selectedYear) => {
    const Ref = ref(db, "cluster");
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();

      if (selectedYear && data[selectedYear] && data[selectedYear].result) {
        const yearData = data[selectedYear].result;
        setDataCluster(yearData);
        setCenterCluster(yearData.cluster_centers);
        setData(yearData.data);
        setFPC(yearData.fpc);
      }
    });
  };

  const fetchDataYear = () => {
    const Ref = ref(db, "data");
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const years = Object.keys(data);
      setYearly(years);
    });
  };
  useEffect(() => {
    fetchDataCluster();
  }, []);

  useEffect(() => {
    fetchDataCluster(selectedYear);
    fetchDataYear();
    if (yearly.length > 0 && !selectedYear) {
      setSelectedYear(yearly[0]);
    }
  }, [selectedYear]);
  return (
    <>
      <form>
        <div className="flex flex-col space-y-3">
          <select
            name="year"
            id="year"
            className="w-[200px] max-w-sm text-primary input input-bordered"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option disabled selected>
              Tahun
            </option>
            {yearly.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
      </form>
      <div>
        <h5 className="font-bold">Jumlah Klaster</h5>
        <input
          type="text"
          placeholder="2"
          disabled
          className="mt-4 input input-bordered text-primary"
        />
      </div>
      <div>
        <h5 className="font-bold">Parameter Kekaburan 2</h5>
        <input
          type="text"
          placeholder="2"
          disabled
          className="mt-4 input input-bordered text-primary"
        />
      </div>
      <div>
        <h5 className="font-bold">Inisialisasi pusat kluster secara acak</h5>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Gelombang</th>
                <th>Angin</th>
                <th>Arus</th>
                <th>Salinitas</th>
                <th>Suhu Permukaan</th>
                <th>Hasil Tangkapan</th>
              </tr>
            </thead>
            <tbody>
              {centerCluster.map((rowData, index) => (
                <tr key={index}>
                  {rowData.map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h5 className="font-bold">Pusat Klaster</h5>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Gelombang</th>
                <th>Angin</th>
                <th>Arus</th>
                <th>Salinitas</th>
                <th>Suhu Permukaan</th>
                <th>Hasil Tangkapan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                // Skip rendering if the item is null
                if (!item) return null;

                return (
                  <tr key={index}>
                    <td>{item.wave}</td>
                    <td>{item.wind}</td>
                    <td>{item.current}</td>
                    <td>{item.salinity}</td>
                    <td>{item.temperature}</td>
                    <td>{item.catchResult}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h5 className="font-bold">Nilai</h5>
        <input
          type="text"
          placeholder={FPC}
          disabled
          className="mt-4 input input-bordered text-primary"
        />
      </div>
    </>
  );
};

export default Calculate;
