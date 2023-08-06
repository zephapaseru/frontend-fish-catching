import React, { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../../components/loading/Loading";
import ToastError from "../../../components/toast/ToastError";

const AddVariable = ({ setOpenAddVariable, pushData }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [item, setItem] = useState({
    id: 0,
    latitude: "",
    longitude: "",
    wave: 0,
    wind: 0,
    current: 0,
    salinity: 0,
    temperature: 0,
    catchResult: 0,
  });
  const [openError, setOpenError] = useState(false);
  const [location, setLocation] = useState("Koordinat");

  const [id, setId] = useState(0);

  const getDataPoints = () => {
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
      console.log(data);
      setDataPoints(data);
      if (data.length > 0) {
        setItem((prevItem) => ({
          ...prevItem,
          latitude: data[0].value.lat,
          longitude: data[0].value.long,
        }));
      }
    });
  };

  const pushToArray = (e) => {
    e.preventDefault();

    if (
      item.wave === 0 ||
      item.wind === 0 ||
      item.current === 0 ||
      item.salinity === 0 ||
      item.temperature === 0 ||
      item.catchResult === 0
    ) {
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
      }, 2100);
    } else {
      pushData(item);
      setId((prevId) => prevId + 1);
      setItem((prevItem) => ({ ...prevItem, id }));
      setItem({
        id: 0,
        latitude: "",
        longitude: "",
        wave: 0,
        wind: 0,
        current: 0,
        salinity: 0,
        temperature: 0,
        catchResult: 0,
      });
      setLocation("Koordinat");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  useEffect(() => {
    getDataPoints();
  }, []);

  useEffect(() => {
    let coordinates = location.split(",");
    setItem((prevItem) => ({
      ...prevItem,
      latitude: coordinates[0],
      longitude: coordinates[1],
    }));
  }, [location]);

  return (
    <>
      <div
        id="drawer-right-example"
        className="fixed top-20 right-0 z-40 h-screen max-h-[800px] p-4 overflow-y-scroll transition-transform bg-white w-96 dark:bg-gray-800 transform-none"
      >
        <div className="flex justify-start">
          <button
            onClick={() => setOpenAddVariable(false)}
            className="w-12 h-12 text-xl bg-white rounded-full btn text-primary "
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        {dataPoints.length === 0 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="mt-4">
              <form onSubmit={pushToArray}>
                <div className="flex flex-col space-y-3">
                  <div>
                    <label className="font-semibold">
                      Latitude & Longitude
                    </label>
                    <select
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full mt-2 input input-bordered"
                    >
                      <option disabled value="Koordinat">
                        Koordinat
                      </option>
                      {dataPoints.map((item, index) => (
                        <option
                          value={`${item.value.lat}, ${item.value.long}`}
                          key={index}
                        >
                          {`${item.value.lat}, ${item.value.long}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold">Gelombang</label>
                    <input
                      type="number"
                      name="wave"
                      value={item.wave}
                      onChange={handleChange}
                      className="w-full mt-2 input input-bordered"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Angin</label>
                    <input
                      type="number"
                      name="wind"
                      value={item.wind}
                      onChange={handleChange}
                      className="w-full mt-2 input input-bordered"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Arus</label>
                    <input
                      type="number"
                      name="current"
                      value={item.current}
                      onChange={handleChange}
                      className="w-full mt-2 input input-bordered"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Salinitas</label>
                    <input
                      type="number"
                      name="salinity"
                      value={item.salinity}
                      onChange={handleChange}
                      className="w-full mt-2 input input-bordered"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Suhu Permukaan</label>
                    <input
                      type="number"
                      name="temperature"
                      value={item.temperature}
                      onChange={handleChange}
                      className="w-full mt-2 input input-bordered"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Hasil Tangkapan</label>
                    <input
                      type="number"
                      name="catchResult"
                      value={item.catchResult}
                      onChange={handleChange}
                      className="w-full mt-2 input input-bordered"
                    />
                  </div>
                </div>
                {openError && (
                  <div>
                    <p className="font-semibold text-center text-red-600">
                      Masih ada data yang kosong
                    </p>
                  </div>
                )}
                <button type="submit" className="w-full mt-6 btn btn-primary">
                  Simpan
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddVariable;
