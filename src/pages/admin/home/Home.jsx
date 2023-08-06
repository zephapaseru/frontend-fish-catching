import React, { useEffect, useState } from "react";
import CardInformation from "../../../components/card/CardInformation";
import IconInformation1 from "../../../assets/ic_information_1.png";
import IconInformation3 from "../../../assets/ic_information_3.png";
import { db } from "../../../config/firebase";
import { ref, onValue } from "firebase/database";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Loading from "../../../components/loading/Loading";

const Home = () => {
  const [lengthPoints, setLengthPoints] = useState(0);
  const [dataCluster, setDataCluster] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const [dataPage, setDataPage] = useState(1);
  const dataRowsPerPage = 5;
  const [isLoading, setIsLoading] = useState(false);

  const getDataPoints = () => {
    try {
      const dbRef = ref(db, "points");
      onValue(dbRef, (snapshot) => {
        let data = [];
        snapshot.forEach((childSnapshot) => {
          let key = childSnapshot.key;
          let value = childSnapshot.val();

          data.push({
            key: key,
            value: value,
          });
        });

        setLengthPoints(data.length);
      });
    } catch (error) {
      console.error("Error fetching data points:", error);
      // Handle the error or show an error message to the user.
    }
  };

  const fetchDataCluster = (selectedYear) => {
    try {
      const Ref = ref(db, "cluster");
      onValue(Ref, (snapshot) => {
        const data = snapshot.val();
        if (selectedYear && data[selectedYear] && data[selectedYear].result) {
          const yearData = data[selectedYear].result.data;
          setDataCluster(yearData);
        }
      });
    } catch (error) {
      setIsLoading(true);
      // Handle the error or show an error message to the user.
    }
  };

  const fetchDataYear = (selectedYear) => {
    try {
      const Ref = ref(db, "data");
      onValue(Ref, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const years = Object.keys(data);
          setYearly(years);
          if (selectedYear && data[selectedYear] && data[selectedYear].data) {
            const yearData = data[selectedYear].data;
            setDataYear(yearData);
          }
        } else {
          setIsLoading(true);
        }
      });
    } catch (error) {
      console.error("Error fetching yearly data:", error);
      // Handle the error or show an error message to the user.
    }
  };

  useEffect(() => {
    fetchDataYear(selectedYear);
    fetchDataCluster(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    if (yearly.length > 0 && !selectedYear) {
      setSelectedYear(yearly[0]);
    }

    const combinedArray = dataCluster.map((item, index) => {
      return { ...item, ...dataYear[index] };
    });

    setCombinedData(combinedArray);
  }, [dataCluster, dataYear]);

  const getTotalPages = (totalData, rowsPerPage) => {
    return Math.ceil(totalData / rowsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setDataPage(pageNumber);
  };

  const indexOfLastItem = dataPage * dataRowsPerPage;
  const indexOfFirstItem = indexOfLastItem - dataRowsPerPage;
  const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = getTotalPages(combinedData.length, dataRowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    getDataPoints();
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <CardInformation
          title="Jumlah Titik Penangkapan"
          count={lengthPoints}
          img={IconInformation1}
        />
        <CardInformation
          count="6"
          img={IconInformation3}
          title="Jumlah Data Variabel"
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-10">
          <form>
            <div className="flex flex-col space-y-3">
              <select
                name="year"
                id="year"
                className="w-[200px] max-w-sm text-primary input input-bordered"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option disabled value="">
                  Tahun
                </option>
                {yearly.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </form>
          {combinedData.length < 1 ? (
            <p className="p-4 font-bold text-center shadow">
              Silahkan Pilih Tahun Terlebih Dahulu
            </p>
          ) : (
            <>
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
                    {currentItems.map((item, index) => (
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
              <div className="flex justify-center mt-4">
                <div className="flex justify-end mt-3">
                  <button
                    className="mx-1 btn btn-sm btn-secondary"
                    onClick={() => setDataPage((prev) => Math.max(prev - 1, 1))}
                    disabled={dataPage === 1}
                  >
                    <MdArrowBack />
                  </button>
                  <button
                    className="mx-1 btn btn-sm btn-secondary"
                    onClick={() =>
                      setDataPage((prev) =>
                        Math.min(
                          prev + 1,
                          getTotalPages(combinedData.length, dataRowsPerPage)
                        )
                      )
                    }
                    disabled={
                      dataPage ===
                      getTotalPages(combinedData.length, dataRowsPerPage)
                    }
                  >
                    <MdArrowForward />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
