import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import CardDetailData from "../../components/card/CardDetailData";
import Legend from "../../components/legend/Legend";
import Logo from "../../assets/ic_logo.png";
import { Routes, Route } from "react-router-dom";
import Information from "./info/Information";
import { db } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../components/loading/Loading";

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// create custom icon for cluster 1
const customIconCluster1 = new Icon({
  iconUrl: require("../../assets/cluster_1.png"),
  iconSize: [38, 38],
});

// create custom icon for cluster 2
const customIconCluster2 = new Icon({
  iconUrl: require("../../assets/cluster_2.png"),
  iconSize: [38, 38],
});

const northIndonesiaCenter = [0.7893, 113.9213];
const indonesiaZoom = 6; // Adjust the zoom level as needed
const MainUser = () => {
  const [dataCluster, setDataCluster] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataCluster = (selectedYear) => {
    try {
      const Ref = ref(db, "cluster");
      onValue(Ref, (snapshot) => {
        try {
          const data = snapshot.val();
          if (selectedYear && data[selectedYear] && data[selectedYear].result) {
            const yearData = data[selectedYear].result.data;
            setDataCluster(yearData);
            console.log(yearData);
          }
        } catch (error) {
          setIsLoading(true);
          // Handle the error or show an error message to the user.
        }
      });
    } catch (error) {
      console.error("Error fetching cluster data:", error);
      // Handle the error or show an error message to the user.
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
          if (selectedYear && data[selectedYear] && data[selectedYear].data) {
            const yearData = data[selectedYear].data;
            setDataYear(yearData);
            console.log(yearData);
          }
        } catch (error) {
          setIsLoading(true);
          // Handle the error or show an error message to the user.
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

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <header className="z-10 flex items-center justify-between w-full px-8 py-4 text-white sticky-header bg-primary">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Logo" className="w-14 h-14" />
              <div>
                <h1 className="text-sm font-bold">
                  SISTEM INFORMASI GEOGRAFIS
                </h1>
                <p className="text-xs">Pemetaan Daerah Penangkapan Ikan Laut</p>
              </div>
            </div>
            {
              <Routes>
                <Route
                  path="/"
                  element={
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
                  }
                />
              </Routes>
            }
          </header>
          {
            <Routes>
              <Route
                path="/"
                element={
                  <MapContainer
                    center={northIndonesiaCenter}
                    zoom={indonesiaZoom}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup
                      chunkedLoading
                      iconCreateFunction={createClusterCustomIcon}
                    >
                      {combinedData.map((item) => (
                        <Marker
                          position={[item?.latitude, item?.longitude]}
                          icon={
                            item.cluster === 1
                              ? customIconCluster1
                              : customIconCluster2
                          }
                        >
                          <Popup>
                            <CardDetailData item={item} />
                          </Popup>
                        </Marker>
                      ))}
                    </MarkerClusterGroup>
                    <Legend />
                  </MapContainer>
                }
              />
              <Route path="/info" element={<Information />} />
            </Routes>
          }
        </>
      )}
    </>
  );
};

export default MainUser;
