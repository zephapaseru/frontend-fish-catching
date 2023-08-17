import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../../components/loading/Loading";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

const Calculate = () => {
  const [yearly, setYearly] = useState([]);
  const [dataCluster, setDataCluster] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [centerCluster, setCenterCluster] = useState([]);
  const [data, setData] = useState([]);
  const [FPC, setFPC] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [centerClusterPage, setCenterClusterPage] = useState(1);
  const centerClusterRowsPerPage = 2;

  const [dataPage, setDataPage] = useState(1);
  const dataRowsPerPage = 3;

  const fetchDataCluster = (year) => {
    const Ref = ref(db, "cluster");
    onValue(
      Ref,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (year && data[year] && data[year].result) {
            const yearData = data[year].result;
            setDataCluster(yearData);
            setCenterCluster(yearData.cluster_centers);
            setData(yearData.data);
            setFPC(yearData.fpc);
          }
        } catch (error) {
          setIsLoading(true);
        }
      },
      (error) => {
        console.error("Error fetching data cluster:", error);
        // Handle the error or show an error message to the user.
      }
    );
  };

  const fetchDataYear = () => {
    const Ref = ref(db, "data");
    onValue(
      Ref,
      (snapshot) => {
        try {
          const data = snapshot.val();
          const years = Object.keys(data);
          setYearly(years);
        } catch (error) {
          setIsLoading(true);
        }
      },
      (error) => {
        console.error("Error fetching data year:", error);
        // Handle the error or show an error message to the user.
      }
    );
  };

  useEffect(() => {
    fetchDataYear();
  }, []);

  useEffect(() => {
    if (yearly.length > 0) {
      setSelectedYear(yearly[0]);
    }
  }, [yearly]);

  useEffect(() => {
    fetchDataCluster(selectedYear);
  }, [selectedYear]);

  const getTotalPages = (dataLength, rowsPerPage) => {
    return Math.ceil(dataLength / rowsPerPage);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="overflow-y-scroll">
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
                  {yearly.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            {data.length === 0 ? (
              <>
                <Loading />
              </>
            ) : (
              <>
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
                  <h5 className="font-bold">
                    Inisialisasi pusat klaster secara acak
                  </h5>
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
                        {centerCluster
                          .slice(
                            (centerClusterPage - 1) * centerClusterRowsPerPage,
                            centerClusterPage * centerClusterRowsPerPage
                          )
                          .map((rowData, index) => (
                            <tr key={index}>
                              {rowData.map((value, i) => (
                                <td key={i}>{value?.toFixed(2)}</td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      className="mx-1 btn btn-sm btn-secondary"
                      onClick={() =>
                        setCenterClusterPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={centerClusterPage === 1}
                    >
                      <MdArrowBack />
                    </button>
                    <button
                      className="mx-1 btn btn-sm btn-secondary"
                      onClick={() =>
                        setCenterClusterPage((prev) =>
                          Math.min(
                            prev + 1,
                            getTotalPages(
                              centerCluster.length,
                              centerClusterRowsPerPage
                            )
                          )
                        )
                      }
                      disabled={
                        centerClusterPage ===
                        getTotalPages(
                          centerCluster.length,
                          centerClusterRowsPerPage
                        )
                      }
                    >
                      <MdArrowForward />
                    </button>
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
                          <th>Klaster</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .slice(
                            (dataPage - 1) * dataRowsPerPage,
                            dataPage * dataRowsPerPage
                          )
                          .map((item, index) => {
                            if (!item) return null;
                            return (
                              <tr key={index}>
                                <td>{item?.wave?.toFixed(2)}</td>
                                <td>{item?.wind?.toFixed(2)}</td>
                                <td>{item?.current?.toFixed(2)}</td>
                                <td>{item?.salinity?.toFixed(2)}</td>
                                <td>{item?.temperature?.toFixed(2)}</td>
                                <td>{item?.catchResult?.toFixed(2)}</td>
                                <td>{item?.cluster}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      className="mx-1 btn btn-sm btn-secondary"
                      onClick={() =>
                        setDataPage((prev) => Math.max(prev - 1, 1))
                      }
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
                            getTotalPages(data.length, dataRowsPerPage)
                          )
                        )
                      }
                      disabled={
                        dataPage === getTotalPages(data.length, dataRowsPerPage)
                      }
                    >
                      <MdArrowForward />
                    </button>
                  </div>
                </div>
                {/* <div>
                  <h5 className="font-bold">Nilai</h5>
                  <input
                    type="text"
                    placeholder={FPC}
                    disabled
                    className="mt-4 input input-bordered text-primary"
                  />
                </div> */}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Calculate;
