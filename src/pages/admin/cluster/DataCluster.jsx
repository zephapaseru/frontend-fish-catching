import React, { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import { ref, set, onValue } from "firebase/database";

const DataCluster = () => {
  const [dataCluster, setDataCluster] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState(yearly[0]);
  const [combinedData, setCombinedData] = useState([]);

  const fetchDataCluster = (selectedYear) => {
    const Ref = ref(db, "cluster");
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      if (selectedYear && data[selectedYear] && data[selectedYear].result) {
        const yearData = data[selectedYear].result.data;
        setDataCluster(yearData);
        console.log(yearData);
      }
    });
  };

  const fetchDataYear = (selectedYear) => {
    const Ref = ref(db, "data");
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const years = Object.keys(data);
      setYearly(years);
      if (selectedYear && data[selectedYear] && data[selectedYear].data) {
        const yearData = data[selectedYear].data;
        setDataYear(yearData);
        console.log(dataYear);
      }
    });
  };
  useEffect(() => {
    fetchDataYear(selectedYear);
    fetchDataCluster(selectedYear);
    if (yearly.length > 0 && !selectedYear) {
      setSelectedYear(yearly[0]);
    }
    const combinedArray = dataCluster.map((item, index) => {
      return { ...item, ...dataYear[index] };
    });

    setCombinedData(combinedArray);
  }, [selectedYear]);

  const combinedArray = dataCluster.map((item, index) => {
    return { ...item, ...dataYear[index] };
  });
  useEffect(() => {
    fetchDataCluster();
    console.log(combinedArray);
  }, []);

  useEffect(() => {}, []);
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
              <th>Klaster</th>
            </tr>
          </thead>
          <tbody>
            {combinedArray.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.latitude}, {item.longitude}
                </td>
                <td>{item.wave}</td>
                <td>{item.wind}</td>
                <td>{item.current}</td>
                <td>{item.salinity}</td>
                <td>{item.temperature}</td>
                <td>{item.catchResult}</td>
                <td>{item.cluster}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataCluster;
